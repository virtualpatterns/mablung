'use strict';

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _restifyPlugins = require('restify-plugins');

var _restifyPlugins2 = _interopRequireDefault(_restifyPlugins);

var _configuration = require('../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _index = require('../index');

var _path = require('../library/path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REGEXP_STATIC = /^\/www\/(.*)$/;

_index.Log.createFormattedLog();
// Log.createFormattedLog(Configuration.server.logPath)

_index.Log.debug({ 'Configuration': _configuration2.default });

var server = _restify2.default.createServer();

server.on('restifyError', function (request, response, error, callback) {
  _index.Log.error('server.on(\'restifyError\', (request, response, error, callback) => { ... })');
  _index.Log.error(error);
  return callback();
});

server.use(function (request, response, next) {
  _index.Log.debug(request.method + ' ' + request.url);
  return next();
});

server.get('/favicon.ico', function (request, response, next) {
  _restifyPlugins2.default.serveStatic({
    'directory': _path2.default.join(__dirname, '..', 'www', 'resources'),
    'file': 'application.ico',
    'maxAge': 0
  })(request, response, next);
});

server.get('/', function (request, response, next) {
  response.redirect('/www/index.html', next);
});

server.get('/www', function (request, response, next) {
  response.redirect('/www/index.html', next);
});

server.get(REGEXP_STATIC, function (request, response, next) {
  _restifyPlugins2.default.serveStatic({
    'directory': _path2.default.join(__dirname, '..', 'www'),
    'file': request.params[0],
    'maxAge': 0
  })(request, response, next);
});

server.listen(_configuration2.default.server.port, _configuration2.default.server.address, function () {
  _index.Log.debug('server.listen(' + _configuration2.default.server.port + ', \'' + _configuration2.default.server.address + '\', () => { ... })');
});
//# sourceMappingURL=index.js.map