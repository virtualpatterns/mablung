import FileSystem from 'fs' // require('./file-system')
import Utilities from 'util'
import Is from '@pwn/is'
import IsNode from 'detect-node'
import Pad from 'pad'
import Pino from 'pino'
import Stream from 'stream'

const Process = process // require('./process')

const Log = Object.create(Pino)

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

Log.format = function (data) {

  let string = data.name ? `${data.name} ` : ''

  if (IsNode) {
    string += Utilities.format(
      '%s %s %s %s %s',
      new Date(data.time).toISOString(),
      data.hostname,
      data.pid ? Pad(5, data.pid.toString()): '000000',
      Pad(Log.levels.labels[data.level].toUpperCase(), 5),
      data[this.messageKey || 'msg'] || ''
    )
  } else {
    string += Utilities.format(
      '%s %s %s',
      new Date(data.time).toISOString(),
      Pad(Log.levels.labels[data.level].toUpperCase(), 5),
      data.msg || ''
    )
  }

  if (data.stack) {
    string += `\n\n${data.stack}\n${IsNode ? '' : '\n'}`
  } else {

    let _data = Object.assign({}, data)

    delete _data.hostname
    delete _data.level
    delete _data.name
    delete _data.pid
    delete _data.time
    delete _data.v

    if (IsNode) {
      delete _data[this.messageKey || 'msg']
    } else {
      delete _data.msg
    }

    if (!Is.emptyObject(_data)) {
      string += `\n\n${Utilities.inspect(_data, { 'depth': null, 'maxArrayLength': null, 'showHidden': true })}\n${IsNode ? '' : '\n'}`
    }

  }

  return string

}

Log.createLog = function (...parameters) {

  let [ userLogOptions, userStream ] = this.getParameters(parameters)

  let defaultLogOptions = null

  if (IsNode) {
    defaultLogOptions = { 'level': 'debug' }
  } else {
    defaultLogOptions = {
      'browser': {
        'asObject': true,
        'serialize': true
      },
      'level': 'debug'
    }
  }

  let logOptions = Object.assign(defaultLogOptions, userLogOptions)
  let log = Pino.call(this, logOptions, userStream)

  for (let level in this.levels.values) {
    this[level] = (...parameters) => log[level].apply(log, parameters)
  }

  Log.debug(Is.emptyObject(logOptions) ? {} : { 'logOptions': logOptions }, 'Log.createLog(...parameters) { ... }')

}

Log.createFormattedLog = function (...parameters) {

  let [ userLogOptions, userStream ] = this.getParameters(parameters)

  if (IsNode) {

    let userFormatOptions = userLogOptions.prettyPrint ? userLogOptions.prettyPrint : {}

    delete userLogOptions.prettyPrint

    let defaultFormatOptions = {
      'formatter': this.format
    }

    let formatOptions = userFormatOptions == true ? {} : Object.assign(defaultFormatOptions, userFormatOptions)

    let formattedStream = Pino.pretty(formatOptions)
    formattedStream.pipe(userStream)

    this.createLog(userLogOptions, formattedStream)

    Log.debug(Is.emptyObject(formatOptions) ? {} : { 'formatOptions': formatOptions }, 'Log.createFormattedLog(...parameters) { ... }')

  } else {

    let defaultLogOptions = {
      'browser': {
        'asObject': true,
        'serialize': true,
        'write': (data) => {
          console.log(this.format(data)) // eslint-disable-line no-console
        }
      }
    }

    let logOptions = Object.assign(defaultLogOptions, userLogOptions)

    this.createLog(logOptions)

    Log.debug('Log.createFormattedLog(...parameters) { ... }')

  }

}

export default Log
