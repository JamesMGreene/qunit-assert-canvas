(function(module, test) {

  module("qunit-assert-canvas plugin unit tests");

  test("Canvas pixels from manual fills", function(assert) {
    var context,
        canvas = document.getElementById("qunit-canvas");
    try {
      context = canvas.getContext("2d");
    }
    catch (e) {
      // probably no canvas support, just exit
      return;
    }

    assert.expect(32);

    context.fillStyle = "rgba(0, 0, 0, 0)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 0, 0, 0, 0, 0, 0);
    assert.notPixelEqual(canvas, 0, 0, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(255, 0, 0, 0)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 0, 0, 0, 0, 0, 0);
    assert.notPixelEqual(canvas, 0, 0, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(0, 255, 0, 0)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 0, 0, 0, 0, 0, 0);
    assert.notPixelEqual(canvas, 0, 0, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(0, 0, 255, 0)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 0, 0, 0, 0, 0, 0);
    assert.notPixelEqual(canvas, 0, 0, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);

    context.fillStyle = "rgba(0, 0, 0, 0.6)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 0, 0, 0, 0, 0, 153);
    assert.notPixelEqual(canvas, 0, 0, 0, 0, 0, 152);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(255, 0, 0, 0.6)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 0, 0, 255, 0, 0, 153);
    assert.notPixelEqual(canvas, 0, 0, 255, 0, 1, 153);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(0, 255, 0, 0.6)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 0, 0, 0, 255, 0, 153);
    assert.notPixelEqual(canvas, 0, 0, 0, 0, 255, 153);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(0, 0, 255, 0.6)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 0, 0, 0, 0, 255, 153);
    assert.notPixelEqual(canvas, 0, 0, 0, 0, 254, 154);
    context.clearRect(0, 0, 5, 5);

    context.fillStyle = "rgba(0, 0, 0, 0.6)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 2, 2, 0, 0, 0, 153);
    assert.notPixelEqual(canvas, 2, 2, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(255, 0, 0, 0.6)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 2, 2, 255, 0, 0, 153);
    assert.notPixelEqual(canvas, 2, 2, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(0, 255, 0, 0.6)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 2, 2, 0, 255, 0, 153);
    assert.notPixelEqual(canvas, 2, 2, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(0, 0, 255, 0.6)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 2, 2, 0, 0, 255, 153);
    assert.notPixelEqual(canvas, 2, 2, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);

    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 4, 4, 0, 0, 0, 255);
    assert.notPixelEqual(canvas, 4, 4, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(255, 0, 0, 1)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 4, 4, 255, 0, 0, 255);
    assert.notPixelEqual(canvas, 4, 4, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(0, 255, 0, 1)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 4, 4, 0, 255, 0, 255);
    assert.notPixelEqual(canvas, 4, 4, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);
    context.fillStyle = "rgba(0, 0, 255, 1)";
    context.fillRect(0, 0, 5, 5);
    assert.pixelEqual(canvas, 4, 4, 0, 0, 255, 255);
    assert.notPixelEqual(canvas, 4, 4, 1, 1, 1, 0);
    context.clearRect(0, 0, 5, 5);
  });


  test("Canvas pixels from drawn image", function(assert) {
    var context,
        canvas = document.getElementById("qunit-canvas"),
        imageObj = new Image();
    try {
      context = canvas.getContext("2d");
    }
    catch (e) {
      // probably no canvas support, just exit
      return;
    }

    assert.expect(1);

    // How to use pixelEqual() in conjunction with drawImage()
    imageObj.onload = function() {
      context.drawImage(imageObj, 0, 0);
      assert.pixelEqual(canvas, 3, 3, 0, 255, 0, 255, "green pixel");
      QUnit.start();
    };
    imageObj.onerror = function() {
      assert.ok(false, "Error while loading image for test");
      QUnit.start();
    };

    QUnit.stop();
    imageObj.src = "./fixtures/0-255-0.gif";
  });


  test("Alias `pixelNotEqual` assertion method exists", function(assert) {
    assert.expect(2);

    assert.strictEqual(typeof assert.notPixelEqual, "function", "Primary `notPixelEqual` assertion method exists");
    assert.strictEqual(assert.pixelNotEqual, assert.notPixelEqual, "Secondary alias `pixelNotEqual` assertion method exists");
  });

})(QUnit.module, QUnit.test);