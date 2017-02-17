import FileSystem from '../library/file-system'
import Package from '../package.json'
import Path from '../library/path'
import Process from '../library/process'

const FILE_PATH = Path.join(__dirname, '..', 'process', 'output', `${Package.name}.mocha.out`)

describe('FileSystem', () => {

  before(() => {
    FileSystem.mkdirp.sync(Path.dirname(FILE_PATH))
  })

  describe('accessUnlink', () => {

    describe('(when a file exists)', () => {

      before((callback) => {

        Promise.resolve()
          .then(() => FileSystem.Promise.access(FILE_PATH, FileSystem.F_OK)
              .then(() => FileSystem.Promise.unlink(FILE_PATH))
              .catch(() => Promise.resolve()))
          .then(() => FileSystem.Promise.writeFile(FILE_PATH, Process.pid, {
            encoding: 'utf-8'
          }))
          .then(() => FileSystem.Promise.accessUnlink(FILE_PATH, FileSystem.F_OK))
          .then(() => callback())
          .catch((error) => callback(error))

      })

      it('should delete a file', (callback) => {
        FileSystem.Promise.access(FILE_PATH, FileSystem.F_OK)
          .then(() => callback(new Error(`The file ${Path.trim(FILE_PATH)} exists.`)))
          .catch(() => callback())
      })

    })

    describe('(when a file doesn\'t exist)', () => {

      before((callback) => {

        Promise.resolve()
          .then(() => FileSystem.Promise.access(FILE_PATH, FileSystem.F_OK)
              .then(() => FileSystem.Promise.unlink(FILE_PATH))
              .catch(() => Promise.resolve()))
          .then(() => callback())
          .catch((error) => callback(error))

      })

      it('should succeed', (callback) => {
        FileSystem.accessUnlink(FILE_PATH, FileSystem.F_OK, callback)
      })

    })

  })

  describe('whenFileExists', () => {

    describe('(when a file exists)', () => {

      before((callback) => {

        Promise.resolve()
          .then(() => FileSystem.Promise.accessUnlink(FILE_PATH, FileSystem.F_OK))
          .then(() => FileSystem.Promise.writeFile(FILE_PATH, Process.pid, {
            encoding: 'utf-8'
          }))
          .then(() => callback())
          .catch((error) => callback(error))

      })

      it('should resolve the promise', (callback) => {
        FileSystem.whenFileExists(250, 1000, FILE_PATH)
          .then(() => callback())
          .catch((error) => callback(error))
      })

      after((callback) => {
        FileSystem.unlink(FILE_PATH, callback)
      })

    })

    describe('(when a file doesn\'t exist)', () => {

      before((callback) => {
        FileSystem.accessUnlink(FILE_PATH, FileSystem.F_OK, callback)
      })

      it('should reject the promise', (callback) => {
        FileSystem.whenFileExists(250, 1000, FILE_PATH)
          .then(() => callback(new Error(`The file ${Path.trim(FILE_PATH)} exists.`)))
          .catch(() => callback())
      })

    })

  })

  describe('whenFileNotExists', () => {

    describe('(when a file doesn\'t exist)', () => {

      before((callback) => {
        FileSystem.accessUnlink(FILE_PATH, FileSystem.F_OK, callback)
      })

      it('should resolve the promise', (callback) => {
        FileSystem.whenFileNotExists(250, 1000, FILE_PATH)
          .then(() => callback())
          .catch((error) => callback(error))
      })

    })

    describe('(when a file exists)', () => {

      before((callback) => {

        Promise.resolve()
          .then(() => FileSystem.Promise.accessUnlink(FILE_PATH, FileSystem.F_OK))
          .then(() => FileSystem.Promise.writeFile(FILE_PATH, Process.pid, {
            encoding: 'utf-8'
          }))
          .then(() => callback())
          .catch((error) => callback(error))

      })

      it('should reject the promise', (callback) => {
        FileSystem.whenFileNotExists(250, 1000, FILE_PATH)
          .then(() => callback(new Error(`The file ${Path.trim(FILE_PATH)} doesn\'t exist.`)))
          .catch(() => callback())
      })

      after((callback) => {
        FileSystem.accessUnlink(FILE_PATH, FileSystem.F_OK, callback)
      })

    })

  })

})
