import { assert as Assert } from 'chai'
import Is from '@pwn/is'
import Merge from 'object-merge'
import OS from 'os'
import Pino from 'pino'
import Sinon from 'sinon'

import Configuration from '../../configuration'
import { Log, Process } from '../../index'
import { WriteStream as Stream } from './stream'

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
          'enum': [ 'trace', 'debug' ]
        }
      },
      'required': [ 'level' ]
    }
  },
  'required': [ ...MESSAGE.required, 'level', 'msg', 'logOptions' ]
})

const REGEXP_CREATE_LOG_MESSAGE = new RegExp(`^${Configuration.tests.patterns.prefixNode} TRACE Log.createLog\\(\\.{3}parameters\\) \\{ .{3} \\}$`, 'm')
const REGEXP_OBJECT_MESSAGE = new RegExp(`^${Configuration.tests.patterns.prefixNode} TRACE MESSAGE\n\n\\{ a\\: 1, b\\: 2, c\\: 3 \\}\n$`, 'm')

describe('log', () => {

  for (let level of Object.entries(Log.levels.values)) {

    let [ levelName ] = level

    describe(`(when calling ${levelName})`, () => {

      it('should be defined', async () => {
        Assert.ok(Is.function(Log[levelName]))
      })

    })

  }

  describe('createLog', () => {

    describe('(when passing a stream)', () => {

      let stream = null
      let messages = null

      before(() => {

        Sinon.spy(Pino, 'call')

        stream = new Stream()
        Log.createLog(stream)

        messages = stream.getJSONMessages()

      })

      it('should call Pino', () => {
        Assert.equal(Pino.call.callCount, 1)
      })

      it('should call Pino with valid arguments', () => {
        Assert.ok(Pino.call.calledWith(Log, Sinon.match({ 'level': 'trace' }), stream))
      })

      it('should return the prototype', () => {
        Assert.ok(Pino.call.returned(Object.getPrototypeOf(Log)))
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

        stream = new Stream()
        Log.createLog({ 'level': 'trace' }, stream)

        messages = stream.getJSONMessages()

      })

      it('should call Pino with valid arguments', () => {
        Assert.ok(Pino.call.calledWith(Log, Sinon.match({ 'level': 'trace' }), stream))
      })

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

      let stream = null
      let messages = null

      before(() => {

        Sinon.spy(Pino, 'call')

        stream = new Stream()
        Log.createFormattedLog(stream)

        messages = stream.getMessages()

      })

      it('should call Pino', () => {
        Assert.equal(Pino.call.callCount, 1)
      })

      it('should call Pino with valid arguments', () => {
        Assert.ok(Pino.call.calledWith(Log, Sinon.match({ 'prettyPrint': true, 'prettifier': Log.format }), stream))
      })

      it('should create one message', () => {
        Assert.equal(messages.length, 1)
      })

      it('should create a valid Log.createLog message', () => {
        Assert.ok(REGEXP_CREATE_LOG_MESSAGE.test(messages[0]))
      })

      after(() => {
        Pino.call.restore()
      })

    })

    describe('(when passing options and a stream)', () => {

      let stream = null

      before(() => {

        Sinon.spy(Pino, 'call')

        stream = new Stream()

        Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': { 'levelFirst': true } }, stream)

      })

      it('should call Pino with valid arguments', () => {
        Assert.ok(Pino.call.calledWith(Log, Sinon.match({ 'prettyPrint': { 'levelFirst': true }, 'prettifier': Log.format }), stream))
      })

      after(() => {
        Pino.call.restore()
      })

    })

    describe('(when calling trace)', () => {

      describe('(when passing an object and a message)', () => {

        let messages = null

        before(() => {

          let stream = new Stream()
          Log.createFormattedLog({ 'level': 'trace' }, stream)
          Log.trace({ 'a': 1, 'b': 2, 'c': 3 }, 'MESSAGE')

          messages = stream.toString()

        })

        it('should create a valid message', () => {
          Assert.ok(REGEXP_OBJECT_MESSAGE.test(messages))
        })

      })

      describe('(when passing an error)', () => {

        let error = new Error('ERROR')
        let messages = null

        before(() => {

          let stream = new Stream()
          Log.createFormattedLog({ 'level': 'trace' }, stream)
          Log.trace(error)

          messages = stream.toString()

          // 2018-02-01T06:54:02.644Z PODMORE.local 11698 TRACE ERROR
          //
          // Error: ERROR
          //     at Context.<anonymous> (/Users/fficnar/Projects/Shared Projects/JavaScript/mablung/distributables/tests/library/log.js:334:26)
          //     at callFn (/Users/fficnar/Projects/Shared Projects/JavaScript/mablung/node_modules/mocha/lib/runnable.js:354:21)
          //     at Hook.Runnable.run (/Users/fficnar/Projects/Shared Projects/JavaScript/mablung/node_modules/mocha/lib/runnable.js:346:7)
          //     at next (/Users/fficnar/Projects/Shared Projects/JavaScript/mablung/node_modules/mocha/lib/runner.js:304:10)
          //     at Immediate._onImmediate (/Users/fficnar/Projects/Shared Projects/JavaScript/mablung/node_modules/mocha/lib/runner.js:334:5)
          //     at runCallback (timers.js:773:18)
          //     at tryOnImmediate (timers.js:734:5)
          //     at processImmediate [as _immediateCallback] (timers.js:711:5)

        })

        it('should create a valid message', () => {

          let stack = error.stack.replace(/[/.()]/g, '\\$&')
          let pattern = new RegExp(`^${Configuration.tests.patterns.prefixNode} TRACE ERROR\n\n${stack}\n.*$`, 'm')

          Assert.ok(pattern.test(messages))

        })

      })

    })

  })

})
