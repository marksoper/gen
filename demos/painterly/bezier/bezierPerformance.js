
var mainBezierPerformance = function() {

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var painterly = new GEN.Painterly(context);














  var margin = 30;

  canvas.width  = window.innerWidth;

  var hexColorStr;

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

  var variations = [
    {
      startX: 150,
      startY: 100,
      endX: 450,
      endY: 10,
      curvature: -Math.PI / 6,
      lineWidth: 72,
      color: genColorKeywords["chocolate"]
    },
    {
      startX: 600,
      startY: 100,
      endX: 100,
      endY: 10,
      curvature: -Math.PI / 6,
      lineWidth: 72,
      color: genColorKeywords["cadetblue"]
    }
  ];

  for (var vj in variations) {
    canvas.height += (Math.abs(variations[vj].startY - variations[vj].endY) + 2*margin);
  }

  var v;
  for (var vi in variations) {
    v = variations[vi];
    hexColorStr = zeroPadToSix(v.color.toString(16));
    context.strokeStyle = "#" + hexColorStr;
    context.lineWidth = v.lineWidth;
    y += margin;
    
    //drawText(kw + " #" + hexColorStr, Math.floor(canvas.width / 2 - 50), y-2);
    
    var stroke = new GEN.Stroke(v.startX, y + v.startY, v.endX, y + v.endY, v.curvature);
    stroke.draw(context);

    y += (Math.abs(v.startY - v.endY) + 4*margin);
  }

  // for debugging
  window.context = context;

};

window.onload = mainStrokeVariations;