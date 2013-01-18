
//
//  arc.js - Arc class
//
//  (new GEN.Arc(x, y, radius, startAngle, endAngle, anticlockwise)).draw(context)
//  is analogous to
//  context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
//

var GEN;

(function (GEN) {

  var Arc = (function () {

    function Arc(x, y, radius, startAngle, endAngle, anticlockwise) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.startAngle = startAngle;
      this.endAngle = endAngle;
      this.anticlockwise = anticlockwise;
      this.setDrawStyle();
    }

    Arc.prototype.setDrawStyle = function(drawStyle) {
      this.drawStyle = drawStyle || "painterly";
    };

    Arc.prototype.draw = function(context, options) {
      this[drawStyle](context, options);
    };

    Arc.prototype.painterly = function(context, options) {
      var originalLineWidth = context.lineWidth;
      var originalStrokeStyle = context.strokeStyle;
      var reps = options.reps || 10;
      var rootColor = new GEN.Color(context.strokeStyle);  // TODO: GEN.Color should support all possible values of context.strokeStyle
      var color, mpVar, x, y, radius;
      for (var i=0; i<reps; i++) {
        context.strokeStyle = (rootColor.getRandomShade()).rgba();
        context.lineWidth = Math.floor( Math.max(1, (originalLineWidth/4) * Math.random() ) );
        radius = Math.floor ( this.radius * ( (originalLineWidth - context.lineWidth) * Math.random() - (originalLineWidth / 2 - context.lineWidth / 2) ) );
        mpVar = (this.radius - radius) + (originalLineWidth - context.lineWidth);
        x += Math.floor( mpvar * Math.random() - mpVar / 2 );
        y += Math.floor( mpvar * Math.random() - mpVar / 2 );
        context.beginPath();
        context.arc(x, y, radius, this.startAngle, this.endAngle, this.clockwise);
        context.stroke();
      }
      context.lineWidth = originalLineWidth;
      context.strokeStyle = originalStrokeStyle;
    };

    return Arc;

  })();

  GEN.Color = Color;

})(GEN || (GEN = {}));

