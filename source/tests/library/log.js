import { assert as Assert } from 'chai'
import Is from '@pwn/is'
import MemoryStream from 'memory-streams'
import Merge from 'object-merge'
import OS from 'os'
import Pad from 'pad'
import Pino from 'pino'
import Sinon from 'sinon'
// import Stream from 'stream'
// import Utilities from 'util'

// import Configuration from '../../configuration'
import { Log, Process } from '../../index'

// import TestError from '../errors/test-error'

const MESSAGE = {
  'type': 'object',
  'properties': {
    'time': { 'type': 'number' },
    'pid': {
      'type': 'number',
      'enum': [ Process.pid ]
    },
    'hostname': {
      'type': 'string',
      'enum': [ OS.hostname() ]
    },
    'v': { 'type': 'number' }
  },
  'required': [ 'time', 'pid', 'hostname', 'v' ]
}

const CREATE_LOG_MESSAGE = Merge(MESSAGE, {
  'title': 'CreateLog',
  'properties': {
    'level': {
      'type': 'number',
      'enum': [ 20 ]
    },
    'msg': {
      'type': 'string',
      'enum': [ 'Log.createLog(...parameters) { ... }' ]
    },
    'logOptions': {
      'title': 'CreateLog-LogOptions',
      'type': 'object',
      'properties': {
        'level': {
          'type': 'string',
          'enum': [ 'trace', 'debug' ]
        }
      },
      'required': [ 'level' ]
    }
  },
  'required': [ ...MESSAGE.required, 'level', 'msg', 'logOptions' ]
})

// const LEVEL_MESSAGE_MESSAGE = Merge(MESSAGE, {
//   'title': 'Level',
//   'properties': {
//     'level': {
//       'type': 'number',
//       'enum': [ 10, 20, 30, 40, 50, 60 ]
//     },
//     'msg': {
//       'type': 'string',
//       'enum': [ 'FATAL', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE' ]
//     }
//   },
//   'required': [ ...MESSAGE.required, 'level', 'msg' ]
// })
//
// const LEVEL_ERROR_MESSAGE = Merge(MESSAGE, {
//   'title': 'Level',
//   'properties': {
//     'level': {
//       'type': 'number',
//       'enum': [ 10, 20, 30, 40, 50, 60 ]
//     },
//     'msg': {
//       'type': 'string',
//       'enum': [ 'MESSAGE' ]
//     },
//     'stack': { 'type': 'string' }
//   },
//   'required': [ ...MESSAGE.required, 'level', 'msg', 'stack' ]
// })
//
// const LEVEL_OBJECT_MESSAGE = Merge(LEVEL_MESSAGE_MESSAGE, {
//   'title': 'Level',
//   'properties': {
//     'a': {
//       'type': 'number',
//       'enum': [ 1 ]
//     },
//     'b': {
//       'type': 'number',
//       'enum': [ 2 ]
//     },
//     'c': {
//       'type': 'number',
//       'enum': [ 3 ]
//     }
//   },
//   'required': [ ...LEVEL_MESSAGE_MESSAGE.required, 'a', 'b', 'c' ]
// })

// const REGEXP_CREATE_LOG_MESSAGE = new RegExp(`^${Configuration.tests.expressions.dateTime} DEBUG Log.createLog\\(\\.{3}parameters\\) \\{ .{3} \\}.*$`, 'm')
// const REGEXP_CREATE_FORMATTED_LOG_MESSAGE = new RegExp(`^${Configuration.tests.expressions.dateTime} DEBUG Log.createFormattedLog\\(\\.{3}parameters\\) \\{ .{3} \\}$`, 'm')

describe('log', () => {

  // describe('getParameters', () => {
  //
  //   describe('(when passing an empty array)', () => {
  //
  //     let options = null
  //     let stream = null
  //
  //     before(() => {
  //       [ options, stream ] = Log.getParameters([])
  //     })
  //
  //     it('should return an empty object', () => {
  //       Assert.ok(Is.emptyObject(options))
  //     })
  //
  //     it('should return stdout', () => {
  //       Assert.equal(stream, Process.stdout)
  //     })
  //
  //   })
  //
  //   describe('(when passing options)', () => {
  //
  //     let options = null
  //     let stream = null
  //
  //     before(() => {
  //       [ options, stream ] = Log.getParameters([ { 'level': 'trace' } ])
  //     })
  //
  //     it('should return the options', () => {
  //       Assert.deepEqual(options, { 'level': 'trace' })
  //     })
  //
  //     it('should return stdout', () => {
  //       Assert.equal(stream, Process.stdout)
  //     })
  //
  //   })
  //
  //   describe('(when passing a stream)', () => {
  //
  //     let parameters = []
  //
  //     let options = null
  //     let stream = null
  //
  //     before(async () => {
  //
  //       parameters = [ new MemoryStream.WritableStream() ]
  //
  //       ;[ options, stream ] = Log.getParameters(parameters)
  //
  //     })
  //
  //     it('should return an empty object', () => {
  //       Assert.ok(Is.emptyObject(options))
  //     })
  //
  //     it('should return the stream', () => {
  //       Assert.equal(stream, parameters[0])
  //     })
  //
  //   })
  //
  //   describe('(when passing a string)', () => {
  //
  //     let options = null
  //     let stream = null
  //
  //     before(async () => {
  //
  //       await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
  //
  //       ;[ options, stream ] = Log.getParameters([ Configuration.tests.outPath ])
  //
  //     })
  //
  //     it('should return an empty object', () => {
  //       Assert.ok(Is.emptyObject(options))
  //     })
  //
  //     it('should return a stream', () => {
  //       Assert.ok(stream instanceof Stream.Writable)
  //     })
  //
  //     after(() => {
  //       stream.destroy()
  //     })
  //
  //   })
  //
  //   describe('(when passing options and a stream)', () => {
  //
  //     let parameters = []
  //
  //     let options = null
  //     let stream = null
  //
  //     before(async () => {
  //
  //       parameters = [ { 'level': 'trace' }, new MemoryStream.WritableStream() ]
  //
  //       ;[ options, stream ] = Log.getParameters(parameters)
  //
  //     })
  //
  //     it('should return the options', () => {
  //       Assert.deepEqual(options, { 'level': 'trace' })
  //     })
  //
  //     it('should return the stream', () => {
  //       Assert.equal(stream, parameters[1])
  //     })
  //
  //   })
  //
  //   describe('(when passing options and a string)', () => {
  //
  //     let options = null
  //     let stream = null
  //
  //     before(async () => {
  //
  //       await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)
  //
  //       ;[ options, stream ] = Log.getParameters([ { 'level': 'trace' }, Configuration.tests.outPath ])
  //
  //     })
  //
  //     it('should return the options', () => {
  //       Assert.deepEqual(options, { 'level': 'trace' })
  //     })
  //
  //     it('should return a stream', () => {
  //       Assert.ok(stream instanceof Stream.Writable)
  //     })
  //
  //     after(() => {
  //       stream.destroy()
  //     })
  //
  //   })
  //
  // })

  describe('format', () => {

    let data = {
      'hostname': OS.hostname(),
      'level': '30',
      'msg': 'MESSAGE',
      'pid': Process.pid,
      'time': new Date('1973-05-28T17:00:00')
    }

    describe('(when passing a message)', () => {

      it('should return a formatted string', () => {
        Assert.equal(Log.format(data), `${data.time.toISOString()} ${data.hostname} ${Pad(5, data.pid.toString())} INFO  MESSAGE`)
      })

    })

    describe('(when passing an error)', () => {

      let stack = null

      before(() => {
        stack = (new Error('MESSAGE')).stack
      })

      it('should return a formatted string', () => {
        Assert.equal(Log.format(Object.assign({ 'stack': stack }, data)), `${data.time.toISOString()} ${data.hostname} ${Pad(5, data.pid.toString())} INFO  MESSAGE\n\n${stack}\n`)
      })

    })

    describe('(when passing an object)', () => {

      it('should return a formatted string', () => {
        Assert.equal(Log.format(Object.assign({ 'a': 1, 'b': 2, 'c': 3 }, data)), `${data.time.toISOString()} ${data.hostname} ${Pad(5, data.pid.toString())} INFO  MESSAGE\n\n{ a: 1, b: 2, c: 3 }\n`)
      })

    })

  })

  describe('createLog', () => {

    describe('(when passing a stream)', () => {

      let stream = null
      let messages = null

      before(() => {

        Sinon.spy(Pino, 'call')

        stream = new MemoryStream.WritableStream()
        Log.createLog(stream)

        messages = getMessages(stream)

      })

      it('should call Pino.call', () => {
        Assert.equal(Pino.call.callCount, 1)
      })

      it('should call Pino.call with valid arguments', () => {
        Assert.ok(Pino.call.calledWith(Log, Sinon.match({ 'level': 'debug' }), stream))
      })

      it('should create one message', () => {
        Assert.equal(messages.length, 1)
      })

      it('should create a valid message', () => {
        Assert.jsonSchema(messages[0], CREATE_LOG_MESSAGE)
      })

      it('should create a message with logOptions.level \'debug\'', () => {
        Assert.equal(messages[0].logOptions.level, 'debug')
      })

      for (let level of Object.entries(Log.levels.values)) {

        let [ levelName ] = level

        describe(`(when calling ${levelName})`, () => {

          it('should be defined', async () => {
            Assert.ok(Is.function(Log[levelName]))
          })

        })

      }

      after(() => {
        Pino.call.restore()
      })

    })

    describe('(when passing options and a stream)', () => {

      let stream = null
      let messages = null

      before(() => {

        Sinon.spy(Pino, 'call')

        stream = new MemoryStream.WritableStream()
        Log.createLog({ 'level': 'trace' }, stream)

        messages = getMessages(stream)

      })

      // it('should call Pino.call', () => {
      //   Assert.equal(Pino.call.callCount, 1)
      // })

      it('should call Pino.call with valid arguments', () => {
        Assert.ok(Pino.call.calledWith(Log, Sinon.match({ 'level': 'trace' }), stream))
      })

      // it('should create one message', () => {
      //   Assert.equal(messages.length, 1)
      // })

      // it('should create a valid message', () => {
      //   Assert.jsonSchema(messages[0], CREATE_LOG_MESSAGE)
      // })

      it('should create a message with logOptions.level \'trace\'', () => {
        Assert.equal(messages[0].logOptions.level, 'trace')
      })

      after(() => {
        Pino.call.restore()
      })

    })

  })

  describe('createFormattedLog', () => {

    describe('(when passing a stream)', () => {

      before(() => {

        Sinon.spy(Pino, 'pretty')

        Log.createFormattedLog(new MemoryStream.WritableStream())

      })

      it('should call Pino.pretty', () => {
        Assert.equal(Pino.pretty.callCount, 1)
      })

      it('should call Pino.pretty with valid arguments', () => {
        Assert.ok(Pino.pretty.calledWith(Sinon.match({ 'formatter': Log.format })))
      })

      after(() => {
        Pino.pretty.restore()
      })

    })

    describe('(when passing non-formatting options and a stream)', () => {

      before(() => {

        Sinon.spy(Pino, 'pretty')

        Log.createFormattedLog({ 'level': 'trace' }, new MemoryStream.WritableStream())

      })

      // it('should call Pino.pretty', () => {
      //   Assert.equal(Pino.pretty.callCount, 1)
      // })

      it('should call Pino.pretty with valid arguments', () => {
        Assert.ok(Pino.pretty.calledWith(Sinon.match({ 'formatter': Log.format })))
      })

      after(() => {
        Pino.pretty.restore()
      })

    })

    describe('(when passing basic formatting options and a stream)', () => {

      before(() => {

        Sinon.spy(Pino, 'pretty')

        Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true }, new MemoryStream.WritableStream())

      })

      // it('should call Pino.pretty', () => {
      //   Assert.equal(Pino.pretty.callCount, 1)
      // })

      it('should call Pino.pretty with valid arguments', () => {
        Assert.ok(Pino.pretty.calledWith(Sinon.match({})))
      })

      after(() => {
        Pino.pretty.restore()
      })

    })

    describe('(when passing advanced formatting options and a stream)', () => {

      before(() => {

        Sinon.spy(Pino, 'pretty')

        Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': { 'levelFirst': true } }, new MemoryStream.WritableStream())

      })

      // it('should call Pino.pretty', () => {
      //   Assert.equal(Pino.pretty.callCount, 1)
      // })

      it('should call Pino.pretty with valid arguments', () => {
        Assert.ok(Pino.pretty.calledWith(Sinon.match({ 'formatter': Log.format, 'levelFirst': true })))
      })

      after(() => {
        Pino.pretty.restore()
      })

    })

  })

  // Log.levels
  //
  // {
  //   'values': {
  //     'fatal': 60,
  //     'error': 50,
  //     'warn': 40,
  //     'info': 30,
  //     'debug': 20,
  //     'trace': 10
  //   },
  //   'labels': {
  //     '10': 'trace',
  //     '20': 'debug',
  //     '30': 'info',
  //     '40': 'warn',
  //     '50': 'error',
  //     '60': 'fatal'
  //   }
  // }

  // for (let level of Object.entries(Log.levels.values)) {
  //
  //   let [ levelName, levelNumber ] = level
  //
  //   describe(levelName, () => {
  //
  //     describe('(when creating a log)', () => {
  //
  //       describe('(when passing a message)', () => {
  //
  //         let messages = null
  //
  //         before(() => {
  //
  //           let stream = new MemoryStream.WritableStream()
  //           Log.createLog({ 'level': 'trace' }, stream)
  //
  //           Log[levelName](levelName.toUpperCase())
  //
  //           messages = getMessages(stream)
  //
  //         })
  //
  //         it('should create two log entries', () => {
  //           Assert.equal(messages.length, 2)
  //         })
  //
  //         it('should create a valid message', () => {
  //           Assert.jsonSchema(messages[1], LEVEL_MESSAGE_MESSAGE)
  //         })
  //
  //         it(`should create a message with level ${levelNumber}`, () => {
  //           Assert.equal(messages[1].level, levelNumber)
  //         })
  //
  //         it(`should create a message with message '${levelName.toUpperCase()}'`, () => {
  //           Assert.equal(messages[1].msg, levelName.toUpperCase())
  //         })
  //
  //       })
  //
  //       describe('(when passing an error)', () => {
  //
  //         let error = null
  //         let messages = null
  //
  //         before(() => {
  //
  //           let stream = new MemoryStream.WritableStream()
  //           Log.createLog({ 'level': 'trace' }, stream)
  //
  //           Log[levelName](error = new TestError('MESSAGE'))
  //
  //           messages = getMessages(stream)
  //
  //         })
  //
  //         it('should create two log entries', () => {
  //           Assert.equal(messages.length, 2)
  //         })
  //
  //         it('should create a valid message', () => {
  //           Assert.jsonSchema(messages[1], LEVEL_ERROR_MESSAGE)
  //         })
  //
  //         it(`should create a message with level ${levelNumber}`, () => {
  //           Assert.equal(messages[1].level, levelNumber)
  //         })
  //
  //         it('should create a message with message \'MESSAGE\'', () => {
  //           Assert.equal(messages[1].msg, 'MESSAGE')
  //         })
  //
  //         it('should create a message with a stack', () => {
  //           Assert.equal(messages[1].stack, error.stack)
  //         })
  //
  //       })
  //
  //       describe('(when passing an object)', () => {
  //
  //         let messages = null
  //
  //         before(() => {
  //
  //           let stream = new MemoryStream.WritableStream()
  //           Log.createLog({ 'level': 'trace' }, stream)
  //
  //           Log[levelName]({ 'a':1, 'b':2, 'c':3 }, levelName.toUpperCase())
  //
  //           messages = getMessages(stream)
  //
  //         })
  //
  //         it('should create two log entries', () => {
  //           Assert.equal(messages.length, 2)
  //         })
  //
  //         it('should create a valid message', () => {
  //           Assert.jsonSchema(messages[1], LEVEL_OBJECT_MESSAGE)
  //         })
  //
  //         it(`should create a message with level ${levelNumber}`, () => {
  //           Assert.equal(messages[1].level, levelNumber)
  //         })
  //
  //         it(`should create a message with message '${levelName.toUpperCase()}'`, () => {
  //           Assert.equal(messages[1].msg, levelName.toUpperCase())
  //         })
  //
  //       })
  //
  //     })
  //
  //     describe('(when creating a formatted log)', () => {
  //
  //       before(() => {
  //         Log.createFormattedLog({ 'level': 'trace' }, new MemoryStream.WritableStream())
  //       })
  //
  //       it('should be a function', () => {
  //         Assert.ok(Is.function(Log[levelName]))
  //       })
  //
  //     })
  //
  //   })
  //
  // }

})

function getMessages (stream) {
  return stream.toString().split('\n')
    .filter((message) => !Is.emptyString(message))
    .map((message) => JSON.parse(message))
}
