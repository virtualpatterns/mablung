// import { assert as Assert } from 'chai'
// import Merge from 'object-merge'
// import Puppeteer from 'puppeteer'

import Configuration from '../../configuration'
import { Browser, Page } from './browser'

// const MESSAGE = {
//   'type': 'object',
//   'properties': {
//     'time': { 'type': 'number' }
//   },
//   'required': [ 'time' ]
// }

// const CREATE_LOG_MESSAGE = Merge(MESSAGE, {
//   'title': 'CreateLog',
//   'properties': {
//     'level': {
//       'type': 'number',
//       'enum': [ 20 ]
//     },
//     'msg': {
//       'type': 'string',
//       'enum': [ 'Log.createLog(...parameters) { ... }' ]
//     },
//     'logOptions': {
//       'title': 'CreateLog-LogOptions',
//       'type': 'object',
//       'properties': {
//         'level': {
//           'type': 'string',
//           'enum': [ 'debug', 'trace' ]
//         }
//       },
//       'required': [ 'level' ]
//     }
//   },
//   'required': [ ...MESSAGE.required, 'level', 'logOptions', 'msg' ]
// })

describe('www', () => {

  // let browser = null

  before(async () => {
    // browser = await Puppeteer.launch()
    await Browser.open(Configuration.tests.serverUrl)
  })

  describe('index.html', () => {

    // let page = null

    // before(async () => {
    //
    //   page = await browser.newPage()
    //   page.evaluateConsole = function (fn, ...parameters) {
    //
    //     return new Promise(async (resolve, reject) => {
    //
    //       try {
    //         this.on('console', async (message) => {
    //           this.removeAllListeners('console')
    //           let [ handle ] = message.args()
    //           resolve(await handle.jsonValue())
    //         })
    //         await this.evaluate.apply(page, [fn, ...parameters])
    //       } catch (error) {
    //         reject(error)
    //       }
    //
    //     })
    //
    //   }
    //
    //   await page.goto(Configuration.tests.serverUrl)
    //
    // })

    it('should take a screenshot', async () => {
      await Page.screenshot({ path: Configuration.tests.screenshotPath })
    })

    require('./library/index')

    // describe('Log.format', () => {
    //
    //   let data = {
    //     'level': '30',
    //     'msg': 'MESSAGE',
    //     'time': new Date('1973-05-28T17:00:00')
    //   }
    //
    //   describe('(when passed a message)', () => {
    //
    //     let message = null
    //
    //     before(async () => {
    //       message = await page.evaluate((_data) => window.Log.format(_data), data)
    //     })
    //
    //     it('should return a formatted string', () => {
    //       Assert.equal(message, `${data.time.toISOString()} INFO  MESSAGE`)
    //     })
    //
    //   })
    //
    //   describe('(when passed an error)', () => {
    //
    //     let message = null
    //     let stack = null
    //
    //     before(async () => {
    //       stack = await page.evaluate((_message) => (new window.Error(_message)).stack, data.msg)
    //       message = await page.evaluate((_data) => window.Log.format(_data), Object.assign({ 'stack': stack }, data))
    //     })
    //
    //     it('should return a formatted string', async () => {
    //       Assert.equal(message, `${data.time.toISOString()} INFO  MESSAGE\n\n${stack}\n\n`)
    //     })
    //
    //   })
    //
    //   describe('(when passed an object)', () => {
    //
    //     let message = null
    //
    //     before(async () => {
    //       message = await page.evaluate((_data) => window.Log.format(_data), Object.assign({ 'a': 1, 'b': 2, 'c': 3 }, data))
    //     })
    //
    //     it('should return a formatted string', async () => {
    //       Assert.equal(message, `${data.time.toISOString()} INFO  MESSAGE\n\n{ a: 1, b: 2, c: 3 }\n\n`)
    //     })
    //
    //   })
    //
    // })
    //
    // describe('Log.createLog', () => {
    //
    //   describe('(when passed no arguments)', () => {
    //
    //     let message = null
    //
    //     before(async () => {
    //
    //       await page.evaluate(() => window.Sinon.spy(window.Pino, 'call'))
    //       message = await page.evaluateConsole(() => window.Log.createLog())
    //
    //       // console.log(CREATE_LOG_MESSAGE) // eslint-disable-line no-console
    //       // console.log(message) // eslint-disable-line no-console
    //
    //     })
    //
    //     it('should call Pino.call', async () => {
    //       Assert.equal(await page.evaluate(() => window.Pino.call.callCount), 1)
    //     })
    //
    //     it('should call Pino.call with valid arguments', async () => {
    //       Assert.ok(await page.evaluate(() => window.Pino.call.calledWith(window.Log, window.Sinon.match({ 'browser': { 'asObject': true }, 'level': 'debug' }))))
    //     })
    //
    //     // it('should create one log entry', () => {
    //     //   Assert.equal(messages.length, 1)
    //     // })
    //
    //     it('should create a valid log entry', () => {
    //       Assert.jsonSchema(message, CREATE_LOG_MESSAGE)
    //     })
    //
    //     it('should create a log entry with logOptions.level \'debug\'', () => {
    //       Assert.equal(message.logOptions.level, 'debug')
    //     })
    //
    //     after(async () => {
    //       await page.evaluate(() => window.Pino.call.restore())
    //     })
    //
    //   })
    //
    //   describe('(when passed options)', () => {
    //
    //     let message = null
    //
    //     before(async () => {
    //       await page.evaluate(() => window.Sinon.spy(window.Pino, 'call'))
    //       message = await page.evaluateConsole(() => window.Log.createLog({ 'level': 'trace' }))
    //     })
    //
    //     it('should call Pino.call', async () => {
    //       Assert.equal(await page.evaluate(() => window.Pino.call.callCount), 1)
    //     })
    //
    //     it('should call Pino.call with valid arguments', async () => {
    //       Assert.ok(await page.evaluate(() => window.Pino.call.calledWith(window.Log, window.Sinon.match({ 'browser': { 'asObject': true }, 'level': 'trace' }))))
    //     })
    //
    //     it('should create a valid log entry', () => {
    //       Assert.jsonSchema(message, CREATE_LOG_MESSAGE)
    //     })
    //
    //     it('should create a log entry with logOptions.level \'trace\'', () => {
    //       Assert.equal(message.logOptions.level, 'trace')
    //     })
    //
    //     after(async () => {
    //       await page.evaluate(() => window.Pino.call.restore())
    //     })
    //
    //   })
    //
    // })
    //
    // describe('Log.createFormattedLog', () => {
    //
    //   describe('(when passed no arguments)', () => {
    //
    //     before(async () => {
    //
    //       await page.evaluate(() => {
    //         window.Sinon.spy(window.Log, 'createLog')
    //         window.Log.createFormattedLog()
    //       })
    //
    //     })
    //
    //     it('should call Log.createLog', async () => {
    //       Assert.equal(await page.evaluate(() => window.Log.createLog.callCount), 1)
    //     })
    //
    //     it('should call Log.createLog with valid arguments', async () => {
    //       Assert.ok(await page.evaluate(() => window.Log.createLog.calledWith(window.Sinon.match({
    //         'browser': {
    //           'asObject': true,
    //           'write': window.Sinon.match.func
    //         }
    //       }))))
    //     })
    //
    //     after(async () => {
    //       await page.evaluate(() => window.Log.createLog.restore())
    //     })
    //
    //   })
    //
    //   describe('(when passed non-formatting options)', () => {
    //
    //     before(async () => {
    //
    //       await page.evaluate(() => {
    //         window.Sinon.spy(window.Log, 'createLog')
    //         window.Log.createFormattedLog({ 'level': 'trace' })
    //       })
    //
    //     })
    //
    //     it('should call Log.createLog', async () => {
    //       Assert.equal(await page.evaluate(() => window.Log.createLog.callCount), 1)
    //     })
    //
    //     it('should call Log.createLog with valid arguments', async () => {
    //       Assert.ok(await page.evaluate(() => window.Log.createLog.calledWith(window.Sinon.match({
    //         'browser': {
    //           'asObject': true,
    //           'write': window.Sinon.match.func
    //         },
    //         'level': 'trace'
    //       }))))
    //     })
    //
    //     after(async () => {
    //       await page.evaluate(() => window.Log.createLog.restore())
    //     })
    //
    //   })
    //
    //   describe('(when passed formatting options)', () => {
    //
    //     before(async () => {
    //
    //       await page.evaluate(() => {
    //         window.Sinon.spy(window.Log, 'createLog')
    //         window.Log.createFormattedLog({
    //           'level': 'trace',
    //           'prettyPrint': true
    //         })
    //       })
    //
    //     })
    //
    //     it('should call Log.createLog', async () => {
    //       Assert.equal(await page.evaluate(() => window.Log.createLog.callCount), 1)
    //     })
    //
    //     it('should call Log.createLog with valid arguments', async () => {
    //       Assert.ok(await page.evaluate(() => window.Log.createLog.calledWith(window.Sinon.match({
    //         'browser': {
    //           'asObject': true,
    //           'write': window.Sinon.match.func
    //         },
    //         'level': 'trace',
    //         'prettyPrint': true
    //       }))))
    //     })
    //
    //     after(async () => {
    //       await page.evaluate(() => window.Log.createLog.restore())
    //     })
    //
    //   })
    //
    //   describe('(when passed other formatting options)', () => {
    //
    //     before(async () => {
    //
    //       await page.evaluate(() => {
    //         window.Sinon.spy(window.Log, 'createLog')
    //         window.Log.createFormattedLog({
    //           'level': 'trace',
    //           'prettyPrint': { 'levelFirst': true }
    //         })
    //       })
    //
    //     })
    //
    //     it('should call Log.createLog', async () => {
    //       Assert.equal(await page.evaluate(() => window.Log.createLog.callCount), 1)
    //     })
    //
    //     it('should call Log.createLog with valid arguments', async () => {
    //       Assert.ok(await page.evaluate(() => window.Log.createLog.calledWith(window.Sinon.match({
    //         'browser': {
    //           'asObject': true,
    //           'write': window.Sinon.match.func
    //         },
    //         'level': 'trace',
    //         'prettyPrint': { 'levelFirst': true }
    //       }))))
    //     })
    //
    //     after(async () => {
    //       await page.evaluate(() => window.Log.createLog.restore())
    //     })
    //
    //   })
    //
    // })

  })

  after(async () => {
    // await browser.close()
    await Browser.close()
  })

})
