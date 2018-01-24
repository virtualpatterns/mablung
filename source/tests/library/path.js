import Assert from 'assert'

import Configuration from '../../configuration'
import { Path } from '../../index'

describe('path', () => {

  describe('isRelative', () => {

    it('should return true', () => {
      Assert.ok(Path.isRelative('./distributables/tests/library/path.js'))
    })

    it('should return false', () => {
      Assert.ok(!Path.isRelative(Configuration.tests.outPath))
    })

  })

  describe('trim', () => {

    it('should replace the working directory with .', () => {
      Assert.equal(Path.trim(__filename), './distributables/tests/library/path.js')
    })

  })

})
