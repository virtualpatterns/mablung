'use strict';

require('babel-polyfill');

var _jake = require('jake');

var _jake2 = _interopRequireDefault(_jake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Jake.addListener('start', () => {
// })
//
// Jake.addListener('complete', () => {
// })

desc('Remove built and bundled folders and files');
task('clean', [], {}, function () {
  _jake2.default.exec(['find . -not -name distributables/configuration.js -not -name distributables/tasks -delete'], { 'printStderr': true, 'printStdout': true }, function () {
    return complete();
  });
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS90YXNrcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZXNjIiwidGFzayIsImV4ZWMiLCJjb21wbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUEsS0FBSyw0Q0FBTDtBQUNBQyxLQUFLLE9BQUwsRUFBYyxFQUFkLEVBQWtCLEVBQWxCLEVBQXNCLFlBQU07QUFDMUIsaUJBQUtDLElBQUwsQ0FBVSxDQUFFLDJGQUFGLENBQVYsRUFBMkcsRUFBRSxlQUFlLElBQWpCLEVBQXVCLGVBQWUsSUFBdEMsRUFBM0csRUFBeUo7QUFBQSxXQUFNQyxVQUFOO0FBQUEsR0FBeko7QUFDRCxDQUZEOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuaW1wb3J0IEpha2UgZnJvbSAnamFrZSdcblxuLy8gSmFrZS5hZGRMaXN0ZW5lcignc3RhcnQnLCAoKSA9PiB7XG4vLyB9KVxuLy9cbi8vIEpha2UuYWRkTGlzdGVuZXIoJ2NvbXBsZXRlJywgKCkgPT4ge1xuLy8gfSlcblxuZGVzYygnUmVtb3ZlIGJ1aWx0IGFuZCBidW5kbGVkIGZvbGRlcnMgYW5kIGZpbGVzJylcbnRhc2soJ2NsZWFuJywgW10sIHt9LCAoKSA9PiB7XG4gIEpha2UuZXhlYyhbICdmaW5kIC4gLW5vdCAtbmFtZSBkaXN0cmlidXRhYmxlcy9jb25maWd1cmF0aW9uLmpzIC1ub3QgLW5hbWUgZGlzdHJpYnV0YWJsZXMvdGFza3MgLWRlbGV0ZScgXSwgeyAncHJpbnRTdGRlcnInOiB0cnVlLCAncHJpbnRTdGRvdXQnOiB0cnVlIH0sICgpID0+IGNvbXBsZXRlKCkpXG59KVxuXG4vLyBkZXNjKCdMaW50IGZpbGVzJylcbi8vIHRhc2soJ2xpbnQnLCBbXSwgeyAnYXN5bmMnOiB0cnVlIH0sICgpID0+IHtcbi8vICAgSmFrZS5leGVjKFsgJ2VzbGludCAtLWlnbm9yZS1wYXRoIC5naXRpZ25vcmUgLS1pZ25vcmUtcGF0dGVybiBzb3VyY2UvdGFza3Mgc291cmNlJyBdLCB7ICdwcmludFN0ZGVycic6IHRydWUsICdwcmludFN0ZG91dCc6IHRydWUgfSwgKCkgPT4gY29tcGxldGUoKSlcbi8vIH0pXG4vL1xuLy8gZGVzYygnQnVpbGQgZmlsZXMnKVxuLy8gdGFzaygnYnVpbGQnLCBbICdjbGVhbicsICdsaW50JyBdLCB7ICdhc3luYyc6IHRydWUgfSwgKCkgPT4ge1xuLy8gICBKYWtlLmV4ZWMoWyAnYmFiZWwgc291cmNlIC0tY29weS1maWxlcyAtLWlnbm9yZSBzb3VyY2UvY29uZmlndXJhdGlvbi5qcyxzb3VyY2UvdGFza3Msc291cmNlL3d3dyAtLW91dC1kaXIgZGlzdHJpYnV0YWJsZXMgLS1zb3VyY2UtbWFwcyBpbmxpbmUnIF0sIHsgJ3ByaW50U3RkZXJyJzogdHJ1ZSwgJ3ByaW50U3Rkb3V0JzogdHJ1ZSB9LCAoKSA9PiBjb21wbGV0ZSgpKVxuLy8gfSlcbi8vXG4vLyBkZXNjKCdCdW5kbGUgZmlsZXMnKVxuLy8gdGFzaygnYnVuZGxlJywgWyAnYnVpbGQnIF0sIHsgJ2FzeW5jJzogdHJ1ZSB9LCAoKSA9PiB7XG4vLyAgIEpha2UuZXhlYyhbICd3ZWJwYWNrIC0tY29uZmlnIGRpc3RyaWJ1dGFibGVzL3dlYnBhY2suY29uZmlndXJhdGlvbi5qcycgXSwgeyAncHJpbnRTdGRlcnInOiB0cnVlLCAncHJpbnRTdGRvdXQnOiB0cnVlIH0sICgpID0+IGNvbXBsZXRlKCkpXG4vLyB9KVxuXG4vLyBkZXNjKCdSdW4gc2VydmVyJylcbi8vIHRhc2soJ3J1bicsIFsgJ2J1bmRsZScgXSwgeyAnYXN5bmMnOiB0cnVlIH0sICgpID0+IHtcbi8vICAgSmFrZS5leGVjKFtcbi8vICAgICAnY2xlYXInLFxuLy8gICAgICdub2RlIGRpc3RyaWJ1dGFibGVzL3NlcnZlci9pbmRleC5qcyBydW4nXG4vLyAgIF0sIHsgJ3ByaW50U3RkZXJyJzogdHJ1ZSwgJ3ByaW50U3Rkb3V0JzogdHJ1ZSB9LCAoKSA9PiBjb21wbGV0ZSgpKVxuLy8gfSlcblxuXG4vLyBcImNsZWFuXCI6IFwicm0gLXJmIGRpc3RyaWJ1dGFibGVzLyogJEhPTUUvTGlicmFyeS9Mb2dzL21hYmx1bmcvKlwiLFxuLy8gXCJsaW50XCI6IFwibnBtIHJ1biBjbGVhbiAmJiBlc2xpbnQgc291cmNlXCIsXG4vLyBcImJ1aWxkXCI6IFwibnBtIHJ1biBsaW50ICYmIGJhYmVsIHNvdXJjZSAtLWNvcHktZmlsZXMgLS1vdXQtZGlyIGRpc3RyaWJ1dGFibGVzIC0tc291cmNlLW1hcHMgaW5saW5lICYmIHJtIC1yZiBkaXN0cmlidXRhYmxlcy93d3dcIixcbi8vIFwiYnVuZGxlXCI6IFwibnBtIHJ1biBidWlsZCAmJiB3ZWJwYWNrIC0tY29uZmlnIGRpc3RyaWJ1dGFibGVzL3dlYnBhY2suY29uZmlndXJhdGlvbi5qcyAmJiBybSAtcmYgZGlzdHJpYnV0YWJsZXMvd3d3L3NjcmlwdHNcIixcbi8vIFwidGVzdFwiOiBcIm5wbSBydW4gdGVzdC1saWJyYXJ5ICYmIG5wbSBydW4gdGVzdC13d3dcIixcbi8vIFwidGVzdC1saWJyYXJ5XCI6IFwibnBtIHJ1biBidWlsZCAmJiBtb2NoYSAtLWJhaWwgLS1jb21waWxlcnMganM6YmFiZWwtY29yZS9yZWdpc3RlciAtLXRpbWVvdXQgMCBkaXN0cmlidXRhYmxlcy90ZXN0cy9pbmRleC5qc1wiLFxuLy8gXCJydW4tc2VydmVyXCI6IFwibnBtIHJ1biBidW5kbGUgJiYgbm9kZSBkaXN0cmlidXRhYmxlcy9zZXJ2ZXIvaW5kZXguanNcIixcbi8vIFwicnVuLXByb2Nlc3NcIjogXCJucG0gcnVuIGJ1aWxkICYmIG5vZGUgZGlzdHJpYnV0YWJsZXMvdGVzdHMvcmVzb3VyY2VzL3Byb2Nlc3MuanMgLS1sb2dQYXRoICRIT01FL0xpYnJhcnkvTG9ncy9tYWJsdW5nL21hYmx1bmcucHJvY2Vzcy5sb2cgLS1waWRQYXRoIFxcXCIkSE9NRS9MaWJyYXJ5L0xvZ3MvbWFibHVuZy9tYWJsdW5nLnByb2Nlc3MucGlkXFxcIlwiLFxuIl19