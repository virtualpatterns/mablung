'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _quickLocalIp = require('quick-local-ip');

var _quickLocalIp2 = _interopRequireDefault(_quickLocalIp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 8080;

exports.default = {

  'process': {
    'exitTimeout': 5000
  },

  'server': {
    'address': '0.0.0.0',
    'logPath': process.env.HOME + '/Library/Logs/mablung/mablung-server.log',
    'port': PORT
  },

  'tests': {
    'expressions': {
      'dateTime': '\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d:[0-5]\\d|Z)'
    },
    'logPath': process.env.HOME + '/Library/Logs/mablung/mablung-tests.log',
    'outPath': process.env.HOME + '/Library/Logs/mablung/mablung-tests.out',
    'pages': [],
    'pidPath': process.env.HOME + '/Library/Logs/mablung/mablung-tests.pid',
    'whenTimeout': 250,
    'whenDuration': 3000,
    'process': {
      'modulePath': __dirname + '/tests/library/resources/process.js',
      'logPath': process.env.HOME + '/Library/Logs/mablung/mablung-process.log',
      'pidPath': process.env.HOME + '/Library/Logs/mablung/mablung-process.pid',
      'waitTimeout': 15000
    },
    'screenshotPath': process.cwd() + '/mablung-tests.png',
    'serverUrl': 'http://' + _quickLocalIp2.default.getLocalIP4() + ':' + PORT
  }

};

//# sourceMappingURL=configuration.js.map