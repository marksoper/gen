
//
//  Gen.js - Javascript Library for Generative Art
//  http://marksoper.github.com/gen
//  author: Mark Soper (http://soper.me)
//

//
//  gen.js - main module, defines GEN global
//

var GEN;

(function (GEN) {

  GEN.version = '0.1.0';
  
})(GEN || (GEN = {}));


//
//  fiber.js - defines a class Gen.Fiber
//  which is the atomic unit of drawing
//  many Gen.Fiber objects are combined to produce a Gen.Subpath object (lines, curves, arcs, etc.) in Gen.Context
//  a fiber represents a simple "single-subpath" path on the native Context2d (native "2d" Context)
//  and exposes a draw method pattern
//  that corresponds to a beginPath, moveTo, [arcTo, lineTo, ...], stroke on Context2d
//

var GEN;

(function (GEN) {

  var Fiber = (function (context2d) {

    function Fiber(context2d) {
      this.context2d = context2d;
    }

    Fiber.prototype.context2dSet = function(props) {
      for (var propName in props) {
        this.context2d[propName] = props[propName];
      }
    };

    Fiber.prototype.context2dGet = function(propName) {
      return this.context2d[propName];
    };

    Fiber.prototype.draw = function(fiberDrawType, fiberDrawParams, initialPosition) {
      this.context2d.beginPath();
      if (fiberDrawType === "drawRect") {
        // TODO: handle drawRect
      } else {
        this.context2d.moveTo(initialPosition.x, initialPosition.y);
        this.context2d[fiberDrawType].apply(this.context2d, fiberDrawParams);
      }
      this.context2d.stroke();
    };

    return Fiber;

  })();

  GEN.Fiber = Fiber;
  
})(GEN || (GEN = {}));



//
//  subpath.js - defines a class Gen.Subpath
//  which is a collection of one or more Gen.Fiber objects
//  many Gen.Subpath objects (lines, curves, arcs, etc.) are combined to produce a Gen.Context.Path object
//  

var GEN;

(function (GEN) {

  var Subpath = (function (context2d, fibers) {

    function Subpath(context2d, fibers) {
      this.context2d = context2d;
      this.fibers = fibers || [];
    }

    Subpath.prototype.draw = function() {
      this.fibers.forEach(function(fiber) {
        fiber.draw();
      });
    };

    return Subpath;

  })();

  GEN.Subpath = Subpath;
  
})(GEN || (GEN = {}));



//
//  path.js - defines a class Gen.Path
//  which is a collection of Gen.Subpath objects
//  Gen.Path has methods analogous to the Context2d path operations
//  e.g. beginPath, stroke, etc.
//  

var GEN;

(function (GEN) {

  var Path = (function (context2d, subpaths) {

    function Path(context2d, subpaths) {
      this.context2d = context2d;
      this.subpaths = subpaths || [];
    }

    Path.prototype.stroke = function() {
      this.subpaths.forEach(function(subpath) {
        subpath.draw();
      });
    };

    return Path;

  })();

  GEN.Path = Path;
  
})(GEN || (GEN = {}));


//
//  random.js - random number generator
//

var GEN;

(function (GEN) {

  var random = function(min, max) {
    if (min && max) {
      return (max - min) * Math.random() + min;
    }
    return Math.random();
  };

  GEN.random = random;

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

    //
    // TODO: Refactor this to convert back-forth to HSL
    // Doesn't seem that RGB will work for this, results haven't been all that good
    // especially for darker colors
    //
    Color.prototype.getRandomShade = function (shadeRange) {
      shadeRange = shadeRange || 0.5;
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
        delta = seed * shadeRange * Math.min(cNorm, 1 - cNorm);
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
//  painterly/painterly.js - defines a Gen.Painterly submodule
//

var GEN;

(function (GEN) {

  (function (Painterly) {

  })(GEN.Painterly || (GEN.Painterly = {}));

  var Painterly = GEN.Painterly;  // TODO: need this?
  
})(GEN || (GEN = {}));


//
//  painterly/context.js - defines a Gen.Context.Context class
//

var GEN;

(function (GEN) {

  var Context = (function (context) {

    function Context(context) {
      this.context = context;
      this._currentPosition = {x: 0, y: 0};
      this._path = [];
    }

    Context.Fiber = (function () {

      function Fiber() {
      }

      return Fiber;

    })();

    Fiber.prototype.stroke = function() {
      
    };

    Context.prototype.contextSet = function(props) {
      for (var propName in props) {
        this.context[propName] = props[propName];
      }
    };

    Context.prototype.contextGet = function(propName) {
      return this.context[propName];
    };

    Context.prototype.currentPosition = function(coords) {
      if (coords) {
        this._currentPosition = coords;
      } else {
        return this._currentPosition || { x: 0, y: 0};
      }
    };

    Context.prototype.contextCall = function() {
      var args = Array.prototype.slice.call(arguments);
      var method = args.splice(0,1);
      var pos;
      switch (method) {
        case "bezierCurveTo":
          pos = {x: args[4], y: args[5]};
          break;
        case "moveTo":
          pos = {x: args[0], y: args[1]};
          break;
      }
      this.context[method].apply(this.context, args);
      this.currentPosition(pos);
    };

    Context.prototype.moveTo = function(x,y) {
      this.context.moveTo(x,y);
      this.currentPosition({x: x, y: y});
    };

    Context.prototype.beginPath = function() {
      this._path = [];
    };

    Context.prototype.stroke = function() {
      this._path.forEach(function(subpath) {
        subpath.forEach(function(fiber) {
          fiber.stroke();
        });
      });
    };

    return Context;

  })();

  GEN.Context = Context;
  
})(GEN || (GEN = {}));

//
//  painterly/bezier.js
//
//  extends the Painterly class to have
//  bezierCurveTo prototype method
//

var GEN;

(function (GEN) {

  var bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
    var oPos = this.currentPosition();
    var oLW = this.lineWidth || this.contextGet("lineWidth");
    var oSS = this.strokeStyle || this.contextGet("strokeStyle");
    var rootColor = new GEN.Color(oSS);
    var length = Math.sqrt( Math.pow(x - oPos.x, 2) + Math.pow(y - oPos.y, 2) );
    var reps = 5;
    var minLW = 0.1 * oLW;
    var maxLW = 0.4 * oLW;
    var pVar = 0.1 * length;
    var cpVar = 0.1 * length;
    var params = {};
    for (var i=0; i<reps; i++) {
      this.contextCall(
        "moveTo",
        Math.floor(oPos.x + pVar * GEN.random() - pVar/2),
        Math.floor(oPos.y + pVar * GEN.random() - pVar/2)
      );
      this.contextSet({
        "lineWidth": Math.floor((maxLW - minLW) * GEN.random() + minLW),
        "strokeStyle": rootColor.getRandomShade(0.8).rgba()
      });
      params.cp1x = Math.floor(cp1x + GEN.random() * cpVar - cpVar / 2);
      params.cp1y = Math.floor(cp1y + GEN.random() * cpVar - cpVar / 2);
      params.cp2x = Math.floor(cp2x + GEN.random() * cpVar - cpVar / 2);
      params.cp2y = Math.floor(cp2y + GEN.random() * cpVar - cpVar / 2);
      params.x = Math.floor(x + GEN.random() * pVar - pVar / 2);
      params.y = Math.floor(y + GEN.random() * pVar - pVar / 2);
      this.contextCall(
        "bezierCurveTo",
        params.cp1x,
        params.cp1y,
        params.cp2x,
        params.cp2y,
        params.x,
        params.y
      );
    }
    this.contextSet({
      lineWidth: oLW,
      strokeStyle: oSS
    });
    this.contextCall(
      "moveTo",
      x,
      y
    );
  };

  GEN.Painterly.prototype.bezierCurveTo = bezierCurveTo;

})(GEN || (GEN = {}));

//
//  stroke.js - Stroke class
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
        context.lineWidth = Math.floor( Math.max(1, (this.lineWidth/12 - this.lineWidth/24) * Math.random() + this.lineWidth/24 ) );
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
    }

    Arc.prototype.draw = function(context, options) {
      options = options || {};
      context.lineCap = "round";
      var originalLineWidth = context.lineWidth;
      var originalStrokeStyle = context.strokeStyle;
      var reps = options.reps || 72;
      var rootColor = new GEN.Color(context.strokeStyle);  // TODO: GEN.Color should support all possible values of context.strokeStyle
      var mpVar, x, y, radius, startAngle, endAngle;
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

