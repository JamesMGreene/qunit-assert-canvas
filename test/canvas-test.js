QUnit.module("qunit-assert-canvas plugin unit tests");

QUnit.test("Canvas pixels from manual fills", function(assert) {
  var context,
      canvas = document.getElementById("qunit-canvas");
  try {
    context = canvas.getContext("2d");
  }
  catch (e) {
    // probably no canvas support, just exit
    return;
  }

  QUnit.expect(16);

  context.fillStyle = "rgba(0, 0, 0, 0)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 0, 0, 0, 0, 0, 0);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(255, 0, 0, 0)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 0, 0, 0, 0, 0, 0);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(0, 255, 0, 0)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 0, 0, 0, 0, 0, 0);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(0, 0, 255, 0)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 0, 0, 0, 0, 0, 0);
  context.clearRect(0, 0, 5, 5);

  context.fillStyle = "rgba(0, 0, 0, 0.6)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 0, 0, 0, 0, 0, 153);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(255, 0, 0, 0.6)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 0, 0, 255, 0, 0, 153);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(0, 255, 0, 0.6)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 0, 0, 0, 255, 0, 153);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(0, 0, 255, 0.6)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 0, 0, 0, 0, 255, 153);
  context.clearRect(0, 0, 5, 5);

  context.fillStyle = "rgba(0, 0, 0, 0.6)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 2, 2, 0, 0, 0, 153);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(255, 0, 0, 0.6)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 2, 2, 255, 0, 0, 153);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(0, 255, 0, 0.6)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 2, 2, 0, 255, 0, 153);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(0, 0, 255, 0.6)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 2, 2, 0, 0, 255, 153);
  context.clearRect(0, 0, 5, 5);

  context.fillStyle = "rgba(0, 0, 0, 1)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 4, 4, 0, 0, 0, 255);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(255, 0, 0, 1)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 4, 4, 255, 0, 0, 255);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(0, 255, 0, 1)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 4, 4, 0, 255, 0, 255);
  context.clearRect(0, 0, 5, 5);
  context.fillStyle = "rgba(0, 0, 255, 1)";
  context.fillRect(0, 0, 5, 5);
  assert.pixelEqual(canvas, 4, 4, 0, 0, 255, 255);
  context.clearRect(0, 0, 5, 5);
});

QUnit.asyncTest("Canvas pixels from drawn image", function(assert) {
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

  QUnit.expect(1);

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
  imageObj.src = "./fixtures/0-255-0.gif";
});
