import 'babel-polyfill'

import { Log } from '../index'

// import { Log, Process } from '../index'

// Log.createLog({ 'level': 'trace', 'messageKey': 'babo' })
Log.createFormattedLog({ 'level': 'trace' })
// Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true })
// Log.createFormattedLog({ 'level': 'trace', 'messageKey': 'babo', 'prettyPrint': { 'messageKey': 'babo' } })
// Log.createFormattedLog(`${Process.env.HOME}/Library/Logs/mablung/mablung.loggy.log`)
// Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true }, `${Process.env.HOME}/Library/Logs/mablung/mablung.loggy.log`)

// Log.error(new Error('Error'))
// Log.info(Log.levels.values, 'Info')
// Log.debug('Debug')
Log.trace('Trace')
