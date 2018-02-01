import Is from '@pwn/is'
import MemoryStream from 'memory-streams'
import Utilities from 'util'

import Configuration from '../../configuration'

const REGEXP_MESSAGE = new RegExp(`^${Configuration.tests.patterns.prefixNode}.*$`, 'm')

function WriteStream (options) {
  MemoryStream.WritableStream.call(this, options)
}

WriteStream.prototype.getJSONMessages = function () {
  return this.toString().split('\n')
    .filter((message) => !Is.emptyString(message))
    .map((message) => JSON.parse(message))
}

WriteStream.prototype.getMessages = function () {
  return this.toString().split('\n')
    .filter((message) => REGEXP_MESSAGE.test(message))
}

Utilities.inherits(WriteStream, MemoryStream.WritableStream)

export { WriteStream }
