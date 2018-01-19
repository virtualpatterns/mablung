// import { Path } from './index'
// import WebPack from 'webpack'

module.exports = {
  'entry': `${__dirname}/source/www/scripts/index.js`,
  'node': {
    'fs': 'empty',
    'process': 'empty'
  },
  'output': {
    'path': `${__dirname}/distributables/www/scripts`,
    'filename': 'index.js'
  }
}
