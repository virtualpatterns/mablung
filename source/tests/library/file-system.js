import { assert as Assert } from 'chai'
import Is from '@pwn/is'

import Configuration from '../../configuration'
import { FileSystem, Path, Process } from '../../index'

import TestError from '../errors/test-error'

describe('file-system', () => {

  for (let methodName of [ 'promisedCopy', 'promisedMakeDir', 'promisedReadDir', 'promisedReadFile', 'promisedRename', 'promisedStat', 'promisedTouch' ]) {

    describe(`(when calling ${methodName})`, () => {

      it('should be defined', async () => {
        Assert.ok(Is.function(FileSystem[methodName]))
      })

    })

  }

  describe('access', () => {

    describe('(when a file exists)', () => {

      it('should succeed', async () => {
        await FileSystem.access(__filename, FileSystem.F_OK)
      })

    })

    describe('(when a file doesn\'t exist)', () => {

      it('should fail', async () => {

        try {
          await FileSystem.access(`${__filename}x`, FileSystem.F_OK)
          throw new TestError(`The file '${__filename}x' exists.`)
        }
        catch (error) {
          if (error instanceof TestError) {
            throw error
          }
        }

      })

    })

  })

  describe('stat', () => {

    describe('(when called with a directory)', () => {

      it('should return a directory', async () => {
        Assert.ok((await FileSystem.stat(__dirname)).isDirectory())
      })

    })

    describe('(when called with a directory and options)', () => {

      it.skip('should return a directory', async () => {
        Assert.ok((await FileSystem.stat(__dirname, { 'bigint': true })).isDirectory())
      })

    })

  })

  describe('accessRequireSync', () => {

    describe('(when a file exists)', () => {

      let data = null

      before(async () => {

        try {
          await FileSystem.access(Configuration.tests.requirePath, FileSystem.F_OK)
          await FileSystem.unlink(Configuration.tests.requirePath)
        } catch (error) {
          // OK
        }

        await FileSystem.writeFile(Configuration.tests.requirePath, `{ "pid": ${Process.pid} }`, { 'encoding': 'utf-8' })

        data = FileSystem.accessRequireSync(Configuration.tests.requirePath, FileSystem.F_OK)

      })

      it('should require a file', () => {
        Assert.equal(data.pid, Process.pid)
      })

    })

    describe('(when a file doesn\'t exist)', () => {

      before(async () => {

        try {
          await FileSystem.access(Configuration.tests.requirePath, FileSystem.F_OK)
          await FileSystem.unlink(Configuration.tests.requirePath)
        } catch (error) {
          // OK
        }

      })

      it('should be undefined', () => {
        Assert.ok(Is.undefined(FileSystem.accessRequireSync(Configuration.tests.requirePath, FileSystem.F_OK)))
      })

    })

  })

  describe('accessRequire', () => {

    describe('(when a file exists)', () => {

      let data = null

      before(async () => {

        try {
          await FileSystem.access(Configuration.tests.requirePath, FileSystem.F_OK)
          await FileSystem.unlink(Configuration.tests.requirePath)
        } catch (error) {
          // OK
        }

        await FileSystem.writeFile(Configuration.tests.requirePath, `{ "pid": ${Process.pid} }`, { 'encoding': 'utf-8' })

        data = await FileSystem.accessRequire(Configuration.tests.requirePath, FileSystem.F_OK)

      })

      it('should require a file', () => {
        Assert.equal(data.pid, Process.pid)
      })

    })

    describe('(when a file doesn\'t exist)', () => {

      before(async () => {

        try {
          await FileSystem.access(Configuration.tests.requirePath, FileSystem.F_OK)
          await FileSystem.unlink(Configuration.tests.requirePath)
        } catch (error) {
          // OK
        }

      })

      it('should be undefined', async () => {
        Assert.ok(Is.undefined(await FileSystem.accessRequire(Configuration.tests.requirePath, FileSystem.F_OK)))
      })

    })

  })

  describe('accessUnlink', () => {

    describe('(when a file exists)', () => {

      before(async () => {

        try {
          await FileSystem.access(Configuration.tests.outPath, FileSystem.F_OK)
          await FileSystem.unlink(Configuration.tests.outPath)
        } catch (error) {
          // OK
        }

        await FileSystem.writeFile(Configuration.tests.outPath, Process.pid, { 'encoding': 'utf-8' })
        await FileSystem.accessUnlink(Configuration.tests.outPath, FileSystem.F_OK)

      })

      it('should delete a file', async () => {

        try {
          await FileSystem.access(Configuration.tests.outPath, FileSystem.F_OK)
          throw new TestError(`The file '${Path.trim(Configuration.tests.outPath)}' exists.`)
        } catch (error) {
          if (error instanceof TestError) {
            throw error
          }
        }

      })

    })

    describe('(when a file doesn\'t exist)', () => {

      before(async () => {

        try {
          await FileSystem.access(Configuration.tests.outPath, FileSystem.F_OK)
          await FileSystem.unlink(Configuration.tests.outPath)
        } catch (error) {
          // OK
        }

      })

      it('should succeed', async () => {
        await FileSystem.accessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
      })

    })

  })

  describe('whenFileExists', () => {

    describe('(when a file exists)', () => {

      before(async () => {
        await FileSystem.accessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
        await FileSystem.writeFile(Configuration.tests.outPath, Process.pid, { 'encoding': 'utf-8' })
      })

      it('should resolve', async () => {
        await FileSystem.whenFileExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, Configuration.tests.outPath)
      })

      after(async () => {
        await FileSystem.unlink(Configuration.tests.outPath)
      })

    })

    describe('(when a file doesn\'t exist)', () => {

      before(async () => {
        await FileSystem.accessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
      })

      it('should reject', async () => {

        try {
          await FileSystem.whenFileExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, Configuration.tests.outPath)
          throw new TestError(`The file '${Path.trim(Configuration.tests.outPath)}' doesn't exist.`)
        } catch (error) {
          if (error instanceof TestError) {
            throw error
          }
        }

      })

    })

  })

  describe('whenFileNotExists', () => {

    describe('(when a file doesn\'t exist)', () => {

      before(async () => {
        await FileSystem.accessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
      })

      it('should resolve the promise', async () => {
        await FileSystem.whenFileNotExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, Configuration.tests.outPath)
      })

    })

    describe('(when a file exists)', () => {

      before(async () => {
        await FileSystem.accessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
        await FileSystem.writeFile(Configuration.tests.outPath, Process.pid, { 'encoding': 'utf-8' })
      })

      it('should reject', async () => {

        try {
          await FileSystem.whenFileNotExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, Configuration.tests.outPath)
          throw new TestError(`The file '${Path.trim(Configuration.tests.outPath)}' doesn't exist.`)
        } catch (error) {
          if (error instanceof TestError) {
            throw error
          }
        }

      })

      after(async () => {
        await FileSystem.accessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
      })

    })

  })

})
