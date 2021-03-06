
var mainRandomHsl = function() {

  // constrain colors for debugging
  //genColorKeywords = {"salmon": 0xFA8072, "white": 0xffffff, "black": 0x000000, "sandybrown": 0xF4A460, "seagreen": 0x2E8B57};
  var colorCount = 0;
  for (var key in genColorKeywords) {
    colorCount += 1;
  }

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var shadeWidth = 8;
  var margin = 20;
  var groupHeight = 60;

  canvas.width  = window.innerWidth;
  canvas.height = colorCount * (groupHeight + margin);

  var hexColorStr;
  var color;
  var hsla;
  var y=document.getElementById("header").offsetHeight + 2*margin;
  var x=0;

  var drawRect = function(x,y,width,height,fillStyle) {
    //console.log("drawRect: " + [x,y,width,height,fillStyle].join(" , "));
    context.fillStyle = fillStyle;
    context.fillRect(x,y,width,height);
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
    color = new GEN.Color(hexColorStr);
    y += margin;
    x += margin;
    //
    // draw the original color
    //
    var origWidth = shadeWidth * 10;
    drawRect(x,y,origWidth,groupHeight,color.rgba());
    drawText(kw + " #" + hexColorStr, x+4, y-2);
    x += (origWidth + margin);
    //
    // draw a strip of shades for that color
    //
    while (x < (canvas.width - 2*margin) ) {
      var variance = Math.min(1.0, x/(canvas.width - 2*margin));
      console.log("variance: " + variance);
      hsla = color.randomVariationHsl(variance);
      drawRect(x,y,shadeWidth,groupHeight,hsla);
      x += shadeWidth;
    }
    x = 0;
    y += groupHeight;
  }

  // for debugging
  window.context = context;

};

window.onload = mainRandomHsl;