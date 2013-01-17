
var mainColorSandbox = function() {

 // genColorKeywords = {"salmon": 0xFA8072, "sandybrown": 0xF4A460, "seagreen": 0x2E8B57};
  var colorCount = 0;
  for (var key in genColorKeywords) {
    colorCount += 1;
  }

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var rowHeight = 4;
  var rowsPerColorGroup = 10;
  var margin = 10;
  var groupHeight = rowHeight * rowsPerColorGroup;

  canvas.width  = window.innerWidth;
  canvas.height = colorCount * (groupHeight + margin);

  var hexColorStr;
  var color;
  var shade;
  var y=0;

  var drawRect = function(x,y,width,height,fillStyle) {
    console.log("drawRect: " + [x,y,width,height,fillStyle].join(" , "));
    context.fillStyle = fillStyle;
    context.fillRect(x,y,width,height);
  };

  for (var kw in genColorKeywords) {
    hexColorStr = genColorKeywords[kw].toString(16);
    color = new GEN.Color(hexColorStr);
    y = y + margin;
    for (var r = 0; r < rowsPerColorGroup - 1; r++) {
      shade = color.getRandomShade(20,0);
      drawRect(0,y,canvas.width,rowHeight,shade.rgba());
      y = y + rowHeight;
    }
  }

  // for debugging
  window.context = context;

};

window.onload = mainColorSandbox;