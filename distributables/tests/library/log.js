'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _chai = require('chai');

var _is = require('@pwn/is');

var _is2 = _interopRequireDefault(_is);

var _memoryStreams = require('memory-streams');

var _memoryStreams2 = _interopRequireDefault(_memoryStreams);

var _objectMerge = require('object-merge');

var _objectMerge2 = _interopRequireDefault(_objectMerge);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _pad = require('pad');

var _pad2 = _interopRequireDefault(_pad);

var _pino = require('pino');

var _pino2 = _interopRequireDefault(_pino);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _index = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// import Stream from 'stream'
// import Utilities from 'util'

// import Configuration from '../../configuration'


// import TestError from '../errors/test-error'

var MESSAGE = {
  'type': 'object',
  'properties': {
    'time': { 'type': 'number' },
    'pid': {
      'type': 'number',
      'enum': [_index.Process.pid]
    },
    'hostname': {
      'type': 'string',
      'enum': [_os2.default.hostname()]
    },
    'v': { 'type': 'number' }
  },
  'required': ['time', 'pid', 'hostname', 'v']
};

var CREATE_LOG_MESSAGE = (0, _objectMerge2.default)(MESSAGE, {
  'title': 'CreateLog',
  'properties': {
    'level': {
      'type': 'number',
      'enum': [20]
    },
    'msg': {
      'type': 'string',
      'enum': ['Log.createLog(...parameters) { ... }']
    },
    'logOptions': {
      'title': 'CreateLog-LogOptions',
      'type': 'object',
      'properties': {
        'level': {
          'type': 'string',
          'enum': ['trace', 'debug']
        }
      },
      'required': ['level']
    }
  },
  'required': [].concat(_toConsumableArray(MESSAGE.required), ['level', 'msg', 'logOptions'])
});

// const LEVEL_MESSAGE_MESSAGE = Merge(MESSAGE, {
//   'title': 'Level',
//   'properties': {
//     'level': {
//       'type': 'number',
//       'enum': [ 10, 20, 30, 40, 50, 60 ]
//     },
//     'msg': {
//       'type': 'string',
//       'enum': [ 'FATAL', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE' ]
//     }
//   },
//   'required': [ ...MESSAGE.required, 'level', 'msg' ]
// })
//
// const LEVEL_ERROR_MESSAGE = Merge(MESSAGE, {
//   'title': 'Level',
//   'properties': {
//     'level': {
//       'type': 'number',
//       'enum': [ 10, 20, 30, 40, 50, 60 ]
//     },
//     'msg': {
//       'type': 'string',
//       'enum': [ 'MESSAGE' ]
//     },
//     'stack': { 'type': 'string' }
//   },
//   'required': [ ...MESSAGE.required, 'level', 'msg', 'stack' ]
// })
//
// const LEVEL_OBJECT_MESSAGE = Merge(LEVEL_MESSAGE_MESSAGE, {
//   'title': 'Level',
//   'properties': {
//     'a': {
//       'type': 'number',
//       'enum': [ 1 ]
//     },
//     'b': {
//       'type': 'number',
//       'enum': [ 2 ]
//     },
//     'c': {
//       'type': 'number',
//       'enum': [ 3 ]
//     }
//   },
//   'required': [ ...LEVEL_MESSAGE_MESSAGE.required, 'a', 'b', 'c' ]
// })

// const REGEXP_CREATE_LOG_MESSAGE = new RegExp(`^${Configuration.tests.expressions.dateTime} DEBUG Log.createLog\\(\\.{3}parameters\\) \\{ .{3} \\}.*$`, 'm')
// const REGEXP_CREATE_FORMATTED_LOG_MESSAGE = new RegExp(`^${Configuration.tests.expressions.dateTime} DEBUG Log.createFormattedLog\\(\\.{3}parameters\\) \\{ .{3} \\}$`, 'm')

describe('log', function () {

  // describe('getParameters', () => {
  //
  //   describe('(when passing an empty array)', () => {
  //
  //     let options = null
  //     let stream = null
  //
  //     before(() => {
  //       [ options, stream ] = Log.getParameters([])
  //     })
  //
  //     it('should return an empty object', () => {
  //       Assert.ok(Is.emptyObject(options))
  //     })
  //
  //     it('should return stdout', () => {
  //       Assert.equal(stream, Process.stdout)
  //     })
  //
  //   })
  //
  //   describe('(when passing options)', () => {
  //
  //     let options = null
  //     let stream = null
  //
  //     before(() => {
  //       [ options, stream ] = Log.getParameters([ { 'level': 'trace' } ])
  //     })
  //
  //     it('should return the options', () => {
  //       Assert.deepEqual(options, { 'level': 'trace' })
  //     })
  //
  //     it('should return stdout', () => {
  //       Assert.equal(stream, Process.stdout)
  //     })
  //
  //   })
  //
  //   describe('(when passing a stream)', () => {
  //
  //     let parameters = []
  //
  //     let options = null
  //     let stream = null
  //
  //     before(async () => {
  //
  //       parameters = [ new MemoryStream.WritableStream() ]
  //
  //       ;[ options, stream ] = Log.getParameters(parameters)
  //
  //     })
  //
  //     it('should return an empty object', () => {
  //       Assert.ok(Is.emptyObject(options))
  //     })
  //
  //     it('should return the stream', () => {
  //       Assert.equal(stream, parameters[0])
  //     })
  //
  //   })
  //
  //   describe('(when passing a string)', () => {
  //
  //     let options = null
  //     let stream = null
  //
  //     before(async () => {
  //
  //       await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
  //
  //       ;[ options, stream ] = Log.getParameters([ Configuration.tests.outPath ])
  //
  //     })
  //
  //     it('should return an empty object', () => {
  //       Assert.ok(Is.emptyObject(options))
  //     })
  //
  //     it('should return a stream', () => {
  //       Assert.ok(stream instanceof Stream.Writable)
  //     })
  //
  //     after(() => {
  //       stream.destroy()
  //     })
  //
  //   })
  //
  //   describe('(when passing options and a stream)', () => {
  //
  //     let parameters = []
  //
  //     let options = null
  //     let stream = null
  //
  //     before(async () => {
  //
  //       parameters = [ { 'level': 'trace' }, new MemoryStream.WritableStream() ]
  //
  //       ;[ options, stream ] = Log.getParameters(parameters)
  //
  //     })
  //
  //     it('should return the options', () => {
  //       Assert.deepEqual(options, { 'level': 'trace' })
  //     })
  //
  //     it('should return the stream', () => {
  //       Assert.equal(stream, parameters[1])
  //     })
  //
  //   })
  //
  //   describe('(when passing options and a string)', () => {
  //
  //     let options = null
  //     let stream = null
  //
  //     before(async () => {
  //
  //       await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
  //
  //       ;[ options, stream ] = Log.getParameters([ { 'level': 'trace' }, Configuration.tests.outPath ])
  //
  //     })
  //
  //     it('should return the options', () => {
  //       Assert.deepEqual(options, { 'level': 'trace' })
  //     })
  //
  //     it('should return a stream', () => {
  //       Assert.ok(stream instanceof Stream.Writable)
  //     })
  //
  //     after(() => {
  //       stream.destroy()
  //     })
  //
  //   })
  //
  // })

  describe('format', function () {

    var data = {
      'hostname': _os2.default.hostname(),
      'level': '30',
      'msg': 'MESSAGE',
      'pid': _index.Process.pid,
      'time': new Date('1973-05-28T17:00:00')
    };

    describe('(when passing a message)', function () {

      it('should return a formatted string', function () {
        _chai.assert.equal(_index.Log.format(data), data.time.toISOString() + ' ' + data.hostname + ' ' + (0, _pad2.default)(5, data.pid.toString()) + ' INFO  MESSAGE');
      });
    });

    describe('(when passing an error)', function () {

      var stack = null;

      before(function () {
        stack = new Error('MESSAGE').stack;
      });

      it('should return a formatted string', function () {
        _chai.assert.equal(_index.Log.format(Object.assign({ 'stack': stack }, data)), data.time.toISOString() + ' ' + data.hostname + ' ' + (0, _pad2.default)(5, data.pid.toString()) + ' INFO  MESSAGE\n\n' + stack + '\n');
      });
    });

    describe('(when passing an object)', function () {

      it('should return a formatted string', function () {
        _chai.assert.equal(_index.Log.format(Object.assign({ 'a': 1, 'b': 2, 'c': 3 }, data)), data.time.toISOString() + ' ' + data.hostname + ' ' + (0, _pad2.default)(5, data.pid.toString()) + ' INFO  MESSAGE\n\n{ a: 1, b: 2, c: 3 }\n');
      });
    });
  });

  describe('createLog', function () {

    describe('(when passing a stream)', function () {

      var stream = null;
      var messages = null;

      before(function () {

        _sinon2.default.spy(_pino2.default, 'call');

        stream = new _memoryStreams2.default.WritableStream();
        _index.Log.createLog(stream);

        messages = getMessages(stream);
      });

      it('should call Pino.call', function () {
        _chai.assert.equal(_pino2.default.call.callCount, 1);
      });

      it('should call Pino.call with valid arguments', function () {
        _chai.assert.ok(_pino2.default.call.calledWith(_index.Log, _sinon2.default.match({ 'level': 'debug' }), stream));
      });

      it('should create one message', function () {
        _chai.assert.equal(messages.length, 1);
      });

      it('should create a valid message', function () {
        _chai.assert.jsonSchema(messages[0], CREATE_LOG_MESSAGE);
      });

      it('should create a message with logOptions.level \'debug\'', function () {
        _chai.assert.equal(messages[0].logOptions.level, 'debug');
      });

      var _loop = function _loop(level) {
        var _level = _slicedToArray(level, 1),
            levelName = _level[0];

        describe('(when calling ' + levelName + ')', function () {

          it('should be defined', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _chai.assert.ok(_is2.default.function(_index.Log[levelName]));

                  case 1:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          })));
        });
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(_index.Log.levels.values)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var level = _step.value;

          _loop(level);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      after(function () {
        _pino2.default.call.restore();
      });
    });

    describe('(when passing options and a stream)', function () {

      var stream = null;
      var messages = null;

      before(function () {

        _sinon2.default.spy(_pino2.default, 'call');

        stream = new _memoryStreams2.default.WritableStream();
        _index.Log.createLog({ 'level': 'trace' }, stream);

        messages = getMessages(stream);
      });

      // it('should call Pino.call', () => {
      //   Assert.equal(Pino.call.callCount, 1)
      // })

      it('should call Pino.call with valid arguments', function () {
        _chai.assert.ok(_pino2.default.call.calledWith(_index.Log, _sinon2.default.match({ 'level': 'trace' }), stream));
      });

      // it('should create one message', () => {
      //   Assert.equal(messages.length, 1)
      // })

      // it('should create a valid message', () => {
      //   Assert.jsonSchema(messages[0], CREATE_LOG_MESSAGE)
      // })

      it('should create a message with logOptions.level \'trace\'', function () {
        _chai.assert.equal(messages[0].logOptions.level, 'trace');
      });

      after(function () {
        _pino2.default.call.restore();
      });
    });
  });

  describe('createFormattedLog', function () {

    describe('(when passing a stream)', function () {

      before(function () {

        _sinon2.default.spy(_pino2.default, 'pretty');

        _index.Log.createFormattedLog(new _memoryStreams2.default.WritableStream());
      });

      it('should call Pino.pretty', function () {
        _chai.assert.equal(_pino2.default.pretty.callCount, 1);
      });

      it('should call Pino.pretty with valid arguments', function () {
        _chai.assert.ok(_pino2.default.pretty.calledWith(_sinon2.default.match({ 'formatter': _index.Log.format })));
      });

      after(function () {
        _pino2.default.pretty.restore();
      });
    });

    describe('(when passing non-formatting options and a stream)', function () {

      before(function () {

        _sinon2.default.spy(_pino2.default, 'pretty');

        _index.Log.createFormattedLog({ 'level': 'trace' }, new _memoryStreams2.default.WritableStream());
      });

      // it('should call Pino.pretty', () => {
      //   Assert.equal(Pino.pretty.callCount, 1)
      // })

      it('should call Pino.pretty with valid arguments', function () {
        _chai.assert.ok(_pino2.default.pretty.calledWith(_sinon2.default.match({ 'formatter': _index.Log.format })));
      });

      after(function () {
        _pino2.default.pretty.restore();
      });
    });

    describe('(when passing basic formatting options and a stream)', function () {

      before(function () {

        _sinon2.default.spy(_pino2.default, 'pretty');

        _index.Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true }, new _memoryStreams2.default.WritableStream());
      });

      // it('should call Pino.pretty', () => {
      //   Assert.equal(Pino.pretty.callCount, 1)
      // })

      it('should call Pino.pretty with valid arguments', function () {
        _chai.assert.ok(_pino2.default.pretty.calledWith(_sinon2.default.match({})));
      });

      after(function () {
        _pino2.default.pretty.restore();
      });
    });

    describe('(when passing advanced formatting options and a stream)', function () {

      before(function () {

        _sinon2.default.spy(_pino2.default, 'pretty');

        _index.Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': { 'levelFirst': true } }, new _memoryStreams2.default.WritableStream());
      });

      // it('should call Pino.pretty', () => {
      //   Assert.equal(Pino.pretty.callCount, 1)
      // })

      it('should call Pino.pretty with valid arguments', function () {
        _chai.assert.ok(_pino2.default.pretty.calledWith(_sinon2.default.match({ 'formatter': _index.Log.format, 'levelFirst': true })));
      });

      after(function () {
        _pino2.default.pretty.restore();
      });
    });
  });

  // Log.levels
  //
  // {
  //   'values': {
  //     'fatal': 60,
  //     'error': 50,
  //     'warn': 40,
  //     'info': 30,
  //     'debug': 20,
  //     'trace': 10
  //   },
  //   'labels': {
  //     '10': 'trace',
  //     '20': 'debug',
  //     '30': 'info',
  //     '40': 'warn',
  //     '50': 'error',
  //     '60': 'fatal'
  //   }
  // }

  // for (let level of Object.entries(Log.levels.values)) {
  //
  //   let [ levelName, levelNumber ] = level
  //
  //   describe(levelName, () => {
  //
  //     describe('(when creating a log)', () => {
  //
  //       describe('(when passing a message)', () => {
  //
  //         let messages = null
  //
  //         before(() => {
  //
  //           let stream = new MemoryStream.WritableStream()
  //           Log.createLog({ 'level': 'trace' }, stream)
  //
  //           Log[levelName](levelName.toUpperCase())
  //
  //           messages = getMessages(stream)
  //
  //         })
  //
  //         it('should create two log entries', () => {
  //           Assert.equal(messages.length, 2)
  //         })
  //
  //         it('should create a valid message', () => {
  //           Assert.jsonSchema(messages[1], LEVEL_MESSAGE_MESSAGE)
  //         })
  //
  //         it(`should create a message with level ${levelNumber}`, () => {
  //           Assert.equal(messages[1].level, levelNumber)
  //         })
  //
  //         it(`should create a message with message '${levelName.toUpperCase()}'`, () => {
  //           Assert.equal(messages[1].msg, levelName.toUpperCase())
  //         })
  //
  //       })
  //
  //       describe('(when passing an error)', () => {
  //
  //         let error = null
  //         let messages = null
  //
  //         before(() => {
  //
  //           let stream = new MemoryStream.WritableStream()
  //           Log.createLog({ 'level': 'trace' }, stream)
  //
  //           Log[levelName](error = new TestError('MESSAGE'))
  //
  //           messages = getMessages(stream)
  //
  //         })
  //
  //         it('should create two log entries', () => {
  //           Assert.equal(messages.length, 2)
  //         })
  //
  //         it('should create a valid message', () => {
  //           Assert.jsonSchema(messages[1], LEVEL_ERROR_MESSAGE)
  //         })
  //
  //         it(`should create a message with level ${levelNumber}`, () => {
  //           Assert.equal(messages[1].level, levelNumber)
  //         })
  //
  //         it('should create a message with message \'MESSAGE\'', () => {
  //           Assert.equal(messages[1].msg, 'MESSAGE')
  //         })
  //
  //         it('should create a message with a stack', () => {
  //           Assert.equal(messages[1].stack, error.stack)
  //         })
  //
  //       })
  //
  //       describe('(when passing an object)', () => {
  //
  //         let messages = null
  //
  //         before(() => {
  //
  //           let stream = new MemoryStream.WritableStream()
  //           Log.createLog({ 'level': 'trace' }, stream)
  //
  //           Log[levelName]({ 'a':1, 'b':2, 'c':3 }, levelName.toUpperCase())
  //
  //           messages = getMessages(stream)
  //
  //         })
  //
  //         it('should create two log entries', () => {
  //           Assert.equal(messages.length, 2)
  //         })
  //
  //         it('should create a valid message', () => {
  //           Assert.jsonSchema(messages[1], LEVEL_OBJECT_MESSAGE)
  //         })
  //
  //         it(`should create a message with level ${levelNumber}`, () => {
  //           Assert.equal(messages[1].level, levelNumber)
  //         })
  //
  //         it(`should create a message with message '${levelName.toUpperCase()}'`, () => {
  //           Assert.equal(messages[1].msg, levelName.toUpperCase())
  //         })
  //
  //       })
  //
  //     })
  //
  //     describe('(when creating a formatted log)', () => {
  //
  //       before(() => {
  //         Log.createFormattedLog({ 'level': 'trace' }, new MemoryStream.WritableStream())
  //       })
  //
  //       it('should be a function', () => {
  //         Assert.ok(Is.function(Log[levelName]))
  //       })
  //
  //     })
  //
  //   })
  //
  // }
});

function getMessages(stream) {
  return stream.toString().split('\n').filter(function (message) {
    return !_is2.default.emptyString(message);
  }).map(function (message) {
    return JSON.parse(message);
  });
}
//# sourceMappingURL=log.js.map