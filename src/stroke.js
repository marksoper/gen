
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
      this.reps = this.options.reps || 16;
      this.lineWidth = this.options.lineWidth || context.lineWidth;
      this.color = this.options.color || new GEN.Color(context.strokeStyle);
      this.shadeRange = this.options.shadeRange || 0.5;
      context.lineCap = "round";
      //
      var length = Math.sqrt( Math.pow(this.endX - this.startX, 2) + Math.pow(this.endY - this.startY, 2) );
      var theta = Math.atan( (this.endY - this.startY) / (this.endX - this.startX) );
      var d = length * Math.cos(this.curvature) / 3;
      this.cp1X = this.startX + (this.endX - this.startX)/3 + length * Math.sin(this.curvature) / 3;
      this.cp1Y = this.startY + (this.endY - this.startY)/3 + length * Math.sin(this.curvature) / 3;
      this.cp2X = this.endX - (this.endX - this.startX)/3 + length * Math.sin(this.curvature) / 3;
      this.cp2Y = this.endY - (this.endY - this.startY)/3 + length * Math.sin(this.curvature) / 3;
      var color, radius;
      for (var i=0; i<this.reps; i++) {
        context.strokeStyle = (this.color.getRandomShade(0.8)).rgba();
        context.lineWidth = Math.floor( Math.max(1, (this.lineWidth/5 - this.lineWidth/8) * Math.random() + this.lineWidth/8 ) );
        context.beginPath();
        context.moveTo(this.startX, this.startY);
        // TODO: set control points based on curvature
        context.bezierCurveTo(this.cp1X,this.cp1Y,this.cp2X,this.cp2Y,this.endX,this.endY);
        context.stroke();
        context.closePath();
      }
      // TODO: reset original lineWidth and strokeStyle
    };

    return Stroke;

  })();

  GEN.Stroke = Stroke;

})(GEN || (GEN = {}));

