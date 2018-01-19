import 'babel-polyfill'
import Jake from 'jake'

// Jake.addListener('start', () => {
// })
//
// Jake.addListener('complete', () => {
// })

desc('Remove built and bundled folders and files')
task('clean', [], {}, () => {
  Jake.exec([ 'find . -not -name distributables/configuration.js -not -name distributables/tasks -delete' ], { 'printStderr': true, 'printStdout': true }, () => complete())
})

// desc('Lint files')
// task('lint', [], { 'async': true }, () => {
//   Jake.exec([ 'eslint --ignore-path .gitignore --ignore-pattern source/tasks source' ], { 'printStderr': true, 'printStdout': true }, () => complete())
// })
//
// desc('Build files')
// task('build', [ 'clean', 'lint' ], { 'async': true }, () => {
//   Jake.exec([ 'babel source --copy-files --ignore source/configuration.js,source/tasks,source/www --out-dir distributables --source-maps inline' ], { 'printStderr': true, 'printStdout': true }, () => complete())
// })
//
// desc('Bundle files')
// task('bundle', [ 'build' ], { 'async': true }, () => {
//   Jake.exec([ 'webpack --config distributables/webpack.configuration.js' ], { 'printStderr': true, 'printStdout': true }, () => complete())
// })

// desc('Run server')
// task('run', [ 'bundle' ], { 'async': true }, () => {
//   Jake.exec([
//     'clear',
//     'node distributables/server/index.js run'
//   ], { 'printStderr': true, 'printStdout': true }, () => complete())
// })


// "clean": "rm -rf distributables/* $HOME/Library/Logs/mablung/*",
// "lint": "npm run clean && eslint source",
// "build": "npm run lint && babel source --copy-files --out-dir distributables --source-maps inline && rm -rf distributables/www",
// "bundle": "npm run build && webpack --config distributables/webpack.configuration.js && rm -rf distributables/www/scripts",
// "test": "npm run test-library && npm run test-www",
// "test-library": "npm run build && mocha --bail --compilers js:babel-core/register --timeout 0 distributables/tests/index.js",
// "run-server": "npm run bundle && node distributables/server/index.js",
// "run-process": "npm run build && node distributables/tests/resources/process.js --logPath $HOME/Library/Logs/mablung/mablung.process.log --pidPath \"$HOME/Library/Logs/mablung/mablung.process.pid\"",
