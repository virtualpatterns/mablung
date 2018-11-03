// import _FileSystem from 'fs'
// import _FileSystem from 'fs-extra'
import IsNode from 'detect-node'
// import Copy from 'ncp'
import Touch from 'touch'
import Utilities from 'util'

import Path from './path'
import Process from './process'

import ArgumentError from './errors/argument-error'

const FileSystem = Object.create(IsNode ? require('fs-extra') : {})

if (IsNode) {

  // FileSystem.copy = Copy
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

  FileSystem.accessRequire = function (path, mode, callback) {
    FileSystem.access(path, mode, (error) => {
      if (error) {
        callback()
      } else {
        callback(undefined, require(path))
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

  FileSystem.promisedAccess = FileSystem.access // Utilities.promisify(FileSystem.access)
  FileSystem.promisedAccessUnlink = Utilities.promisify(FileSystem.accessUnlink)
  FileSystem.promisedAccessRequire = Utilities.promisify(FileSystem.accessRequire)
  FileSystem.promisedCopy = FileSystem.copy // Utilities.promisify(FileSystem.copy)
  FileSystem.promisedMakeDir = FileSystem.mkdir // Utilities.promisify(FileSystem.mkdir)
  FileSystem.promisedReadDir = FileSystem.readdir // Utilities.promisify(FileSystem.readdir)
  FileSystem.promisedReadFile = FileSystem.readFile // Utilities.promisify(FileSystem.readFile)
  FileSystem.promisedRename = FileSystem.rename // Utilities.promisify(FileSystem.rename)
  FileSystem.promisedStat = FileSystem.stat // Utilities.promisify(FileSystem.stat)
  FileSystem.promisedTouch = Utilities.promisify(FileSystem.touch)
  FileSystem.promisedUnlink = FileSystem.unlink // Utilities.promisify(FileSystem.unlink)
  FileSystem.promisedWriteFile = FileSystem.writeFile // Utilities.promisify(FileSystem.writeFile)

}

export default FileSystem
