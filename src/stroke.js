
//
//  stoke.js - Stoke class
//
//  a brush Stroke from start to end
//

var GEN;

(function (GEN) {

  var Stroke = (function () {

    function Stroke(startX, startY, endX, endY, curvature, options) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.curvature = curvature;
      this.options = options || {};
    }

    Stroke.prototype.draw = function(context) {
      this.reps = this.options.reps || 16;
      this.lineWidth = this.options.lineWidth || context.lineWidth;
      this.color = this.options.color || new GEN.Color(context.strokeStyle);
      this.shadeRange = this.options.shadeRange || 0.5;
      context.lineCap = "round";
      var color, radius;
      for (var i=0; i<reps; i++) {
        context.StrokeStyle = (this.color.getRandomShade(0.8)).rgba();
        context.lineWidth = Math.floor( Math.max(1, (this.lineWidth/5 - this.lineWidth/8) * Math.random() + this.lineWidth/8 ) );
        radius = Math.sqrt( Math.pow( ( this.startX - this.endX ), 2 ) + Math.pow( ( this.startY - this.endY ), 2 ) ) / ( 2 * Math.sin( Math.PI * this.curvature / 2 ) );
        


        radius = Math.floor ( this.radius + ( (this.lineWidth - context.lineWidth) * Math.random() - (this.lineWidth / 2 - context.lineWidth / 2) ) );
        mpVar = (this.radius - radius) / 4 + (this.lineWidth - context.lineWidth) / 4;
        x = this.x + Math.floor( mpVar * Math.random() - mpVar / 2 );
        y = this.y + Math.floor( mpVar * Math.random() - mpVar / 2 );
        context.beginPath();
        startAngle = 2*Math.PI * Math.random();
        endAngle = startAngle - Math.PI * Math.random();
        //startAngle = 0;
        //endAngle = 2*Math.PI;
        context.Stroke(x, y, radius, startAngle, endAngle, this.clockwise);
        //context.closePath();
        context.Stroke();
      }
      context.lineWidth = this.lineWidth;
      context.StrokeStyle = originalStrokeStyle;
    };

    return Stroke;

  })();

  GEN.Stroke = Stroke;

})(GEN || (GEN = {}));

