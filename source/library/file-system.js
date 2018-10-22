import _FileSystem from 'fs'
import IsNode from 'detect-node'
import Copy from 'ncp'
import Touch from 'touch'
import Utilities from 'util'

import Path from './path'
import Process from './process'

import ArgumentError from './errors/argument-error'

const FileSystem = Object.create(_FileSystem)

FileSystem.copy = Copy
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

  FileSystem.promisedAccess = Utilities.promisify(FileSystem.access)
  FileSystem.promisedAccessUnlink = Utilities.promisify(FileSystem.accessUnlink)
  FileSystem.promisedCopy = Utilities.promisify(FileSystem.copy)
  FileSystem.promisedMakeDir = Utilities.promisify(FileSystem.mkdir)
  FileSystem.promisedReadDir = Utilities.promisify(FileSystem.readdir)
  FileSystem.promisedReadFile = Utilities.promisify(FileSystem.readFile)
  FileSystem.promisedStat = Utilities.promisify(FileSystem.stat)
  FileSystem.promisedTouch = Utilities.promisify(FileSystem.touch)
  FileSystem.promisedUnlink = Utilities.promisify(FileSystem.unlink)
  FileSystem.promisedWriteFile = Utilities.promisify(FileSystem.writeFile)

}

export default FileSystem
