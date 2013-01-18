
var mainPainterlyArc = function() {
  
  // filter genColorKeywords
  var colorKeywords = genColorKeywords;
  genColorKeywords = {};
  ["chocolate", "cadetblue", "darkred", "blueviolet", "darkgreen", "darkmagenta", "darkorange", "goldenrod"].forEach(function(key) {
    genColorKeywords[key] = colorKeywords[key];
  });

  var colorCount = 0;
  for (var key in genColorKeywords) {
    colorCount += 1;
  }

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var margin = 20;

  canvas.width  = window.innerWidth;
  var radius = Math.floor(canvas.width / 8);
  canvas.height = colorCount * (2*radius + 4*margin);

  var hexColorStr;

  var mpxNormal = Math.floor(canvas.width / 4);
  var mpxPainterly = 3 * Math.floor(canvas.width / 4);
  var y=0;

  var arcNormal = function(x, y, radius, startAngle, endAngle, anticlockwise) {
    context.beginPath();
    context.arc(Math.floor(x), Math.floor(y), Math.floor(radius), startAngle, endAngle, anticlockwise);
    context.closePath();
    context.stroke();
  };

  var arcPainterly = function(x, y, radius, startAngle, endAngle, anticlockwise) {
    console.log("painterly for " + context.strokeStyle);
    var arc = new GEN.Arc(Math.floor(x), Math.floor(y), Math.floor(radius), startAngle, endAngle, anticlockwise);
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

  var j=0;
  for (var kw in genColorKeywords) {
    hexColorStr = zeroPadToSix(genColorKeywords[kw].toString(16));
    context.strokeStyle = "#" + hexColorStr;
    context.lineWidth = Math.floor(radius / Math.PI);
    y += 2*margin + radius;
    //
    // draw arc with the original color
    //

    arcNormal(mpxNormal, y, radius, 0, 2*Math.PI, false);
    //drawText(kw + " #" + hexColorStr, x+4, y-2);
    
    //
    // draw arc with GEN.Arc.painterly
    //
    arcPainterly(mpxPainterly, y, radius, 0, 2*Math.PI, false);
    y += 2*margin + radius;
  }

  // for debugging
  window.context = context;

};

window.onload = mainPainterlyArc;