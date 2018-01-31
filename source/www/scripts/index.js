import Is from '@pwn/is'
import { Log } from '../../index'
import Pino from 'pino'
import Sinon from 'sinon'

// const Mocha = mocha

document.addEventListener('DOMContentLoaded', () => {

  window.Is = Is
  window.Log = Log
  window.Pino = Pino
  window.Sinon = Sinon

  // let log = Pino({
  //   'browser': {
  //     'asObject': true,
  //     'serialize': true
  //   },
  //   'level': 'debug'
  // })
  //
  // log.debug('Hey!')
  // log.debug({ 'a':1 }, 'Hey again!')
  // log.debug(new Error('Hey ... whoa!'))

  // Log.createFormattedLog()
  //
  // Log.debug('Hey!')
  // Log.debug({ 'a':1 }, 'Hey again!')
  // Log.debug(new Error('Hey ... whoa!'))

  // Mocha.setup({
  //   'bail': true,
  //   'timeout': 0,
  //   'ui': 'bdd'
  // })
  //
  // require('./tests/index')
  //
  // let tests = Mocha.run()
  //
  // tests.once('end', () => {
  //   console.log(tests.stats) // eslint-disable-line no-console
  // })

})
