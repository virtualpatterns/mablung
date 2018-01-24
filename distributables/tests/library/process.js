'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _configuration = require('../../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _index = require('../../index');

var _argumentError = require('../../library/errors/argument-error');

var _argumentError2 = _interopRequireDefault(_argumentError);

var _testError = require('../errors/test-error');

var _testError2 = _interopRequireDefault(_testError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('process', function () {

  describe('when', function () {

    describe('(when a test succeeds)', function () {

      it('should resolve', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _index.Process.when(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration, function (callback) {
                  return callback();
                });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      })));
    });

    describe('(when a test fails)', function () {

      it('should reject', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _index.Process.when(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration, function (callback) {
                  return callback(new Error());
                });

              case 3:
                throw new _testError2.default();

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);

                if (!(_context2.t0 instanceof _testError2.default)) {
                  _context2.next = 10;
                  break;
                }

                throw _context2.t0;

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[0, 6]]);
      })));
    });
  });

  describe('existsPID', function () {

    describe('(return true)', function () {

      describe('(when the file exists and contains a valid pid)', function () {

        before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.pidPath, _index.FileSystem.F_OK);

                case 2:
                  _context3.next = 4;
                  return _index.FileSystem.promisedWriteFile(_configuration2.default.tests.pidPath, _index.Process.pid, { 'encoding': 'utf-8' });

                case 4:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        })));

        it('should return true', function () {
          _assert2.default.equal(_index.Process.existsPID(_configuration2.default.tests.pidPath), true);
        });

        after(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _index.FileSystem.promisedUnlink(_configuration2.default.tests.pidPath);

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        })));
      });
    });

    describe('(return false)', function () {

      describe('(when the file doesn\'t exist)', function () {

        before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.pidPath, _index.FileSystem.F_OK);

                case 2:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, undefined);
        })));

        it('should return false', function () {
          _assert2.default.equal(_index.Process.existsPID(_configuration2.default.tests.pidPath), false);
        });
      });

      describe('(when the file exists and contains an invalid pid)', function () {

        before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.pidPath, _index.FileSystem.F_OK);

                case 2:
                  _context6.next = 4;
                  return _index.FileSystem.promisedWriteFile(_configuration2.default.tests.pidPath, 2 ^ 16, { 'encoding': 'utf-8' });

                case 4:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, undefined);
        })));

        it('should return false', function () {
          _assert2.default.equal(_index.Process.existsPID(_configuration2.default.tests.pidPath), false);
        });
      });

      describe('(when the file contains an invalid pid)', function () {

        before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.pidPath, _index.FileSystem.F_OK);

                case 2:
                  _context7.next = 4;
                  return _index.FileSystem.promisedWriteFile(_configuration2.default.tests.pidPath, 2 ^ 16, { 'encoding': 'utf-8' });

                case 4:

                  _index.Process.existsPID(_configuration2.default.tests.pidPath);

                case 5:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, undefined);
        })));

        it('should delete the file', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  _context8.next = 3;
                  return _index.FileSystem.promisedAccess(_configuration2.default.tests.pidPath, _index.FileSystem.F_OK);

                case 3:
                  throw new _testError2.default('The file ' + _index.Path.trim(_configuration2.default.tests.pidPath) + ' exists.');

                case 6:
                  _context8.prev = 6;
                  _context8.t0 = _context8['catch'](0);

                  if (!(_context8.t0 instanceof _testError2.default)) {
                    _context8.next = 10;
                    break;
                  }

                  throw _context8.t0;

                case 10:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, undefined, [[0, 6]]);
        })));
      });
    });
  });

  describe('createPID', function () {

    describe('(call)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:

                _sinon2.default.spy(_index.Process, 'createPID');
                _sinon2.default.spy(_index.Process, 'on');

                _context9.next = 4;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.pidPath, _index.FileSystem.F_OK);

              case 4:

                _index.Process.createPID(_configuration2.default.tests.pidPath);

              case 5:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined);
      })));

      it('should call Process.on', function () {
        _assert2.default.ok(_index.Process.on.calledOnce);
      });

      it('should call Process.on with arguments', function () {
        _assert2.default.ok(_index.Process.on.calledWith('exit'));
      });

      it('should return Process', function () {
        _assert2.default.ok(_index.Process.createPID.returned(_index.Process));
      });

      after(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.pidPath, _index.FileSystem.F_OK);

              case 2:

                _index.Process.on.restore();
                _index.Process.createPID.restore();

              case 4:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, undefined);
      })));
    });

    describe('(parent process)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.pidPath, _index.FileSystem.F_OK);

              case 2:

                _index.Process.createPID(_configuration2.default.tests.pidPath);

              case 3:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, undefined);
      })));

      it('should create the file', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _index.FileSystem.promisedAccess(_configuration2.default.tests.pidPath, _index.FileSystem.F_OK);

              case 2:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, undefined);
      })));

      it('should create the file with a valid pid', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.t0 = _assert2.default;
                _context13.next = 3;
                return _index.FileSystem.promisedReadFile(_configuration2.default.tests.pidPath, { 'encoding': 'utf-8' });

              case 3:
                _context13.t1 = _context13.sent;
                _context13.t2 = _index.Process.pid;

                _context13.t0.equal.call(_context13.t0, _context13.t1, _context13.t2);

              case 6:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, undefined);
      })));

      it('should fail if the file exists', function () {
        _assert2.default.throws(function () {
          return _index.Process.createPID(_configuration2.default.tests.pidPath);
        }, _argumentError2.default);
      });
    });

    describe('(child process)', function () {

      describe('(on fork)', function () {

        var childProcess = null;

        before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  _context14.next = 2;
                  return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.process.logPath, _index.FileSystem.F_OK);

                case 2:
                  _context14.next = 4;
                  return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.process.pidPath, _index.FileSystem.F_OK);

                case 4:

                  childProcess = _child_process2.default.fork(_configuration2.default.tests.process.modulePath, [], { 'silent': false });

                case 5:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, undefined);
        })));

        it('should create the file', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.next = 2;
                  return _index.FileSystem.whenFileExists(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration, _configuration2.default.tests.process.pidPath);

                case 2:
                case 'end':
                  return _context15.stop();
              }
            }
          }, _callee15, undefined);
        })));

        after(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:

                  childProcess.send({});

                  _context16.next = 3;
                  return _index.FileSystem.whenFileNotExists(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration0, _configuration2.default.tests.process.pidPath);

                case 3:
                case 'end':
                  return _context16.stop();
              }
            }
          }, _callee16, undefined);
        })));
      });

      describe('(on exit)', function () {

        before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
          var childProcess;
          return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.next = 2;
                  return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.process.logPath, _index.FileSystem.F_OK);

                case 2:
                  _context17.next = 4;
                  return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.process.pidPath, _index.FileSystem.F_OK);

                case 4:
                  childProcess = _child_process2.default.fork(_configuration2.default.tests.process.modulePath, [], { 'silent': false });
                  _context17.next = 7;
                  return _index.FileSystem.whenFileExists(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration, _configuration2.default.tests.process.pidPath);

                case 7:

                  childProcess.send({});

                case 8:
                case 'end':
                  return _context17.stop();
              }
            }
          }, _callee17, undefined);
        })));

        it('should delete the file on exit', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
          return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  _context18.next = 2;
                  return _index.FileSystem.whenFileNotExists(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration0, _configuration2.default.tests.process.pidPath);

                case 2:
                case 'end':
                  return _context18.stop();
              }
            }
          }, _callee18, undefined);
        })));
      });
    });
  });

  describe('killPID', function () {

    describe('(when the file exists and contains a valid pid)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.process.pidPath, _index.FileSystem.F_OK);

              case 2:

                _child_process2.default.fork(_configuration2.default.tests.process.modulePath, [], { 'silent': true });

                _context19.next = 5;
                return _index.FileSystem.whenFileExists(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration, _configuration2.default.tests.process.pidPath);

              case 5:

                _index.Process.killPID(_configuration2.default.tests.process.pidPath);

              case 6:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, undefined);
      })));

      it('should delete the file', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return _index.FileSystem.whenFileNotExists(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration0, _configuration2.default.tests.process.pidPath);

              case 2:
              case 'end':
                return _context20.stop();
            }
          }
        }, _callee20, undefined);
      })));
    });

    describe('(when the file doesn\'t exist)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.process.pidPath, _index.FileSystem.F_OK);

              case 2:
              case 'end':
                return _context21.stop();
            }
          }
        }, _callee21, undefined);
      })));

      it('should fail', function () {
        _assert2.default.throws(function () {
          return _index.Process.killPID(_configuration2.default.tests.process.pidPath);
        }, _argumentError2.default);
      });
    });

    describe('(when the file exists and contains an invalid pid)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.process.pidPath, _index.FileSystem.F_OK);

              case 2:
                _context22.next = 4;
                return _index.FileSystem.promisedWriteFile(_configuration2.default.tests.process.pidPath, 2 ^ 16, { 'encoding': 'utf-8' });

              case 4:
              case 'end':
                return _context22.stop();
            }
          }
        }, _callee22, undefined);
      })));

      it('should fail', function () {
        _assert2.default.throws(function () {
          return _index.Process.killPID(_configuration2.default.tests.process.pidPath);
        }, _argumentError2.default);
      });
    });
  });
});
//# sourceMappingURL=process.js.map