(function(QUnit, window, undefined) {
  "use strict";

  var _slicer = Array.prototype.slice;

  function _getImagePixelData(canvas, x, y) {
    return _slicer.apply(canvas.getContext("2d").getImageData(x, y, 1, 1).data);
  }

  function _dumpArray(arr) {
    return "[" + arr.join(", ") + "]";
  }


  QUnit.extend(QUnit.assert, {

    pixelEqual: function(canvas, x, y, r, g, b, a, message) {
      if (typeof a === "string" && typeof message === "undefined") {
        message = a;
        a = undefined;
      }

      var actual = _getImagePixelData(canvas, x, y),
          expected = [r, g, b, a];

      if (typeof a === "undefined") {
        actual.pop();
        expected.pop();
      }

      message = message || "Pixel should be: " + _dumpArray(expected);
      QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
    },

    notPixelEqual: function(canvas, x, y, r, g, b, a, message) {
      if (typeof a === "string" && typeof message === "undefined") {
        message = a;
        a = undefined;
      }

      var actual = _getImagePixelData(canvas, x, y),
          expected = [r, g, b, a];

      if (typeof a === "undefined") {
        actual.pop();
        expected.pop();
      }

      message = message || "Pixel should not be: " + _dumpArray(expected);
      QUnit.push(!QUnit.equiv(actual, expected), actual, expected, message);
    }

  });

  // Add an alias for `notPixelEqual` == `pixelNotEqual`
  // People will prefer one name or the another... hopefully they just pick one
  // and stick with it. ;)
  QUnit.assert.pixelNotEqual = QUnit.assert.notPixelEqual;

})(QUnit, this || window);
