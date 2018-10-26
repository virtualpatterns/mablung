import FileSystem from 'fs'
import Utilities from 'util'
import Is from '@pwn/is'
import IsNode from 'detect-node'
import Pino from 'pino'
import Stream from 'stream'

const Process = process

const Log = Object.create(Pino)

for (let level in Log.levels.values) {
  Log[level] = function () {}
}

Log.getParameters = function (parameters) {

  let options = null
  let stream = null

  switch (parameters.length) {
    case 0:
      options = {}
      stream = Process.stdout
      break
    case 1:

      switch (true) {
        case parameters[0] instanceof Stream.Writable:
        case Is.function(parameters[0]._write):
        case Is.function(parameters[0]._writev):
          options = {}
          stream = parameters[0]
          break
        case Is.string(parameters[0]):
          options = {}
          stream = FileSystem.createWriteStream(parameters[0], {
            'flags': 'a',
            'encoding': 'utf8',
            'autoClose': true
          })
          break
        default:
          options = parameters[0]
          stream = Process.stdout
      }

      break
    default:
      options = parameters[0]
      stream = Is.string(parameters[1]) ? FileSystem.createWriteStream(parameters[1], {
        'flags': 'a',
        'encoding': 'utf8',
        'autoClose': true
      }) : parameters[1]
  }

  return [ options, stream ]

}

Log.format = function (options) {

  return function (data) {

    let string = data.name && !Is.error(data) ? `${data.name} ` : ''

    if (IsNode) {
      string += Utilities.format(
        '%s %s %s %s %s',
        new Date(data.time).toISOString(),
        data.hostname,
        data.pid,
        Log.levels.labels[data.level].toUpperCase().padStart(5),
        data[options.messageKey || 'msg'] || ''
      )
    } else {
      string += Utilities.format(
        '%s %s %s',
        new Date(data.time).toISOString(),
        Log.levels.labels[data.level].toUpperCase().padStart(5),
        data.msg || ''
      )
    }

    if (data.stack) {
      string += `\n\n${data.stack}\n\n`
    } else {

      let _data = Object.assign({}, data)

      delete _data.hostname
      delete _data.level
      delete _data.name
      delete _data.pid
      delete _data.time
      delete _data.v

      if (IsNode) {
        delete _data[options.messageKey || 'msg']
      } else {
        delete _data.msg
      }

      if (!Is.emptyObject(_data)) {
        string += `\n\n${Utilities.inspect(_data, { 'depth': null, 'maxArrayLength': null, 'showHidden': true })}\n\n`
      }
      else {
        string += '\n'
      }

    }

    return string

  }

}

Log.createLog = function (...parameters) {

  let [ userLogOptions, userStream ] = this.getParameters(parameters)

  let defaultLogOptions = null

  if (IsNode) {
    defaultLogOptions = { 'level': 'trace' }
  } else {
    defaultLogOptions = {
      'browser': {
        'asObject': true,
        'serialize': true
      },
      'level': 'trace'
    }
  }

  for (let level in this.levels.values) {
    delete this[level]
  }

  let logOptions = Object.assign(defaultLogOptions, userLogOptions)
  let log = Pino.call(this, logOptions, userStream)

  Object.setPrototypeOf(this, log)

  Log.trace(Is.emptyObject(logOptions) ? {} : { 'logOptions': logOptions }, 'Log.createLog(...parameters) { ... }')

}

Log.createFormattedLog = function (...parameters) {

  let [ userLogOptions, userStream ] = this.getParameters(parameters)
  let logOptions = null

  if (IsNode) {

    let defaultLogOptions = {
      'prettyPrint': true,
      'prettifier': Log.format
    }

    logOptions = Object.assign(defaultLogOptions, userLogOptions)

    this.createLog(logOptions, userStream)

  } else {

    let defaultLogOptions = {
      'browser': {
        'asObject': true,
        'serialize': true,
        'write': {
          'trace': (data) => {
            console.trace(Log.format({})(data)) // eslint-disable-line no-console
          },
          'debug': (data) => {
            console.debug(Log.format({})(data)) // eslint-disable-line no-console
          },
          'info': (data) => {
            console.info(Log.format({})(data)) // eslint-disable-line no-console
          },
          'warn': (data) => {
            console.warn(Log.format({})(data)) // eslint-disable-line no-console
          },
          'error': (data) => {
            console.error(Log.format({})(data)) // eslint-disable-line no-console
          },
          'fatal': (data) => {
            console.error(Log.format({})(data)) // eslint-disable-line no-console
          }
        }
      }
    }

    logOptions = Object.assign(defaultLogOptions, userLogOptions)

    this.createLog(logOptions)

  }

}

export default Log
