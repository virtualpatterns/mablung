import Directory from 'mkdirp'
import _FileSystem from 'fs'
import Promisify from 'es6-promisify'
import Touch from 'touch'

import Path from './path'
import Process from './process'

import ArgumentError from './errors/argument-error'

const FileSystem = Object.create(_FileSystem)

FileSystem.mkdirp = Directory
FileSystem.touch = Touch

FileSystem.accessUnlink = function (path, mode, callback) {
  FileSystem.access(path, mode, (error) => {
    if (error) {
      callback()
    } else {
      FileSystem.unlink(path, callback)
    }
  })
}

FileSystem.whenFileExists = function (timeout, maximumDuration, path) {
  return Process.when(timeout, maximumDuration, (callback) => FileSystem.access(path, FileSystem.F_OK, callback))
}

FileSystem.whenFileNotExists = function (timeout, maximumDuration, path) {

  return Process.when(timeout, maximumDuration, (callback) => {
    FileSystem.access(path, FileSystem.F_OK, (error) => {
      if (error) {
        callback()
      } else {
        callback(new ArgumentError(`The file '${Path.trim(path)}' exists.`))
      }
    })
  })

}

FileSystem.promisedAccess = Promisify(FileSystem.access)
FileSystem.promisedAccessUnlink = Promisify(FileSystem.accessUnlink)
FileSystem.promisedMkdirP = Promisify(FileSystem.mkdirp)
FileSystem.promisedReadFile = Promisify(FileSystem.readFile)
FileSystem.promisedTouch = Promisify(FileSystem.touch)
FileSystem.promisedUnlink = Promisify(FileSystem.unlink)
FileSystem.promisedWriteFile = Promisify(FileSystem.writeFile)

export default FileSystem
