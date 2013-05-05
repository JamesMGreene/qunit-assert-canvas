[![Build Status](https://travis-ci.org/JamesMGreene/qunit-assert-canvas.png)](https://travis-ci.org/JamesMGreene/qunit-assert-canvas) [![NPM version](https://badge.fury.io/js/qunit-assert-canvas.png)](http://badge.fury.io/js/qunit-assert-canvas)

# QUnit Canvas assertion plugin

This plugin for [QUnit](https://github.com/jquery/qunit) adds a `pixelEqual` assertion method to test
individual pixel values in a given canvas.

### Usage ###

```js
assert.pixelEqual(canvas, x, y, r, g, b, a, message);
```

Where:
 - `canvas`: Reference to a canvas element
 - `x`, `y`: Coordinates of the pixel to test
 - `r`, `g`, `b`, `a`: The color and opacity value of the pixel that you except
 - `message`: Optional message, same as for other assertions

### Example ###

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
});
```

For more examples, refer to the unit tests.
