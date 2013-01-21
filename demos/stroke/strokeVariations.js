
var mainStrokeVariations = function() {
  
  // filter genColorKeywords
  var colorKeywords = genColorKeywords;
  genColorKeywords = {
    "chocolate": colorKeywords["chocolate"]
  };
  /*
  ["chocolate", "cadetblue", "darkred", "blueviolet", "darkgreen", "darkmagenta", "darkorange", "goldenrod"].forEach(function(key) {
    genColorKeywords[key] = colorKeywords[key];
  });
  */

  var colorCount = 0;
  for (var key in genColorKeywords) {
    colorCount += 1;
  }

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var margin = 30;

  canvas.width  = window.innerWidth;
  canvas.height = colorCount * 24 *margin;

  var hexColorStr;

  var startX = margin*5;
  var endX = margin*15;
  var y=0;

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
    context.strokeStyle = "#" + hexColorStr;
    context.lineWidth = 25*margin;
    y += 2*margin;
    
    //drawText(kw + " #" + hexColorStr, Math.floor(canvas.width / 2 - 50), y-2);
    
    var stroke = new GEN.Stroke(startX, y+10*margin, endX, y+margin, -Math.PI/6);
    stroke.draw(context);

    y += 2*margin;
  }

  // for debugging
  window.context = context;

};

window.onload = mainStrokeVariations;