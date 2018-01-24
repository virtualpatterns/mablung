'use strict';

var _configuration = require('../../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _index = require('../../index');

var _testError = require('../errors/test-error');

var _testError2 = _interopRequireDefault(_testError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('file-system', function () {

  describe('accessUnlink', function () {

    describe('(when a file exists)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _index.FileSystem.promisedAccess(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 3:
                _context.next = 5;
                return _index.FileSystem.promisedUnlink(_configuration2.default.tests.outPath);

              case 5:
                _context.next = 9;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

              case 9:
                _context.next = 11;
                return _index.FileSystem.promisedWriteFile(_configuration2.default.tests.outPath, _index.Process.pid, { 'encoding': 'utf-8' });

              case 11:
                _context.next = 13;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 13:
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
                return _index.FileSystem.promisedAccess(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 3:
                throw new _testError2.default('The file \'' + _index.Path.trim(_configuration2.default.tests.outPath) + '\' exists.');

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

    describe('(when a file doesn\'t exist)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _index.FileSystem.promisedAccess(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 3:
                _context3.next = 5;
                return _index.FileSystem.promisedUnlink(_configuration2.default.tests.outPath);

              case 5:
                _context3.next = 9;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined, [[0, 7]]);
      }))
      // OK
      );

      it('should succeed', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

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
                _context5.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 2:
                _context5.next = 4;
                return _index.FileSystem.promisedWriteFile(_configuration2.default.tests.outPath, _index.Process.pid, { 'encoding': 'utf-8' });

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      })));

      it('should resolve', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _index.FileSystem.whenFileExists(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration, _configuration2.default.tests.outPath);

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
                return _index.FileSystem.promisedUnlink(_configuration2.default.tests.outPath);

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
                _context8.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 2:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      })));

      it('should reject', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _index.FileSystem.whenFileExists(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration, _configuration2.default.tests.outPath);

              case 3:
                throw new _testError2.default('The file \'' + _index.Path.trim(_configuration2.default.tests.outPath) + '\' doesn\'t exist.');

              case 6:
                _context9.prev = 6;
                _context9.t0 = _context9['catch'](0);

                if (!(_context9.t0 instanceof _testError2.default)) {
                  _context9.next = 10;
                  break;
                }

                throw _context9.t0;

              case 10:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined, [[0, 6]]);
      })));
    });
  });

  describe('whenFileNotExists', function () {

    describe('(when a file doesn\'t exist)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 2:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, undefined);
      })));

      it('should resolve the promise', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _index.FileSystem.whenFileNotExists(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration, _configuration2.default.tests.outPath);

              case 2:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, undefined);
      })));
    });

    describe('(when a file exists)', function () {

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 2:
                _context12.next = 4;
                return _index.FileSystem.promisedWriteFile(_configuration2.default.tests.outPath, _index.Process.pid, { 'encoding': 'utf-8' });

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, undefined);
      })));

      it('should reject', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return _index.FileSystem.whenFileNotExists(_configuration2.default.tests.whenTimeout, _configuration2.default.tests.whenDuration, _configuration2.default.tests.outPath);

              case 3:
                throw new _testError2.default('The file \'' + _index.Path.trim(_configuration2.default.tests.outPath) + '\' doesn\'t exist.');

              case 6:
                _context13.prev = 6;
                _context13.t0 = _context13['catch'](0);

                if (!(_context13.t0 instanceof _testError2.default)) {
                  _context13.next = 10;
                  break;
                }

                throw _context13.t0;

              case 10:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, undefined, [[0, 6]]);
      })));

      after(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 2:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, undefined);
      })));
    });
  });
});
//# sourceMappingURL=file-system.js.map