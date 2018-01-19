import Configuration from '../../../configuration'
import { Logger, Log } from '../../../library/log'
import Process from '../../../library/process'

Logger.createFormattedLog(Configuration.process.logPath)
Process.createPID(Configuration.process.pidPath)

Log.debug(Configuration)

Process.on('message', (message) => {
  Log.debug({ 'message': message }, 'Process.on(\'message\', (message) => { ... })')
  Process.exit(1)
})

Process.once('SIGINT', () => {
  Log.debug('Process.once(\'SIGINT\', () => { ... })')
  Process.exit(2)
})

const wait = function (start) {
  Log.debug(`wait('${start.toISOString()}') ${(new Date()) - start}ms`)
  setTimeout(() => wait(start), Configuration.process.timeouts.wait)
}

wait(new Date())
