'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _is = require('@pwn/is');

var _is2 = _interopRequireDefault(_is);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _configuration = require('../../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _index = require('../../index');

var _testError = require('../errors/test-error');

var _testError2 = _interopRequireDefault(_testError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('log', function () {

  describe('getParameters', function () {

    describe('(when passed an empty array)', function () {

      var options = null;
      var stream = null;

      before(function () {
        var _Log$getParameters = _index.Log.getParameters([]);

        var _Log$getParameters2 = _slicedToArray(_Log$getParameters, 2);

        options = _Log$getParameters2[0];
        stream = _Log$getParameters2[1];
      });

      it('should return an empty object', function () {
        _assert2.default.ok(_is2.default.emptyObject(options));
      });

      it('should return stdout', function () {
        _assert2.default.equal(stream, _index.Process.stdout);
      });
    });

    describe('(when passed options)', function () {

      var options = null;
      var stream = null;

      before(function () {
        var _Log$getParameters3 = _index.Log.getParameters([{ 'level': 'trace' }]);

        var _Log$getParameters4 = _slicedToArray(_Log$getParameters3, 2);

        options = _Log$getParameters4[0];
        stream = _Log$getParameters4[1];
      });

      it('should return the options', function () {
        _assert2.default.deepEqual(options, { 'level': 'trace' });
      });

      it('should return stdout', function () {
        _assert2.default.equal(stream, _index.Process.stdout);
      });
    });

    describe('(when passed a stream`)', function () {

      var parameters = [];

      var options = null;
      var stream = null;

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _Log$getParameters5, _Log$getParameters6;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 2:

                parameters = [_index.FileSystem.createWriteStream(_configuration2.default.tests.outPath, { 'flags': 'a', 'encoding': 'utf8' })];_Log$getParameters5 = _index.Log.getParameters(parameters);
                _Log$getParameters6 = _slicedToArray(_Log$getParameters5, 2);
                options = _Log$getParameters6[0];
                stream = _Log$getParameters6[1];

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      })));

      it('should return an empty object', function () {
        _assert2.default.ok(_is2.default.emptyObject(options));
      });

      it('should return the stream', function () {
        _assert2.default.equal(stream, parameters[0]);
      });

      after(function () {
        stream.destroy();
      });
    });

    describe('(when passed a string`)', function () {

      var options = null;
      var stream = null;

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _Log$getParameters7, _Log$getParameters8;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 2:
                _Log$getParameters7 = _index.Log.getParameters([_configuration2.default.tests.outPath]);
                _Log$getParameters8 = _slicedToArray(_Log$getParameters7, 2);
                options = _Log$getParameters8[0];
                stream = _Log$getParameters8[1];

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      })));

      it('should return an empty object', function () {
        _assert2.default.ok(_is2.default.emptyObject(options));
      });

      it('should return a stream', function () {
        _assert2.default.ok(stream instanceof _stream2.default.Writable);
      });

      after(function () {
        stream.destroy();
      });
    });

    describe('(when passed options and a stream`)', function () {

      var parameters = [];

      var options = null;
      var stream = null;

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _Log$getParameters9, _Log$getParameters10;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 2:

                parameters = [{ 'level': 'trace' }, _index.FileSystem.createWriteStream(_configuration2.default.tests.outPath, { 'flags': 'a', 'encoding': 'utf8' })];_Log$getParameters9 = _index.Log.getParameters(parameters);
                _Log$getParameters10 = _slicedToArray(_Log$getParameters9, 2);
                options = _Log$getParameters10[0];
                stream = _Log$getParameters10[1];

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      })));

      it('should return the options', function () {
        _assert2.default.deepEqual(options, { 'level': 'trace' });
      });

      it('should return the stream', function () {
        _assert2.default.equal(stream, parameters[1]);
      });

      after(function () {
        stream.destroy();
      });
    });

    describe('(when passed options and a string`)', function () {

      var options = null;
      var stream = null;

      before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _Log$getParameters11, _Log$getParameters12;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _index.FileSystem.promisedAccessUnlink(_configuration2.default.tests.outPath, _index.FileSystem.F_OK);

              case 2:
                _Log$getParameters11 = _index.Log.getParameters([{ 'level': 'trace' }, _configuration2.default.tests.outPath]);
                _Log$getParameters12 = _slicedToArray(_Log$getParameters11, 2);
                options = _Log$getParameters12[0];
                stream = _Log$getParameters12[1];

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      })));

      it('should return the options', function () {
        _assert2.default.deepEqual(options, { 'level': 'trace' });
      });

      it('should return a stream', function () {
        _assert2.default.ok(stream instanceof _stream2.default.Writable);
      });

      after(function () {
        stream.destroy();
      });
    });
  });

  describe('format', function () {

    var time = new Date('1973-05-28T17:00:00');
    var hostname = 'COMPUTER.local';
    var pid = '10101';
    var level = '30';
    var msg = 'MESSAGE';

    describe('(when a message is formatted)', function () {

      it('should return a formatted string', function () {
        _assert2.default.equal(_index.Log.format({
          'time': time,
          'hostname': hostname,
          'pid': pid,
          'level': level,
          'msg': msg }), time.toISOString() + ' COMPUTER.local 10101 INFO  MESSAGE');
      });
    });

    describe('(when an error is formatted)', function () {

      it('should return a formatted string', function () {

        var stack = new _testError2.default('ERROR').stack;

        _assert2.default.equal(_index.Log.format({
          'time': time,
          'hostname': hostname,
          'pid': pid,
          'level': level,
          'msg': msg,
          'stack': stack }), time.toISOString() + ' COMPUTER.local 10101 INFO  MESSAGE\n\n' + stack + '\n');
      });
    });

    describe('(when an object is formatted)', function () {

      it('should return a formatted string', function () {
        _assert2.default.equal(_index.Log.format({
          'time': time,
          'hostname': hostname,
          'pid': pid,
          'level': level,
          'msg': msg,
          'a': 1,
          'b': 2,
          'c': 3 }), time.toISOString() + ' COMPUTER.local 10101 INFO  MESSAGE\n\n' + _util2.default.inspect({ 'a': 1, 'b': 2, 'c': 3 }, { 'depth': null, 'maxArrayLength': null, 'showHidden': true }) + '\n');
      });
    });
  });
});
//# sourceMappingURL=log.js.map