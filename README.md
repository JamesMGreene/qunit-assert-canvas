[![Build Status](https://travis-ci.org/JamesMGreene/qunit-assert-canvas.png?branch=master)](https://travis-ci.org/JamesMGreene/qunit-assert-canvas) [![NPM version](https://badge.fury.io/js/qunit-assert-canvas.png)](https://www.npmjs.com/package/qunit-assert-canvas)

# QUnit Canvas assertion plugin

This plugin for [QUnit](https://github.com/jquery/qunit) adds `pixelEqual` and `notPixelEqual` (plus alias `pixelNotEqual`) assertion methods to test individual pixel values in a given canvas.


## Usage

```js
assert.pixelEqual(canvas, x, y, r, g, b, a, message);
assert.notPixelEqual(canvas, x, y, r, g, b, a, message);  // Alias: `assert.pixelNotEqual`
```

Where:
 - `canvas`: Reference to a canvas element
 - `x`, `y`: Coordinates of the pixel to test
 - `r`, `g`, `b`: The color value (`0`-`255`) of the pixel that you expect
 - `a`: The opacity value (`0`-`255`) of the pixel that you expect; may be omitted or passed `undefined` if you want to ignore it
 - `message`: Optional message, same as for other assertions


## Examples

```js
module('Example module', {
  setup: function() {
    var canvas, context,
        fixtureEl = document.getElementById('qunit-fixture');
    fixtureEl.innerHTML = '<canvas width="5" height="5"></canvas>';

    canvas = fixtureEl.firstChild;
    try {
      context = canvas.getContext('2d');
    }
    catch(e) {
      // probably no canvas support, just exit
      return;
    }

    this.canvas = canvas;
    this.context = context;
  }
});

test('Example unit test', function(assert) {
  this.context.fillStyle = 'rgba(0, 0, 0, 0)';
  this.context.fillRect(0, 0, 5, 5);

  assert.pixelEqual(this.canvas, 0, 0, 0, 0, 0, 0);
  assert.notPixelEqual(this.canvas, 0, 0, 1, 1, 1, 0);
});
```

For more examples, refer to the unit tests.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).
