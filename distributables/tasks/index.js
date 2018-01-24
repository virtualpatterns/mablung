'use strict';

require('babel-polyfill');

var _jake = require('jake');

var _jake2 = _interopRequireDefault(_jake);

var _configuration = require('../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Jake.addListener('start', () => {
// })
//
// Jake.addListener('complete', () => {
// })

desc('Remove built and bundled folders and files');
task('clean', [], { 'async': true }, function () {
  _jake2.default.exec([].concat(_toConsumableArray(['library', 'sandbox', 'server', 'tests', 'www'].map(function (folderName) {
    return 'rm -Rfv distributables/' + folderName;
  })), _toConsumableArray(['index.js', 'index.js.map', 'webpack.configuration.js', 'webpack.configuration.js.map'].map(function (fileName) {
    return 'rm -fv distributables/' + fileName;
  }))), { 'printStderr': true, 'printStdout': true }, function () {
    return complete();
  });
});

desc('Lint files');
task('lint', [], { 'async': true }, function () {
  _jake2.default.exec(['eslint --ignore-path .gitignore --ignore-pattern source/configuration.js --ignore-pattern source/tasks source'], { 'printStderr': true, 'printStdout': true }, function () {
    return complete();
  });
});

desc('Build files');
task('build', ['clean', 'lint'], { 'async': true }, function () {
  _jake2.default.exec([].concat(_toConsumableArray(['library', 'sandbox', 'server', 'tests'].map(function (folderName) {
    return 'babel source/' + folderName + ' --copy-files --out-dir distributables/' + folderName + ' --quiet --source-maps';
  })), _toConsumableArray(['index.js', 'webpack.configuration.js'].map(function (fileName) {
    return 'babel source/' + fileName + ' --out-file distributables/' + fileName + ' --quiet --source-maps';
  }))), { 'printStderr': true, 'printStdout': true }, function () {
    return complete();
  });
});

desc('Bundle files');
task('bundle', ['build'], { 'async': true }, function () {

  _jake2.default.cpR('source/www', 'distributables', { 'silent': true });
  _jake2.default.rmRf('distributables/www/scripts', { 'silent': true });

  _jake2.default.exec(['webpack --config distributables/webpack.configuration.js'], { 'printStderr': true, 'printStdout': false }, function () {
    return complete();
  });
});

desc('Run server');
task('run', ['bundle'], { 'async': true }, function () {
  _jake2.default.rmRf(_configuration2.default.server.logPath, { 'silent': true });
  _jake2.default.exec(['clear', 'node distributables/server/index.js'], { 'printStderr': true, 'printStdout': true }, function () {
    return complete();
  });
});

desc('Run tests');
task('test', ['bundle'], { 'async': true }, function () {
  _jake2.default.rmRf(_configuration2.default.tests.logPath, { 'silent': true });
  _jake2.default.exec(['mocha --bail --timeout 0 distributables/tests/index.js'], { 'printStderr': true, 'printStdout': true }, function () {
    return complete();
  });
});

// "test": "npm run test-library && npm run test-www",
// "test-library": "npm run build && mocha --bail --compilers js:babel-core/register --timeout 0 distributables/tests/index.js",
//# sourceMappingURL=index.js.map