import 'babel-polyfill'

// import { Log } from '../index'
// import Configuration from '../configuration'

before(() => {
  // Log.createFormattedLog(Configuration.tests.logPath)
  // Log.debug('before(() => { ... })')
  // Log.debug({ 'Configuration': Configuration })
})

// require('./library/file-system')
// require('./library/log')
// require('./library/path')
// require('./library/process')

require('./library/index')

after(() => {
  // Log.debug('after(() => { ... })')
})
