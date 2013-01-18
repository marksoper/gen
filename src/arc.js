
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
      options = options || {};
      context.lineCap = "round";
      var originalLineWidth = context.lineWidth;
      var originalStrokeStyle = context.strokeStyle;
      var reps = options.reps || 72;
      var rootColor = new GEN.Color(context.strokeStyle);  // TODO: GEN.Color should support all possible values of context.strokeStyle
      var color, mpVar, x, y, radius, startAngle, endAngle;
      for (var i=0; i<reps; i++) {
        context.strokeStyle = (rootColor.getRandomShade(0.8)).rgba();
        context.lineWidth = Math.floor( Math.max(1, (originalLineWidth/5 - originalLineWidth/8) * Math.random() + originalLineWidth/8 ) );
        radius = Math.floor ( this.radius + ( (originalLineWidth - context.lineWidth) * Math.random() - (originalLineWidth / 2 - context.lineWidth / 2) ) );
        mpVar = (this.radius - radius) / 4 + (originalLineWidth - context.lineWidth) / 4;
        x = this.x + Math.floor( mpVar * Math.random() - mpVar / 2 );
        y = this.y + Math.floor( mpVar * Math.random() - mpVar / 2 );
        context.beginPath();
        startAngle = 2*Math.PI * Math.random();
        endAngle = startAngle - Math.PI * Math.random();
        //startAngle = 0;
        //endAngle = 2*Math.PI;
        context.arc(x, y, radius, startAngle, endAngle, this.clockwise);
        //context.closePath();
        context.stroke();
      }
      context.lineWidth = originalLineWidth;
      context.strokeStyle = originalStrokeStyle;
    };

    return Arc;

  })();

  GEN.Arc = Arc;

})(GEN || (GEN = {}));

