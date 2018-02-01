import FileSystem from 'fs'

import Configuration from '../configuration'
import Path from './path'

import ArgumentError from './errors/argument-error'
import ProcessError from './errors/process-error'

const Process = Object.create(process)

Process.when = function (timeout, maximumDuration, testFn) {

  return new Promise((resolve, reject) => {

    let waitLoop = function (start) {

      let duration = new Date() - start

      testFn((error) => {
        if (error && duration < maximumDuration) {
          setTimeout(() => waitLoop(start), timeout)
        } else if (duration >= maximumDuration) {
          reject(new ProcessError('The duration was exceeded.'))
        } else {
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

  let pid = FileSystem.readFileSync(path, { 'encoding': 'utf-8' })

  try {
    process.kill(pid, 0)
  } catch (error) {
    FileSystem.unlinkSync(path)
    return false
  }

  return true

}

Process.createPID = function (path) {

  if (this.existsPID(path)) {
    throw new ArgumentError(`The path '${Path.trim(path)}' exists.`)
  } else {

    FileSystem.writeFileSync(path, process.pid, { 'encoding': 'utf-8' })

    Process.on('exit', () => {
      try {
        FileSystem.accessSync(path, FileSystem.F_OK)
        FileSystem.unlinkSync(path)
      } catch (error) {
        // OK
      }
    })

  }

  return this

}

Process.killPID = function (path, signal = 'SIGINT') {

  if (this.existsPID(path)) {

    let pid = FileSystem.readFileSync(path, { 'encoding': 'utf-8' })

    process.kill(pid, signal)

  } else {
    throw new ArgumentError(`The path '${Path.trim(path)}' does not exist.`)
  }

  return this

}

Process.exit = function (code = 0) {

  setTimeout(() => process.exit(code), Configuration.process.exitTimeout)

  return this

}

export default Process
