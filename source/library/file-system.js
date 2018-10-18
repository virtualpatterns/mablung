import _FileSystem from 'fs'
import IsNode from 'detect-node'
import Touch from 'touch'
import Utilities from 'util'

import Path from './path'
import Process from './process'

import ArgumentError from './errors/argument-error'

const FileSystem = Object.create(_FileSystem)

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

if (IsNode) {

  FileSystem.promisedAccess = Utilities.promisify ? Utilities.promisify(FileSystem.access) : null
  FileSystem.promisedAccessUnlink = Utilities.promisify ? Utilities.promisify(FileSystem.accessUnlink) : null
  FileSystem.promisedMakeDir = Utilities.promisify ? Utilities.promisify(FileSystem.mkdir) : null
  FileSystem.promisedReadDir = Utilities.promisify ? Utilities.promisify(FileSystem.readdir) : null
  FileSystem.promisedReadFile = Utilities.promisify ? Utilities.promisify(FileSystem.readFile) : null
  FileSystem.promisedTouch = Utilities.promisify ? Utilities.promisify(FileSystem.touch) : null
  FileSystem.promisedUnlink = Utilities.promisify ? Utilities.promisify(FileSystem.unlink) : null
  FileSystem.promisedWriteFile = Utilities.promisify ? Utilities.promisify(FileSystem.writeFile) : null

}

export default FileSystem
