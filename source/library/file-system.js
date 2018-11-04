import IsNode from 'detect-node'
import Touch from 'touch'
import Utilities from 'util'

import Path from './path'
import Process from './process'

import ArgumentError from './errors/argument-error'

const FileSystem = Object.create(IsNode ? require('fs-extra') : {})

if (IsNode) {

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

  FileSystem.accessRequireSync = function (path, mode) {

    try {
      FileSystem.accessSync(path, mode)
      return require(path)
    }
    catch (error) {
      // OK
    }

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

  FileSystem.promisedAccess = Utilities.deprecate(FileSystem.access, 'FileSystem.promisedAccess( ... ) is deprecated. Use FileSystem.access( ... ) instead.')

  FileSystem.accessUnlink = Utilities.promisify(FileSystem.accessUnlink)
  FileSystem.promisedAccessUnlink = Utilities.deprecate(FileSystem.accessUnlink, 'FileSystem.promisedAccessUnlink( ... ) is deprecated. Use FileSystem.accessUnlink( ... ) instead.')

  FileSystem.accessRequire = Utilities.promisify(FileSystem.accessRequire)
  FileSystem.promisedAccessRequire = Utilities.deprecate(FileSystem.accessRequire, 'FileSystem.promisedAccessRequire( ... ) is deprecated. Use FileSystem.accessRequire( ... ) instead.')

  FileSystem.promisedCopy = Utilities.deprecate(FileSystem.copy, 'FileSystem.promisedCopy( ... ) is deprecated. Use FileSystem.copy( ... ) instead.')
  FileSystem.promisedMakeDir = Utilities.deprecate(FileSystem.mkdir, 'FileSystem.promisedMakeDir( ... ) is deprecated. Use FileSystem.mkdir( ... ) instead.')
  FileSystem.promisedReadDir = Utilities.deprecate(FileSystem.readdir, 'FileSystem.promisedReadDir( ... ) is deprecated. Use FileSystem.readdir( ... ) instead.')
  FileSystem.promisedReadFile = Utilities.deprecate(FileSystem.readFile, 'FileSystem.promisedReadFile( ... ) is deprecated. Use FileSystem.readFile( ... ) instead.')
  FileSystem.promisedRename = Utilities.deprecate(FileSystem.rename, 'FileSystem.promisedRename( ... ) is deprecated. Use FileSystem.rename( ... ) instead.') 
  FileSystem.promisedStat = Utilities.deprecate(FileSystem.stat, 'FileSystem.promisedStat( ... ) is deprecated. Use FileSystem.stat( ... ) instead.')

  FileSystem.touch = Utilities.promisify(FileSystem.touch)
  FileSystem.promisedTouch = Utilities.deprecate(FileSystem.touch, 'FileSystem.promisedTouch( ... ) is deprecated. Use FileSystem.touch( ... ) instead.')

  FileSystem.promisedUnlink = Utilities.deprecate(FileSystem.unlink, 'FileSystem.promisedUnlink( ... ) is deprecated. Use FileSystem.unlink( ... ) instead.')
  FileSystem.promisedWriteFile = Utilities.deprecate(FileSystem.writeFile, 'FileSystem.promisedWriteFile( ... ) is deprecated. Use FileSystem.writeFile( ... ) instead.')

}

export default FileSystem
