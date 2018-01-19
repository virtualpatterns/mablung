import FileSystem from 'fs' // require('./file-system')
import Utilities from 'util'
import Is from '@pwn/is'
import IsNode from 'detect-node'
import Pad from 'pad'
import Pino from 'pino'
import Stream from 'stream'

const Process = process // require('./process')

const Log = Object.create(Pino)

Log.format = function (data) {

  let string = data.name ? `${data.name} ` : ''

  string += Utilities.format(
    '%s %s %d %s %s',
    new Date(data.time).toISOString(),
    data.hostname,
    Pad(data.pid.toString(), 6),
    Pad(Log.levels.labels[data.level].toUpperCase(), 5),
    data[this.messageKey] || '(no message)'
  )

  if (data.stack) {
    string += `\n\n${data.stack}\n`
  } else {

    let _data = Object.assign({}, data)

    delete _data.hostname
    delete _data.level
    delete _data[this.messageKey]
    delete _data.name
    delete _data.pid
    delete _data.time
    delete _data.v

    if (!Is.emptyObject(_data)) {
      string += `\n\n${Utilities.inspect(_data, {
        'depth': null,
        'maxArrayLength': null,
        'showHidden': true
      })}\n`
    }

  }

  return string

}

// Log.format[Utilities.inspect.custom] = function () {
//   return 'Log.format(data) { ... }'
// }

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

Log.createLog = function (...parameters) {

  let [ userLogOptions, userStream ] = this.getParameters(parameters)

  let defaultLogOptions = null

  if (IsNode) {
    defaultLogOptions = {
      'level': 'debug',
      'messageKey': 'message'
    }
  } else {
    defaultLogOptions = {
      'browser': {
        'asObject': true
      },
      'level': 'debug',
      'messageKey': 'message'
    }
  }

  let logOptions = Object.assign(defaultLogOptions, userLogOptions)
  let log = Pino.call(this, logOptions, userStream)

  for (let level in this.levels.values) {
    this[level] = (...parameters) => log[level].apply(log, parameters)
  }

  Log.trace(Is.emptyObject(logOptions) ? {} : { 'logOptions': logOptions }, 'Log.createLog(...parameters) { ... }')

}

Log.createFormattedLog = function (...parameters) {

  let [ userOptions, userStream ] = this.getParameters(parameters)

  let userFormatOptions = userOptions.prettyPrint ? userOptions.prettyPrint : {}

  delete userOptions.prettyPrint

  let defaultFormatOptions = {
    'formatter': this.format,
    'messageKey': 'message'
  }

  let formatOptions = userFormatOptions == true ? { 'messageKey': userOptions.messageKey || 'message' } : Object.assign(defaultFormatOptions, userFormatOptions)

  let formattedStream = Log.pretty(formatOptions)
  formattedStream.pipe(userStream)

  this.createLog(userOptions, formattedStream)

  Log.trace(Is.emptyObject(formatOptions) ? {} : { 'formatOptions': formatOptions }, 'Log.createFormattedLog(...parameters) { ... }')

}

Log.createLog()

export default Log
