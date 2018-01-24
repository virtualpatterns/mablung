'use strict';

require('babel-polyfill');

// import { Log } from '../index'
// import Configuration from '../configuration'

before(function () {
  // Log.createFormattedLog(Configuration.tests.logPath)
  // Log.debug('before(() => { ... })')
  // Log.debug({ 'Configuration': Configuration })
});

// require('./library/file-system')
// require('./library/log')
// require('./library/path')
// require('./library/process')

require('./library/index');

after(function () {
  // Log.debug('after(() => { ... })')
});
//# sourceMappingURL=index.js.map