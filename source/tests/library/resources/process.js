import Configuration from '../../../configuration'
import { Log, Process } from '../../../index'

Log.createFormattedLog(Configuration.tests.process.logPath)
Process.createPID(Configuration.tests.process.pidPath)

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
  setTimeout(() => wait(start), Configuration.tests.process.waitTimeout)
}

wait(new Date())
