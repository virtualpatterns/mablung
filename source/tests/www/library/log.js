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
      'enum': [ 10 ]
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
          'enum': [ 'trace' ]
        }
      },
      'required': [ 'level' ]
    }
  },
  'required': [ ...MESSAGE.required, 'level', 'logOptions', 'msg' ]
})

const REGEXP_CREATE_LOG_MESSAGE = new RegExp(`^${Configuration.tests.patterns.prefixBrowser} TRACE Log.createLog\\(\\.{3}parameters\\) \\{ .{3} \\}.*$`, 'm') // /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z) DEBUG Log.createLog\(\.{3}parameters\) \{ .{3} \}.*$/m
const REGEXP_OBJECT_MESSAGE = new RegExp(`^${Configuration.tests.patterns.prefixBrowser} TRACE MESSAGE\n\n\\{ a\\: 1, b\\: 2, c\\: 3 \\}\n\n$`, 'm')

describe('log', () => {

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

  for (let level of Object.entries(Log.levels.values)) {

    let [ levelName ] = level

    describe(levelName, () => {

      it('should be defined', async () => {
        Assert.ok(await Page.evaluate((levelName) => window.Is.function(window.Log[levelName]), levelName))
      })

    })

  }

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
          'level': 'trace'
        }))))
      })

      it('should return the prototype', async () => {
        Assert.ok(await Page.evaluate(() => window.Pino.call.returned(Object.getPrototypeOf(window.Log))))
      })

      it('should create one message', () => {
        Assert.equal(messages.length, 1)
      })

      it('should create a valid message', () => {
        Assert.jsonSchema(messages[0], CREATE_LOG_MESSAGE)
      })

      it('should create a message with logOptions.level \'trace\'', () => {
        Assert.equal(messages[0].logOptions.level, 'trace')
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
        messages = await Page.evaluateConsole(() => window.Log.createFormattedLog(), 1)
      })

      it('should call Log.createLog', async () => {
        Assert.equal(await Page.evaluate(() => window.Log.createLog.callCount), 1)
      })

      it('should call Log.createLog with valid arguments', async () => {
        Assert.ok(await Page.evaluate(() => window.Log.createLog.calledWith(window.Sinon.match({
          'browser': {
            'asObject': true,
            'serialize': true,
            'write': {
              'trace': window.Sinon.match.func,
              'debug': window.Sinon.match.func,
              'info': window.Sinon.match.func,
              'warn': window.Sinon.match.func,
              'error': window.Sinon.match.func,
              'fatal': window.Sinon.match.func
            }
          }
        }))))
      })

      it('should create one message', () => {
        Assert.equal(messages.length, 1)
      })

      it('should create a valid Log.createLog message', () => {
        Assert.ok(REGEXP_CREATE_LOG_MESSAGE.test(messages[0]))
      })

      after(async () => {
        await Page.evaluate(() => window.Log.createLog.restore())
      })

    })

    describe('(when passing options)', () => {

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
            'write': {
              'trace': window.Sinon.match.func,
              'debug': window.Sinon.match.func,
              'info': window.Sinon.match.func,
              'warn': window.Sinon.match.func,
              'error': window.Sinon.match.func,
              'fatal': window.Sinon.match.func
            }
          },
          'level': 'trace'
        }))))
      })

      after(async () => {
        await Page.evaluate(() => window.Log.createLog.restore())
      })

    })

    describe('(when calling trace)', () => {

      describe('(when passing an object and a message)', () => {

        let messages = null

        before(async () => {

          messages = await Page.evaluateConsole(() => {
            window.Log.createFormattedLog({ 'level': 'trace' })
            window.Log.trace({ 'a': 1, 'b': 2, 'c': 3 }, 'MESSAGE')
          }, 2)

        })

        it('should create two messages', () => {
          Assert.equal(messages.length, 2)
        })

        it('should create a valid message', () => {
          Assert.ok(REGEXP_OBJECT_MESSAGE.test(messages[1]))
        })

      })

      describe('(when passing an error)', () => {

        let stack = null
        let messages = null

        before(async () => {

          stack = await Page.evaluate(() => {
            window._error = new Error('ERROR')
            return window._error.stack
          })

          messages = await Page.evaluateConsole(() => {
            window.Log.createFormattedLog({ 'level': 'trace' })
            window.Log.trace(window._error)
          }, 2)

          // console.log(`\n${stack}\n`) // eslint-disable-line no-console
          // console.log(`\n${messages[2]}\n`) // eslint-disable-line no-console
          //
          // 2018-02-01T11:37:55.933Z TRACE ERROR
          //
          // Error: ERROR
          //     at <anonymous>:2:35

        })

        it('should create two messages', () => {
          Assert.equal(messages.length, 2)
        })

        it('should create a valid message', () => {

          let _stack = stack.replace(/[/.()]/g, '\\$&')
          let _pattern = new RegExp(`^${Configuration.tests.patterns.prefixBrowser} TRACE ERROR\n\n${_stack}\n\n.*$`, 'm')

          Assert.ok(_pattern.test(messages[1]))

        })

      })

    })

  })

})
