// import Assert from 'assert'
// import Sinon from 'sinon'
// import Utilities from 'util'
// // import Winston from 'winston'
//
// import FileSystem from '../library/file-system'
// import Log from '../library/log'
// import Package from '../package.json'
// import Path from '../library/path'
//
// const LOG_PATH = Path.join(__dirname, '..', 'process', 'logs', `${Package.name}.mocha.log`)
//
// before(() => {
//
//   FileSystem.mkdirp.sync(Path.dirname(LOG_PATH))
//
//   Log.clear()
//   Log.addFile(LOG_PATH)
//   Log.line()
//
// })
//
// after(() => {
//
//   Log.line()
//   Log.removeFile(LOG_PATH)
//
// })
//
// describe('Log', () => {
//
//   it('should create the log file', (callback) => {
//     FileSystem.access(LOG_PATH, FileSystem.F_OK, callback)
//   })
//
//   describe('format', () => {
//
//     describe('(support with no parameters)', () => {
//
//       it('should support Log.format', () => {
//         Assert.doesNotThrow(() => Log.format())
//       })
//
//     })
//
//     describe('(call with no parameters)', () => {
//
//       before(() => {
//
//         Sinon.spy(Utilities, 'format')
//
//         Log.format()
//
//       })
//
//       it('should call Utilities.format', () => {
//         Assert.ok(Utilities.format.calledOnce)
//       })
//
//       after(() => {
//         Utilities.format.restore()
//       })
//
//     })
//
//     describe('(support with an object)', () => {
//
//       it('should support Log.format', () => {
//         Assert.doesNotThrow(() => Log.format({
//           'level': 'level',
//           'message': 'message'
//         }))
//       })
//
//     })
//
//     describe('(call with an object)', () => {
//
//       before(() => {
//
//         Sinon.spy(Utilities, 'format')
//
//         Log.format({
//           'level': 'level',
//           'message': 'message'
//         })
//
//       })
//
//       it('should call Utilities.format', () => {
//         Assert.ok(Utilities.format.calledOnce)
//       })
//
//       after(() => {
//         Utilities.format.restore()
//       })
//
//     })
//
//     describe('(support with a string)', () => {
//
//       it('should support Log.format', () => {
//         Assert.doesNotThrow(() => Log.format('message'))
//       })
//
//     })
//
//     describe('(call with a string)', () => {
//
//       before(() => {
//         Sinon.spy(Utilities, 'format')
//         Log.format('message')
//       })
//
//       it('should call Utilities.format', () => {
//         Assert.ok(Utilities.format.calledOnce)
//       })
//
//       after(() => {
//         Utilities.format.restore()
//       })
//
//     })
//
//     describe('(support with multiple arguments)', () => {
//
//       it('should support Log.format', () => {
//         Assert.doesNotThrow(() => Log.format('message %d %d', 1, 2))
//       })
//
//     })
//
//     describe('(call with multiple arguments)', () => {
//
//       before(() => {
//         Sinon.spy(Utilities, 'format')
//         Log.format('message %d %d', 1, 2)
//       })
//
//       it('should call Utilities.format', () => {
//         Assert.ok(Utilities.format.calledTwice)
//       })
//
//       after(() => {
//         Utilities.format.restore()
//       })
//
//     })
//
//   })
//
//   describe('error', () => {
//
//     describe('(support with no parameters)', () => {
//
//       it('should support Log.error', () => {
//         Assert.doesNotThrow(() => Log.error())
//       })
//
//     })
//
//     describe('(call with no parameters)', () => {
//
//       before(() => {
//
//         Sinon.spy(Log, 'log')
//
//         Log.error()
//
//       })
//
//       it('should call Log.log', () => {
//         Assert.ok(Log.log.calledOnce)
//       })
//
//       after(() => {
//         Log.log.restore()
//       })
//
//     })
//
//     describe('(support with an Error)', () => {
//
//       it('should support Log.error', () => {
//         Assert.doesNotThrow(() => Log.error(new Error('Error')))
//       })
//
//     })
//
//     describe('(call with an Error)', () => {
//
//       before(() => {
//
//         Sinon.spy(Log, 'log')
//
//         Log.error(new Error('Error'))
//
//       })
//
//       it('should call Log.log twice', () => {
//         Assert.ok(Log.log.calledTwice)
//       })
//
//       it('should call Log.log with \'error.message\'', () => {
//         Assert.ok(Log.log.firstCall.calledWith('error', '-   error.message=\'Error\''))
//       })
//
//       it('should call Log.log with \'error.stack\'', () => {
//         Assert.ok(Log.log.secondCall.calledWithMatch('error', /- {3}error\.stack \.{3}.*/))
//       })
//
//       after(() => {
//         Log.log.restore()
//       })
//
//     })
//
//     describe('(support with multiple arguments)', () => {
//
//       it('should support Log.format', () => {
//         Assert.doesNotThrow(() => Log.error('message %d %d', 1, 2))
//       })
//
//     })
//
//     describe('(call with multiple arguments)', () => {
//
//       before(() => {
//         Sinon.spy(Log, 'log')
//         Log.error('message %d %d', 1, 2)
//       })
//
//       it('should call Log.log', () => {
//         Assert.ok(Log.log.calledOnce)
//       })
//
//       after(() => {
//         Log.log.restore()
//       })
//
//     })
//
//   })
//
//   describe('addConsole', () => {
//
//     describe('(support)', () => {
//
//       it('should support Log.addConsole', () => {
//         Assert.doesNotThrow(() => Log.addConsole())
//       })
//
//       after(() => {
//         Log.removeConsole()
//       })
//
//     })
//
//     // describe('(support twice)', () => {
//     //
//     //   it('should support Log.addConsole called twice', () => {
//     //     Assert.doesNotThrow(() => {
//     //       Log.addConsole()
//     //       Log.addConsole()
//     //     })
//     //   })
//     //
//     //   after(() => {
//     //     Log.removeConsole()
//     //   })
//     //
//     // })
//
//     describe('(call)', () => {
//
//       before(() => {
//
//         Sinon.spy(Log, 'add')
//         Sinon.spy(Log, 'addConsole')
//
//         Log.addConsole()
//
//       })
//
//       it('should call Log.add', () => {
//         Assert.ok(Log.add.calledOnce)
//       })
//
//       it('should call Log.add with arguments', () => {
//         Assert.ok(Log.add.calledWith(Winston.transports.Console))
//       })
//
//       // it('should return Log', () => {
//       //   Assert.ok(Log.addConsole.returned(Log))
//       // })
//
//       after(() => {
//
//         Log.removeConsole()
//
//         Log.addConsole.restore()
//         Log.add.restore()
//
//       })
//
//     })
//
//   })
//
//   describe('removeConsole', () => {
//
//     describe('(support)', () => {
//
//       before(() => {
//         Log.addConsole()
//       })
//
//       it('should support Log.removeConsole', () => {
//         Assert.doesNotThrow(() => Log.removeConsole())
//       })
//
//     })
//
//     // describe('(support twice)', () => {
//     //
//     //   before(() => {
//     //     Log.addConsole()
//     //   })
//     //
//     //   it('should not support Log.removeConsole called twice', () => {
//     //     Assert.throws(() => {
//     //       Log.removeConsole()
//     //       Log.removeConsole()
//     //     })
//     //   })
//     //
//     // })
//
//     describe('(call)', () => {
//
//       before(() => {
//
//         Sinon.spy(Log, 'remove')
//         Sinon.spy(Log, 'removeConsole')
//
//         Log.addConsole()
//         Log.removeConsole()
//
//       })
//
//       it('should call Log.remove', () => {
//         Assert.ok(Log.remove.calledOnce)
//       })
//
//       it('should call Log.remove with arguments', () => {
//         Assert.ok(Log.remove.calledWith(Winston.transports.Console))
//       })
//
//       // it('should return Log', () => {
//       //   Assert.ok(Log.removeConsole.returned(Log))
//       // })
//
//       after(() => {
//         Log.removeConsole.restore()
//         Log.remove.restore()
//       })
//
//     })
//
//   })
//
//   describe('inspect', () => {
//
//     describe('(support with no parameters)', () => {
//
//       it('should support Log.inspect', () => {
//         Assert.doesNotThrow(() => Log.inspect())
//       })
//
//     })
//
//     describe('(call with no parameters)', () => {
//
//       before(() => {
//
//         Sinon.spy(Utilities, 'inspect')
//
//         Log.inspect()
//
//       })
//
//       it('should not call Utilities.inspect', () => {
//         Assert.equal(Utilities.inspect.called, 0)
//       })
//
//       after(() => {
//         Utilities.inspect.restore()
//       })
//
//     })
//
//     describe('(support with one parameter)', () => {
//
//       it('should support Log.inspect', () => {
//         Assert.doesNotThrow(() => Log.inspect({
//           'value': 0
//         }))
//       })
//
//     })
//
//     describe('(call with one parameter)', () => {
//
//       before(() => {
//
//         Sinon.spy(Utilities, 'inspect')
//
//         Log.inspect({
//           'value': 0
//         })
//
//       })
//
//       it('should call Utilities.inspect', () => {
//         Assert.ok(Utilities.inspect.calledOnce)
//       })
//
//       after(() => {
//         Utilities.inspect.restore()
//       })
//
//     })
//
//     describe('(support with one string parameter)', () => {
//
//       it('should support Log.inspect', () => {
//         Assert.doesNotThrow(() => Log.inspect('Value'))
//       })
//
//     })
//
//     describe('(call with one string parameter)', () => {
//
//       before(() => {
//
//         Sinon.spy(Utilities, 'inspect')
//
//         Log.inspect('Value')
//
//       })
//
//       it('should not call Utilities.inspect', () => {
//         Assert.equal(Utilities.inspect.called, 0)
//       })
//
//       after(() => {
//         Utilities.inspect.restore()
//       })
//
//     })
//
//     describe('(support with two parameters)', () => {
//
//       it('should support Log.inspect', () => {
//         Assert.doesNotThrow(() => Log.inspect('object', {
//           'value': 0
//         }))
//       })
//
//     })
//
//     describe('(call with two parameters)', () => {
//
//       before(() => {
//
//         Sinon.spy(Utilities, 'inspect')
//
//         Log.inspect('object', {
//           'value': 0
//         })
//
//       })
//
//       it('should call Utilities.inspect', () => {
//         Assert.ok(Utilities.inspect.calledOnce)
//       })
//
//       after(() => {
//         Utilities.inspect.restore()
//       })
//
//     })
//
//     describe('(support with three parameters)', () => {
//
//       it('should support Log.inspect', () => {
//         Assert.doesNotThrow(() => Log.inspect('object', {
//           'value': 0,
//           'object': {
//             'value': 0,
//             'object': {
//               'value': 0
//             }
//           }
//         }, 1))
//       })
//
//     })
//
//     describe('(call with three parameters)', () => {
//
//       before(() => {
//
//         Sinon.spy(Utilities, 'inspect')
//
//         Log.inspect('object', {
//           'value': 0,
//           'object': {
//             'value': 0,
//             'object': {
//               'value': 0
//             }
//           }
//         }, 1)
//
//       })
//
//       it('should call Utilities.inspect', () => {
//         Assert.ok(Utilities.inspect.calledOnce)
//       })
//
//       after(() => {
//         Utilities.inspect.restore()
//       })
//
//     })
//
//     describe('(support with four parameters)', () => {
//
//       it('should support Log.inspect', () => {
//         Assert.doesNotThrow(() => Log.inspect('warn', 'object', {
//           'value': 0,
//           'object': {
//             'value': 0,
//             'object': {
//               'value': 0
//             }
//           }
//         }, 1))
//       })
//
//     })
//
//     describe('(call with four parameters)', () => {
//
//       before(() => {
//
//         Sinon.spy(Utilities, 'inspect')
//
//         Log.inspect('warn', 'object', {
//           'value': 0,
//           'object': {
//             'value': 0,
//             'object': {
//               'value': 0
//             }
//           }
//         }, 1)
//
//       })
//
//       it('should call Utilities.inspect', () => {
//         Assert.ok(Utilities.inspect.calledOnce)
//       })
//
//       after(() => {
//         Utilities.inspect.restore()
//       })
//
//     })
//
//   })
//
// })
"use strict";
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS90ZXN0cy9saWJyYXJ5L2xvZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBBc3NlcnQgZnJvbSAnYXNzZXJ0J1xuLy8gaW1wb3J0IFNpbm9uIGZyb20gJ3Npbm9uJ1xuLy8gaW1wb3J0IFV0aWxpdGllcyBmcm9tICd1dGlsJ1xuLy8gLy8gaW1wb3J0IFdpbnN0b24gZnJvbSAnd2luc3Rvbidcbi8vXG4vLyBpbXBvcnQgRmlsZVN5c3RlbSBmcm9tICcuLi9saWJyYXJ5L2ZpbGUtc3lzdGVtJ1xuLy8gaW1wb3J0IExvZyBmcm9tICcuLi9saWJyYXJ5L2xvZydcbi8vIGltcG9ydCBQYWNrYWdlIGZyb20gJy4uL3BhY2thZ2UuanNvbidcbi8vIGltcG9ydCBQYXRoIGZyb20gJy4uL2xpYnJhcnkvcGF0aCdcbi8vXG4vLyBjb25zdCBMT0dfUEFUSCA9IFBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdwcm9jZXNzJywgJ2xvZ3MnLCBgJHtQYWNrYWdlLm5hbWV9Lm1vY2hhLmxvZ2ApXG4vL1xuLy8gYmVmb3JlKCgpID0+IHtcbi8vXG4vLyAgIEZpbGVTeXN0ZW0ubWtkaXJwLnN5bmMoUGF0aC5kaXJuYW1lKExPR19QQVRIKSlcbi8vXG4vLyAgIExvZy5jbGVhcigpXG4vLyAgIExvZy5hZGRGaWxlKExPR19QQVRIKVxuLy8gICBMb2cubGluZSgpXG4vL1xuLy8gfSlcbi8vXG4vLyBhZnRlcigoKSA9PiB7XG4vL1xuLy8gICBMb2cubGluZSgpXG4vLyAgIExvZy5yZW1vdmVGaWxlKExPR19QQVRIKVxuLy9cbi8vIH0pXG4vL1xuLy8gZGVzY3JpYmUoJ0xvZycsICgpID0+IHtcbi8vXG4vLyAgIGl0KCdzaG91bGQgY3JlYXRlIHRoZSBsb2cgZmlsZScsIChjYWxsYmFjaykgPT4ge1xuLy8gICAgIEZpbGVTeXN0ZW0uYWNjZXNzKExPR19QQVRILCBGaWxlU3lzdGVtLkZfT0ssIGNhbGxiYWNrKVxuLy8gICB9KVxuLy9cbi8vICAgZGVzY3JpYmUoJ2Zvcm1hdCcsICgpID0+IHtcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhzdXBwb3J0IHdpdGggbm8gcGFyYW1ldGVycyknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCBzdXBwb3J0IExvZy5mb3JtYXQnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4gTG9nLmZvcm1hdCgpKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhjYWxsIHdpdGggbm8gcGFyYW1ldGVycyknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgYmVmb3JlKCgpID0+IHtcbi8vXG4vLyAgICAgICAgIFNpbm9uLnNweShVdGlsaXRpZXMsICdmb3JtYXQnKVxuLy9cbi8vICAgICAgICAgTG9nLmZvcm1hdCgpXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgVXRpbGl0aWVzLmZvcm1hdCcsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0Lm9rKFV0aWxpdGllcy5mb3JtYXQuY2FsbGVkT25jZSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgICAgYWZ0ZXIoKCkgPT4ge1xuLy8gICAgICAgICBVdGlsaXRpZXMuZm9ybWF0LnJlc3RvcmUoKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhzdXBwb3J0IHdpdGggYW4gb2JqZWN0KScsICgpID0+IHtcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIHN1cHBvcnQgTG9nLmZvcm1hdCcsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0LmRvZXNOb3RUaHJvdygoKSA9PiBMb2cuZm9ybWF0KHtcbi8vICAgICAgICAgICAnbGV2ZWwnOiAnbGV2ZWwnLFxuLy8gICAgICAgICAgICdtZXNzYWdlJzogJ21lc3NhZ2UnXG4vLyAgICAgICAgIH0pKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhjYWxsIHdpdGggYW4gb2JqZWN0KScsICgpID0+IHtcbi8vXG4vLyAgICAgICBiZWZvcmUoKCkgPT4ge1xuLy9cbi8vICAgICAgICAgU2lub24uc3B5KFV0aWxpdGllcywgJ2Zvcm1hdCcpXG4vL1xuLy8gICAgICAgICBMb2cuZm9ybWF0KHtcbi8vICAgICAgICAgICAnbGV2ZWwnOiAnbGV2ZWwnLFxuLy8gICAgICAgICAgICdtZXNzYWdlJzogJ21lc3NhZ2UnXG4vLyAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgVXRpbGl0aWVzLmZvcm1hdCcsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0Lm9rKFV0aWxpdGllcy5mb3JtYXQuY2FsbGVkT25jZSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgICAgYWZ0ZXIoKCkgPT4ge1xuLy8gICAgICAgICBVdGlsaXRpZXMuZm9ybWF0LnJlc3RvcmUoKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhzdXBwb3J0IHdpdGggYSBzdHJpbmcpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGl0KCdzaG91bGQgc3VwcG9ydCBMb2cuZm9ybWF0JywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQuZG9lc05vdFRocm93KCgpID0+IExvZy5mb3JtYXQoJ21lc3NhZ2UnKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcoY2FsbCB3aXRoIGEgc3RyaW5nKScsICgpID0+IHtcbi8vXG4vLyAgICAgICBiZWZvcmUoKCkgPT4ge1xuLy8gICAgICAgICBTaW5vbi5zcHkoVXRpbGl0aWVzLCAnZm9ybWF0Jylcbi8vICAgICAgICAgTG9nLmZvcm1hdCgnbWVzc2FnZScpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGl0KCdzaG91bGQgY2FsbCBVdGlsaXRpZXMuZm9ybWF0JywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQub2soVXRpbGl0aWVzLmZvcm1hdC5jYWxsZWRPbmNlKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBhZnRlcigoKSA9PiB7XG4vLyAgICAgICAgIFV0aWxpdGllcy5mb3JtYXQucmVzdG9yZSgpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICB9KVxuLy9cbi8vICAgICBkZXNjcmliZSgnKHN1cHBvcnQgd2l0aCBtdWx0aXBsZSBhcmd1bWVudHMpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGl0KCdzaG91bGQgc3VwcG9ydCBMb2cuZm9ybWF0JywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQuZG9lc05vdFRocm93KCgpID0+IExvZy5mb3JtYXQoJ21lc3NhZ2UgJWQgJWQnLCAxLCAyKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcoY2FsbCB3aXRoIG11bHRpcGxlIGFyZ3VtZW50cyknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgYmVmb3JlKCgpID0+IHtcbi8vICAgICAgICAgU2lub24uc3B5KFV0aWxpdGllcywgJ2Zvcm1hdCcpXG4vLyAgICAgICAgIExvZy5mb3JtYXQoJ21lc3NhZ2UgJWQgJWQnLCAxLCAyKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgVXRpbGl0aWVzLmZvcm1hdCcsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0Lm9rKFV0aWxpdGllcy5mb3JtYXQuY2FsbGVkVHdpY2UpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGFmdGVyKCgpID0+IHtcbi8vICAgICAgICAgVXRpbGl0aWVzLmZvcm1hdC5yZXN0b3JlKClcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICB9KVxuLy9cbi8vICAgZGVzY3JpYmUoJ2Vycm9yJywgKCkgPT4ge1xuLy9cbi8vICAgICBkZXNjcmliZSgnKHN1cHBvcnQgd2l0aCBubyBwYXJhbWV0ZXJzKScsICgpID0+IHtcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIHN1cHBvcnQgTG9nLmVycm9yJywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQuZG9lc05vdFRocm93KCgpID0+IExvZy5lcnJvcigpKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhjYWxsIHdpdGggbm8gcGFyYW1ldGVycyknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgYmVmb3JlKCgpID0+IHtcbi8vXG4vLyAgICAgICAgIFNpbm9uLnNweShMb2csICdsb2cnKVxuLy9cbi8vICAgICAgICAgTG9nLmVycm9yKClcbi8vXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGl0KCdzaG91bGQgY2FsbCBMb2cubG9nJywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQub2soTG9nLmxvZy5jYWxsZWRPbmNlKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBhZnRlcigoKSA9PiB7XG4vLyAgICAgICAgIExvZy5sb2cucmVzdG9yZSgpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICB9KVxuLy9cbi8vICAgICBkZXNjcmliZSgnKHN1cHBvcnQgd2l0aCBhbiBFcnJvciknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCBzdXBwb3J0IExvZy5lcnJvcicsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0LmRvZXNOb3RUaHJvdygoKSA9PiBMb2cuZXJyb3IobmV3IEVycm9yKCdFcnJvcicpKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcoY2FsbCB3aXRoIGFuIEVycm9yKScsICgpID0+IHtcbi8vXG4vLyAgICAgICBiZWZvcmUoKCkgPT4ge1xuLy9cbi8vICAgICAgICAgU2lub24uc3B5KExvZywgJ2xvZycpXG4vL1xuLy8gICAgICAgICBMb2cuZXJyb3IobmV3IEVycm9yKCdFcnJvcicpKVxuLy9cbi8vICAgICAgIH0pXG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCBjYWxsIExvZy5sb2cgdHdpY2UnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5vayhMb2cubG9nLmNhbGxlZFR3aWNlKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgTG9nLmxvZyB3aXRoIFxcJ2Vycm9yLm1lc3NhZ2VcXCcnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5vayhMb2cubG9nLmZpcnN0Q2FsbC5jYWxsZWRXaXRoKCdlcnJvcicsICctICAgZXJyb3IubWVzc2FnZT1cXCdFcnJvclxcJycpKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgTG9nLmxvZyB3aXRoIFxcJ2Vycm9yLnN0YWNrXFwnJywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQub2soTG9nLmxvZy5zZWNvbmRDYWxsLmNhbGxlZFdpdGhNYXRjaCgnZXJyb3InLCAvLSB7M31lcnJvclxcLnN0YWNrIFxcLnszfS4qLykpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGFmdGVyKCgpID0+IHtcbi8vICAgICAgICAgTG9nLmxvZy5yZXN0b3JlKClcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcoc3VwcG9ydCB3aXRoIG11bHRpcGxlIGFyZ3VtZW50cyknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCBzdXBwb3J0IExvZy5mb3JtYXQnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4gTG9nLmVycm9yKCdtZXNzYWdlICVkICVkJywgMSwgMikpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICB9KVxuLy9cbi8vICAgICBkZXNjcmliZSgnKGNhbGwgd2l0aCBtdWx0aXBsZSBhcmd1bWVudHMpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGJlZm9yZSgoKSA9PiB7XG4vLyAgICAgICAgIFNpbm9uLnNweShMb2csICdsb2cnKVxuLy8gICAgICAgICBMb2cuZXJyb3IoJ21lc3NhZ2UgJWQgJWQnLCAxLCAyKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgTG9nLmxvZycsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0Lm9rKExvZy5sb2cuY2FsbGVkT25jZSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgICAgYWZ0ZXIoKCkgPT4ge1xuLy8gICAgICAgICBMb2cubG9nLnJlc3RvcmUoKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgIH0pXG4vL1xuLy8gICBkZXNjcmliZSgnYWRkQ29uc29sZScsICgpID0+IHtcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhzdXBwb3J0KScsICgpID0+IHtcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIHN1cHBvcnQgTG9nLmFkZENvbnNvbGUnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4gTG9nLmFkZENvbnNvbGUoKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgICAgYWZ0ZXIoKCkgPT4ge1xuLy8gICAgICAgICBMb2cucmVtb3ZlQ29uc29sZSgpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICB9KVxuLy9cbi8vICAgICAvLyBkZXNjcmliZSgnKHN1cHBvcnQgdHdpY2UpJywgKCkgPT4ge1xuLy8gICAgIC8vXG4vLyAgICAgLy8gICBpdCgnc2hvdWxkIHN1cHBvcnQgTG9nLmFkZENvbnNvbGUgY2FsbGVkIHR3aWNlJywgKCkgPT4ge1xuLy8gICAgIC8vICAgICBBc3NlcnQuZG9lc05vdFRocm93KCgpID0+IHtcbi8vICAgICAvLyAgICAgICBMb2cuYWRkQ29uc29sZSgpXG4vLyAgICAgLy8gICAgICAgTG9nLmFkZENvbnNvbGUoKVxuLy8gICAgIC8vICAgICB9KVxuLy8gICAgIC8vICAgfSlcbi8vICAgICAvL1xuLy8gICAgIC8vICAgYWZ0ZXIoKCkgPT4ge1xuLy8gICAgIC8vICAgICBMb2cucmVtb3ZlQ29uc29sZSgpXG4vLyAgICAgLy8gICB9KVxuLy8gICAgIC8vXG4vLyAgICAgLy8gfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhjYWxsKScsICgpID0+IHtcbi8vXG4vLyAgICAgICBiZWZvcmUoKCkgPT4ge1xuLy9cbi8vICAgICAgICAgU2lub24uc3B5KExvZywgJ2FkZCcpXG4vLyAgICAgICAgIFNpbm9uLnNweShMb2csICdhZGRDb25zb2xlJylcbi8vXG4vLyAgICAgICAgIExvZy5hZGRDb25zb2xlKClcbi8vXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGl0KCdzaG91bGQgY2FsbCBMb2cuYWRkJywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQub2soTG9nLmFkZC5jYWxsZWRPbmNlKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgTG9nLmFkZCB3aXRoIGFyZ3VtZW50cycsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0Lm9rKExvZy5hZGQuY2FsbGVkV2l0aChXaW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSkpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIC8vIGl0KCdzaG91bGQgcmV0dXJuIExvZycsICgpID0+IHtcbi8vICAgICAgIC8vICAgQXNzZXJ0Lm9rKExvZy5hZGRDb25zb2xlLnJldHVybmVkKExvZykpXG4vLyAgICAgICAvLyB9KVxuLy9cbi8vICAgICAgIGFmdGVyKCgpID0+IHtcbi8vXG4vLyAgICAgICAgIExvZy5yZW1vdmVDb25zb2xlKClcbi8vXG4vLyAgICAgICAgIExvZy5hZGRDb25zb2xlLnJlc3RvcmUoKVxuLy8gICAgICAgICBMb2cuYWRkLnJlc3RvcmUoKVxuLy9cbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICB9KVxuLy9cbi8vICAgZGVzY3JpYmUoJ3JlbW92ZUNvbnNvbGUnLCAoKSA9PiB7XG4vL1xuLy8gICAgIGRlc2NyaWJlKCcoc3VwcG9ydCknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgYmVmb3JlKCgpID0+IHtcbi8vICAgICAgICAgTG9nLmFkZENvbnNvbGUoKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIHN1cHBvcnQgTG9nLnJlbW92ZUNvbnNvbGUnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4gTG9nLnJlbW92ZUNvbnNvbGUoKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIC8vIGRlc2NyaWJlKCcoc3VwcG9ydCB0d2ljZSknLCAoKSA9PiB7XG4vLyAgICAgLy9cbi8vICAgICAvLyAgIGJlZm9yZSgoKSA9PiB7XG4vLyAgICAgLy8gICAgIExvZy5hZGRDb25zb2xlKClcbi8vICAgICAvLyAgIH0pXG4vLyAgICAgLy9cbi8vICAgICAvLyAgIGl0KCdzaG91bGQgbm90IHN1cHBvcnQgTG9nLnJlbW92ZUNvbnNvbGUgY2FsbGVkIHR3aWNlJywgKCkgPT4ge1xuLy8gICAgIC8vICAgICBBc3NlcnQudGhyb3dzKCgpID0+IHtcbi8vICAgICAvLyAgICAgICBMb2cucmVtb3ZlQ29uc29sZSgpXG4vLyAgICAgLy8gICAgICAgTG9nLnJlbW92ZUNvbnNvbGUoKVxuLy8gICAgIC8vICAgICB9KVxuLy8gICAgIC8vICAgfSlcbi8vICAgICAvL1xuLy8gICAgIC8vIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcoY2FsbCknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgYmVmb3JlKCgpID0+IHtcbi8vXG4vLyAgICAgICAgIFNpbm9uLnNweShMb2csICdyZW1vdmUnKVxuLy8gICAgICAgICBTaW5vbi5zcHkoTG9nLCAncmVtb3ZlQ29uc29sZScpXG4vL1xuLy8gICAgICAgICBMb2cuYWRkQ29uc29sZSgpXG4vLyAgICAgICAgIExvZy5yZW1vdmVDb25zb2xlKClcbi8vXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGl0KCdzaG91bGQgY2FsbCBMb2cucmVtb3ZlJywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQub2soTG9nLnJlbW92ZS5jYWxsZWRPbmNlKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgTG9nLnJlbW92ZSB3aXRoIGFyZ3VtZW50cycsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0Lm9rKExvZy5yZW1vdmUuY2FsbGVkV2l0aChXaW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSkpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIC8vIGl0KCdzaG91bGQgcmV0dXJuIExvZycsICgpID0+IHtcbi8vICAgICAgIC8vICAgQXNzZXJ0Lm9rKExvZy5yZW1vdmVDb25zb2xlLnJldHVybmVkKExvZykpXG4vLyAgICAgICAvLyB9KVxuLy9cbi8vICAgICAgIGFmdGVyKCgpID0+IHtcbi8vICAgICAgICAgTG9nLnJlbW92ZUNvbnNvbGUucmVzdG9yZSgpXG4vLyAgICAgICAgIExvZy5yZW1vdmUucmVzdG9yZSgpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICB9KVxuLy9cbi8vICAgfSlcbi8vXG4vLyAgIGRlc2NyaWJlKCdpbnNwZWN0JywgKCkgPT4ge1xuLy9cbi8vICAgICBkZXNjcmliZSgnKHN1cHBvcnQgd2l0aCBubyBwYXJhbWV0ZXJzKScsICgpID0+IHtcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIHN1cHBvcnQgTG9nLmluc3BlY3QnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4gTG9nLmluc3BlY3QoKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcoY2FsbCB3aXRoIG5vIHBhcmFtZXRlcnMpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGJlZm9yZSgoKSA9PiB7XG4vL1xuLy8gICAgICAgICBTaW5vbi5zcHkoVXRpbGl0aWVzLCAnaW5zcGVjdCcpXG4vL1xuLy8gICAgICAgICBMb2cuaW5zcGVjdCgpXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIFV0aWxpdGllcy5pbnNwZWN0JywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQuZXF1YWwoVXRpbGl0aWVzLmluc3BlY3QuY2FsbGVkLCAwKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBhZnRlcigoKSA9PiB7XG4vLyAgICAgICAgIFV0aWxpdGllcy5pbnNwZWN0LnJlc3RvcmUoKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhzdXBwb3J0IHdpdGggb25lIHBhcmFtZXRlciknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCBzdXBwb3J0IExvZy5pbnNwZWN0JywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQuZG9lc05vdFRocm93KCgpID0+IExvZy5pbnNwZWN0KHtcbi8vICAgICAgICAgICAndmFsdWUnOiAwXG4vLyAgICAgICAgIH0pKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhjYWxsIHdpdGggb25lIHBhcmFtZXRlciknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgYmVmb3JlKCgpID0+IHtcbi8vXG4vLyAgICAgICAgIFNpbm9uLnNweShVdGlsaXRpZXMsICdpbnNwZWN0Jylcbi8vXG4vLyAgICAgICAgIExvZy5pbnNwZWN0KHtcbi8vICAgICAgICAgICAndmFsdWUnOiAwXG4vLyAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgVXRpbGl0aWVzLmluc3BlY3QnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5vayhVdGlsaXRpZXMuaW5zcGVjdC5jYWxsZWRPbmNlKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBhZnRlcigoKSA9PiB7XG4vLyAgICAgICAgIFV0aWxpdGllcy5pbnNwZWN0LnJlc3RvcmUoKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhzdXBwb3J0IHdpdGggb25lIHN0cmluZyBwYXJhbWV0ZXIpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGl0KCdzaG91bGQgc3VwcG9ydCBMb2cuaW5zcGVjdCcsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0LmRvZXNOb3RUaHJvdygoKSA9PiBMb2cuaW5zcGVjdCgnVmFsdWUnKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcoY2FsbCB3aXRoIG9uZSBzdHJpbmcgcGFyYW1ldGVyKScsICgpID0+IHtcbi8vXG4vLyAgICAgICBiZWZvcmUoKCkgPT4ge1xuLy9cbi8vICAgICAgICAgU2lub24uc3B5KFV0aWxpdGllcywgJ2luc3BlY3QnKVxuLy9cbi8vICAgICAgICAgTG9nLmluc3BlY3QoJ1ZhbHVlJylcbi8vXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGl0KCdzaG91bGQgbm90IGNhbGwgVXRpbGl0aWVzLmluc3BlY3QnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5lcXVhbChVdGlsaXRpZXMuaW5zcGVjdC5jYWxsZWQsIDApXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGFmdGVyKCgpID0+IHtcbi8vICAgICAgICAgVXRpbGl0aWVzLmluc3BlY3QucmVzdG9yZSgpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICB9KVxuLy9cbi8vICAgICBkZXNjcmliZSgnKHN1cHBvcnQgd2l0aCB0d28gcGFyYW1ldGVycyknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCBzdXBwb3J0IExvZy5pbnNwZWN0JywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQuZG9lc05vdFRocm93KCgpID0+IExvZy5pbnNwZWN0KCdvYmplY3QnLCB7XG4vLyAgICAgICAgICAgJ3ZhbHVlJzogMFxuLy8gICAgICAgICB9KSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcoY2FsbCB3aXRoIHR3byBwYXJhbWV0ZXJzKScsICgpID0+IHtcbi8vXG4vLyAgICAgICBiZWZvcmUoKCkgPT4ge1xuLy9cbi8vICAgICAgICAgU2lub24uc3B5KFV0aWxpdGllcywgJ2luc3BlY3QnKVxuLy9cbi8vICAgICAgICAgTG9nLmluc3BlY3QoJ29iamVjdCcsIHtcbi8vICAgICAgICAgICAndmFsdWUnOiAwXG4vLyAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgVXRpbGl0aWVzLmluc3BlY3QnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5vayhVdGlsaXRpZXMuaW5zcGVjdC5jYWxsZWRPbmNlKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBhZnRlcigoKSA9PiB7XG4vLyAgICAgICAgIFV0aWxpdGllcy5pbnNwZWN0LnJlc3RvcmUoKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhzdXBwb3J0IHdpdGggdGhyZWUgcGFyYW1ldGVycyknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCBzdXBwb3J0IExvZy5pbnNwZWN0JywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQuZG9lc05vdFRocm93KCgpID0+IExvZy5pbnNwZWN0KCdvYmplY3QnLCB7XG4vLyAgICAgICAgICAgJ3ZhbHVlJzogMCxcbi8vICAgICAgICAgICAnb2JqZWN0Jzoge1xuLy8gICAgICAgICAgICAgJ3ZhbHVlJzogMCxcbi8vICAgICAgICAgICAgICdvYmplY3QnOiB7XG4vLyAgICAgICAgICAgICAgICd2YWx1ZSc6IDBcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sIDEpKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhjYWxsIHdpdGggdGhyZWUgcGFyYW1ldGVycyknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgYmVmb3JlKCgpID0+IHtcbi8vXG4vLyAgICAgICAgIFNpbm9uLnNweShVdGlsaXRpZXMsICdpbnNwZWN0Jylcbi8vXG4vLyAgICAgICAgIExvZy5pbnNwZWN0KCdvYmplY3QnLCB7XG4vLyAgICAgICAgICAgJ3ZhbHVlJzogMCxcbi8vICAgICAgICAgICAnb2JqZWN0Jzoge1xuLy8gICAgICAgICAgICAgJ3ZhbHVlJzogMCxcbi8vICAgICAgICAgICAgICdvYmplY3QnOiB7XG4vLyAgICAgICAgICAgICAgICd2YWx1ZSc6IDBcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sIDEpXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgVXRpbGl0aWVzLmluc3BlY3QnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5vayhVdGlsaXRpZXMuaW5zcGVjdC5jYWxsZWRPbmNlKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBhZnRlcigoKSA9PiB7XG4vLyAgICAgICAgIFV0aWxpdGllcy5pbnNwZWN0LnJlc3RvcmUoKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhzdXBwb3J0IHdpdGggZm91ciBwYXJhbWV0ZXJzKScsICgpID0+IHtcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIHN1cHBvcnQgTG9nLmluc3BlY3QnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4gTG9nLmluc3BlY3QoJ3dhcm4nLCAnb2JqZWN0Jywge1xuLy8gICAgICAgICAgICd2YWx1ZSc6IDAsXG4vLyAgICAgICAgICAgJ29iamVjdCc6IHtcbi8vICAgICAgICAgICAgICd2YWx1ZSc6IDAsXG4vLyAgICAgICAgICAgICAnb2JqZWN0Jzoge1xuLy8gICAgICAgICAgICAgICAndmFsdWUnOiAwXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICB9LCAxKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcoY2FsbCB3aXRoIGZvdXIgcGFyYW1ldGVycyknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgYmVmb3JlKCgpID0+IHtcbi8vXG4vLyAgICAgICAgIFNpbm9uLnNweShVdGlsaXRpZXMsICdpbnNwZWN0Jylcbi8vXG4vLyAgICAgICAgIExvZy5pbnNwZWN0KCd3YXJuJywgJ29iamVjdCcsIHtcbi8vICAgICAgICAgICAndmFsdWUnOiAwLFxuLy8gICAgICAgICAgICdvYmplY3QnOiB7XG4vLyAgICAgICAgICAgICAndmFsdWUnOiAwLFxuLy8gICAgICAgICAgICAgJ29iamVjdCc6IHtcbi8vICAgICAgICAgICAgICAgJ3ZhbHVlJzogMFxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgfSwgMSlcbi8vXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGl0KCdzaG91bGQgY2FsbCBVdGlsaXRpZXMuaW5zcGVjdCcsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0Lm9rKFV0aWxpdGllcy5pbnNwZWN0LmNhbGxlZE9uY2UpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGFmdGVyKCgpID0+IHtcbi8vICAgICAgICAgVXRpbGl0aWVzLmluc3BlY3QucmVzdG9yZSgpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICB9KVxuLy9cbi8vICAgfSlcbi8vXG4vLyB9KVxuIl19