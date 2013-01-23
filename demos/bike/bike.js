
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

  var parts = {
    "frontWheel": { 
      shape: new GEN.Arc(600, 300, 100, 0, Math.PI * 2),
      color: genColorKeywords["cadetblue"],
      lineWidth: 64
    },
    "rearWheel": {
      shape: new GEN.Arc(200, 300, 100, 0, Math.PI * 2),
      color: genColorKeywords["cadetblue"],
      lineWidth: 64
    },
    "foot": {
      shape: new GEN.Stroke(340, 300, 460, 300, -Math.PI/12),
      color: genColorKeywords["chocolate"],
      lineWidth: 128
    },
    "lowerLeg": {
      shape: new GEN.Stroke(340, 300, 460, 200, Math.PI/12),
      color: genColorKeywords["chocolate"],
      lineWidth: 230
    },
    "upperLeg": {
      shape: new GEN.Stroke(460, 200, 260, 100, Math.PI/12),
      color: genColorKeywords["chocolate"],
      lineWidth: 480
    },
    "torso": {
      shape: new GEN.Stroke(260, 100, 500, 50, -Math.PI/6),
      color: genColorKeywords["chocolate"],
      lineWidth: 640
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