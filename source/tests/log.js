import Assert from 'assert'
import Sinon from 'sinon'
import Utilities from 'util'
import Winston from 'winston'

import FileSystem from '../library/file-system'
import Log from '../library/log'
import Package from '../package.json'
import Path from '../library/path'

const LOG_PATH = Path.join(__dirname, '..', 'process', 'logs', `${Package.name}.mocha.log`)

before(() => {

  FileSystem.mkdirp.sync(Path.dirname(LOG_PATH))

  Log.clear()
  Log.addFile(LOG_PATH)
  Log.line()

})

after(() => {

  Log.line()
  Log.removeFile(LOG_PATH)

})

describe('Log', () => {

  it('should create the log file', (callback) => {
    FileSystem.access(LOG_PATH, FileSystem.F_OK, callback)
  })

  describe('format', () => {

    describe('(support with no parameters)', () => {

      it('should support Log.format', () => {
        Assert.doesNotThrow(() => Log.format())
      })

    })

    describe('(call with no parameters)', () => {

      before(() => {

        Sinon.spy(Utilities, 'format')

        Log.format()

      })

      it('should call Utilities.format', () => {
        Assert.ok(Utilities.format.calledOnce)
      })

      after(() => {
        Utilities.format.restore()
      })

    })

    describe('(support with an object)', () => {

      it('should support Log.format', () => {
        Assert.doesNotThrow(() => Log.format({
          'level': 'level',
          'message': 'message'
        }))
      })

    })

    describe('(call with an object)', () => {

      before(() => {

        Sinon.spy(Utilities, 'format')

        Log.format({
          'level': 'level',
          'message': 'message'
        })

      })

      it('should call Utilities.format', () => {
        Assert.ok(Utilities.format.calledOnce)
      })

      after(() => {
        Utilities.format.restore()
      })

    })

    describe('(support with a string)', () => {

      it('should support Log.format', () => {
        Assert.doesNotThrow(() => Log.format('message'))
      })

    })

    describe('(call with a string)', () => {

      before(() => {
        Sinon.spy(Utilities, 'format')
        Log.format('message')
      })

      it('should call Utilities.format', () => {
        Assert.ok(Utilities.format.calledOnce)
      })

      after(() => {
        Utilities.format.restore()
      })

    })

    describe('(support with multiple arguments)', () => {

      it('should support Log.format', () => {
        Assert.doesNotThrow(() => Log.format('message $d %d', 1, 2))
      })

    })

    describe('(call with multiple arguments)', () => {

      before(() => {
        Sinon.spy(Utilities, 'format')
        Log.format('message $d %d', 1, 2)
      })

      it('should call Utilities.format', () => {
        Assert.equal(Utilities.format.callCount, 2)
      })

      after(() => {
        Utilities.format.restore()
      })

    })

  })

  describe('addConsole', () => {

    describe('(support)', () => {

      it('should support Log.addConsole', () => {
        Assert.doesNotThrow(() => Log.addConsole())
      })

      after(() => {
        Log.removeConsole()
      })

    })

    describe('(call)', () => {

      before(() => {

        Sinon.spy(Log, 'add')
        Sinon.spy(Log, 'addConsole')

        Log.addConsole()

      })

      it('should call Log.add', () => {
        Assert.ok(Log.add.calledOnce)
      })

      it('should call Log.add with arguments', () => {
        Assert.ok(Log.add.calledWith(Winston.transports.Console))
      })

      // it('should return Log', () => {
      //   Assert.ok(Log.addConsole.returned(Log))
      // })

      after(() => {

        Log.removeConsole()

        Log.addConsole.restore()
        Log.add.restore()

      })

    })

  })

  describe('removeConsole', () => {

    describe('(support)', () => {

      before(() => {
        Log.addConsole()
      })

      it('should support Log.removeConsole', () => {
        Assert.doesNotThrow(() => Log.removeConsole())
      })

    })

    describe('(call)', () => {

      before(() => {

        Sinon.spy(Log, 'remove')
        Sinon.spy(Log, 'removeConsole')

        Log.addConsole()
        Log.removeConsole()

      })

      it('should call Log.remove', () => {
        Assert.ok(Log.remove.calledOnce)
      })

      it('should call Log.remove with arguments', () => {
        Assert.ok(Log.remove.calledWith(Winston.transports.Console))
      })

      // it('should return Log', () => {
      //   Assert.ok(Log.removeConsole.returned(Log))
      // })

      after(() => {
        Log.removeConsole.restore()
        Log.remove.restore()
      })

    })

  })

  describe('inspect', () => {

    describe('(support with no parameters)', () => {

      it('should support Log.inspect', () => {
        Assert.doesNotThrow(() => Log.inspect())
      })

    })

    describe('(call with no parameters)', () => {

      before(() => {

        Sinon.spy(Utilities, 'inspect')

        Log.inspect()

      })

      it('should not call Utilities.inspect', () => {
        Assert.equal(Utilities.inspect.called, 0)
      })

      after(() => {
        Utilities.inspect.restore()
      })

    })

    describe('(support with one parameter)', () => {

      it('should support Log.inspect', () => {
        Assert.doesNotThrow(() => Log.inspect({
          'value': 0
        }))
      })

    })

    describe('(call with one parameter)', () => {

      before(() => {

        Sinon.spy(Utilities, 'inspect')

        Log.inspect({
          'value': 0
        })

      })

      it('should call Utilities.inspect', () => {
        Assert.ok(Utilities.inspect.calledOnce)
      })

      after(() => {
        Utilities.inspect.restore()
      })

    })

    describe('(support with one string parameter)', () => {

      it('should support Log.inspect', () => {
        Assert.doesNotThrow(() => Log.inspect('Value'))
      })

    })

    describe('(call with one string parameter)', () => {

      before(() => {

        Sinon.spy(Utilities, 'inspect')

        Log.inspect('Value')

      })

      it('should not call Utilities.inspect', () => {
        Assert.equal(Utilities.inspect.called, 0)
      })

      after(() => {
        Utilities.inspect.restore()
      })

    })

    describe('(support with two parameters)', () => {

      it('should support Log.inspect', () => {
        Assert.doesNotThrow(() => Log.inspect('object', {
          'value': 0
        }))
      })

    })

    describe('(call with two parameters)', () => {

      before(() => {

        Sinon.spy(Utilities, 'inspect')

        Log.inspect('object', {
          'value': 0
        })

      })

      it('should call Utilities.inspect', () => {
        Assert.ok(Utilities.inspect.calledOnce)
      })

      after(() => {
        Utilities.inspect.restore()
      })

    })

    describe('(support with three parameters)', () => {

      it('should support Log.inspect', () => {
        Assert.doesNotThrow(() => Log.inspect('object', {
          'value': 0,
          'object': {
            'value': 0,
            'object': {
              'value': 0
            }
          }
        }, 1))
      })

    })

    describe('(call with three parameters)', () => {

      before(() => {

        Sinon.spy(Utilities, 'inspect')

        Log.inspect('object', {
          'value': 0,
          'object': {
            'value': 0,
            'object': {
              'value': 0
            }
          }
        }, 1)

      })

      it('should call Utilities.inspect', () => {
        Assert.ok(Utilities.inspect.calledOnce)
      })

      after(() => {
        Utilities.inspect.restore()
      })

    })

    describe('(support with four parameters)', () => {

      it('should support Log.inspect', () => {
        Assert.doesNotThrow(() => Log.inspect('warn', 'object', {
          'value': 0,
          'object': {
            'value': 0,
            'object': {
              'value': 0
            }
          }
        }, 1))
      })

    })

    describe('(call with four parameters)', () => {

      before(() => {

        Sinon.spy(Utilities, 'inspect')

        Log.inspect('warn', 'object', {
          'value': 0,
          'object': {
            'value': 0,
            'object': {
              'value': 0
            }
          }
        }, 1)

      })

      it('should call Utilities.inspect', () => {
        Assert.ok(Utilities.inspect.calledOnce)
      })

      after(() => {
        Utilities.inspect.restore()
      })

    })

  })

})
