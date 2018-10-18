import 'babel-polyfill'
import Is from '@pwn/is'
import Streams from 'memory-streams'

import Configuration from '../configuration'
import { FileSystem, Log, Process } from '../index'

Log.createFormattedLog(Process.stdout)

// Log.createFormattedLog({ 'level': 'trace' }, writeStream)
// Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true })
// Log.createFormattedLog({ 'level': 'trace', 'messageKey': 'babo', 'prettyPrint': { 'messageKey': 'babo' } })
// Log.createFormattedLog(`${Process.env.HOME}/Library/Logs/mablung/mablung.loggy.log`)
// Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true }, `${Process.env.HOME}/Library/Logs/mablung/mablung.loggy.log`)

// Log.createFormattedLog({ 'level': 'trace' })

// Log.error(new Error('Error'))
// Log.info(Log.levels.values, 'Info')
Log.debug('Debug')

// (async () => {

//   // await FileSystem.promisedAccessUnlink(Configuration.tests.logPath, FileSystem.F_OK)

//   let stream = new Streams.WritableStream()

//   // Log.createLog({ 'level': 'trace' }, Configuration.tests.logPath)
//   Log.createLog({ 'level': 'trace' }, stream)
//   Log.trace('TRACE')

//   console.log(stream.toString().split('\n')
//     .filter((data) => !Is.emptyString(data))
//     .map((data) => JSON.parse(data)))

// })()
