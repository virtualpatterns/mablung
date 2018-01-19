'use strict';

require('babel-polyfill');

var _log = require('../library/log');

var _configuration = require('../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

before(function () {
  _log.Logger.createFormattedLog(_configuration2.default.tests.logPath);
  _log.Log.trace('before(() => { ... })');
});

require('./library/file-system');
// require('./library/log')
// require('./library/path')
// require('./library/process')

after(function () {
  _log.Log.trace('after(() => { ... })');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS90ZXN0cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJiZWZvcmUiLCJjcmVhdGVGb3JtYXR0ZWRMb2ciLCJ0ZXN0cyIsImxvZ1BhdGgiLCJ0cmFjZSIsInJlcXVpcmUiLCJhZnRlciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTs7QUFDQTs7Ozs7O0FBRUFBLE9BQU8sWUFBTTtBQUNYLGNBQU9DLGtCQUFQLENBQTBCLHdCQUFjQyxLQUFkLENBQW9CQyxPQUE5QztBQUNBLFdBQUlDLEtBQUosQ0FBVSx1QkFBVjtBQUNELENBSEQ7O0FBS0FDLFFBQVEsdUJBQVI7QUFDQTtBQUNBO0FBQ0E7O0FBRUFDLE1BQU0sWUFBTTtBQUNWLFdBQUlGLEtBQUosQ0FBVSxzQkFBVjtBQUNELENBRkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5pbXBvcnQgeyBMb2csIExvZ2dlciB9IGZyb20gJy4uL2xpYnJhcnkvbG9nJ1xuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi4vY29uZmlndXJhdGlvbidcblxuYmVmb3JlKCgpID0+IHtcbiAgTG9nZ2VyLmNyZWF0ZUZvcm1hdHRlZExvZyhDb25maWd1cmF0aW9uLnRlc3RzLmxvZ1BhdGgpXG4gIExvZy50cmFjZSgnYmVmb3JlKCgpID0+IHsgLi4uIH0pJylcbn0pXG5cbnJlcXVpcmUoJy4vbGlicmFyeS9maWxlLXN5c3RlbScpXG4vLyByZXF1aXJlKCcuL2xpYnJhcnkvbG9nJylcbi8vIHJlcXVpcmUoJy4vbGlicmFyeS9wYXRoJylcbi8vIHJlcXVpcmUoJy4vbGlicmFyeS9wcm9jZXNzJylcblxuYWZ0ZXIoKCkgPT4ge1xuICBMb2cudHJhY2UoJ2FmdGVyKCgpID0+IHsgLi4uIH0pJylcbn0pXG4iXX0=