(function(factory) {

  // NOTE:
  // All techniques except for the "browser globals" fallback will extend the
  // provided QUnit object but return the isolated API methods

  // For AMD: Register as an anonymous AMD module with a named dependency on "qunit".
  if (typeof define === "function" && define.amd) {
    define(["qunit"], factory);
  }
  // For Node.js
  else if (typeof module !== "undefined" && module && module.exports && typeof require === "function") {
    module.exports = factory(require("qunitjs"));
  }
  // For CommonJS with `exports`, but without `module.exports`, like Rhino
  else if (typeof exports !== "undefined" && exports && typeof require === "function") {
    var qunit = require("qunitjs");
    qunit.extend(exports, factory(qunit));
  }
  // For browser globals
  else {
    factory(QUnit);
  }

}(function(QUnit) {

  var _slicer = Array.prototype.slice;

  function _getImagePixelData(canvas, x, y) {
    return _slicer.apply(canvas.getContext("2d").getImageData(x, y, 1, 1).data);
  }

  function _dumpArray(arr) {
    return "[" + arr.join(", ") + "]";
  }

  /**
   * Find an appropriate `Assert` context to `push` results to.
   * @param * context - An unknown context, possibly `Assert`, `Test`, or neither
   * @private
   */
  function _getPushContext(context) {
    var pushContext;

    if (context && typeof context.push === "function") {
      // `context` is an `Assert` context
      pushContext = context;
    }
    else if (context && context.assert && typeof context.assert.push === "function") {
      // `context` is a `Test` context
      pushContext = context.assert;
    }
    else if (
      QUnit && QUnit.config && QUnit.config.current && QUnit.config.current.assert &&
      typeof QUnit.config.current.assert.push === "function"
    ) {
      // `context` is an unknown context but we can find the `Assert` context via QUnit
      pushContext = QUnit.config.current.assert;
    }
    else if (QUnit && typeof QUnit.push === "function") {
      pushContext = QUnit.push;
    }
    else {
      throw new Error("Could not find the QUnit `Assert` context to push results");
    }

    return pushContext;
  }

  function pixelEqual(canvas, x, y, r, g, b, a, message) {
    if (typeof a === "string" && typeof message === "undefined") {
      message = a;
      a = undefined;
    }

    var actual = _getImagePixelData(canvas, x, y),
        expected = [r, g, b, a],
        pushContext = _getPushContext(this);

    if (typeof a === "undefined") {
      actual.pop();
      expected.pop();
    }

    message = message || "Pixel should be: " + _dumpArray(expected);
    pushContext.push(QUnit.equiv(actual, expected), actual, expected, message);
  }

  function notPixelEqual(canvas, x, y, r, g, b, a, message) {
    if (typeof a === "string" && typeof message === "undefined") {
      message = a;
      a = undefined;
    }

    var actual = _getImagePixelData(canvas, x, y),
        expected = [r, g, b, a],
        pushContext = _getPushContext(this);

    if (typeof a === "undefined") {
      actual.pop();
      expected.pop();
    }

    message = message || "Pixel should not be: " + _dumpArray(expected);
    pushContext.push(!QUnit.equiv(actual, expected), actual, expected, message);
  }


  var api = {
    pixelEqual: pixelEqual,
    notPixelEqual: notPixelEqual,

    // Add an alias for `notPixelEqual` == `pixelNotEqual`
    // People will prefer one name or the another... hopefully they just pick one
    // and stick with it. ;)
    pixelNotEqual: notPixelEqual
  };

  QUnit.extend(QUnit.assert, api);

  return api;
}));
