
var mainBike = function() {

  var margin = 30;

  var resizeCanvas = function(canvas) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  var clearContext = function(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  var zeroPadToSix = function(s) {
    while (s.length < 6) s = "0" + s;
    return s;
  };

  var wheelColor = genColorKeywords["chocolate"];
  var bodyColor = genColorKeywords["chocolate"];
  var groundColor = genColorKeywords["darkslategrey"];

  var parts = {
    "frontWheel": {
      shape: new GEN.Arc(600, 400, 120, 0, Math.PI * 2),
      color: wheelColor,
      lineWidth: 64
    },
    "rearWheel": {
      shape: new GEN.Arc(200, 400, 120, 0, Math.PI * 2),
      color: wheelColor,
      lineWidth: 64
    },
    "torso": {
      shape: new GEN.Stroke(260, 200, 500, 150, -Math.PI/6),
      color: bodyColor,
      lineWidth: 640
    },
    "upperLeg": {
      shape: new GEN.Stroke(460, 300, 260, 200, Math.PI/12),
      color: bodyColor,
      lineWidth: 480
    },
    "lowerLeg": {
      shape: new GEN.Stroke(340, 400, 460, 300, Math.PI/12),
      color: bodyColor,
      lineWidth: 230
    },
    "foot": {
      shape: new GEN.Stroke(340, 400, 460, 400, -Math.PI/12),
      color: bodyColor,
      lineWidth: 128
    },
    "upperArm": {
      shape: new GEN.Stroke(500, 150, 440, 230, -Math.PI/6),
      color: bodyColor,
      lineWidth: 320
    },
    "lowerArm": {
      shape: new GEN.Stroke(440, 230, 540, 220, -Math.PI/12),
      color: bodyColor,
      lineWidth: 210
    },
    "head_0": {
      shape: new GEN.Stroke(560, 90, 420, 70, Math.PI/3),
      color: bodyColor,
      lineWidth: 210
    },
    "head_1": {
      shape: new GEN.Stroke(580, 70, 420, 70, -Math.PI/3),
      color: bodyColor,
      lineWidth: 210
    },
    "head_2": {
      shape: new GEN.Stroke(590, 60, 420, 70, -Math.PI/3),
      color: bodyColor,
      lineWidth: 210
    },
    "ground": {
      shape: new GEN.Stroke(window.innerWidth, 710, 0, 680, -Math.PI/9),
      color: groundColor,
      lineWidth:  480
    }
  };
  var drawPart = function(part, context) {
    hexColorStr = zeroPadToSix(part.color.toString(16));
    context.strokeStyle = "#" + hexColorStr;
    context.lineWidth = part.lineWidth;
    part.shape.draw(context);
  };

  var layers = {
    "wheels": {
      parts: ["frontWheel", "rearWheel"],
      interval: 250
    },
    "ground": {
      parts: ["ground"],
      interval: 500
    },
    "body": {
      parts: ["torso", "upperLeg", "lowerLeg", "foot", "upperArm", "lowerArm", "head_0", "head_1", "head_2"],
      interval: 5000
    }
  };
  var layer;
  var drawLayer = function(layer) {
    layer.parts.forEach(function(partName) {
      drawPart(parts[partName], layer.context);
    });
    setTimeout(function() {
      window.requestAnimationFrame(function() {
        clearContext(layer.context);
        drawLayer(layer);
      });
    }, layer.interval);
  };
  for (var layerName in layers) {
    layer = layers[layerName];
    layer.canvas = document.createElement("canvas");
    layer.context = layer.canvas.getContext("2d");
    document.getElementById("scene").appendChild(layer.canvas);
    resizeCanvas(layer.canvas);
    drawLayer(layer);
  }

  // for debugging
  window.parts = parts;
  window.layers = layers;

};

window.onload = mainBike;