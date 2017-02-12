import Assert from 'assert'

import FileSystem from '../library/file-system'
import Package from '../package.json'
import Path from '../library/path'
import Process from '../library/process'

const FILE_PATH = Path.join(__dirname, '..', 'process', 'output', `${Package.name}.mocha.out`)

describe('Path', () => {

  before(() => {
    FileSystem.mkdirp.sync(Path.dirname(FILE_PATH))
  })

  describe('isRelative', () => {

    it('should return true', () => {
      Assert.ok(Path.isRelative(`./process/output/${Package.name}.mocha.out`))
    })

    it('should return false', () => {
      Assert.ok(!Path.isRelative(Process.env.HOME))
    })

  })

  describe('trim', () => {

    it('should replace the working directory with .', () => {
      Assert.equal(Path.trim(FILE_PATH), `./process/output/${Package.name}.mocha.out`)
    })

  })

})
