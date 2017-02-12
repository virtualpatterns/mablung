import FileSystem from './file-system'
import Log from './log'
import Path from './path'

import ArgumentError from './errors/argument-error'
import ProcessError from './errors/process-error'

const EXIT_TIMEOUT = 5000

const Process = Object.create(process)

Process.when = function (timeout, maximumDuration, testFn) {

  Log.debug('> Process.when(%d, %d, testFn) { ... }', timeout, maximumDuration)

  return new Promise((resolve, reject) => {

    let waitLoop = function (start) {

      let duration = new Date() - start

      testFn(error => {
        if (error && duration < maximumDuration) {
          setTimeout(() => waitLoop(start), timeout)
        } else if (duration >= maximumDuration) {
          Log.error('< Process.when(%d, %d, testFn) { ... } duration=%d', timeout, maximumDuration, duration)
          reject(new ProcessError('The duration was exceeded.'))
        } else {
          Log.debug('< Process.when(%d, %d, testFn) { ... }', timeout, maximumDuration)
          resolve()
        }
      })
    }

    waitLoop(new Date())

  })

}

Process.existsPID = function (path) {

  try {
    FileSystem.accessSync(path, FileSystem.F_OK)
  } catch (error) {
    return false
  }

  let pid = FileSystem.readFileSync(path, {
    encoding: 'utf-8'
  })

  try {
    process.kill(pid, 0)
  } catch (error) {
    FileSystem.unlinkSync(path)
    return false
  }

  return true

}

Process.createPID = function (path) {

  Log.debug('- Process.createPID(%j)', Path.trim(path))

  if (this.existsPID(path)) {
    throw new ArgumentError(`The path ${ Path.trim(path) } exists.`)
  } else {

    FileSystem.writeFileSync(path, process.pid, {
      encoding: 'utf-8'
    })

    Process.on('exit', () => {
      console.log(Log.format('DEBUG', '- Process.on(\'exit\', function() { ... }'))
      try {
        FileSystem.accessSync(path, FileSystem.F_OK)
        FileSystem.unlinkSync(path)
      } catch (error) {}
    })

  }

  return this

}

Process.killPID = function (path, signal = 'SIGINT') {

  Log.debug('- Process.killPID(%j, %j)', Path.trim(path), signal)

  if (this.existsPID(path)) {

    let pid = FileSystem.readFileSync(path, {
      encoding: 'utf-8'
    })

    process.kill(pid, signal)
  } else {
    throw new ArgumentError(`The path ${ Path.trim(path) } does not exist.`)
  }

  return this

}

Process.exit = function (code = 0) {

  Log.debug('> Process.exit(%d) ...', code)

  setTimeout(() => process.exit(code), EXIT_TIMEOUT)

  return this

}

// module.exports = Process
export default Process
