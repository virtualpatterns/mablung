import Assert from 'assert'
import Pino from 'pino'
import Sinon from 'sinon'

import { Log, Process } from '../index'

Sinon.spy(Pino, 'call')

Log.createLog()
Log.trace()

// let log = Pino.call(Pino)
// log.trace()

// console.log(`Pino.call.callCount=${Pino.call.callCount}`)

Assert.ok(Pino.call.calledWith(Sinon.match.any, Sinon.match({ 'level': 'debug'}), Process.stdout))
