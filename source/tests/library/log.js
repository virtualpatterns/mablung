import Assert from 'assert'
import Is from '@pwn/is'
import Stream from 'stream'
import Utilities from 'util'

import Configuration from '../../configuration'
import { FileSystem, Log, Process } from '../../index'

import TestError from '../errors/test-error'

describe('log', () => {

  describe('getParameters', () => {

    describe('(when passed an empty array)', () => {

      let options = null
      let stream = null

      before(() => {
        [ options, stream ] = Log.getParameters([])
      })

      it('should return an empty object', () => {
        Assert.ok(Is.emptyObject(options))
      })

      it('should return stdout', () => {
        Assert.equal(stream, Process.stdout)
      })

    })

    describe('(when passed options)', () => {

      let options = null
      let stream = null

      before(() => {
        [ options, stream ] = Log.getParameters([ { 'level': 'trace' } ])
      })

      it('should return the options', () => {
        Assert.deepEqual(options, { 'level': 'trace' })
      })

      it('should return stdout', () => {
        Assert.equal(stream, Process.stdout)
      })

    })

    describe('(when passed a stream`)', () => {

      let parameters = []

      let options = null
      let stream = null

      before(async () => {

        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)

        parameters = [ FileSystem.createWriteStream(Configuration.tests.outPath, { 'flags': 'a', 'encoding': 'utf8' }) ]

        ;[ options, stream ] = Log.getParameters(parameters)

      })

      it('should return an empty object', () => {
        Assert.ok(Is.emptyObject(options))
      })

      it('should return the stream', () => {
        Assert.equal(stream, parameters[0])
      })

      after(() => {
        stream.destroy()
      })

    })

    describe('(when passed a string`)', () => {

      let options = null
      let stream = null

      before(async () => {

        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)

        ;[ options, stream ] = Log.getParameters([ Configuration.tests.outPath ])

      })

      it('should return an empty object', () => {
        Assert.ok(Is.emptyObject(options))
      })

      it('should return a stream', () => {
        Assert.ok(stream instanceof Stream.Writable)
      })

      after(() => {
        stream.destroy()
      })

    })

    describe('(when passed options and a stream`)', () => {

      let parameters = []

      let options = null
      let stream = null

      before(async () => {

        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)

        parameters = [ { 'level': 'trace' }, FileSystem.createWriteStream(Configuration.tests.outPath, { 'flags': 'a', 'encoding': 'utf8' }) ]

        ;[ options, stream ] = Log.getParameters(parameters)

      })

      it('should return the options', () => {
        Assert.deepEqual(options, { 'level': 'trace' })
      })

      it('should return the stream', () => {
        Assert.equal(stream, parameters[1])
      })

      after(() => {
        stream.destroy()
      })

    })

    describe('(when passed options and a string`)', () => {

      let options = null
      let stream = null

      before(async () => {

        await FileSystem.promisedAccessUnlink(Configuration.tests.outPath, FileSystem.F_OK)

        ;[ options, stream ] = Log.getParameters([ { 'level': 'trace' }, Configuration.tests.outPath ])

      })

      it('should return the options', () => {
        Assert.deepEqual(options, { 'level': 'trace' })
      })

      it('should return a stream', () => {
        Assert.ok(stream instanceof Stream.Writable)
      })

      after(() => {
        stream.destroy()
      })

    })

  })

  describe('format', () => {

    let time = new Date('1973-05-28T17:00:00')
    let hostname = 'COMPUTER.local'
    let pid = '10101'
    let level = '30'
    let msg = 'MESSAGE'

    describe('(when a message is formatted)', () => {

      it('should return a formatted string', () => {
        Assert.equal(Log.format({
          'time': time,
          'hostname': hostname,
          'pid': pid,
          'level': level,
          'msg': msg  }), `${time.toISOString()} COMPUTER.local 10101 INFO  MESSAGE`)
      })

    })

    describe('(when an error is formatted)', () => {

      it('should return a formatted string', () => {

        let stack = (new TestError('ERROR')).stack

        Assert.equal(Log.format({
          'time': time,
          'hostname': hostname,
          'pid': pid,
          'level': level,
          'msg': msg,
          'stack': stack }), `${time.toISOString()} COMPUTER.local 10101 INFO  MESSAGE\n\n${stack}\n`)

      })

    })

    describe('(when an object is formatted)', () => {

      it('should return a formatted string', () => {
        Assert.equal(Log.format({
          'time': time,
          'hostname': hostname,
          'pid': pid,
          'level': level,
          'msg': msg,
          'a': 1,
          'b': 2,
          'c': 3 }), `${time.toISOString()} COMPUTER.local 10101 INFO  MESSAGE\n\n${Utilities.inspect({'a': 1, 'b': 2, 'c': 3}, { 'depth': null, 'maxArrayLength': null, 'showHidden': true })}\n`)
      })

    })

  })

})
