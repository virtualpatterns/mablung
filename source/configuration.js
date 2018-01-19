export default {

  'process': {
    'logPath': `${process.env.HOME}/Library/Logs/mablung/mablung-process.log`,
    'pidPath': `${process.env.HOME}/Library/Logs/mablung/mablung-process.pid`,
    'timeouts': {
      'exit': 5000,
      'wait': 15000
    }
  },

  'server': {
    'address': '0.0.0.0',
    'logPath': `${process.env.HOME}/Library/Logs/mablung/mablung-server.log`,
    'port': 8080
  },

  'tests': {
    'logPath': `${process.env.HOME}/Library/Logs/mablung/mablung-tests.log`
  }

}
