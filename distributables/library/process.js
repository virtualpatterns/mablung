'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _configuration = require('../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _argumentError = require('./errors/argument-error');

var _argumentError2 = _interopRequireDefault(_argumentError);

var _processError = require('./errors/process-error');

var _processError2 = _interopRequireDefault(_processError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require('./file-system')

var Process = Object.create(process);

Process.when = function (timeout, maximumDuration, testFn) {

  // const Log = require('./log').Log

  // Log.debug(`Process.when(${timeout}, ${maximumDuration}, testFn) { ... }`)

  return new Promise(function (resolve, reject) {

    var waitLoop = function waitLoop(start) {

      var duration = new Date() - start;

      testFn(function (error) {
        if (error && duration < maximumDuration) {
          setTimeout(function () {
            return waitLoop(start);
          }, timeout);
        } else if (duration >= maximumDuration) {
          reject(new _processError2.default('The duration was exceeded.'));
        } else {
          resolve();
        }
      });
    };

    waitLoop(new Date());
  });
};

Process.existsPID = function (path) {

  try {
    _fs2.default.accessSync(path, _fs2.default.F_OK);
  } catch (error) {
    return false;
  }

  var pid = _fs2.default.readFileSync(path, {
    encoding: 'utf-8'
  });

  try {
    process.kill(pid, 0);
  } catch (error) {
    _fs2.default.unlinkSync(path);
    return false;
  }

  return true;
};

Process.createPID = function (path) {

  // const FileSystem = require('fs') // require('./file-system')
  // const Log = require('./log').Log
  // const Path = require('./path')

  // Log.debug(`Process.createPID('${Path.trim(path)}')`)

  if (this.existsPID(path)) {
    throw new _argumentError2.default('The path \'' + _path2.default.trim(path) + '\' exists.');
  } else {

    _fs2.default.writeFileSync(path, process.pid, {
      encoding: 'utf-8'
    });

    Process.on('exit', function () {
      try {
        _fs2.default.accessSync(path, _fs2.default.F_OK);
        _fs2.default.unlinkSync(path);
      } catch (error) {
        // Do nothing
      }
    });
  }

  return this;
};

Process.killPID = function (path) {
  var signal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'SIGINT';


  // const FileSystem = require('fs') // require('./file-system')
  // const Log = require('./log').Log
  // const Path = require('./path')

  // Log.debug(`Process.killPID('${Path.trim(path)}', ${signal})`)

  if (this.existsPID(path)) {

    var pid = _fs2.default.readFileSync(path, {
      encoding: 'utf-8'
    });

    process.kill(pid, signal);
  } else {
    throw new _argumentError2.default('The path \'' + _path2.default.trim(path) + '\' does not exist.');
  }

  return this;
};

Process.exit = function () {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


  // const Log = require('./log').Log

  // Log.debug(`Process.exit(${code})`, )

  setTimeout(function () {
    return process.exit(code);
  }, _configuration2.default.process.timeouts.exit);

  return this;
};

exports.default = Process;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9saWJyYXJ5L3Byb2Nlc3MuanMiXSwibmFtZXMiOlsiUHJvY2VzcyIsIk9iamVjdCIsImNyZWF0ZSIsInByb2Nlc3MiLCJ3aGVuIiwidGltZW91dCIsIm1heGltdW1EdXJhdGlvbiIsInRlc3RGbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2FpdExvb3AiLCJzdGFydCIsImR1cmF0aW9uIiwiRGF0ZSIsImVycm9yIiwic2V0VGltZW91dCIsImV4aXN0c1BJRCIsInBhdGgiLCJhY2Nlc3NTeW5jIiwiRl9PSyIsInBpZCIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIiwia2lsbCIsInVubGlua1N5bmMiLCJjcmVhdGVQSUQiLCJ0cmltIiwid3JpdGVGaWxlU3luYyIsIm9uIiwia2lsbFBJRCIsInNpZ25hbCIsImV4aXQiLCJjb2RlIiwidGltZW91dHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQU40Qjs7QUFRNUIsSUFBTUEsVUFBVUMsT0FBT0MsTUFBUCxDQUFjQyxPQUFkLENBQWhCOztBQUVBSCxRQUFRSSxJQUFSLEdBQWUsVUFBVUMsT0FBVixFQUFtQkMsZUFBbkIsRUFBb0NDLE1BQXBDLEVBQTRDOztBQUV6RDs7QUFFQTs7QUFFQSxTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7O0FBRXRDLFFBQUlDLFdBQVcsU0FBWEEsUUFBVyxDQUFVQyxLQUFWLEVBQWlCOztBQUU5QixVQUFJQyxXQUFXLElBQUlDLElBQUosS0FBYUYsS0FBNUI7O0FBRUFMLGFBQU8sVUFBQ1EsS0FBRCxFQUFXO0FBQ2hCLFlBQUlBLFNBQVNGLFdBQVdQLGVBQXhCLEVBQXlDO0FBQ3ZDVSxxQkFBVztBQUFBLG1CQUFNTCxTQUFTQyxLQUFULENBQU47QUFBQSxXQUFYLEVBQWtDUCxPQUFsQztBQUNELFNBRkQsTUFFTyxJQUFJUSxZQUFZUCxlQUFoQixFQUFpQztBQUN0Q0ksaUJBQU8sMkJBQWlCLDRCQUFqQixDQUFQO0FBQ0QsU0FGTSxNQUVBO0FBQ0xEO0FBQ0Q7QUFDRixPQVJEO0FBU0QsS0FiRDs7QUFlQUUsYUFBUyxJQUFJRyxJQUFKLEVBQVQ7QUFFRCxHQW5CTSxDQUFQO0FBcUJELENBM0JEOztBQTZCQWQsUUFBUWlCLFNBQVIsR0FBb0IsVUFBVUMsSUFBVixFQUFnQjs7QUFFbEMsTUFBSTtBQUNGLGlCQUFXQyxVQUFYLENBQXNCRCxJQUF0QixFQUE0QixhQUFXRSxJQUF2QztBQUNELEdBRkQsQ0FFRSxPQUFPTCxLQUFQLEVBQWM7QUFDZCxXQUFPLEtBQVA7QUFDRDs7QUFFRCxNQUFJTSxNQUFNLGFBQVdDLFlBQVgsQ0FBd0JKLElBQXhCLEVBQThCO0FBQ3RDSyxjQUFVO0FBRDRCLEdBQTlCLENBQVY7O0FBSUEsTUFBSTtBQUNGcEIsWUFBUXFCLElBQVIsQ0FBYUgsR0FBYixFQUFrQixDQUFsQjtBQUNELEdBRkQsQ0FFRSxPQUFPTixLQUFQLEVBQWM7QUFDZCxpQkFBV1UsVUFBWCxDQUFzQlAsSUFBdEI7QUFDQSxXQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFPLElBQVA7QUFFRCxDQXJCRDs7QUF1QkFsQixRQUFRMEIsU0FBUixHQUFvQixVQUFVUixJQUFWLEVBQWdCOztBQUVsQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsTUFBSSxLQUFLRCxTQUFMLENBQWVDLElBQWYsQ0FBSixFQUEwQjtBQUN4QixVQUFNLDRDQUErQixlQUFLUyxJQUFMLENBQVVULElBQVYsQ0FBL0IsZ0JBQU47QUFDRCxHQUZELE1BRU87O0FBRUwsaUJBQVdVLGFBQVgsQ0FBeUJWLElBQXpCLEVBQStCZixRQUFRa0IsR0FBdkMsRUFBNEM7QUFDMUNFLGdCQUFVO0FBRGdDLEtBQTVDOztBQUlBdkIsWUFBUTZCLEVBQVIsQ0FBVyxNQUFYLEVBQW1CLFlBQU07QUFDdkIsVUFBSTtBQUNGLHFCQUFXVixVQUFYLENBQXNCRCxJQUF0QixFQUE0QixhQUFXRSxJQUF2QztBQUNBLHFCQUFXSyxVQUFYLENBQXNCUCxJQUF0QjtBQUNELE9BSEQsQ0FHRSxPQUFPSCxLQUFQLEVBQWM7QUFDZDtBQUNEO0FBQ0YsS0FQRDtBQVNEOztBQUVELFNBQU8sSUFBUDtBQUVELENBN0JEOztBQStCQWYsUUFBUThCLE9BQVIsR0FBa0IsVUFBVVosSUFBVixFQUFtQztBQUFBLE1BQW5CYSxNQUFtQix1RUFBVixRQUFVOzs7QUFFbkQ7QUFDQTtBQUNBOztBQUVBOztBQUVBLE1BQUksS0FBS2QsU0FBTCxDQUFlQyxJQUFmLENBQUosRUFBMEI7O0FBRXhCLFFBQUlHLE1BQU0sYUFBV0MsWUFBWCxDQUF3QkosSUFBeEIsRUFBOEI7QUFDdENLLGdCQUFVO0FBRDRCLEtBQTlCLENBQVY7O0FBSUFwQixZQUFRcUIsSUFBUixDQUFhSCxHQUFiLEVBQWtCVSxNQUFsQjtBQUVELEdBUkQsTUFRTztBQUNMLFVBQU0sNENBQStCLGVBQUtKLElBQUwsQ0FBVVQsSUFBVixDQUEvQix3QkFBTjtBQUNEOztBQUVELFNBQU8sSUFBUDtBQUVELENBdEJEOztBQXdCQWxCLFFBQVFnQyxJQUFSLEdBQWUsWUFBb0I7QUFBQSxNQUFWQyxJQUFVLHVFQUFILENBQUc7OztBQUVqQzs7QUFFQTs7QUFFQWpCLGFBQVc7QUFBQSxXQUFNYixRQUFRNkIsSUFBUixDQUFhQyxJQUFiLENBQU47QUFBQSxHQUFYLEVBQXFDLHdCQUFjOUIsT0FBZCxDQUFzQitCLFFBQXRCLENBQStCRixJQUFwRTs7QUFFQSxTQUFPLElBQVA7QUFFRCxDQVZEOztrQkFZZWhDLE8iLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGaWxlU3lzdGVtIGZyb20gJ2ZzJyAvLyByZXF1aXJlKCcuL2ZpbGUtc3lzdGVtJylcblxuaW1wb3J0IENvbmZpZ3VyYXRpb24gZnJvbSAnLi4vY29uZmlndXJhdGlvbidcbmltcG9ydCBQYXRoIGZyb20gJy4vcGF0aCdcblxuaW1wb3J0IEFyZ3VtZW50RXJyb3IgZnJvbSAnLi9lcnJvcnMvYXJndW1lbnQtZXJyb3InXG5pbXBvcnQgUHJvY2Vzc0Vycm9yIGZyb20gJy4vZXJyb3JzL3Byb2Nlc3MtZXJyb3InXG5cbmNvbnN0IFByb2Nlc3MgPSBPYmplY3QuY3JlYXRlKHByb2Nlc3MpXG5cblByb2Nlc3Mud2hlbiA9IGZ1bmN0aW9uICh0aW1lb3V0LCBtYXhpbXVtRHVyYXRpb24sIHRlc3RGbikge1xuXG4gIC8vIGNvbnN0IExvZyA9IHJlcXVpcmUoJy4vbG9nJykuTG9nXG5cbiAgLy8gTG9nLmRlYnVnKGBQcm9jZXNzLndoZW4oJHt0aW1lb3V0fSwgJHttYXhpbXVtRHVyYXRpb259LCB0ZXN0Rm4pIHsgLi4uIH1gKVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBsZXQgd2FpdExvb3AgPSBmdW5jdGlvbiAoc3RhcnQpIHtcblxuICAgICAgbGV0IGR1cmF0aW9uID0gbmV3IERhdGUoKSAtIHN0YXJ0XG5cbiAgICAgIHRlc3RGbigoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yICYmIGR1cmF0aW9uIDwgbWF4aW11bUR1cmF0aW9uKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB3YWl0TG9vcChzdGFydCksIHRpbWVvdXQpXG4gICAgICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPj0gbWF4aW11bUR1cmF0aW9uKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBQcm9jZXNzRXJyb3IoJ1RoZSBkdXJhdGlvbiB3YXMgZXhjZWVkZWQuJykpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgd2FpdExvb3AobmV3IERhdGUoKSlcblxuICB9KVxuXG59XG5cblByb2Nlc3MuZXhpc3RzUElEID0gZnVuY3Rpb24gKHBhdGgpIHtcblxuICB0cnkge1xuICAgIEZpbGVTeXN0ZW0uYWNjZXNzU3luYyhwYXRoLCBGaWxlU3lzdGVtLkZfT0spXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBsZXQgcGlkID0gRmlsZVN5c3RlbS5yZWFkRmlsZVN5bmMocGF0aCwge1xuICAgIGVuY29kaW5nOiAndXRmLTgnXG4gIH0pXG5cbiAgdHJ5IHtcbiAgICBwcm9jZXNzLmtpbGwocGlkLCAwKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIEZpbGVTeXN0ZW0udW5saW5rU3luYyhwYXRoKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcblxufVxuXG5Qcm9jZXNzLmNyZWF0ZVBJRCA9IGZ1bmN0aW9uIChwYXRoKSB7XG5cbiAgLy8gY29uc3QgRmlsZVN5c3RlbSA9IHJlcXVpcmUoJ2ZzJykgLy8gcmVxdWlyZSgnLi9maWxlLXN5c3RlbScpXG4gIC8vIGNvbnN0IExvZyA9IHJlcXVpcmUoJy4vbG9nJykuTG9nXG4gIC8vIGNvbnN0IFBhdGggPSByZXF1aXJlKCcuL3BhdGgnKVxuXG4gIC8vIExvZy5kZWJ1ZyhgUHJvY2Vzcy5jcmVhdGVQSUQoJyR7UGF0aC50cmltKHBhdGgpfScpYClcblxuICBpZiAodGhpcy5leGlzdHNQSUQocGF0aCkpIHtcbiAgICB0aHJvdyBuZXcgQXJndW1lbnRFcnJvcihgVGhlIHBhdGggJyR7UGF0aC50cmltKHBhdGgpfScgZXhpc3RzLmApXG4gIH0gZWxzZSB7XG5cbiAgICBGaWxlU3lzdGVtLndyaXRlRmlsZVN5bmMocGF0aCwgcHJvY2Vzcy5waWQsIHtcbiAgICAgIGVuY29kaW5nOiAndXRmLTgnXG4gICAgfSlcblxuICAgIFByb2Nlc3Mub24oJ2V4aXQnLCAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBGaWxlU3lzdGVtLmFjY2Vzc1N5bmMocGF0aCwgRmlsZVN5c3RlbS5GX09LKVxuICAgICAgICBGaWxlU3lzdGVtLnVubGlua1N5bmMocGF0aClcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIERvIG5vdGhpbmdcbiAgICAgIH1cbiAgICB9KVxuXG4gIH1cblxuICByZXR1cm4gdGhpc1xuXG59XG5cblByb2Nlc3Mua2lsbFBJRCA9IGZ1bmN0aW9uIChwYXRoLCBzaWduYWwgPSAnU0lHSU5UJykge1xuXG4gIC8vIGNvbnN0IEZpbGVTeXN0ZW0gPSByZXF1aXJlKCdmcycpIC8vIHJlcXVpcmUoJy4vZmlsZS1zeXN0ZW0nKVxuICAvLyBjb25zdCBMb2cgPSByZXF1aXJlKCcuL2xvZycpLkxvZ1xuICAvLyBjb25zdCBQYXRoID0gcmVxdWlyZSgnLi9wYXRoJylcblxuICAvLyBMb2cuZGVidWcoYFByb2Nlc3Mua2lsbFBJRCgnJHtQYXRoLnRyaW0ocGF0aCl9JywgJHtzaWduYWx9KWApXG5cbiAgaWYgKHRoaXMuZXhpc3RzUElEKHBhdGgpKSB7XG5cbiAgICBsZXQgcGlkID0gRmlsZVN5c3RlbS5yZWFkRmlsZVN5bmMocGF0aCwge1xuICAgICAgZW5jb2Rpbmc6ICd1dGYtOCdcbiAgICB9KVxuXG4gICAgcHJvY2Vzcy5raWxsKHBpZCwgc2lnbmFsKVxuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEFyZ3VtZW50RXJyb3IoYFRoZSBwYXRoICcke1BhdGgudHJpbShwYXRoKX0nIGRvZXMgbm90IGV4aXN0LmApXG4gIH1cblxuICByZXR1cm4gdGhpc1xuXG59XG5cblByb2Nlc3MuZXhpdCA9IGZ1bmN0aW9uIChjb2RlID0gMCkge1xuXG4gIC8vIGNvbnN0IExvZyA9IHJlcXVpcmUoJy4vbG9nJykuTG9nXG5cbiAgLy8gTG9nLmRlYnVnKGBQcm9jZXNzLmV4aXQoJHtjb2RlfSlgLCApXG5cbiAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoY29kZSksIENvbmZpZ3VyYXRpb24ucHJvY2Vzcy50aW1lb3V0cy5leGl0KVxuXG4gIHJldHVybiB0aGlzXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvY2Vzc1xuIl19