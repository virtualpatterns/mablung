import { assert as Assert } from 'chai'
import Merge from 'object-merge'

import Configuration from '../../../configuration'
import { Log } from '../../../index'
import { Page } from '../browser'

const MESSAGE = {
  'type': 'object',
  'properties': {
    'time': { 'type': 'number' }
  },
  'required': [ 'time' ]
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
          'enum': [ 'debug', 'trace' ]
        }
      },
      'required': [ 'level' ]
    }
  },
  'required': [ ...MESSAGE.required, 'level', 'logOptions', 'msg' ]
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

const REGEXP_CREATE_LOG_MESSAGE = new RegExp(`^${Configuration.tests.patterns.prefixBrowser} DEBUG Log.createLog\\(\\.{3}parameters\\) \\{ .{3} \\}.*$`, 'm') // /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z) DEBUG Log.createLog\(\.{3}parameters\) \{ .{3} \}.*$/m
const REGEXP_CREATE_FORMATTED_LOG_MESSAGE = new RegExp(`^${Configuration.tests.patterns.prefixBrowser} DEBUG Log.createFormattedLog\\(\\.{3}parameters\\) \\{ .{3} \\}$`, 'm') // /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z) DEBUG Log.createFormattedLog\(\.{3}parameters\) \{ .{3} \}.*$/m

describe('log', () => {

  // describe('format', () => {
  //
  //   let data = {
  //     'level': '30',
  //     'msg': 'MESSAGE',
  //     'time': new Date('1973-05-28T17:00:00')
  //   }
  //
  //   describe('(when passing a message)', () => {
  //
  //     let message = null
  //
  //     before(async () => {
  //       message = await Page.evaluate((_data) => window.Log.format(_data), data)
  //     })
  //
  //     it('should return a formatted string', () => {
  //       Assert.equal(message, `${data.time.toISOString()} INFO  MESSAGE`)
  //     })
  //
  //   })
  //
  //   describe('(when passing an error)', () => {
  //
  //     let message = null
  //     let stack = null
  //
  //     before(async () => {
  //       stack = await Page.evaluate((_message) => (new window.Error(_message)).stack, data.msg)
  //       message = await Page.evaluate((_data) => window.Log.format(_data), Object.assign({ 'stack': stack }, data))
  //     })
  //
  //     it('should return a formatted string', async () => {
  //       Assert.equal(message, `${data.time.toISOString()} INFO  MESSAGE\n\n${stack}\n\n`)
  //     })
  //
  //   })
  //
  //   describe('(when passing an object)', () => {
  //
  //     let message = null
  //
  //     before(async () => {
  //       message = await Page.evaluate((_data) => window.Log.format(_data), Object.assign({ 'a': 1, 'b': 2, 'c': 3 }, data))
  //     })
  //
  //     it('should return a formatted string', async () => {
  //       Assert.equal(message, `${data.time.toISOString()} INFO  MESSAGE\n\n{ a: 1, b: 2, c: 3 }\n\n`)
  //     })
  //
  //   })
  //
  // })

  it('Is should be defined', async () => {
    Assert.ok(await Page.evaluate(() => window.Is))
  })

  it('Log should be defined', async () => {
    Assert.ok(await Page.evaluate(() => window.Log))
  })

  it('Pino should be defined', async () => {
    Assert.ok(await Page.evaluate(() => window.Pino))
  })

  it('Sinon should be defined', async () => {
    Assert.ok(await Page.evaluate(() => window.Sinon))
  })

  describe('createLog', () => {

    describe('(when passing no arguments)', () => {

      let messages = null

      before(async () => {
        await Page.evaluate(() => window.Sinon.spy(window.Pino, 'call'))
        messages = await Page.evaluateConsole(() => window.Log.createLog())
      })

      it('should call Pino.call', async () => {
        Assert.equal(await Page.evaluate(() => window.Pino.call.callCount), 1)
      })

      it('should call Pino.call with valid arguments', async () => {
        Assert.ok(await Page.evaluate(() => window.Pino.call.calledWith(window.Log, window.Sinon.match({
          'browser': { 'asObject': true },
          'level': 'debug'
        }))))
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
            Assert.ok(await Page.evaluate((levelName) => window.Is.function(window.Log[levelName]), levelName))
          })

        })

      }

      after(async () => {
        await Page.evaluate(() => window.Pino.call.restore())
      })

    })

    describe('(when passing options)', () => {

      let messages = null

      before(async () => {
        await Page.evaluate(() => window.Sinon.spy(window.Pino, 'call'))
        messages = await Page.evaluateConsole(() => window.Log.createLog({ 'level': 'trace' }))
      })

      it('should call Pino.call with valid arguments', async () => {
        Assert.ok(await Page.evaluate(() => window.Pino.call.calledWith(window.Log, window.Sinon.match({
          'browser': { 'asObject': true },
          'level': 'trace'
        }))))
      })

      it('should create a message with logOptions.level \'trace\'', () => {
        Assert.equal(messages[0].logOptions.level, 'trace')
      })

      after(async () => {
        await Page.evaluate(() => window.Pino.call.restore())
      })

    })

  })

  describe('createFormattedLog', () => {

    describe('(when passing no arguments)', () => {

      let messages = null

      before(async () => {
        await Page.evaluate(() => window.Sinon.spy(window.Log, 'createLog'))
        messages = await Page.evaluateConsole(() => window.Log.createFormattedLog(), 2)
      })

      it('should call Log.createLog', async () => {
        Assert.equal(await Page.evaluate(() => window.Log.createLog.callCount), 1)
      })

      it('should call Log.createLog with valid arguments', async () => {
        Assert.ok(await Page.evaluate(() => window.Log.createLog.calledWith(window.Sinon.match({
          'browser': {
            'asObject': true,
            'serialize': true,
            'write': window.Sinon.match.func
          }
        }))))
      })

      it('should create two messages', () => {
        Assert.equal(messages.length, 2)
      })

      it('should create a valid Log.createLog message', () => {
        Assert.ok(REGEXP_CREATE_LOG_MESSAGE.test(messages[0]))
      })

      it('should create a valid Log.createFormattedLog message', () => {
        Assert.ok(REGEXP_CREATE_FORMATTED_LOG_MESSAGE.test(messages[1]))
      })

      after(async () => {
        await Page.evaluate(() => window.Log.createLog.restore())
      })

    })

    describe('(when passing non-formatting options)', () => {

      before(async () => {
        await Page.evaluate(() => {
          window.Sinon.spy(window.Log, 'createLog')
          window.Log.createFormattedLog({ 'level': 'trace' })
        })
      })

      it('should call Log.createLog with valid arguments', async () => {
        Assert.ok(await Page.evaluate(() => window.Log.createLog.calledWith(window.Sinon.match({
          'browser': {
            'asObject': true,
            'serialize': true,
            'write': window.Sinon.match.func
          },
          'level': 'trace'
        }))))
      })

      after(async () => {
        await Page.evaluate(() => window.Log.createLog.restore())
      })

    })

    describe('(when passing basic formatting options)', () => {

      before(async () => {
        await Page.evaluate(() => {
          window.Sinon.spy(window.Log, 'createLog')
          window.Log.createFormattedLog({
            'level': 'trace',
            'prettyPrint': true
          })
        })
      })

      it('should call Log.createLog with valid arguments', async () => {
        Assert.ok(await Page.evaluate(() => window.Log.createLog.calledWith(window.Sinon.match({
          'browser': {
            'asObject': true,
            'serialize': true,
            'write': window.Sinon.match.func
          },
          'level': 'trace',
          'prettyPrint': true
        }))))
      })

      after(async () => {
        await Page.evaluate(() => window.Log.createLog.restore())
      })

    })

    describe('(when passing advanced formatting options)', () => {

      before(async () => {

        await Page.evaluate(() => {
          window.Sinon.spy(window.Log, 'createLog')
          window.Log.createFormattedLog({
            'level': 'trace',
            'prettyPrint': { 'levelFirst': true }
          })
        })

      })

      it('should call Log.createLog with valid arguments', async () => {
        Assert.ok(await Page.evaluate(() => window.Log.createLog.calledWith(window.Sinon.match({
          'browser': {
            'asObject': true,
            'serialize': true,
            'write': window.Sinon.match.func
          },
          'level': 'trace',
          'prettyPrint': { 'levelFirst': true }
        }))))
      })

      after(async () => {
        await Page.evaluate(() => window.Log.createLog.restore())
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
  //     // describe('(when creating a log)', () => {
  //     //
  //     //   describe('(when passing a message)', () => {
  //     //
  //     //     let messages = null
  //     //
  //     //     before(async () => {
  //     //       await Page.evaluate(() => window.Log.createLog({ 'level': 'trace' }))
  //     //       messages = await Page.evaluateConsole((levelName) => window.Log[levelName](levelName.toUpperCase()), levelName)
  //     //     })
  //     //
  //     //     it('should create one message', () => {
  //     //       Assert.equal(messages.length, 1)
  //     //     })
  //     //
  //     //     it('should create a valid message', () => {
  //     //       Assert.jsonSchema(messages[0], LEVEL_MESSAGE_MESSAGE)
  //     //     })
  //     //
  //     //     it('should create a message with a valid level', () => {
  //     //       Assert.equal(messages[0].level, levelNumber)
  //     //     })
  //     //
  //     //     it('should create a message with a valid message', () => {
  //     //       Assert.equal(messages[0].msg, levelName.toUpperCase())
  //     //     })
  //     //
  //     //   })
  //     //
  //     //   describe('(when passing an error)', () => {
  //     //
  //     //     let messages = null
  //     //
  //     //     before(async () => {
  //     //       await Page.evaluate(() => window.Log.createLog({ 'level': 'trace' }))
  //     //       messages = await Page.evaluateConsole((levelName) => window.Log[levelName](new Error('MESSAGE')), levelName)
  //     //     })
  //     //
  //     //     it('should create one message', () => {
  //     //       Assert.equal(messages.length, 1)
  //     //     })
  //     //
  //     //     it('should create a valid message', () => {
  //     //       Assert.jsonSchema(messages[0], LEVEL_ERROR_MESSAGE)
  //     //     })
  //     //
  //     //     it('should create a message with a valid level', () => {
  //     //       Assert.equal(messages[0].level, levelNumber)
  //     //     })
  //     //
  //     //     it('should create a message with a valid message', () => {
  //     //       Assert.equal(messages[0].msg, 'MESSAGE')
  //     //     })
  //     //
  //     //     it('should create a message with a stack', () => {
  //     //       Assert.ok(messages[0].stack)
  //     //     })
  //     //
  //     //   })
  //     //
  //     //   describe('(when passing an object)', () => {
  //     //
  //     //     let messages = null
  //     //
  //     //     before(() => {
  //     //
  //     //       let stream = new MemoryStream.WritableStream()
  //     //       Log.createLog({ 'level': 'trace' }, stream)
  //     //
  //     //       Log[levelName]({ 'a':1, 'b':2, 'c':3 }, levelName.toUpperCase())
  //     //
  //     //       messages = getMessages(stream)
  //     //
  //     //     })
  //     //
  //     //     it('should create two log entries', () => {
  //     //       Assert.equal(messages.length, 2)
  //     //     })
  //     //
  //     //     it('should create a valid message', () => {
  //     //       Assert.jsonSchema(messages[0], LEVEL_OBJECT_MESSAGE)
  //     //     })
  //     //
  //     //     it(`should create a message with level ${levelNumber}`, () => {
  //     //       Assert.equal(messages[0].level, levelNumber)
  //     //     })
  //     //
  //     //     it(`should create a message with message '${levelName.toUpperCase()}'`, () => {
  //     //       Assert.equal(messages[0].msg, levelName.toUpperCase())
  //     //     })
  //     //
  //     //   })
  //     //
  //     // })
  //
  //     // describe('(when creating a formatted log)', () => {
  //     //
  //     //   before(() => {
  //     //     Log.createFormattedLog({ 'level': 'trace' }, new MemoryStream.WritableStream())
  //     //   })
  //     //
  //     //   it('should be a function', () => {
  //     //     Assert.ok(Is.function(Log[levelName]))
  //     //   })
  //     //
  //     // })
  //
  //   })
  //
  // }

})
