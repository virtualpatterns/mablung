import WebPack from 'webpack'

import FileSystem from './library/file-system'
import Package from './package.json'
import Path from './library/path'

const LOG_PATH = Path.join(__dirname, 'process', 'logs', `${Package.name}.webpack.log`)

FileSystem.mkdirp.sync(Path.dirname(LOG_PATH))

module.exports = {
  'devtool': 'source-map',
  'entry': {
    'index': [
      Path.join(__dirname, 'www', 'scripts', 'index.js')
    ],
    'test': [
      Path.join(__dirname, 'www', 'scripts', 'test.js')
    ]
  },
  'module': {
    'loaders': []
  },
  'output': {
    'filename': '[name].js',
    'path': Path.join(__dirname, 'www', 'scripts', 'bundles')
  },
  plugins: [
    new WebPack.IgnorePlugin(/^winston|\.\/process$/)
  ]
}
