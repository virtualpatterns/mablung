export default {

  'process': {
    'exitTimeout': 5000,
  },

  'server': {
    'address': '0.0.0.0',
    'logPath': `${process.env.HOME}/Library/Logs/mablung/mablung-server.log`,
    'port': 8080
  },

  'tests': {
    'logPath': `${process.env.HOME}/Library/Logs/mablung/mablung-tests.log`,
    'outPath': `${process.env.HOME}/Library/Logs/mablung/mablung-tests.out`,
    'pidPath': `${process.env.HOME}/Library/Logs/mablung/mablung-tests.pid`,
    'whenTimeout': 250,
    'whenDuration': 3000,
    'process': {
      'modulePath': `${__dirname}/tests/library/resources/process.js`,
      'logPath': `${process.env.HOME}/Library/Logs/mablung/mablung-process.log`,
      'pidPath': `${process.env.HOME}/Library/Logs/mablung/mablung-process.pid`,
      'waitTimeout': 15000
    }
  }

}
