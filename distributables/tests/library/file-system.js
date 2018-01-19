'use strict';

var _fileSystem = require('../../library/file-system');

var _fileSystem2 = _interopRequireDefault(_fileSystem);

var _log = require('../../library/log');

var _path = require('../../library/path');

var _path2 = _interopRequireDefault(_path);

var _process = require('../../library/process');

var _process2 = _interopRequireDefault(_process);

var _testError = require('../errors/test-error');

var _testError2 = _interopRequireDefault(_testError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var FILE_PATH = _process2.default.env.HOME + '/Library/Logs/mablung/mablung.tests.out';

describe('FileSystem', function () {

  describe('accessUnlink', function () {

    describe('(when a file exists)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _fileSystem2.default.Promise.access(FILE_PATH, _fileSystem2.default.F_OK);

              case 3:
                _context.next = 5;
                return _fileSystem2.default.Promise.unlink(FILE_PATH);

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                _log.Log.error(_context.t0);

              case 10:
                _context.next = 12;
                return _fileSystem2.default.Promise.writeFile(FILE_PATH, _process2.default.pid, { 'encoding': 'utf-8' });

              case 12:
                _context.next = 14;
                return _fileSystem2.default.Promise.accessUnlink(FILE_PATH, _fileSystem2.default.F_OK);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[0, 7]]);
      })));

      it('should delete a file', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _fileSystem2.default.Promise.access(FILE_PATH, _fileSystem2.default.F_OK);

              case 3:
                throw new _testError2.default('The file \'' + _path2.default.trim(FILE_PATH) + '\' exists.');

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);

                if (!(_context2.t0 instanceof _testError2.default)) {
                  _context2.next = 12;
                  break;
                }

                throw _context2.t0;

              case 12:
                _log.Log.error(_context2.t0);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[0, 6]]);
      })));
    });

    describe('(when a file doesn\'t exist)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _fileSystem2.default.Promise.access(FILE_PATH, _fileSystem2.default.F_OK);

              case 3:
                _context3.next = 5;
                return _fileSystem2.default.Promise.unlink(FILE_PATH);

              case 5:
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);

                _log.Log.error(_context3.t0);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined, [[0, 7]]);
      })));

      it('should succeed', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _fileSystem2.default.Promise.accessUnlink(FILE_PATH, _fileSystem2.default.F_OK);

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      })));
    });
  });

  describe('whenFileExists', function () {

    describe('(when a file exists)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _fileSystem2.default.Promise.accessUnlink(FILE_PATH, _fileSystem2.default.F_OK);

              case 3:
                _context5.next = 8;
                break;

              case 5:
                _context5.prev = 5;
                _context5.t0 = _context5['catch'](0);

                _log.Log.error(_context5.t0);

              case 8:
                _context5.next = 10;
                return _fileSystem2.default.Promise.writeFile(FILE_PATH, _process2.default.pid, {
                  encoding: 'utf-8'
                });

              case 10:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined, [[0, 5]]);
      })));

      it('should resolve', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _fileSystem2.default.whenFileExists(250, 1000, FILE_PATH);

              case 2:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      })));

      after(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _fileSystem2.default.Promise.unlink(FILE_PATH);

              case 2:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      })));
    });

    describe('(when a file doesn\'t exist)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return _fileSystem2.default.Promise.accessUnlink(FILE_PATH, _fileSystem2.default.F_OK);

              case 3:
                _context8.next = 8;
                break;

              case 5:
                _context8.prev = 5;
                _context8.t0 = _context8['catch'](0);

                _log.Log.error(_context8.t0);

              case 8:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined, [[0, 5]]);
      })));

      it('should reject', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _fileSystem2.default.whenFileExists(250, 1000, FILE_PATH);

              case 3:
                throw new _testError2.default('The file \'' + _path2.default.trim(FILE_PATH) + '\' doesn\'t exist.');

              case 6:
                _context9.prev = 6;
                _context9.t0 = _context9['catch'](0);

                if (!(_context9.t0 instanceof _testError2.default)) {
                  _context9.next = 12;
                  break;
                }

                throw _context9.t0;

              case 12:
                _log.Log.error(_context9.t0);

              case 13:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined, [[0, 6]]);
      })));
    });
  });

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
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS90ZXN0cy9saWJyYXJ5L2ZpbGUtc3lzdGVtLmpzIl0sIm5hbWVzIjpbIkZJTEVfUEFUSCIsImVudiIsIkhPTUUiLCJkZXNjcmliZSIsImJlZm9yZSIsIlByb21pc2UiLCJhY2Nlc3MiLCJGX09LIiwidW5saW5rIiwiZXJyb3IiLCJ3cml0ZUZpbGUiLCJwaWQiLCJhY2Nlc3NVbmxpbmsiLCJpdCIsInRyaW0iLCJlbmNvZGluZyIsIndoZW5GaWxlRXhpc3RzIiwiYWZ0ZXIiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBZSxrQkFBUUMsR0FBUixDQUFZQyxJQUEzQiw0Q0FBTjs7QUFFQUMsU0FBUyxZQUFULEVBQXVCLFlBQU07O0FBRTNCQSxXQUFTLGNBQVQsRUFBeUIsWUFBTTs7QUFFN0JBLGFBQVMsc0JBQVQsRUFBaUMsWUFBTTs7QUFFckNDLHFFQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBR0cscUJBQVdDLE9BQVgsQ0FBbUJDLE1BQW5CLENBQTBCTixTQUExQixFQUFxQyxxQkFBV08sSUFBaEQsQ0FISDs7QUFBQTtBQUFBO0FBQUEsdUJBSUcscUJBQVdGLE9BQVgsQ0FBbUJHLE1BQW5CLENBQTBCUixTQUExQixDQUpIOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBTUgseUJBQUlTLEtBQUo7O0FBTkc7QUFBQTtBQUFBLHVCQVNDLHFCQUFXSixPQUFYLENBQW1CSyxTQUFuQixDQUE2QlYsU0FBN0IsRUFBd0Msa0JBQVFXLEdBQWhELEVBQXFELEVBQUUsWUFBWSxPQUFkLEVBQXJELENBVEQ7O0FBQUE7QUFBQTtBQUFBLHVCQVVDLHFCQUFXTixPQUFYLENBQW1CTyxZQUFuQixDQUFnQ1osU0FBaEMsRUFBMkMscUJBQVdPLElBQXRELENBVkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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QUE7QUFBQSx1QkFHVixxQkFBV0csY0FBWCxDQUEwQixHQUExQixFQUErQixJQUEvQixFQUFxQ2hCLFNBQXJDLENBSFU7O0FBQUE7QUFBQSxzQkFJVix3Q0FBMkIsZUFBS2MsSUFBTCxDQUFVZCxTQUFWLENBQTNCLHdCQUpVOztBQUFBO0FBQUE7QUFBQTs7QUFBQSxzQkFNWiwyQ0FOWTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQVNkLHlCQUFJUyxLQUFKOztBQVRjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQXBCO0FBZUQsS0EzQkQ7QUE2QkQsR0F6REQ7O0FBMkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUQsQ0FqS0QiLCJmaWxlIjoiZmlsZS1zeXN0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmlsZVN5c3RlbSBmcm9tICcuLi8uLi9saWJyYXJ5L2ZpbGUtc3lzdGVtJ1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi4vLi4vbGlicmFyeS9sb2cnXG5pbXBvcnQgUGF0aCBmcm9tICcuLi8uLi9saWJyYXJ5L3BhdGgnXG5pbXBvcnQgUHJvY2VzcyBmcm9tICcuLi8uLi9saWJyYXJ5L3Byb2Nlc3MnXG5cbmltcG9ydCBUZXN0RXJyb3IgZnJvbSAnLi4vZXJyb3JzL3Rlc3QtZXJyb3InXG5cbmNvbnN0IEZJTEVfUEFUSCA9IGAke1Byb2Nlc3MuZW52LkhPTUV9L0xpYnJhcnkvTG9ncy9tYWJsdW5nL21hYmx1bmcudGVzdHMub3V0YFxuXG5kZXNjcmliZSgnRmlsZVN5c3RlbScsICgpID0+IHtcblxuICBkZXNjcmliZSgnYWNjZXNzVW5saW5rJywgKCkgPT4ge1xuXG4gICAgZGVzY3JpYmUoJyh3aGVuIGEgZmlsZSBleGlzdHMpJywgKCkgPT4ge1xuXG4gICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgRmlsZVN5c3RlbS5Qcm9taXNlLmFjY2VzcyhGSUxFX1BBVEgsIEZpbGVTeXN0ZW0uRl9PSylcbiAgICAgICAgICBhd2FpdCBGaWxlU3lzdGVtLlByb21pc2UudW5saW5rKEZJTEVfUEFUSClcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBMb2cuZXJyb3IoZXJyb3IpXG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBGaWxlU3lzdGVtLlByb21pc2Uud3JpdGVGaWxlKEZJTEVfUEFUSCwgUHJvY2Vzcy5waWQsIHsgJ2VuY29kaW5nJzogJ3V0Zi04JyB9KVxuICAgICAgICBhd2FpdCBGaWxlU3lzdGVtLlByb21pc2UuYWNjZXNzVW5saW5rKEZJTEVfUEFUSCwgRmlsZVN5c3RlbS5GX09LKVxuXG4gICAgICB9KVxuXG4gICAgICBpdCgnc2hvdWxkIGRlbGV0ZSBhIGZpbGUnLCBhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBGaWxlU3lzdGVtLlByb21pc2UuYWNjZXNzKEZJTEVfUEFUSCwgRmlsZVN5c3RlbS5GX09LKVxuICAgICAgICAgIHRocm93IG5ldyBUZXN0RXJyb3IoYFRoZSBmaWxlICcke1BhdGgudHJpbShGSUxFX1BBVEgpfScgZXhpc3RzLmApXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgVGVzdEVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0pXG5cbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJyh3aGVuIGEgZmlsZSBkb2VzblxcJ3QgZXhpc3QpJywgKCkgPT4ge1xuXG4gICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgRmlsZVN5c3RlbS5Qcm9taXNlLmFjY2VzcyhGSUxFX1BBVEgsIEZpbGVTeXN0ZW0uRl9PSylcbiAgICAgICAgICBhd2FpdCBGaWxlU3lzdGVtLlByb21pc2UudW5saW5rKEZJTEVfUEFUSClcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBMb2cuZXJyb3IoZXJyb3IpXG4gICAgICAgIH1cblxuICAgICAgfSlcblxuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBGaWxlU3lzdGVtLlByb21pc2UuYWNjZXNzVW5saW5rKEZJTEVfUEFUSCwgRmlsZVN5c3RlbS5GX09LKVxuICAgICAgfSlcblxuICAgIH0pXG5cbiAgfSlcblxuICBkZXNjcmliZSgnd2hlbkZpbGVFeGlzdHMnLCAoKSA9PiB7XG5cbiAgICBkZXNjcmliZSgnKHdoZW4gYSBmaWxlIGV4aXN0cyknLCAoKSA9PiB7XG5cbiAgICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBGaWxlU3lzdGVtLlByb21pc2UuYWNjZXNzVW5saW5rKEZJTEVfUEFUSCwgRmlsZVN5c3RlbS5GX09LKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIExvZy5lcnJvcihlcnJvcilcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IEZpbGVTeXN0ZW0uUHJvbWlzZS53cml0ZUZpbGUoRklMRV9QQVRILCBQcm9jZXNzLnBpZCwge1xuICAgICAgICAgIGVuY29kaW5nOiAndXRmLTgnXG4gICAgICAgIH0pXG5cbiAgICAgIH0pXG5cbiAgICAgIGl0KCdzaG91bGQgcmVzb2x2ZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgRmlsZVN5c3RlbS53aGVuRmlsZUV4aXN0cygyNTAsIDEwMDAsIEZJTEVfUEFUSClcbiAgICAgIH0pXG5cbiAgICAgIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgRmlsZVN5c3RlbS5Qcm9taXNlLnVubGluayhGSUxFX1BBVEgpXG4gICAgICB9KVxuXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCcod2hlbiBhIGZpbGUgZG9lc25cXCd0IGV4aXN0KScsICgpID0+IHtcblxuICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IEZpbGVTeXN0ZW0uUHJvbWlzZS5hY2Nlc3NVbmxpbmsoRklMRV9QQVRILCBGaWxlU3lzdGVtLkZfT0spXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgTG9nLmVycm9yKGVycm9yKVxuICAgICAgICB9XG5cbiAgICAgIH0pXG5cbiAgICAgIGl0KCdzaG91bGQgcmVqZWN0JywgYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgRmlsZVN5c3RlbS53aGVuRmlsZUV4aXN0cygyNTAsIDEwMDAsIEZJTEVfUEFUSClcbiAgICAgICAgICB0aHJvdyBuZXcgVGVzdEVycm9yKGBUaGUgZmlsZSAnJHtQYXRoLnRyaW0oRklMRV9QQVRIKX0nIGRvZXNuJ3QgZXhpc3QuYClcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBUZXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIExvZy5lcnJvcihlcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfSlcblxuICAgIH0pXG5cbiAgfSlcblxuICAvLyBkZXNjcmliZSgnd2hlbkZpbGVOb3RFeGlzdHMnLCAoKSA9PiB7XG4gIC8vXG4gIC8vICAgZGVzY3JpYmUoJyh3aGVuIGEgZmlsZSBkb2VzblxcJ3QgZXhpc3QpJywgKCkgPT4ge1xuICAvL1xuICAvLyAgICAgYmVmb3JlKChjYWxsYmFjaykgPT4ge1xuICAvLyAgICAgICBGaWxlU3lzdGVtLmFjY2Vzc1VubGluayhGSUxFX1BBVEgsIEZpbGVTeXN0ZW0uRl9PSywgY2FsbGJhY2spXG4gIC8vICAgICB9KVxuICAvL1xuICAvLyAgICAgaXQoJ3Nob3VsZCByZXNvbHZlIHRoZSBwcm9taXNlJywgKGNhbGxiYWNrKSA9PiB7XG4gIC8vICAgICAgIEZpbGVTeXN0ZW0ud2hlbkZpbGVOb3RFeGlzdHMoMjUwLCAxMDAwLCBGSUxFX1BBVEgpXG4gIC8vICAgICAgICAgLnRoZW4oKCkgPT4gY2FsbGJhY2soKSlcbiAgLy8gICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjYWxsYmFjayhlcnJvcikpXG4gIC8vICAgICB9KVxuICAvL1xuICAvLyAgIH0pXG4gIC8vXG4gIC8vICAgZGVzY3JpYmUoJyh3aGVuIGEgZmlsZSBleGlzdHMpJywgKCkgPT4ge1xuICAvL1xuICAvLyAgICAgYmVmb3JlKChjYWxsYmFjaykgPT4ge1xuICAvL1xuICAvLyAgICAgICBQcm9taXNlLnJlc29sdmUoKVxuICAvLyAgICAgICAgIC50aGVuKCgpID0+IEZpbGVTeXN0ZW0uUHJvbWlzZS5hY2Nlc3NVbmxpbmsoRklMRV9QQVRILCBGaWxlU3lzdGVtLkZfT0spKVxuICAvLyAgICAgICAgIC50aGVuKCgpID0+IEZpbGVTeXN0ZW0uUHJvbWlzZS53cml0ZUZpbGUoRklMRV9QQVRILCBQcm9jZXNzLnBpZCwge1xuICAvLyAgICAgICAgICAgZW5jb2Rpbmc6ICd1dGYtOCdcbiAgLy8gICAgICAgICB9KSlcbiAgLy8gICAgICAgICAudGhlbigoKSA9PiBjYWxsYmFjaygpKVxuICAvLyAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNhbGxiYWNrKGVycm9yKSlcbiAgLy9cbiAgLy8gICAgIH0pXG4gIC8vXG4gIC8vICAgICBpdCgnc2hvdWxkIHJlamVjdCB0aGUgcHJvbWlzZScsIChjYWxsYmFjaykgPT4ge1xuICAvLyAgICAgICBGaWxlU3lzdGVtLndoZW5GaWxlTm90RXhpc3RzKDI1MCwgMTAwMCwgRklMRV9QQVRIKVxuICAvLyAgICAgICAgIC50aGVuKCgpID0+IGNhbGxiYWNrKG5ldyBFcnJvcihgVGhlIGZpbGUgJHtQYXRoLnRyaW0oRklMRV9QQVRIKX0gZG9lc24ndCBleGlzdC5gKSkpXG4gIC8vICAgICAgICAgLmNhdGNoKCgpID0+IGNhbGxiYWNrKCkpXG4gIC8vICAgICB9KVxuICAvL1xuICAvLyAgICAgYWZ0ZXIoKGNhbGxiYWNrKSA9PiB7XG4gIC8vICAgICAgIEZpbGVTeXN0ZW0uYWNjZXNzVW5saW5rKEZJTEVfUEFUSCwgRmlsZVN5c3RlbS5GX09LLCBjYWxsYmFjaylcbiAgLy8gICAgIH0pXG4gIC8vXG4gIC8vICAgfSlcbiAgLy9cbiAgLy8gfSlcblxufSlcbiJdfQ==