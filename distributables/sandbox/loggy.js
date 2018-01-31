'use strict';

require('babel-polyfill');

var _is = require('@pwn/is');

var _is2 = _interopRequireDefault(_is);

var _memoryStreams = require('memory-streams');

var _memoryStreams2 = _interopRequireDefault(_memoryStreams);

var _configuration = require('../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Log.createFormattedLog({ 'level': 'trace' }, writeStream)
// Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true })
// Log.createFormattedLog({ 'level': 'trace', 'messageKey': 'babo', 'prettyPrint': { 'messageKey': 'babo' } })
// Log.createFormattedLog(`${Process.env.HOME}/Library/Logs/mablung/mablung.loggy.log`)
// Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true }, `${Process.env.HOME}/Library/Logs/mablung/mablung.loggy.log`)

// Log.error(new Error('Error'))
// Log.info(Log.levels.values, 'Info')
// Log.debug('Debug')

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var stream;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:

          // await FileSystem.promisedAccessUnlink(Configuration.tests.logPath, FileSystem.F_OK)

          stream = new _memoryStreams2.default.WritableStream();

          // Log.createLog({ 'level': 'trace' }, Configuration.tests.logPath)

          _index.Log.createLog({ 'level': 'trace' }, stream);
          _index.Log.trace('TRACE');

          console.log(stream.toString().split('\n').filter(function (data) {
            return !_is2.default.emptyString(data);
          }).map(function (data) {
            return JSON.parse(data);
          }));

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}))();
//# sourceMappingURL=loggy.js.map