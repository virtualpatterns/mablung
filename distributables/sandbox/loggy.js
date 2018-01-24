'use strict';

require('babel-polyfill');

var _index = require('../index');

// import { Log, Process } from '../index'

// Log.createLog({ 'level': 'trace', 'messageKey': 'babo' })
_index.Log.createFormattedLog({ 'level': 'trace' });
// Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true })
// Log.createFormattedLog({ 'level': 'trace', 'messageKey': 'babo', 'prettyPrint': { 'messageKey': 'babo' } })
// Log.createFormattedLog(`${Process.env.HOME}/Library/Logs/mablung/mablung.loggy.log`)
// Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true }, `${Process.env.HOME}/Library/Logs/mablung/mablung.loggy.log`)

// Log.error(new Error('Error'))
// Log.info(Log.levels.values, 'Info')
// Log.debug('Debug')
_index.Log.trace('Trace');
//# sourceMappingURL=loggy.js.map