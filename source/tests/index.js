import 'babel-polyfill'

import { Log, Logger } from '../library/log'
import Configuration from '../configuration'

before(() => {
  Logger.createFormattedLog(Configuration.tests.logPath)
  Log.trace('before(() => { ... })')
})

require('./library/file-system')
// require('./library/log')
// require('./library/path')
// require('./library/process')

after(() => {
  Log.trace('after(() => { ... })')
})
