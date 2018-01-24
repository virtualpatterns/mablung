'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _configuration = require('../../configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _index = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('path', function () {

  describe('isRelative', function () {

    it('should return true', function () {
      _assert2.default.ok(_index.Path.isRelative('./distributables/tests/library/path.js'));
    });

    it('should return false', function () {
      _assert2.default.ok(!_index.Path.isRelative(_configuration2.default.tests.outPath));
    });
  });

  describe('trim', function () {

    it('should replace the working directory with .', function () {
      _assert2.default.equal(_index.Path.trim(__filename), './distributables/tests/library/path.js');
    });
  });
});
//# sourceMappingURL=path.js.map