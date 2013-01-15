


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
    console.log("drawRect: " + [x,y,width,height,fillStyle].join(" , "));
    context.fillStyle = fillStyle;
    context.fillRect(x,y,width,height);
  };

  genColorKeywords = {"salmon": 0xFA8072} //, "sandybrown": 0xF4A460, "seagreen": 0x2E8B57};

  for (var kw in genColorKeywords) {
    hexColorStr = genColorKeywords[kw].toString(16);
    color = new GEN.Color(hexColorStr);
    for (var r = 0; r < rowsPerColorGroup - 1; r++) {
      shade = color.getRandomShade(20,0);
      drawRect(0,y,canvas.width,rowHeight,shade.rgba());
      y = y + rowHeight;
    }
  }

};

window.onload = mainColorSandbox;