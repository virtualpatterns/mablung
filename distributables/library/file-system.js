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

FileSystem.Promise = {};
FileSystem.Promise.access = (0, _es6Promisify2.default)(FileSystem.access);
FileSystem.Promise.accessUnlink = (0, _es6Promisify2.default)(FileSystem.accessUnlink);
FileSystem.Promise.mkdirp = (0, _es6Promisify2.default)(FileSystem.mkdirp);
FileSystem.Promise.readFile = (0, _es6Promisify2.default)(FileSystem.readFile);
FileSystem.Promise.touch = (0, _es6Promisify2.default)(FileSystem.touch);
FileSystem.Promise.unlink = (0, _es6Promisify2.default)(FileSystem.unlink);
FileSystem.Promise.writeFile = (0, _es6Promisify2.default)(FileSystem.writeFile);

exports.default = FileSystem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L2ZpbGUtc3lzdGVtLmpzIl0sIm5hbWVzIjpbIkZpbGVTeXN0ZW0iLCJPYmplY3QiLCJjcmVhdGUiLCJta2RpcnAiLCJ0b3VjaCIsImFjY2Vzc1VubGluayIsInBhdGgiLCJtb2RlIiwiY2FsbGJhY2siLCJhY2Nlc3MiLCJlcnJvciIsInVubGluayIsIndoZW5GaWxlRXhpc3RzIiwidGltZW91dCIsIm1heGltdW1EdXJhdGlvbiIsIndoZW4iLCJGX09LIiwid2hlbkZpbGVOb3RFeGlzdHMiLCJ0cmltIiwiUHJvbWlzZSIsInJlYWRGaWxlIiwid3JpdGVGaWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsYUFBYUMsT0FBT0MsTUFBUCxjQUFuQjs7QUFFQUYsV0FBV0csTUFBWDtBQUNBSCxXQUFXSSxLQUFYOztBQUVBSixXQUFXSyxZQUFYLEdBQTBCLFVBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCQyxRQUF0QixFQUFnQztBQUN4RFIsYUFBV1MsTUFBWCxDQUFrQkgsSUFBbEIsRUFBd0JDLElBQXhCLEVBQThCLFVBQUNHLEtBQUQsRUFBVztBQUN2QyxRQUFJQSxLQUFKLEVBQVc7QUFDVEY7QUFDRCxLQUZELE1BRU87QUFDTFIsaUJBQVdXLE1BQVgsQ0FBa0JMLElBQWxCLEVBQXdCRSxRQUF4QjtBQUNEO0FBQ0YsR0FORDtBQU9ELENBUkQ7O0FBVUFSLFdBQVdZLGNBQVgsR0FBNEIsVUFBVUMsT0FBVixFQUFtQkMsZUFBbkIsRUFBb0NSLElBQXBDLEVBQTBDOztBQUVwRTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsU0FBTyxrQkFBUVMsSUFBUixDQUFhRixPQUFiLEVBQXNCQyxlQUF0QixFQUF1QyxVQUFDTixRQUFEO0FBQUEsV0FBY1IsV0FBV1MsTUFBWCxDQUFrQkgsSUFBbEIsRUFBd0JOLFdBQVdnQixJQUFuQyxFQUF5Q1IsUUFBekMsQ0FBZDtBQUFBLEdBQXZDLENBQVA7QUFFRCxDQVpEOztBQWNBUixXQUFXaUIsaUJBQVgsR0FBK0IsVUFBVUosT0FBVixFQUFtQkMsZUFBbkIsRUFBb0NSLElBQXBDLEVBQTBDOztBQUV2RTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBTyxrQkFBUVMsSUFBUixDQUFhRixPQUFiLEVBQXNCQyxlQUF0QixFQUF1QyxVQUFDTixRQUFELEVBQWM7QUFDMURSLGVBQVdTLE1BQVgsQ0FBa0JILElBQWxCLEVBQXdCTixXQUFXZ0IsSUFBbkMsRUFBeUMsVUFBQ04sS0FBRCxFQUFXO0FBQ2xELFVBQUlBLEtBQUosRUFBVztBQUNURjtBQUNELE9BRkQsTUFFTztBQUNMQSxpQkFBUyw0Q0FBK0IsZUFBS1UsSUFBTCxDQUFVWixJQUFWLENBQS9CLGdCQUFUO0FBQ0Q7QUFDRixLQU5EO0FBT0QsR0FSTSxDQUFQO0FBVUQsQ0FsQkQ7O0FBb0JBTixXQUFXbUIsT0FBWCxHQUFxQixFQUFyQjtBQUNBbkIsV0FBV21CLE9BQVgsQ0FBbUJWLE1BQW5CLEdBQTRCLDRCQUFVVCxXQUFXUyxNQUFyQixDQUE1QjtBQUNBVCxXQUFXbUIsT0FBWCxDQUFtQmQsWUFBbkIsR0FBa0MsNEJBQVVMLFdBQVdLLFlBQXJCLENBQWxDO0FBQ0FMLFdBQVdtQixPQUFYLENBQW1CaEIsTUFBbkIsR0FBNEIsNEJBQVVILFdBQVdHLE1BQXJCLENBQTVCO0FBQ0FILFdBQVdtQixPQUFYLENBQW1CQyxRQUFuQixHQUE4Qiw0QkFBVXBCLFdBQVdvQixRQUFyQixDQUE5QjtBQUNBcEIsV0FBV21CLE9BQVgsQ0FBbUJmLEtBQW5CLEdBQTJCLDRCQUFVSixXQUFXSSxLQUFyQixDQUEzQjtBQUNBSixXQUFXbUIsT0FBWCxDQUFtQlIsTUFBbkIsR0FBNEIsNEJBQVVYLFdBQVdXLE1BQXJCLENBQTVCO0FBQ0FYLFdBQVdtQixPQUFYLENBQW1CRSxTQUFuQixHQUErQiw0QkFBVXJCLFdBQVdxQixTQUFyQixDQUEvQjs7a0JBRWVyQixVIiwiZmlsZSI6ImZpbGUtc3lzdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpcmVjdG9yeSBmcm9tICdta2RpcnAnXG5pbXBvcnQgX0ZpbGVTeXN0ZW0gZnJvbSAnZnMnXG5pbXBvcnQgUHJvbWlzaWZ5IGZyb20gJ2VzNi1wcm9taXNpZnknXG5pbXBvcnQgVG91Y2ggZnJvbSAndG91Y2gnXG5cbmltcG9ydCBQYXRoIGZyb20gJy4vcGF0aCdcbmltcG9ydCBQcm9jZXNzIGZyb20gJy4vcHJvY2VzcydcblxuaW1wb3J0IEFyZ3VtZW50RXJyb3IgZnJvbSAnLi9lcnJvcnMvYXJndW1lbnQtZXJyb3InXG5cbmNvbnN0IEZpbGVTeXN0ZW0gPSBPYmplY3QuY3JlYXRlKF9GaWxlU3lzdGVtKVxuXG5GaWxlU3lzdGVtLm1rZGlycCA9IERpcmVjdG9yeVxuRmlsZVN5c3RlbS50b3VjaCA9IFRvdWNoXG5cbkZpbGVTeXN0ZW0uYWNjZXNzVW5saW5rID0gZnVuY3Rpb24gKHBhdGgsIG1vZGUsIGNhbGxiYWNrKSB7XG4gIEZpbGVTeXN0ZW0uYWNjZXNzKHBhdGgsIG1vZGUsIChlcnJvcikgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgY2FsbGJhY2soKVxuICAgIH0gZWxzZSB7XG4gICAgICBGaWxlU3lzdGVtLnVubGluayhwYXRoLCBjYWxsYmFjaylcbiAgICB9XG4gIH0pXG59XG5cbkZpbGVTeXN0ZW0ud2hlbkZpbGVFeGlzdHMgPSBmdW5jdGlvbiAodGltZW91dCwgbWF4aW11bUR1cmF0aW9uLCBwYXRoKSB7XG5cbiAgLy8gY29uc3QgTG9nID0gcmVxdWlyZSgnLi9sb2cnKS5Mb2dcbiAgLy8gY29uc3QgUGF0aCA9IHJlcXVpcmUoJy4vcGF0aCcpXG4gIC8vIGNvbnN0IFByb2Nlc3MgPSByZXF1aXJlKCcuL3Byb2Nlc3MnKVxuXG4gIC8vIGNvbnNvbGUubG9nKGBQYXRoLnRyaW09JHtQYXRoLnRyaW19YCkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbiAgLy8gTG9nLmRlYnVnKGBGaWxlU3lzdGVtLndoZW5GaWxlRXhpc3RzKCR7dGltZW91dH0sICR7bWF4aW11bUR1cmF0aW9ufSwgJyR7UGF0aC50cmltKHBhdGgpfScpIHsgLi4uIH1gKVxuXG4gIHJldHVybiBQcm9jZXNzLndoZW4odGltZW91dCwgbWF4aW11bUR1cmF0aW9uLCAoY2FsbGJhY2spID0+IEZpbGVTeXN0ZW0uYWNjZXNzKHBhdGgsIEZpbGVTeXN0ZW0uRl9PSywgY2FsbGJhY2spKVxuXG59XG5cbkZpbGVTeXN0ZW0ud2hlbkZpbGVOb3RFeGlzdHMgPSBmdW5jdGlvbiAodGltZW91dCwgbWF4aW11bUR1cmF0aW9uLCBwYXRoKSB7XG5cbiAgLy8gY29uc3QgTG9nID0gcmVxdWlyZSgnLi9sb2cnKS5Mb2dcbiAgLy8gY29uc3QgUGF0aCA9IHJlcXVpcmUoJy4vcGF0aCcpXG4gIC8vIGNvbnN0IFByb2Nlc3MgPSByZXF1aXJlKCcuL3Byb2Nlc3MnKVxuXG4gIC8vIExvZy5kZWJ1ZyhgRmlsZVN5c3RlbS53aGVuRmlsZU5vdEV4aXN0cygke3RpbWVvdXR9LCAke21heGltdW1EdXJhdGlvbn0sICcke1BhdGgudHJpbShwYXRoKX0nKSB7IC4uLiB9YClcblxuICByZXR1cm4gUHJvY2Vzcy53aGVuKHRpbWVvdXQsIG1heGltdW1EdXJhdGlvbiwgKGNhbGxiYWNrKSA9PiB7XG4gICAgRmlsZVN5c3RlbS5hY2Nlc3MocGF0aCwgRmlsZVN5c3RlbS5GX09LLCAoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhuZXcgQXJndW1lbnRFcnJvcihgVGhlIGZpbGUgJyR7UGF0aC50cmltKHBhdGgpfScgZXhpc3RzLmApKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbn1cblxuRmlsZVN5c3RlbS5Qcm9taXNlID0ge31cbkZpbGVTeXN0ZW0uUHJvbWlzZS5hY2Nlc3MgPSBQcm9taXNpZnkoRmlsZVN5c3RlbS5hY2Nlc3MpXG5GaWxlU3lzdGVtLlByb21pc2UuYWNjZXNzVW5saW5rID0gUHJvbWlzaWZ5KEZpbGVTeXN0ZW0uYWNjZXNzVW5saW5rKVxuRmlsZVN5c3RlbS5Qcm9taXNlLm1rZGlycCA9IFByb21pc2lmeShGaWxlU3lzdGVtLm1rZGlycClcbkZpbGVTeXN0ZW0uUHJvbWlzZS5yZWFkRmlsZSA9IFByb21pc2lmeShGaWxlU3lzdGVtLnJlYWRGaWxlKVxuRmlsZVN5c3RlbS5Qcm9taXNlLnRvdWNoID0gUHJvbWlzaWZ5KEZpbGVTeXN0ZW0udG91Y2gpXG5GaWxlU3lzdGVtLlByb21pc2UudW5saW5rID0gUHJvbWlzaWZ5KEZpbGVTeXN0ZW0udW5saW5rKVxuRmlsZVN5c3RlbS5Qcm9taXNlLndyaXRlRmlsZSA9IFByb21pc2lmeShGaWxlU3lzdGVtLndyaXRlRmlsZSlcblxuZXhwb3J0IGRlZmF1bHQgRmlsZVN5c3RlbVxuIl19