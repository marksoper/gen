
//
//  Gen.js - Javascript Library for Generative Art
//  http://marksoper.github.com/gen
//  author: Mark Soper (http://marksoper.net)
//

//
//  gen.js - main module, defines GEN global
//

var GEN;

(function (GEN) {

  GEN.version = '0.1.0';
  
})(GEN || (GEN = {}));

//
//  color.js - Color class
//

var GEN;

(function (GEN) {

  function bound(num) {
    return Math.min(255, Math.max(0, Math.floor(num)));
  }

  var Color = (function () {

    //
    // TODO: Constructor input param should support all supported formats for context.fillStyle
    //
    function Color(val) {
      if(val instanceof Array) {
        this.r = bound(val[0]);
        this.g = bound(val[1]);
        this.b = bound(val[2]);
        this.a = bound(val[3]);
      } else {
        if(typeof val === "string") {
          this.setFromHexString(val);
        }
      }
      this.a = this.a || 255;
    }

    Color.prototype.rgba = function () {
      return "rgba(" + [
        this.r,
        this.g,
        this.b,
        this.a
      ].join(",") + ")";
    };

    Color.prototype.setRandom = function () {
      this.setFromHexString((Math.floor(Math.random() * 16777215)).toString(16));
      this.a = this.a || 255;
    };

    Color.prototype.setFromHexString = function (hexStr) {
      if(hexStr.charAt(0) === "#") {
        hexStr = hexStr.substr(1);
      }
      this.r = parseInt(hexStr.substr(0, 2), 16);
      this.g = parseInt(hexStr.substr(2, 2), 16);
      this.b = parseInt(hexStr.substr(4, 2), 16);
      return this;
    };

    Color.prototype.toHexString = function () {
      return '#' + (this.b | (this.g << 8) | (this.r << 16)).toString(16);
    };

    Color.prototype.getRandomShade = function (rangeCoeff) {
      var seed = 2 * Math.random() - 1;
      var cNorm;
      var delta;
      var cNew;
      var rgb = [];
      var self = this;
      [
        "r",
        "g",
        "b"
      ].forEach(function (c) {
        cNorm = self[c] / 255;
        delta = seed * rangeCoeff * Math.min(cNorm, 1 - cNorm);
        cNew = bound(255 * (cNorm + delta));
        rgb.push(cNew);
      });
      return new Color(rgb);
    };

    return Color;

  })();

  GEN.Color = Color;

})(GEN || (GEN = {}));


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

