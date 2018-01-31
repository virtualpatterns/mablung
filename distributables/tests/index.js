'use strict';

require('babel-polyfill');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiJsonSchema = require('chai-json-schema');

var _chaiJsonSchema2 = _interopRequireDefault(_chaiJsonSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

before(function () {
  _chai2.default.use(_chaiJsonSchema2.default);
});

require('./library/index');
require('./www/index');

after(function () {});
//# sourceMappingURL=index.js.map