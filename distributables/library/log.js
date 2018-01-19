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

Log.format = function (data) {

  var string = data.name ? data.name + ' ' : '';

  string += _util2.default.format('%s %s %d %s %s', new Date(data.time).toISOString(), data.hostname, (0, _pad2.default)(data.pid.toString(), 6), (0, _pad2.default)(Log.levels.labels[data.level].toUpperCase(), 5), data[this.messageKey] || '(no message)');

  if (data.stack) {
    string += '\n\n' + data.stack + '\n';
  } else {

    var _data = Object.assign({}, data);

    delete _data.hostname;
    delete _data.level;
    delete _data[this.messageKey];
    delete _data.name;
    delete _data.pid;
    delete _data.time;
    delete _data.v;

    if (!_is2.default.emptyObject(_data)) {
      string += '\n\n' + _util2.default.inspect(_data, {
        'depth': null,
        'maxArrayLength': null,
        'showHidden': true
      }) + '\n';
    }
  }

  return string;
};

// Log.format[Utilities.inspect.custom] = function () {
//   return 'Log.format(data) { ... }'
// }

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
      'level': 'debug',
      'messageKey': 'message'
    };
  } else {
    defaultLogOptions = {
      'browser': {
        'asObject': true
      },
      'level': 'debug',
      'messageKey': 'message'
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

  Log.trace(_is2.default.emptyObject(logOptions) ? {} : { 'logOptions': logOptions }, 'Log.createLog(...parameters) { ... }');
};

Log.createFormattedLog = function () {
  for (var _len3 = arguments.length, parameters = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    parameters[_key3] = arguments[_key3];
  }

  var _getParameters3 = this.getParameters(parameters),
      _getParameters4 = _slicedToArray(_getParameters3, 2),
      userOptions = _getParameters4[0],
      userStream = _getParameters4[1];

  var userFormatOptions = userOptions.prettyPrint ? userOptions.prettyPrint : {};

  delete userOptions.prettyPrint;

  var defaultFormatOptions = {
    'formatter': this.format,
    'messageKey': 'message'
  };

  var formatOptions = userFormatOptions == true ? { 'messageKey': userOptions.messageKey || 'message' } : Object.assign(defaultFormatOptions, userFormatOptions);

  var formattedStream = Log.pretty(formatOptions);
  formattedStream.pipe(userStream);

  this.createLog(userOptions, formattedStream);

  Log.trace(_is2.default.emptyObject(formatOptions) ? {} : { 'formatOptions': formatOptions }, 'Log.createFormattedLog(...parameters) { ... }');
};

Log.createLog();

exports.default = Log;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L2xvZy5qcyJdLCJuYW1lcyI6WyJQcm9jZXNzIiwicHJvY2VzcyIsIkxvZyIsIk9iamVjdCIsImNyZWF0ZSIsImZvcm1hdCIsImRhdGEiLCJzdHJpbmciLCJuYW1lIiwiRGF0ZSIsInRpbWUiLCJ0b0lTT1N0cmluZyIsImhvc3RuYW1lIiwicGlkIiwidG9TdHJpbmciLCJsZXZlbHMiLCJsYWJlbHMiLCJsZXZlbCIsInRvVXBwZXJDYXNlIiwibWVzc2FnZUtleSIsInN0YWNrIiwiX2RhdGEiLCJhc3NpZ24iLCJ2IiwiZW1wdHlPYmplY3QiLCJpbnNwZWN0IiwiZ2V0UGFyYW1ldGVycyIsInBhcmFtZXRlcnMiLCJvcHRpb25zIiwic3RyZWFtIiwibGVuZ3RoIiwic3Rkb3V0IiwiV3JpdGFibGUiLCJjcmVhdGVXcml0ZVN0cmVhbSIsImNyZWF0ZUxvZyIsInVzZXJMb2dPcHRpb25zIiwidXNlclN0cmVhbSIsImRlZmF1bHRMb2dPcHRpb25zIiwibG9nT3B0aW9ucyIsImxvZyIsImNhbGwiLCJhcHBseSIsInZhbHVlcyIsInRyYWNlIiwiY3JlYXRlRm9ybWF0dGVkTG9nIiwidXNlck9wdGlvbnMiLCJ1c2VyRm9ybWF0T3B0aW9ucyIsInByZXR0eVByaW50IiwiZGVmYXVsdEZvcm1hdE9wdGlvbnMiLCJmb3JtYXRPcHRpb25zIiwiZm9ybWF0dGVkU3RyZWFtIiwicHJldHR5IiwicGlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O3lwQkFBNEI7OztBQUE1Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVUMsT0FBaEIsQyxDQUF3Qjs7QUFFeEIsSUFBTUMsTUFBTUMsT0FBT0MsTUFBUCxnQkFBWjs7QUFFQUYsSUFBSUcsTUFBSixHQUFhLFVBQVVDLElBQVYsRUFBZ0I7O0FBRTNCLE1BQUlDLFNBQVNELEtBQUtFLElBQUwsR0FBZUYsS0FBS0UsSUFBcEIsU0FB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QVlFLFdBQW5COztBQUVBLE1BQUlDLHVCQUF1QjtBQUN6QixpQkFBYSxLQUFLM0MsTUFETztBQUV6QixrQkFBYztBQUZXLEdBQTNCOztBQUtBLE1BQUk0QyxnQkFBZ0JILHFCQUFxQixJQUFyQixHQUE0QixFQUFFLGNBQWNELFlBQVkxQixVQUFaLElBQTBCLFNBQTFDLEVBQTVCLEdBQW9GaEIsT0FBT21CLE1BQVAsQ0FBYzBCLG9CQUFkLEVBQW9DRixpQkFBcEMsQ0FBeEc7O0FBRUEsTUFBSUksa0JBQWtCaEQsSUFBSWlELE1BQUosQ0FBV0YsYUFBWCxDQUF0QjtBQUNBQyxrQkFBZ0JFLElBQWhCLENBQXFCaEIsVUFBckI7O0FBRUEsT0FBS0YsU0FBTCxDQUFlVyxXQUFmLEVBQTRCSyxlQUE1Qjs7QUFFQWhELE1BQUl5QyxLQUFKLENBQVUsYUFBR25CLFdBQUgsQ0FBZXlCLGFBQWYsSUFBZ0MsRUFBaEMsR0FBcUMsRUFBRSxpQkFBaUJBLGFBQW5CLEVBQS9DLEVBQW1GLCtDQUFuRjtBQUVELENBdEJEOztBQXdCQS9DLElBQUlnQyxTQUFKOztrQkFFZWhDLEciLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZpbGVTeXN0ZW0gZnJvbSAnZnMnIC8vIHJlcXVpcmUoJy4vZmlsZS1zeXN0ZW0nKVxuaW1wb3J0IFV0aWxpdGllcyBmcm9tICd1dGlsJ1xuaW1wb3J0IElzIGZyb20gJ0Bwd24vaXMnXG5pbXBvcnQgSXNOb2RlIGZyb20gJ2RldGVjdC1ub2RlJ1xuaW1wb3J0IFBhZCBmcm9tICdwYWQnXG5pbXBvcnQgUGlubyBmcm9tICdwaW5vJ1xuaW1wb3J0IFN0cmVhbSBmcm9tICdzdHJlYW0nXG5cbmNvbnN0IFByb2Nlc3MgPSBwcm9jZXNzIC8vIHJlcXVpcmUoJy4vcHJvY2VzcycpXG5cbmNvbnN0IExvZyA9IE9iamVjdC5jcmVhdGUoUGlubylcblxuTG9nLmZvcm1hdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgbGV0IHN0cmluZyA9IGRhdGEubmFtZSA/IGAke2RhdGEubmFtZX0gYCA6ICcnXG5cbiAgc3RyaW5nICs9IFV0aWxpdGllcy5mb3JtYXQoXG4gICAgJyVzICVzICVkICVzICVzJyxcbiAgICBuZXcgRGF0ZShkYXRhLnRpbWUpLnRvSVNPU3RyaW5nKCksXG4gICAgZGF0YS5ob3N0bmFtZSxcbiAgICBQYWQoZGF0YS5waWQudG9TdHJpbmcoKSwgNiksXG4gICAgUGFkKExvZy5sZXZlbHMubGFiZWxzW2RhdGEubGV2ZWxdLnRvVXBwZXJDYXNlKCksIDUpLFxuICAgIGRhdGFbdGhpcy5tZXNzYWdlS2V5XSB8fCAnKG5vIG1lc3NhZ2UpJ1xuICApXG5cbiAgaWYgKGRhdGEuc3RhY2spIHtcbiAgICBzdHJpbmcgKz0gYFxcblxcbiR7ZGF0YS5zdGFja31cXG5gXG4gIH0gZWxzZSB7XG5cbiAgICBsZXQgX2RhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKVxuXG4gICAgZGVsZXRlIF9kYXRhLmhvc3RuYW1lXG4gICAgZGVsZXRlIF9kYXRhLmxldmVsXG4gICAgZGVsZXRlIF9kYXRhW3RoaXMubWVzc2FnZUtleV1cbiAgICBkZWxldGUgX2RhdGEubmFtZVxuICAgIGRlbGV0ZSBfZGF0YS5waWRcbiAgICBkZWxldGUgX2RhdGEudGltZVxuICAgIGRlbGV0ZSBfZGF0YS52XG5cbiAgICBpZiAoIUlzLmVtcHR5T2JqZWN0KF9kYXRhKSkge1xuICAgICAgc3RyaW5nICs9IGBcXG5cXG4ke1V0aWxpdGllcy5pbnNwZWN0KF9kYXRhLCB7XG4gICAgICAgICdkZXB0aCc6IG51bGwsXG4gICAgICAgICdtYXhBcnJheUxlbmd0aCc6IG51bGwsXG4gICAgICAgICdzaG93SGlkZGVuJzogdHJ1ZVxuICAgICAgfSl9XFxuYFxuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIHN0cmluZ1xuXG59XG5cbi8vIExvZy5mb3JtYXRbVXRpbGl0aWVzLmluc3BlY3QuY3VzdG9tXSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgcmV0dXJuICdMb2cuZm9ybWF0KGRhdGEpIHsgLi4uIH0nXG4vLyB9XG5cbkxvZy5nZXRQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMpIHtcblxuICBsZXQgb3B0aW9ucyA9IG51bGxcbiAgbGV0IHN0cmVhbSA9IG51bGxcblxuICBzd2l0Y2ggKHBhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgICBzdHJlYW0gPSBQcm9jZXNzLnN0ZG91dFxuICAgICAgYnJlYWtcbiAgICBjYXNlIDE6XG5cbiAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIHBhcmFtZXRlcnNbMF0gaW5zdGFuY2VvZiBTdHJlYW0uV3JpdGFibGU6XG4gICAgICAgICAgb3B0aW9ucyA9IHt9XG4gICAgICAgICAgc3RyZWFtID0gcGFyYW1ldGVyc1swXVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgSXMuc3RyaW5nKHBhcmFtZXRlcnNbMF0pOlxuICAgICAgICAgIG9wdGlvbnMgPSB7fVxuICAgICAgICAgIHN0cmVhbSA9IEZpbGVTeXN0ZW0uY3JlYXRlV3JpdGVTdHJlYW0ocGFyYW1ldGVyc1swXSwge1xuICAgICAgICAgICAgJ2ZsYWdzJzogJ2EnLFxuICAgICAgICAgICAgJ2VuY29kaW5nJzogJ3V0ZjgnLFxuICAgICAgICAgICAgJ2F1dG9DbG9zZSc6IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgb3B0aW9ucyA9IHBhcmFtZXRlcnNbMF1cbiAgICAgICAgICBzdHJlYW0gPSBQcm9jZXNzLnN0ZG91dFxuICAgICAgfVxuXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBvcHRpb25zID0gcGFyYW1ldGVyc1swXVxuICAgICAgc3RyZWFtID0gSXMuc3RyaW5nKHBhcmFtZXRlcnNbMV0pID8gRmlsZVN5c3RlbS5jcmVhdGVXcml0ZVN0cmVhbShwYXJhbWV0ZXJzWzFdLCB7XG4gICAgICAgICdmbGFncyc6ICdhJyxcbiAgICAgICAgJ2VuY29kaW5nJzogJ3V0ZjgnLFxuICAgICAgICAnYXV0b0Nsb3NlJzogdHJ1ZVxuICAgICAgfSkgOiBwYXJhbWV0ZXJzWzFdXG4gIH1cblxuICByZXR1cm4gWyBvcHRpb25zLCBzdHJlYW0gXVxuXG59XG5cbkxvZy5jcmVhdGVMb2cgPSBmdW5jdGlvbiAoLi4ucGFyYW1ldGVycykge1xuXG4gIGxldCBbIHVzZXJMb2dPcHRpb25zLCB1c2VyU3RyZWFtIF0gPSB0aGlzLmdldFBhcmFtZXRlcnMocGFyYW1ldGVycylcblxuICBsZXQgZGVmYXVsdExvZ09wdGlvbnMgPSBudWxsXG5cbiAgaWYgKElzTm9kZSkge1xuICAgIGRlZmF1bHRMb2dPcHRpb25zID0ge1xuICAgICAgJ2xldmVsJzogJ2RlYnVnJyxcbiAgICAgICdtZXNzYWdlS2V5JzogJ21lc3NhZ2UnXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGRlZmF1bHRMb2dPcHRpb25zID0ge1xuICAgICAgJ2Jyb3dzZXInOiB7XG4gICAgICAgICdhc09iamVjdCc6IHRydWVcbiAgICAgIH0sXG4gICAgICAnbGV2ZWwnOiAnZGVidWcnLFxuICAgICAgJ21lc3NhZ2VLZXknOiAnbWVzc2FnZSdcbiAgICB9XG4gIH1cblxuICBsZXQgbG9nT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdExvZ09wdGlvbnMsIHVzZXJMb2dPcHRpb25zKVxuICBsZXQgbG9nID0gUGluby5jYWxsKHRoaXMsIGxvZ09wdGlvbnMsIHVzZXJTdHJlYW0pXG5cbiAgZm9yIChsZXQgbGV2ZWwgaW4gdGhpcy5sZXZlbHMudmFsdWVzKSB7XG4gICAgdGhpc1tsZXZlbF0gPSAoLi4ucGFyYW1ldGVycykgPT4gbG9nW2xldmVsXS5hcHBseShsb2csIHBhcmFtZXRlcnMpXG4gIH1cblxuICBMb2cudHJhY2UoSXMuZW1wdHlPYmplY3QobG9nT3B0aW9ucykgPyB7fSA6IHsgJ2xvZ09wdGlvbnMnOiBsb2dPcHRpb25zIH0sICdMb2cuY3JlYXRlTG9nKC4uLnBhcmFtZXRlcnMpIHsgLi4uIH0nKVxuXG59XG5cbkxvZy5jcmVhdGVGb3JtYXR0ZWRMb2cgPSBmdW5jdGlvbiAoLi4ucGFyYW1ldGVycykge1xuXG4gIGxldCBbIHVzZXJPcHRpb25zLCB1c2VyU3RyZWFtIF0gPSB0aGlzLmdldFBhcmFtZXRlcnMocGFyYW1ldGVycylcblxuICBsZXQgdXNlckZvcm1hdE9wdGlvbnMgPSB1c2VyT3B0aW9ucy5wcmV0dHlQcmludCA/IHVzZXJPcHRpb25zLnByZXR0eVByaW50IDoge31cblxuICBkZWxldGUgdXNlck9wdGlvbnMucHJldHR5UHJpbnRcblxuICBsZXQgZGVmYXVsdEZvcm1hdE9wdGlvbnMgPSB7XG4gICAgJ2Zvcm1hdHRlcic6IHRoaXMuZm9ybWF0LFxuICAgICdtZXNzYWdlS2V5JzogJ21lc3NhZ2UnXG4gIH1cblxuICBsZXQgZm9ybWF0T3B0aW9ucyA9IHVzZXJGb3JtYXRPcHRpb25zID09IHRydWUgPyB7ICdtZXNzYWdlS2V5JzogdXNlck9wdGlvbnMubWVzc2FnZUtleSB8fCAnbWVzc2FnZScgfSA6IE9iamVjdC5hc3NpZ24oZGVmYXVsdEZvcm1hdE9wdGlvbnMsIHVzZXJGb3JtYXRPcHRpb25zKVxuXG4gIGxldCBmb3JtYXR0ZWRTdHJlYW0gPSBMb2cucHJldHR5KGZvcm1hdE9wdGlvbnMpXG4gIGZvcm1hdHRlZFN0cmVhbS5waXBlKHVzZXJTdHJlYW0pXG5cbiAgdGhpcy5jcmVhdGVMb2codXNlck9wdGlvbnMsIGZvcm1hdHRlZFN0cmVhbSlcblxuICBMb2cudHJhY2UoSXMuZW1wdHlPYmplY3QoZm9ybWF0T3B0aW9ucykgPyB7fSA6IHsgJ2Zvcm1hdE9wdGlvbnMnOiBmb3JtYXRPcHRpb25zIH0sICdMb2cuY3JlYXRlRm9ybWF0dGVkTG9nKC4uLnBhcmFtZXRlcnMpIHsgLi4uIH0nKVxuXG59XG5cbkxvZy5jcmVhdGVMb2coKVxuXG5leHBvcnQgZGVmYXVsdCBMb2dcbiJdfQ==