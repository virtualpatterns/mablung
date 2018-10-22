import { assert as Assert } from 'chai'
import Is from '@pwn/is'

import Configuration from '../../configuration'
import { FileSystem, Path, Process } from '../../index'

import TestError from '../errors/test-error'

describe('file-system', () => {

  for (let methodName of [ 'promisedCopy', 'promisedMakeDir', 'promisedReadDir', 'promisedReadFile', 'promisedStat', 'promisedTouch' ]) {

    describe(`(when calling ${methodName})`, () => {

      it('should be defined', async () => {
        Assert.ok(Is.function(FileSystem[methodName]))
      })

    })

  }

  describe('promisedAccessUnlink', () => {

    describe('(when a file exists)', () => {

      before(async () => {

        try {
          await FileSystem.promisedAccess(Configuration.tests.outPath, FileSystem.F_OK)
          await FileSystem.promisedUnlink(Configuration.tests.outPath)
        } catch (error) {
          // OK
        }

        await FileSystem.promisedWriteFile(Configuration.tests.outPath, Process.pid, { 'encoding': 'utf-8' })
        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)

      })

      it('should delete a file', async () => {

        try {
          await FileSystem.promisedAccess(Configuration.tests.outPath, FileSystem.F_OK)
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
          await FileSystem.promisedAccess(Configuration.tests.outPath, FileSystem.F_OK)
          await FileSystem.promisedUnlink(Configuration.tests.outPath)
        } catch (error) {
          // OK
        }

      })

      it('should succeed', async () => {
        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
      })

    })

  })

  describe('whenFileExists', () => {

    describe('(when a file exists)', () => {

      before(async () => {
        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
        await FileSystem.promisedWriteFile(Configuration.tests.outPath, Process.pid, { 'encoding': 'utf-8' })
      })

      it('should resolve', async () => {
        await FileSystem.whenFileExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, Configuration.tests.outPath)
      })

      after(async () => {
        await FileSystem.promisedUnlink(Configuration.tests.outPath)
      })

    })

    describe('(when a file doesn\'t exist)', () => {

      before(async () => {
        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
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
        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
      })

      it('should resolve the promise', async () => {
        await FileSystem.whenFileNotExists(Configuration.tests.whenTimeout, Configuration.tests.whenDuration, Configuration.tests.outPath)
      })

    })

    describe('(when a file exists)', () => {

      before(async () => {
        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
        await FileSystem.promisedWriteFile(Configuration.tests.outPath, Process.pid, { 'encoding': 'utf-8' })
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
        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
      })

    })

  })

})
