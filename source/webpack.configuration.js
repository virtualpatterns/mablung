import JSON5 from 'json5'
// import WebPack from 'webpack'

import { FileSystem } from './index'

const BabelRC = JSON5.parse(FileSystem.readFileSync(`${__dirname}/../.babelrc`, { 'encoding': 'utf-8' }))

module.exports = {
  'devtool': 'source-map',
  'entry': `${process.cwd()}/source/www/scripts/index.js`,
  'module': {
    'rules': [
      {
        'test': /\.js$/,
        'exclude': /(node_modules|distributables)/,
        'use': {
          'loader': 'babel-loader',
          'options': BabelRC
        }
      }
    ]
  },
  'node': {
    'fs': 'empty'
  },
  'output': {
    'path': `${process.cwd()}/distributables/www/scripts`,
    'filename': 'index.js'
  }
}
