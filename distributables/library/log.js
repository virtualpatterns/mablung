'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // require('./file-system')


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _is = require('@pwn/is');

var _is2 = _interopRequireDefault(_is);

var _detectNode = require('detect-node');

var _detectNode2 = _interopRequireDefault(_detectNode);

var _pad = require('pad');

var _pad2 = _interopRequireDefault(_pad);

var _pino = require('pino');

var _pino2 = _interopRequireDefault(_pino);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Process = process; // require('./process')

var Log = Object.create(_pino2.default);

Log.getParameters = function (parameters) {

  var options = null;
  var stream = null;

  switch (parameters.length) {
    case 0:
      options = {};
      stream = Process.stdout;
      break;
    case 1:

      switch (true) {
        case parameters[0] instanceof _stream2.default.Writable:
          options = {};
          stream = parameters[0];
          break;
        case _is2.default.string(parameters[0]):
          options = {};
          stream = _fs2.default.createWriteStream(parameters[0], {
            'flags': 'a',
            'encoding': 'utf8',
            'autoClose': true
          });
          break;
        default:
          options = parameters[0];
          stream = Process.stdout;
      }

      break;
    default:
      options = parameters[0];
      stream = _is2.default.string(parameters[1]) ? _fs2.default.createWriteStream(parameters[1], {
        'flags': 'a',
        'encoding': 'utf8',
        'autoClose': true
      }) : parameters[1];
  }

  return [options, stream];
};

Log.createLog = function () {
  var _this = this;

  for (var _len = arguments.length, parameters = Array(_len), _key = 0; _key < _len; _key++) {
    parameters[_key] = arguments[_key];
  }

  var _getParameters = this.getParameters(parameters),
      _getParameters2 = _slicedToArray(_getParameters, 2),
      userLogOptions = _getParameters2[0],
      userStream = _getParameters2[1];

  var defaultLogOptions = null;

  if (_detectNode2.default) {
    defaultLogOptions = {
      'level': 'debug'
    };
  } else {
    defaultLogOptions = {
      'browser': {
        'asObject': true
      },
      'level': 'debug'
    };
  }

  var logOptions = Object.assign(defaultLogOptions, userLogOptions);
  var log = _pino2.default.call(this, logOptions, userStream);

  var _loop = function _loop(level) {
    _this[level] = function () {
      for (var _len2 = arguments.length, parameters = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        parameters[_key2] = arguments[_key2];
      }

      return log[level].apply(log, parameters);
    };
  };

  for (var level in this.levels.values) {
    _loop(level);
  }

  Log.debug(_is2.default.emptyObject(logOptions) ? {} : { 'logOptions': logOptions }, 'Log.createLog(...parameters) { ... }');
};

Log.format = function (data) {

  var string = data.name ? data.name + ' ' : '';

  if (_detectNode2.default) {
    string += _util2.default.format('%s %s %s %s %s', new Date(data.time).toISOString(), data.hostname, data.pid ? (0, _pad2.default)(5, data.pid.toString()) : '000000', (0, _pad2.default)(Log.levels.labels[data.level].toUpperCase(), 5), data[this.messageKey || 'msg'] || '');
  } else {
    string += _util2.default.format('%s %s %s', new Date(data.time).toISOString(), (0, _pad2.default)(Log.levels.labels[data.level].toUpperCase(), 5), data.msg || '');
  }

  if (data.stack) {
    string += '\n\n' + data.stack + '\n' + (_detectNode2.default ? '' : '\n');
  } else {

    var _data = Object.assign({}, data);

    delete _data.hostname;
    delete _data.level;
    delete _data.name;
    delete _data.pid;
    delete _data.time;
    delete _data.v;

    if (_detectNode2.default) {
      delete _data[this.messageKey || 'msg'];
    } else {
      delete _data.msg;
    }

    if (!_is2.default.emptyObject(_data)) {
      string += '\n\n' + _util2.default.inspect(_data, {
        'depth': null,
        'maxArrayLength': null,
        'showHidden': true
      }) + '\n' + (_detectNode2.default ? '' : '\n');
    }
  }

  return string;
};

Log.write = function (data) {
  console.log(this.format(data)); // eslint-disable-line no-console
};

Log.createFormattedLog = function () {
  for (var _len3 = arguments.length, parameters = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    parameters[_key3] = arguments[_key3];
  }

  var _getParameters3 = this.getParameters(parameters),
      _getParameters4 = _slicedToArray(_getParameters3, 2),
      userLogOptions = _getParameters4[0],
      userStream = _getParameters4[1];

  if (_detectNode2.default) {

    var userFormatOptions = userLogOptions.prettyPrint ? userLogOptions.prettyPrint : {};

    delete userLogOptions.prettyPrint;

    var defaultFormatOptions = {
      'formatter': this.format
    };

    var formatOptions = userFormatOptions == true ? {} : Object.assign(defaultFormatOptions, userFormatOptions);

    var formattedStream = Log.pretty(formatOptions);
    formattedStream.pipe(userStream);

    this.createLog(userLogOptions, formattedStream);

    Log.debug(_is2.default.emptyObject(formatOptions) ? {} : { 'formatOptions': formatOptions }, 'Log.createFormattedLog(...parameters) { ... }');
  } else {

    var defaultLogOptions = {
      'browser': {
        'asObject': true,
        'write': this.write
      }
    };

    var logOptions = Object.assign(defaultLogOptions, userLogOptions);

    this.createLog(logOptions);

    Log.debug('Log.createFormattedLog(...parameters) { ... }');
  }
};

exports.default = Log;
//# sourceMappingURL=log.js.map