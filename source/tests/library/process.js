import { assert as Assert } from 'chai'
import ChildProcess from 'child_process'
import Sinon from 'sinon'

import Configuration from '../../configuration'
import { FileSystem, Path, Process } from '../../index'

import ArgumentError from '../../library/errors/argument-error'
import TestError from '../errors/test-error'

describe('process', () => {

  describe('when', () => {

    describe('(when a test succeeds)', () => {

      it('should resolve', async () => {
        await Process.when(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, (callback) => callback())
      })

    })

    describe('(when a test fails)', () => {

      it('should reject', async () => {

        try {
          await Process.when(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, (callback) => callback(new Error()))
          throw new TestError()
        } catch (error) {
          if (error instanceof TestError) {
            throw error
          }
        }

      })

    })

  })

  describe('existsPID', () => {

    describe('(return true)', () => {

      describe('(when the file exists and contains a valid pid)', () => {

        before(async () => {
          await FileSystem.accessUnlink(Configuration.tests.pidPath, FileSystem.F_OK)
          await FileSystem.writeFile(Configuration.tests.pidPath, Process.pid, { 'encoding': 'utf-8' })
        })

        it('should return true', () => {
          Assert.equal(Process.existsPID(Configuration.tests.pidPath), true)
        })

        after(async () => {
          await FileSystem.unlink(Configuration.tests.pidPath)
        })

      })

    })

    describe('(return false)', () => {

      describe('(when the file doesn\'t exist)', () => {

        before(async () => {
          await FileSystem.accessUnlink(Configuration.tests.pidPath, FileSystem.F_OK)
        })

        it('should return false', () => {
          Assert.equal(Process.existsPID(Configuration.tests.pidPath), false)
        })

      })

      describe('(when the file exists and contains an invalid pid)', () => {

        before(async () => {
          await FileSystem.accessUnlink(Configuration.tests.pidPath, FileSystem.F_OK)
          await FileSystem.writeFile(Configuration.tests.pidPath, 2^16, { 'encoding': 'utf-8' })
        })

        it('should return false', () => {
          Assert.equal(Process.existsPID(Configuration.tests.pidPath), false)
        })

      })

      describe('(when the file contains an invalid pid)', () => {

        before(async () => {

          await FileSystem.accessUnlink(Configuration.tests.pidPath, FileSystem.F_OK)
          await FileSystem.writeFile(Configuration.tests.pidPath, 2^16, { 'encoding': 'utf-8' })

          Process.existsPID(Configuration.tests.pidPath)

        })

        it('should delete the file', async () => {

          try {
            await FileSystem.access(Configuration.tests.pidPath, FileSystem.F_OK)
            throw new TestError(`The file ${Path.trim(Configuration.tests.pidPath)} exists.`)
          } catch (error) {
            if (error instanceof TestError) {
              throw error
            }
          }

        })

      })

    })

  })

  describe('createPID', () => {

    describe('(call)', () => {

      before(async () => {

        Sinon.spy(Process, 'createPID')
        Sinon.spy(Process, 'on')

        await FileSystem.accessUnlink(Configuration.tests.pidPath, FileSystem.F_OK)

        Process.createPID(Configuration.tests.pidPath)

      })

      it('should call Process.on', () => {
        Assert.ok(Process.on.calledOnce)
      })

      it('should call Process.on with arguments', () => {
        Assert.ok(Process.on.calledWith('exit'))
      })

      it('should return Process', () => {
        Assert.ok(Process.createPID.returned(Process))
      })

      after(async () => {

        await FileSystem.accessUnlink(Configuration.tests.pidPath, FileSystem.F_OK)

        Process.on.restore()
        Process.createPID.restore()

      })

    })

    describe('(parent process)', () => {

      before(async () => {

        await FileSystem.accessUnlink(Configuration.tests.pidPath, FileSystem.F_OK)

        Process.createPID(Configuration.tests.pidPath)

      })

      it('should create the file', async () => {
        await FileSystem.access(Configuration.tests.pidPath, FileSystem.F_OK)
      })

      it('should create the file with a valid pid', async () => {
        Assert.equal(await FileSystem.readFile(Configuration.tests.pidPath, { 'encoding': 'utf-8' }), Process.pid)
      })

      it('should fail if the file exists', () => {
        Assert.throws(() => Process.createPID(Configuration.tests.pidPath), ArgumentError)
      })

    })

    describe('(child process)', () => {

      describe('(on fork)', () => {

        let childProcess = null

        before(async () => {

          await FileSystem.accessUnlink(Configuration.tests.process.logPath, FileSystem.F_OK)
          await FileSystem.accessUnlink(Configuration.tests.process.pidPath, FileSystem.F_OK)

          childProcess = ChildProcess.fork(Configuration.tests.process.modulePath, [], { 'silent': false })

        })

        it('should create the file', async () => {
          await FileSystem.whenFileExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, Configuration.tests.process.pidPath)
        })

        after(async () => {

          childProcess.send({})

          await FileSystem.whenFileNotExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration0, Configuration.tests.process.pidPath)

        })

      })

      describe('(on exit)', () => {

        before(async () => {

          await FileSystem.accessUnlink(Configuration.tests.process.logPath, FileSystem.F_OK)
          await FileSystem.accessUnlink(Configuration.tests.process.pidPath, FileSystem.F_OK)

          let childProcess = ChildProcess.fork(Configuration.tests.process.modulePath, [], { 'silent': false })

          await FileSystem.whenFileExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, Configuration.tests.process.pidPath)

          childProcess.send({})

        })

        it('should delete the file on exit', async () => {
          await FileSystem.whenFileNotExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration0, Configuration.tests.process.pidPath)
        })

      })

    })

  })

  describe('killPID', () => {

    describe('(when the file exists and contains a valid pid)', () => {

      before(async () => {

        await FileSystem.accessUnlink(Configuration.tests.process.pidPath, FileSystem.F_OK)

        ChildProcess.fork(Configuration.tests.process.modulePath, [], { 'silent': true })

        await FileSystem.whenFileExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, Configuration.tests.process.pidPath)

        Process.killPID(Configuration.tests.process.pidPath)

      })

      it('should delete the file', async () => {
        await FileSystem.whenFileNotExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration0, Configuration.tests.process.pidPath)
      })

    })

    describe('(when the file doesn\'t exist)', () => {

      before(async () => {
        await FileSystem.accessUnlink(Configuration.tests.process.pidPath, FileSystem.F_OK)
      })

      it('should fail', () => {
        Assert.throws(() => Process.killPID(Configuration.tests.process.pidPath), ArgumentError)
      })

    })

    describe('(when the file exists and contains an invalid pid)', () => {

      before(async () => {
        await FileSystem.accessUnlink(Configuration.tests.process.pidPath, FileSystem.F_OK)
        await FileSystem.writeFile(Configuration.tests.process.pidPath, 2^16, { 'encoding': 'utf-8' })
      })

      it('should fail', () => {
        Assert.throws(() => Process.killPID(Configuration.tests.process.pidPath), ArgumentError)
      })

    })

  })

})
