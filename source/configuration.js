
const PORT = 8080

const PATTERN_DATETIME = '\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d:[0-5]\\d|Z)'
const PATTERN_HOSTNAME = '(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])'
const PATTERN_PID = '\\d+'

export default {

  'process': {
    'exitTimeout': 5000
  },

  'server': {
    'address': '0.0.0.0',
    'logPath': `${process.env.HOME}/Library/Logs/mablung/mablung-server.log`,
    'port': PORT
  },

  'tests': {
    'patterns': {
      'prefixBrowser': `${PATTERN_DATETIME}`,
      'prefixNode': `${PATTERN_DATETIME} ${PATTERN_HOSTNAME} ${PATTERN_PID}`
    },
    'logPath': `${process.env.HOME}/Library/Logs/mablung/mablung-tests.log`,
    'outPath': `${process.env.HOME}/Library/Logs/mablung/mablung-tests.out`,
    'pidPath': `${process.env.HOME}/Library/Logs/mablung/mablung-tests.pid`,
    'requirePath': `${process.env.HOME}/Library/Logs/mablung/mablung-tests.json`,
    'whenTimeout': 250,
    'whenDuration': 3000,
    'process': {
      'modulePath': `${__dirname}/tests/library/resources/process.js`,
      'logPath': `${process.env.HOME}/Library/Logs/mablung/mablung-process.log`,
      'pidPath': `${process.env.HOME}/Library/Logs/mablung/mablung-process.pid`,
      'waitTimeout': 15000
    },
    'screenshotPath': `${process.cwd()}/mablung-tests.png`,
    'serverUrl': `http://0.0.0.0:${PORT}`,
  }

}
