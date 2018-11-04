import WebPack from 'webpack'

export default {
  'devtool': 'source-map',
  'entry': `${process.cwd()}/source/www/scripts/index.js`,
  'mode': 'none',
  'module': {
    'rules': [
      {
        'test': /\.js$/,
        'exclude': /(node_modules|distributables)/,
        'use': {
          'loader': 'babel-loader',
          'options': { 
            'presets': [
              [ 
                '@babel/env',
                {
                  'targets': '> 0.25%, not dead'
                }
              ]
            ] 
          }
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
  },
  plugins: [
    new WebPack.ProgressPlugin()
  ]
}
