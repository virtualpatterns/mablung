"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function ProcessError(message, code) {

  Error.call(this);
  Error.captureStackTrace(this, ProcessError);

  this.message = message;
  this.code = code;
}

ProcessError.prototype = Object.create(Error.prototype);
ProcessError.prototype.constructor = ProcessError;
ProcessError.prototype.name = ProcessError.name;

exports.default = ProcessError;
//# sourceMappingURL=process-error.js.map