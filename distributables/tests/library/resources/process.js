'use strict';

var _configuration = require('../../../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _index = require('../../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index.Log.createFormattedLog(_configuration2.default.tests.process.logPath);
_index.Process.createPID(_configuration2.default.tests.process.pidPath);

_index.Process.on('message', function (message) {
  _index.Log.debug({ 'message': message }, 'Process.on(\'message\', (message) => { ... })');
  _index.Process.exit(1);
});

_index.Process.once('SIGINT', function () {
  _index.Log.debug('Process.once(\'SIGINT\', () => { ... })');
  _index.Process.exit(2);
});

var wait = function wait(start) {
  _index.Log.debug('wait(\'' + start.toISOString() + '\') ' + (new Date() - start) + 'ms');
  setTimeout(function () {
    return wait(start);
  }, _configuration2.default.tests.process.waitTimeout);
};

wait(new Date());
//# sourceMappingURL=process.js.map