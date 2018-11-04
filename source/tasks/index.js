import '@babel/polyfill'
import Jake from 'jake'

import Configuration from '../configuration'

desc('Remove built and bundled folders and files')
task('clean', [], { 'async': true }, () => {
  Jake.exec([
    ...([ 'library', 'sandbox', 'server', 'tests', 'www' ].map((folderName) => `rm -Rfv distributables/${folderName}`)),
    ...([ 'index.js', 'index.js.map', 'webpack.configuration.js', 'webpack.configuration.js.map' ].map((fileName) => `rm -fv distributables/${fileName}`))
  ], { 'printStderr': true, 'printStdout': true }, () => complete())
})

desc('Lint files')
task('lint', [], { 'async': true }, () => {
  Jake.exec([ 'eslint --ignore-path .gitignore --ignore-pattern source/configuration.js --ignore-pattern source/tasks source' ], { 'printStderr': true, 'printStdout': true }, () => complete())
})

desc('Build files')
task('build', [ 'clean', 'lint' ], { 'async': true }, () => {
  Jake.exec([
    ...([ 'library', 'sandbox', 'server', 'tests' ].map((folderName) => `babel  --config-file ./distributables/babel.configuration source/${folderName} --copy-files --out-dir distributables/${folderName} --source-maps`)),
    ...([ 'index.js', 'webpack.configuration.js' ].map((fileName) => `babel  --config-file ./distributables/babel.configuration source/${fileName} --out-file distributables/${fileName} --source-maps`))
  ], { 'printStderr': true, 'printStdout': false }, () => complete())
})

desc('Bundle files')
task('bundle', [ 'build' ], { 'async': true }, () => {

  Jake.cpR('source/www', 'distributables', { 'silent': true })
  Jake.rmRf('distributables/www/scripts', { 'silent': true })

  Jake.exec([ 'webpack --config distributables/webpack.configuration.js' ], { 'printStderr': true, 'printStdout': true }, () => complete())

})

desc('Run server')
task('run', [ 'bundle' ], { 'async': true }, () => {

  Jake.rmRf(Configuration.server.logPath, { 'silent': true })

  Jake.exec([
    'clear',
    'node distributables/server/index.js'
  ], { 'printStderr': true, 'printStdout': true }, () => complete())

})

desc('Run tests')
task('test', [ 'bundle' ], { 'async': true }, () => {

  Jake.rmRf(Configuration.tests.process.logPath, { 'silent': true })
  Jake.rmRf(Configuration.tests.screenshotPath, { 'silent': true })

  Jake.exec([
    'clear',
    'mocha --bail --timeout 0 distributables/tests/index.js'
  ], { 'printStderr': true, 'printStdout': true }, () => complete())

})

desc('Publish package')
task('publish', [ 'test' ], { 'async': true }, () => {
  Jake.exec([
    'npm publish --access public',
    'npm --no-git-tag-version version patch',
    'git add package.json',
    'git commit --message="Increment version"'
  ], { 'printStderr': true, 'printStdout': true }, () => complete())
})
