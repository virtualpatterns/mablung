import FileSystem from '../../library/file-system'
import { Log } from '../../library/log'
import Path from '../../library/path'
import Process from '../../library/process'

import TestError from '../errors/test-error'

const FILE_PATH = `${Process.env.HOME}/Library/Logs/mablung/mablung.tests.out`

describe('FileSystem', () => {

  describe('accessUnlink', () => {

    describe('(when a file exists)', () => {

      before(async () => {

        try {
          await FileSystem.Promise.access(FILE_PATH, FileSystem.F_OK)
          await FileSystem.Promise.unlink(FILE_PATH)
        } catch (error) {
          Log.error(error)
        }

        await FileSystem.Promise.writeFile(FILE_PATH, Process.pid, { 'encoding': 'utf-8' })
        await FileSystem.Promise.accessUnlink(FILE_PATH, FileSystem.F_OK)

      })

      it('should delete a file', async () => {

        try {
          await FileSystem.Promise.access(FILE_PATH, FileSystem.F_OK)
          throw new TestError(`The file '${Path.trim(FILE_PATH)}' exists.`)
        } catch (error) {
          if (error instanceof TestError) {
            throw error
          } else {
            Log.error(error)
          }
        }

      })

    })

    describe('(when a file doesn\'t exist)', () => {

      before(async () => {

        try {
          await FileSystem.Promise.access(FILE_PATH, FileSystem.F_OK)
          await FileSystem.Promise.unlink(FILE_PATH)
        } catch (error) {
          Log.error(error)
        }

      })

      it('should succeed', async () => {
        await FileSystem.Promise.accessUnlink(FILE_PATH, FileSystem.F_OK)
      })

    })

  })

  describe('whenFileExists', () => {

    describe('(when a file exists)', () => {

      before(async () => {

        try {
          await FileSystem.Promise.accessUnlink(FILE_PATH, FileSystem.F_OK)
        } catch (error) {
          Log.error(error)
        }

        await FileSystem.Promise.writeFile(FILE_PATH, Process.pid, {
          encoding: 'utf-8'
        })

      })

      it('should resolve', async () => {
        await FileSystem.whenFileExists(250, 1000, FILE_PATH)
      })

      after(async () => {
        await FileSystem.Promise.unlink(FILE_PATH)
      })

    })

    describe('(when a file doesn\'t exist)', () => {

      before(async () => {

        try {
          await FileSystem.Promise.accessUnlink(FILE_PATH, FileSystem.F_OK)
        } catch (error) {
          Log.error(error)
        }

      })

      it('should reject', async () => {

        try {
          await FileSystem.whenFileExists(250, 1000, FILE_PATH)
          throw new TestError(`The file '${Path.trim(FILE_PATH)}' doesn't exist.`)
        } catch (error) {
          if (error instanceof TestError) {
            throw error
          } else {
            Log.error(error)
          }
        }

      })

    })

  })

  // describe('whenFileNotExists', () => {
  //
  //   describe('(when a file doesn\'t exist)', () => {
  //
  //     before((callback) => {
  //       FileSystem.accessUnlink(FILE_PATH, FileSystem.F_OK, callback)
  //     })
  //
  //     it('should resolve the promise', (callback) => {
  //       FileSystem.whenFileNotExists(250, 1000, FILE_PATH)
  //         .then(() => callback())
  //         .catch((error) => callback(error))
  //     })
  //
  //   })
  //
  //   describe('(when a file exists)', () => {
  //
  //     before((callback) => {
  //
  //       Promise.resolve()
  //         .then(() => FileSystem.Promise.accessUnlink(FILE_PATH, FileSystem.F_OK))
  //         .then(() => FileSystem.Promise.writeFile(FILE_PATH, Process.pid, {
  //           encoding: 'utf-8'
  //         }))
  //         .then(() => callback())
  //         .catch((error) => callback(error))
  //
  //     })
  //
  //     it('should reject the promise', (callback) => {
  //       FileSystem.whenFileNotExists(250, 1000, FILE_PATH)
  //         .then(() => callback(new Error(`The file ${Path.trim(FILE_PATH)} doesn't exist.`)))
  //         .catch(() => callback())
  //     })
  //
  //     after((callback) => {
  //       FileSystem.accessUnlink(FILE_PATH, FileSystem.F_OK, callback)
  //     })
  //
  //   })
  //
  // })

})
