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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L3BhdGguanMiXSwibmFtZXMiOlsiUHJvY2VzcyIsInByb2Nlc3MiLCJQYXRoIiwiT2JqZWN0IiwiY3JlYXRlIiwiaXNSZWxhdGl2ZSIsInBhdGgiLCJ0cmltIiwicmVwbGFjZSIsImN3ZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVUMsT0FBaEIsQyxDQUF3Qjs7QUFFeEIsSUFBTUMsT0FBT0MsT0FBT0MsTUFBUCxnQkFBYjs7QUFFQUYsS0FBS0csVUFBTCxHQUFrQixVQUFTQyxJQUFULEVBQWU7QUFDL0IsU0FBTywwQkFBV0EsSUFBWCxDQUFQO0FBQ0QsQ0FGRDs7QUFJQUosS0FBS0ssSUFBTCxHQUFZLFVBQVVELElBQVYsRUFBZ0I7O0FBRTFCOztBQUVBLFNBQU9BLEtBQUtFLE9BQUwsQ0FBYVIsUUFBUVMsR0FBUixFQUFiLEVBQTRCLEdBQTVCLENBQVA7QUFFRCxDQU5EOztrQkFRZVAsSSIsImZpbGUiOiJwYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9QYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgSXNSZWxhdGl2ZSBmcm9tICdpcy1yZWxhdGl2ZSdcblxuY29uc3QgUHJvY2VzcyA9IHByb2Nlc3MgLy8gcmVxdWlyZSgnLi9wcm9jZXNzJylcblxuY29uc3QgUGF0aCA9IE9iamVjdC5jcmVhdGUoX1BhdGgpXG5cblBhdGguaXNSZWxhdGl2ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIElzUmVsYXRpdmUocGF0aClcbn1cblxuUGF0aC50cmltID0gZnVuY3Rpb24gKHBhdGgpIHtcblxuICAvLyBjb25zdCBQcm9jZXNzID0gcHJvY2VzcyAvLyByZXF1aXJlKCcuL3Byb2Nlc3MnKVxuXG4gIHJldHVybiBwYXRoLnJlcGxhY2UoUHJvY2Vzcy5jd2QoKSwgJy4nKVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhdGhcbiJdfQ==