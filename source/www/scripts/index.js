import Is from '@pwn/is'
import { Log } from '../../index'
import Pino from 'pino'
import Sinon from 'sinon'

document.addEventListener('DOMContentLoaded', () => {

  window.Is = Is
  window.Log = Log
  window.Pino = Pino
  window.Sinon = Sinon

})
