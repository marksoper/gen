
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
      this.curvature = curvature || Math.PI / 4;
      this.options = options || {};
    }

    Stroke.prototype.draw = function(context) {
      this.lineWidth = Math.floor(this.options.lineWidth || context.lineWidth);
      this.reps = this.options.reps || this.lineWidth;
      this.color = this.options.color || new GEN.Color(context.strokeStyle);
      this.shadeRange = this.options.shadeRange || 0.5;
      context.lineCap = "round";
      //
      var length = Math.sqrt( Math.pow(this.endX - this.startX, 2) + Math.pow(this.endY - this.startY, 2) );
      var theta = Math.atan( (this.endY - this.startY) / (this.endX - this.startX) );
      var d = length * Math.cos(this.curvature) / 3;
      this.cp1X = Math.floor(this.startX + (this.endX - this.startX)/3 + length * Math.sin(this.curvature) / 3);
      this.cp1Y = Math.floor(this.startY + (this.endY - this.startY)/3 + length * Math.sin(this.curvature) / 3);
      this.cp2X = Math.floor(this.endX - (this.endX - this.startX)/3 + length * Math.sin(this.curvature) / 3);
      this.cp2Y = Math.floor(this.endY - (this.endY - this.startY)/3 + length * Math.sin(this.curvature) / 3);
      //
      var startSkew = 0.1;
      var endSkew = 0.1;
      var cpSkew = 0.1;
      //
      var startX, endX, startY, endY, cp1X, xp1Y, cp2X, cp2Y;
      for (var i=0; i<this.reps; i++) {
        startX = Math.floor(this.startX + Math.random() * length * startSkew - length * startSkew / 2);
        startY = Math.floor(this.startY + Math.random() * length * startSkew - length * startSkew / 2);
        endX = Math.floor(this.endX + Math.random() * length * endSkew - length * endSkew / 2);
        endY = Math.floor(this.endY + Math.random() * length * endSkew - length * endSkew / 2);
        cp1X = Math.floor(this.cp1X + Math.random() * length * cpSkew - length * cpSkew / 2);
        cp1Y = Math.floor(this.cp1Y + Math.random() * length * cpSkew - length * cpSkew / 2);
        cp2X = Math.floor(this.cp2X + Math.random() * length * cpSkew - length * cpSkew / 2);
        cp2Y = Math.floor(this.cp2Y + Math.random() * length * cpSkew - length * cpSkew / 2);
        context.strokeStyle = (this.color.getRandomShade(0.8)).rgba();
        context.lineWidth = Math.floor( Math.max(1, (this.lineWidth/128 - this.lineWidth/256) * Math.random() + this.lineWidth/256 ) );
        context.beginPath();
        context.moveTo(startX, startY);
        // TODO: set control points based on curvature
        context.bezierCurveTo(cp1X,cp1Y,cp2X,cp2Y,endX,endY);
        context.stroke();
        context.closePath();
      }
      // TODO: reset original lineWidth and strokeStyle
    };

    return Stroke;

  })();

  GEN.Stroke = Stroke;

})(GEN || (GEN = {}));

