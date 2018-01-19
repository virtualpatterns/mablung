'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Process = exports.Path = exports.Log = exports.FileSystem = undefined;

var _fileSystem = require('./library/file-system');

var _fileSystem2 = _interopRequireDefault(_fileSystem);

var _log = require('./library/log');

var _log2 = _interopRequireDefault(_log);

var _path = require('./library/path');

var _path2 = _interopRequireDefault(_path);

var _process = require('./library/process');

var _process2 = _interopRequireDefault(_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import IsNode from 'detect-node'
//
// let index = null
//
// if (IsNode) {
//
//   index = {
//     'FileSystem': require('./library/file-system'),
//     'Log': require('./library/log'),
//     'Path': require('./library/path'),
//     'Process': require('./library/process')
//   }
//
// } else {
//
//   index = {
//     'Log': require('./library/log')
//   }
//
// }
//
// export default index

exports.FileSystem = _fileSystem2.default;
exports.Log = _log2.default;
exports.Path = _path2.default;
exports.Process = _process2.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJGaWxlU3lzdGVtIiwiTG9nIiwiUGF0aCIsIlByb2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQTFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7UUFPU0EsVTtRQUFZQyxHO1FBQUtDLEk7UUFBTUMsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBJc05vZGUgZnJvbSAnZGV0ZWN0LW5vZGUnXG4vL1xuLy8gbGV0IGluZGV4ID0gbnVsbFxuLy9cbi8vIGlmIChJc05vZGUpIHtcbi8vXG4vLyAgIGluZGV4ID0ge1xuLy8gICAgICdGaWxlU3lzdGVtJzogcmVxdWlyZSgnLi9saWJyYXJ5L2ZpbGUtc3lzdGVtJyksXG4vLyAgICAgJ0xvZyc6IHJlcXVpcmUoJy4vbGlicmFyeS9sb2cnKSxcbi8vICAgICAnUGF0aCc6IHJlcXVpcmUoJy4vbGlicmFyeS9wYXRoJyksXG4vLyAgICAgJ1Byb2Nlc3MnOiByZXF1aXJlKCcuL2xpYnJhcnkvcHJvY2VzcycpXG4vLyAgIH1cbi8vXG4vLyB9IGVsc2Uge1xuLy9cbi8vICAgaW5kZXggPSB7XG4vLyAgICAgJ0xvZyc6IHJlcXVpcmUoJy4vbGlicmFyeS9sb2cnKVxuLy8gICB9XG4vL1xuLy8gfVxuLy9cbi8vIGV4cG9ydCBkZWZhdWx0IGluZGV4XG5cbmltcG9ydCBGaWxlU3lzdGVtIGZyb20gJy4vbGlicmFyeS9maWxlLXN5c3RlbSdcbmltcG9ydCBMb2cgZnJvbSAnLi9saWJyYXJ5L2xvZydcbmltcG9ydCBQYXRoIGZyb20gJy4vbGlicmFyeS9wYXRoJ1xuaW1wb3J0IFByb2Nlc3MgZnJvbSAnLi9saWJyYXJ5L3Byb2Nlc3MnXG5cbmV4cG9ydCB7IEZpbGVTeXN0ZW0sIExvZywgUGF0aCwgUHJvY2VzcyB9XG4iXX0=