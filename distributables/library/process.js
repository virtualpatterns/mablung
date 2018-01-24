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

  var pid = _fs2.default.readFileSync(path, { 'encoding': 'utf-8' });

  try {
    process.kill(pid, 0);
  } catch (error) {
    _fs2.default.unlinkSync(path);
    return false;
  }

  return true;
};

Process.createPID = function (path) {

  if (this.existsPID(path)) {
    throw new _argumentError2.default('The path \'' + _path2.default.trim(path) + '\' exists.');
  } else {

    _fs2.default.writeFileSync(path, process.pid, { 'encoding': 'utf-8' });

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


  if (this.existsPID(path)) {

    var pid = _fs2.default.readFileSync(path, { 'encoding': 'utf-8' });

    process.kill(pid, signal);
  } else {
    throw new _argumentError2.default('The path \'' + _path2.default.trim(path) + '\' does not exist.');
  }

  return this;
};

Process.exit = function () {
  var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


  setTimeout(function () {
    return process.exit(code);
  }, _configuration2.default.process.exitTimeout);

  return this;
};

exports.default = Process;
//# sourceMappingURL=process.js.map