'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _detectNode = require('detect-node');

var _detectNode2 = _interopRequireDefault(_detectNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = null;

if (_detectNode2.default) {

  index = {
    'FileSystem': require('./library/file-system'),
    'Log': require('./library/log'),
    'Path': require('./library/path'),
    'Process': require('./library/process')
  };
} else {

  index = {
    'Log': require('./library/log')
  };
}

exports.default = index;
module.exports = exports['default'];