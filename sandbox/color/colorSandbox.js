


var mainColorSandbox = function() {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var rowHeight = 4;
  var rowsPerColorGroup = 10;
  var margin = 10;
  var groupHeight = rowHeight * rowsPerColorGroup;
  var hexColorStr;
  var color;
  var shade;
  var y=0;

  var drawRect = function(x,y,width,height,fillStyle) {
    context.fillStyle = fillStyle;
    context.fillRect(x,y,width,height);
  };

  for (var kw in genColorKeywords) {
    hexColorStr = genColorKeywords[kw].toString(16);
    color = new GEN.Color(hexColorStr);
    for (var r = 0; r < rowsPerColorGroup - 1; r++) {
      shade = color.getRandomShade(100,0);
      drawRect(0,y,canvas.width,rowHeight,shade.rgba());
      y = y + rowHeight;
      console.log("drawing color: " + shade.rgba());
    }
  }

};

window.onload = mainColorSandbox;