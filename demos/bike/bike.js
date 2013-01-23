
var mainBike = function() {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var margin = 30;

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  var zeroPadToSix = function(s) {
    while (s.length < 6) s = "0" + s;
    return s;
  };

  var wheelColor = genColorKeywords["chocolate"];
  var bodyColor = genColorKeywords["chocolate"];

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
    "foot": {
      shape: new GEN.Stroke(340, 400, 460, 400, -Math.PI/12),
      color: bodyColor,
      lineWidth: 128
    },
    "lowerLeg": {
      shape: new GEN.Stroke(340, 400, 460, 300, Math.PI/12),
      color: bodyColor,
      lineWidth: 230
    },
    "upperLeg": {
      shape: new GEN.Stroke(460, 300, 260, 200, Math.PI/12),
      color: bodyColor,
      lineWidth: 480
    },
    "torso": {
      shape: new GEN.Stroke(260, 200, 500, 150, -Math.PI/6),
      color: bodyColor,
      lineWidth: 640
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
    }
  };

  var part;
  for (var partName in parts) {
    part = parts[partName];
    hexColorStr = zeroPadToSix(part.color.toString(16));
    context.strokeStyle = "#" + hexColorStr;
    context.lineWidth = part.lineWidth;
    part.shape.draw(context);
  }

  // for debugging
  window.context = context;

};

window.onload = mainBike;