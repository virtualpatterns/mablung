'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _isRelative = require('is-relative');

var _isRelative2 = _interopRequireDefault(_isRelative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Process = process; // require('./process')

var Path = Object.create(_path2.default);

Path.isRelative = function (path) {
  return (0, _isRelative2.default)(path);
};

Path.trim = function (path) {

  // const Process = process // require('./process')

  return path.replace(Process.cwd(), '.');
};

exports.default = Path;
//# sourceMappingURL=path.js.map