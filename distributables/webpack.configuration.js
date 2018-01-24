'use strict';

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BabelRC = _json2.default.parse(_index.FileSystem.readFileSync(__dirname + '/../.babelrc', { 'encoding': 'utf-8' }));
// import WebPack from 'webpack'

module.exports = {
  'devtool': 'source-map',
  'entry': process.cwd() + '/source/www/scripts/index.js',
  'module': {
    'rules': [{
      'test': /\.js$/,
      'exclude': /(node_modules|distributables)/,
      'use': {
        'loader': 'babel-loader',
        'options': BabelRC
      }
    }]
  },
  'node': {
    'fs': 'empty'
    // 'process': 'mock'
  },
  'output': {
    'path': process.cwd() + '/distributables/www/scripts',
    'filename': 'index.js'
  }
};

//# sourceMappingURL=webpack.configuration.js.map