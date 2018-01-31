import 'babel-polyfill'
import Chai from 'chai'
import ChaiJSONSchema from 'chai-json-schema'

before(() => {
  Chai.use(ChaiJSONSchema)
})

require('./library/index')
require('./www/index')

after(() => {})
