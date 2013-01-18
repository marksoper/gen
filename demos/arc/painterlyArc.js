
var mainPainterlyArc = function() {

  // constrain colors for debugging
  genColorKeywords = {"salmon": 0xFA8072, "white": 0xffffff, "black": 0x000000, "sandybrown": 0xF4A460, "seagreen": 0x2E8B57};
  var colorCount = 0;
  for (var key in genColorKeywords) {
    colorCount += 1;
  }

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var margin = 20;

  canvas.width  = window.innerWidth;
  var radius = canvas.width / 5;
  canvas.height = colorCount * (2*radius + margin);

  var hexColorStr;

  var mpxNormal = canvas.width / 4;
  var mpxPainterly = 3 * canvas.width / 4;
  var y=0;

  var arcNormal = function(x, y, radius, startAngle, endAngle, anticlockwise) {
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    context.stroke();
  };

  var arcPainterly = function(x, y, radius, startAngle, endAngle, anticlockwise) {
    var arc = new GEN.Arc(x, y, radius, startAngle, endAngle, anticlockwise);
    arc.painterly(context);
  };

  context.font = "10pt Helvetica";
  var drawText = function(text, x, y, fillStyle) {
    context.fillStyle = fillStyle || "#222222";
    context.fillText(text, x, y);
  };

  var zeroPadToSix = function(s) {
    while (s.length < 6) s = "0" + s;
    return s;
  };

  for (var kw in genColorKeywords) {
    hexColorStr = zeroPadToSix(genColorKeywords[kw].toString(16));
    context.fillColor = hexColorStr;
    context.lineWidth = Math.floor(radius / 6);
    y += margin + radius;
    //
    // draw arc with the original color
    //

    arcNormal(mpxNormal, y, radius, 0, 2*Math.PI, false);
    //drawText(kw + " #" + hexColorStr, x+4, y-2);
    
    //
    // draw arc with GEN.Arc.painterly
    //
    arcPainterly(mpxPainterly, y, radius, 0, 2*Math.PI, false);
    y += margin + radius;
  }

  // for debugging
  window.context = context;

};

window.onload = mainPainterlyArc;