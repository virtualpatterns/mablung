'use strict';

var _configuration = require('../../../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _log = require('../../../library/log');

var _process = require('../../../library/process');

var _process2 = _interopRequireDefault(_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log.Logger.createFormattedLog(_configuration2.default.process.logPath);
_process2.default.createPID(_configuration2.default.process.pidPath);

_log.Log.debug(_configuration2.default);

_process2.default.on('message', function (message) {
  _log.Log.debug({ 'message': message }, 'Process.on(\'message\', (message) => { ... })');
  _process2.default.exit(1);
});

_process2.default.once('SIGINT', function () {
  _log.Log.debug('Process.once(\'SIGINT\', () => { ... })');
  _process2.default.exit(2);
});

var wait = function wait(start) {
  _log.Log.debug('wait(\'' + start.toISOString() + '\') ' + (new Date() - start) + 'ms');
  setTimeout(function () {
    return wait(start);
  }, _configuration2.default.process.timeouts.wait);
};

wait(new Date());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS90ZXN0cy9saWJyYXJ5L3Jlc291cmNlcy9wcm9jZXNzLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUZvcm1hdHRlZExvZyIsInByb2Nlc3MiLCJsb2dQYXRoIiwiY3JlYXRlUElEIiwicGlkUGF0aCIsImRlYnVnIiwib24iLCJtZXNzYWdlIiwiZXhpdCIsIm9uY2UiLCJ3YWl0Iiwic3RhcnQiLCJ0b0lTT1N0cmluZyIsIkRhdGUiLCJzZXRUaW1lb3V0IiwidGltZW91dHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsWUFBT0Esa0JBQVAsQ0FBMEIsd0JBQWNDLE9BQWQsQ0FBc0JDLE9BQWhEO0FBQ0Esa0JBQVFDLFNBQVIsQ0FBa0Isd0JBQWNGLE9BQWQsQ0FBc0JHLE9BQXhDOztBQUVBLFNBQUlDLEtBQUo7O0FBRUEsa0JBQVFDLEVBQVIsQ0FBVyxTQUFYLEVBQXNCLFVBQUNDLE9BQUQsRUFBYTtBQUNqQyxXQUFJRixLQUFKLENBQVUsRUFBRSxXQUFXRSxPQUFiLEVBQVYsRUFBa0MsK0NBQWxDO0FBQ0Esb0JBQVFDLElBQVIsQ0FBYSxDQUFiO0FBQ0QsQ0FIRDs7QUFLQSxrQkFBUUMsSUFBUixDQUFhLFFBQWIsRUFBdUIsWUFBTTtBQUMzQixXQUFJSixLQUFKLENBQVUseUNBQVY7QUFDQSxvQkFBUUcsSUFBUixDQUFhLENBQWI7QUFDRCxDQUhEOztBQUtBLElBQU1FLE9BQU8sU0FBUEEsSUFBTyxDQUFVQyxLQUFWLEVBQWlCO0FBQzVCLFdBQUlOLEtBQUosYUFBbUJNLE1BQU1DLFdBQU4sRUFBbkIsYUFBNkMsSUFBSUMsSUFBSixFQUFELEdBQWVGLEtBQTNEO0FBQ0FHLGFBQVc7QUFBQSxXQUFNSixLQUFLQyxLQUFMLENBQU47QUFBQSxHQUFYLEVBQThCLHdCQUFjVixPQUFkLENBQXNCYyxRQUF0QixDQUErQkwsSUFBN0Q7QUFDRCxDQUhEOztBQUtBQSxLQUFLLElBQUlHLElBQUosRUFBTCIsImZpbGUiOiJwcm9jZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi4vLi4vLi4vY29uZmlndXJhdGlvbidcbmltcG9ydCB7IExvZ2dlciwgTG9nIH0gZnJvbSAnLi4vLi4vLi4vbGlicmFyeS9sb2cnXG5pbXBvcnQgUHJvY2VzcyBmcm9tICcuLi8uLi8uLi9saWJyYXJ5L3Byb2Nlc3MnXG5cbkxvZ2dlci5jcmVhdGVGb3JtYXR0ZWRMb2coQ29uZmlndXJhdGlvbi5wcm9jZXNzLmxvZ1BhdGgpXG5Qcm9jZXNzLmNyZWF0ZVBJRChDb25maWd1cmF0aW9uLnByb2Nlc3MucGlkUGF0aClcblxuTG9nLmRlYnVnKENvbmZpZ3VyYXRpb24pXG5cblByb2Nlc3Mub24oJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICBMb2cuZGVidWcoeyAnbWVzc2FnZSc6IG1lc3NhZ2UgfSwgJ1Byb2Nlc3Mub24oXFwnbWVzc2FnZVxcJywgKG1lc3NhZ2UpID0+IHsgLi4uIH0pJylcbiAgUHJvY2Vzcy5leGl0KDEpXG59KVxuXG5Qcm9jZXNzLm9uY2UoJ1NJR0lOVCcsICgpID0+IHtcbiAgTG9nLmRlYnVnKCdQcm9jZXNzLm9uY2UoXFwnU0lHSU5UXFwnLCAoKSA9PiB7IC4uLiB9KScpXG4gIFByb2Nlc3MuZXhpdCgyKVxufSlcblxuY29uc3Qgd2FpdCA9IGZ1bmN0aW9uIChzdGFydCkge1xuICBMb2cuZGVidWcoYHdhaXQoJyR7c3RhcnQudG9JU09TdHJpbmcoKX0nKSAkeyhuZXcgRGF0ZSgpKSAtIHN0YXJ0fW1zYClcbiAgc2V0VGltZW91dCgoKSA9PiB3YWl0KHN0YXJ0KSwgQ29uZmlndXJhdGlvbi5wcm9jZXNzLnRpbWVvdXRzLndhaXQpXG59XG5cbndhaXQobmV3IERhdGUoKSlcbiJdfQ==