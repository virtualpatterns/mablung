'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _es6Promisify = require('es6-promisify');

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _touch = require('touch');

var _touch2 = _interopRequireDefault(_touch);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _process = require('./process');

var _process2 = _interopRequireDefault(_process);

var _argumentError = require('./errors/argument-error');

var _argumentError2 = _interopRequireDefault(_argumentError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileSystem = Object.create(_fs2.default);

FileSystem.mkdirp = _mkdirp2.default;
FileSystem.touch = _touch2.default;

FileSystem.accessUnlink = function (path, mode, callback) {
  FileSystem.access(path, mode, function (error) {
    if (error) {
      callback();
    } else {
      FileSystem.unlink(path, callback);
    }
  });
};

FileSystem.whenFileExists = function (timeout, maximumDuration, path) {

  // const Log = require('./log').Log
  // const Path = require('./path')
  // const Process = require('./process')

  // console.log(`Path.trim=${Path.trim}`) // eslint-disable-line no-console

  // Log.debug(`FileSystem.whenFileExists(${timeout}, ${maximumDuration}, '${Path.trim(path)}') { ... }`)

  return _process2.default.when(timeout, maximumDuration, function (callback) {
    return FileSystem.access(path, FileSystem.F_OK, callback);
  });
};

FileSystem.whenFileNotExists = function (timeout, maximumDuration, path) {

  // const Log = require('./log').Log
  // const Path = require('./path')
  // const Process = require('./process')

  // Log.debug(`FileSystem.whenFileNotExists(${timeout}, ${maximumDuration}, '${Path.trim(path)}') { ... }`)

  return _process2.default.when(timeout, maximumDuration, function (callback) {
    FileSystem.access(path, FileSystem.F_OK, function (error) {
      if (error) {
        callback();
      } else {
        callback(new _argumentError2.default('The file \'' + _path2.default.trim(path) + '\' exists.'));
      }
    });
  });
};

FileSystem.promisedAccess = (0, _es6Promisify2.default)(FileSystem.access);
FileSystem.promisedAccessUnlink = (0, _es6Promisify2.default)(FileSystem.accessUnlink);
FileSystem.promisedMkdirP = (0, _es6Promisify2.default)(FileSystem.mkdirp);
FileSystem.promisedReadFile = (0, _es6Promisify2.default)(FileSystem.readFile);
FileSystem.promisedTouch = (0, _es6Promisify2.default)(FileSystem.touch);
FileSystem.promisedUnlink = (0, _es6Promisify2.default)(FileSystem.unlink);
FileSystem.promisedWriteFile = (0, _es6Promisify2.default)(FileSystem.writeFile);

exports.default = FileSystem;
//# sourceMappingURL=file-system.js.map