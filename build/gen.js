
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

  GEN.version = '0.2.0';
  
})(GEN || (GEN = {}));

//
//  extends.js - defines a helper function GEN.__extends
//  that gets used for class inheritance
//

var GEN;

(function (GEN) {

  var __extends = function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
  };

  GEN.__extends = __extends;
  
})(GEN || (GEN = {}));



//
//  grid.js - defines a 2d rectangular area
//
//  with width and height
//  against which proportional x,y calcs can be done
//


var GEN;

(function (GEN) {

  var Grid = (function () {

    function Grid(origin, width, height) {
      this.origin = origin || { x: 0, y: 0 };
      this.width = width;
      this.height = height;
    }

    return Grid;

  })();

  GEN.Grid = Grid;
  
})(GEN || (GEN = {}));



//
//  point.js - defines a class Gen.Point
//
//  a 2d point with x and y coords
//

var GEN;

(function (GEN) {

  var Point = (function () {

    function Point(x,y,grid) {
      if (grid) {
        this.grid = grid;
      }
      this._x = x;
      this._y = y;
    }

    Point.prototype.x = function() {
      if (this.grid) {
        return Math.floor(this.grid.origin.x + this._x * this.grid.width);
      } else {
        return _x;
      }
    };

    Point.prototype.y = function() {
      if (this.grid) {
        return Math.floor(this.grid.origin.y + this._y * this.grid.height);
      } else {
        return _y;
      }
    };

    Point.prototype.coords = function() {
      return {
        x: this.x(),
        y: this.y()
      };
    };

    return Point;

  })();

  GEN.Point = Point;
  
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

  var Fiber = (function () {
    //
    // params - the exact params for the native context function call
    // env - native context properties like lineWidth, strokeStyle, etc.
    // genParams - extension properties only present in Gen.js
    //
    //
    // TODO: maybe params should be handled consistently with Subpath
    //
    function Fiber(context2d, params, env, genParams) {
      this.context2d = context2d;
      this.params = params;
      this.env = env;
      genParams = genParams || {};
      this.startPosition = genParams.startPosition;
    }

    Fiber.prototype.context2dBeginPath = function() {
      this.context2d.beginPath();
    };

    Fiber.prototype.context2dSet = function(props) {
      for (var propName in props) {
        this.context2d[propName] = props[propName];
      }
    };

    Fiber.prototype.context2dGet = function(propName) {
      return this.context2d[propName];
    };

    Fiber.prototype.context2dMoveTo = function(x,y) {
      this.context2d.moveTo(x,y);
    };

    Fiber.prototype.context2dStroke = function() {
      this.context2d.stroke();
    };

    /*
    * TODO: not sure what base draw functionality should be yet
    *
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
    *
    *
    */

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

  var Subpath = (function () {
    //
    // params - the exact params for the native context function call
    // env - native context properties like lineWidth, strokeStyle, etc.
    // genParams - extension properties only present in Gen.js
    //
    //
    function Subpath(context2d, params, env, genParams) {
      this.context2d = context2d;
      this.params = params || [];
      env = env || {};
      genParams = genParams || {};
      this.color = genParams.color || new GEN.Color(env.strokeStyle);
      this.startPosition = genParams.startPosition || this.defaultStartPosition || Subpath.defaultStartPostion;
      this.fiberDensity = genParams.fiberDensity || this.defaultFiberDensity || Subpath.defaultFiberDensity;
      this.lineWidth = env.lineWidth || this.defaultLineWidth || Subpath.defaultLineWidth;  // TODO: test this
      this.lineCap = env.lineCap || this.defaultLineCap || Subpath.defaultLineCap;
      this.begin();
    }

    Subpath.prototype.addFiber = function(fiber) {
      this.fibers.push(fiber);
    };

    Subpath.prototype.draw = function() {
      this.fibers.forEach(function(fiber) {
        fiber.draw();
      });
    };

    Subpath.prototype.to = function() {
      this.begin();
    };

    Subpath.prototype.begin = function() {
      this.fibers = [];
    };

    Subpath.defaultStartPostion = { x: 0, y: 0 };
    Subpath.defaultFiberDensity = 1;
    Subpath.defaultLineWidth = 10;
    Subpath.defaultLineCap = "round";

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

  var Path = (function () {

    function Path(context2d, subpaths) {
      this.context2d = context2d;
      this.subpaths = subpaths || [];
    }

    Path.prototype.begin = function() {
      this.subpaths = [];
    };

    Path.prototype.addSubpath = function(subpath) {
      this.subpaths.push(subpath);
    };

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
//  context.js - defines a class Gen.Context
//  that wraps Context2d - the normal canvas "2d" context ()
//
//
//  TODO: more explanation
//

var GEN;

(function (GEN) {

  var Context = (function () {

    function Context(context2d) {
      this.context2d = context2d;
      this._currentPosition = {x: 0, y: 0};
      this._path = new GEN.Path(context2d);
    }

    //
    // currentPosition gets and sets state about the current
    // position of the "wrapped" context
    //

    Context.prototype.currentPosition = function(coords) {
      if (coords) {
        this._currentPosition = coords;
      } else {
        return this._currentPosition || { x: 0, y: 0};
      }
    };

    //
    //  GEN.Context versions of native Context2d operations
    //

    Context.prototype.moveTo = function(x,y) {
      this.context2d.moveTo(x,y);
      this.currentPosition({x: x, y: y});
    };

    Context.prototype.beginPath = function() {
      this._path.begin();
    };

    Context.prototype.addToPath = function(subpath) {
      this._path.addSubpath(subpath);
    };

    Context.prototype.stroke = function() {
      // TODO: should probably take an optional path arg
      this._path.stroke();
    };

    return Context;

  })();

  GEN.Context = Context;
  
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

  //
  // adapted from d3's d2_rgb_hsl function
  // https://github.com/mbostock/d3/blob/master/src/core/rgb.js
  // Thanks to Mike Bostock - http://bost.ocks.org/mike/
  //
  function rgb_hsl(r, g, b) {
    var min = Math.min(r /= 255, g /= 255, b /= 255),
        max = Math.max(r, g, b),
        d = max - min,
        h,
        s,
        l = (max + min) / 2;
    if (d) {
      s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
      if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
      else if (g == max) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
    } else {
      s = h = 0;
    }
    return { h: h, s: s, l: l};
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
        this.a = val[3];
      } else if (typeof val === "string") {
        this.setFromHexString(val);
      } else if (!val) {
        this.r = Color.defaultRGB.r;
        this.g = Color.defaultRGB.g;
        this.b = Color.defaultRGB.b;
      }
      this.a = this.a || Color.defaultA;
      this.randomShadeVariance = 0.4;
    }

    Color.prototype.rgba = function () {
      return "rgba(" + [
        this.r,
        this.g,
        this.b,
        this.a
      ].join(",") + ")";
    };

    Color.prototype.setHsl = function() {
      var hsl = rgb_hsl(this.r, this.g, this.b);
      this.h = hsl.h;
      this.s = hsl.s;
      this.l = hsl.l;
    };

    Color.prototype.hsla = function(h,s,l,a) {
      return "hsla(" + [
        h || this.h,
        (s || this.s) * 100 + "%",
        (l || this.l) * 100 + "%",
        a || this.a
      ].join(",") + ")";
    };
 
    Color.prototype.setRandom = function () {
      this.setFromHexString((Math.floor(Math.random() * 16777215)).toString(16));
      this.a = this.a || 1;
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

    Color.prototype.randomVariationHsl = function (variance) {
      variance = variance || this.randomShadeVariance;
      if (!this.h || !this.s || !this.l) {
        this.setHsl();
      }
      if (this.l > 0.5) {
        //variance = Math.pow(variance, 2);
        variance = Math.sqrt((1.0 - this.l)) * variance;
      }
      var vOver2 = 0.5 * variance;
      var l = GEN.random(this.l - vOver2, this.l + vOver2);
      var a = GEN.random(0.999, 1);  // TODO: re-evaluate best val here
      return this.hsla(undefined,undefined,l,a);
    };

    //
    // helpers
    //
    Color.zeroPadToSix = function(s) {
      while (s.length < 6) s = "0" + s;
      return s;
    };

    //
    // default Color
    //

    Color.defaultRGB = {r: 0, g: 0, b: 0};
    Color.defaultA = 1;

    return Color;

  })();

  GEN.Color = Color;

})(GEN || (GEN = {}));


//
//  painterly/painterly.js
//
//  defines a GEN.Painterly submodule
//  and
//  the GEN.Painterly.Context
//  the GEN.Paintelry.Path
//

var GEN;

(function (GEN) {

  (function (Painterly) {

    //
    // GEN.Painterly.Path
    //

    var Path = (function (_super) {

      GEN.__extends(Path, _super);

      function Path(context2d, subpaths) {
        _super.call(this, context2d, subpaths);
      }

      return Path;

    })(GEN.Path || {});

    Painterly.Path = Path;

    //
    // GEN.Painterly.Context
    //

    var Context = (function (_super) {

      GEN.__extends(Context, _super);

      function Context(context2d, fiberDensity) {
        _super.call(this, context2d);
        this.fiberDensity = fiberDensity || 1;  // fibers per lineWidth pixel
      }

      return Context;

    })(GEN.Context || (GEN.Context = {}));

    Painterly.Context = Context;

  })(GEN.Painterly || (GEN.Painterly = {}));

  // var Painterly = GEN.Painterly;  // TODO: need this?
  
})(GEN || (GEN = {}));


//
//  painterly/bezier.js
//
//  defines class GEN.Painterly.Bezier.Fiber
//  defines class GEN.Painterly.Bezier.Subpath
//  and
//  extends GEN.Painterly.Context to have a bezierCurveTo prototype method
//  that exposes GEN.Painterly.Bezier.Subpath class' "to" prototype method
//  as a context method a la the Context2d API
//

var GEN;

(function (GEN) {

  (function (Painterly) {

    //
    // Bezier submodule
    //

    (function (Bezier) {

      //
      // Bezier.Fiber - extends GEN.Fiber
      //

      var Fiber = (function (_super) {

        GEN.__extends(Fiber, _super);

        //
        // params: [cp1x, cp1y, cp2x, cp2y, x, y]
        // see https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Bezier_and_quadratic_curves
        //
        function Fiber(context2d, params, env, genParams) {
          _super.call(this, context2d, params, env, genParams);
        }

        Fiber.prototype.draw = function() {
          this.context2dBeginPath();
          this.context2dSet(this.env);
          this.context2dMoveTo(this.startPosition.x, this.startPosition.y);
          this.context2d.bezierCurveTo.apply(this.context2d, this.params);
          this.context2dStroke();
        };

        return Fiber;

      })(GEN.Fiber || {});

      Bezier.Fiber = Fiber;


      //
      // Bezier.Subpath - extends GEN.Subpath
      //

      var Subpath = (function (_super) {

        GEN.__extends(Subpath, _super);

        //
        // params: [cp1x, cp1y, cp2x, cp2y, x, y]
        // see https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Bezier_and_quadratic_curves
        //
        function Subpath(context2d, params, env, genParams) {
          _super.call(this, context2d, params, env, genParams);
        }

        Subpath.prototype.to = function () {
          _super.prototype.to.call(this);
          var length = Math.sqrt( Math.pow(this.params[4] - this.startPosition.x, 2) + Math.pow(this.params[5] - this.startPosition.y, 2) );
          var fiberCount = Math.round(this.fiberDensity * this.lineWidth);  // 32
          var minLW = 0.1 * this.lineWidth;
          var maxLW = 0.3 * this.lineWidth;
          var pVar = 0.0015 * length * this.lineWidth;
          var cpVar = 0.0015 * length * this.lineWidth;
          var fiber, fiberParams, env, startPosition;
          //
          // TODO: consider object pooling
          //
          for (var i=0; i<fiberCount; i++) {
            //
            fiberParams = [
              Math.floor(this.params[0] + GEN.random() * cpVar - cpVar / 2),
              Math.floor(this.params[1] + GEN.random() * cpVar - cpVar / 2),
              Math.floor(this.params[2] + GEN.random() * cpVar - cpVar / 2),
              Math.floor(this.params[3] + GEN.random() * cpVar - cpVar / 2),
              Math.floor(this.params[4] + GEN.random() * pVar - pVar / 2),
              Math.floor(this.params[5] + GEN.random() * pVar - pVar / 2)
            ];
            //
            env = {
              lineWidth: Math.floor((maxLW - minLW) * GEN.random() + minLW),
              strokeStyle: this.color.randomVariationHsl()
            };
            startPosition = {
              x: Math.floor(this.startPosition.x + pVar * GEN.random() - pVar/2),
              y: Math.floor(this.startPosition.y + pVar * GEN.random() - pVar/2)
            };
            // note: following line will need full qualification if Fiber class def is moved elsewhere
            fiber = new Fiber(
              this.context2d,
              fiberParams,
              env,
              { startPosition: startPosition }
            );
            this.addFiber(fiber);
          }

        };

        return Subpath;

      })(GEN.Subpath || {});

      Bezier.Subpath = Subpath;

    })(Painterly.Bezier || (Painterly.Bezier = {}));


    //
    // bezierCurveTo extension to GEN.Painterly.Context.prototype
    //

    (function (Context) {

      var bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {

        var subpath = new Painterly.Bezier.Subpath(
          this.context2d,
          [cp1x, cp1y, cp2x, cp2y, x, y],
          {
            lineWidth: this.lineWidth,
            lineCap: this.lineCap
          },
          {
            color: this.color || new GEN.Color(this.strokeStyle),
            startPosition: this.currentPosition()
          }
        );
        subpath.to();
        this.addToPath(subpath);

      };

      Context.prototype.bezierCurveTo = bezierCurveTo;

    })(Painterly.Context || (Painterly.Context = { prototype: {} })); // TODO: not sure about this pattern

  })(GEN.Painterly || (GEN.Painterly = {}));

})(GEN || (GEN = {}));

//
//  painterly/arc.js
//
//  defines class GEN.Painterly.Arc.Fiber
//  defines class GEN.Painterly.Arc.Subpath
//  and
//  extends GEN.Painterly.Context to have a arc prototype method
//  that exposes GEN.Painterly.Arc.Subpath class' "to" prototype method
//  as a context method a la the Context2d API
//

var GEN;

(function (GEN) {

  (function (Painterly) {

    //
    // Arc submodule
    //

    (function (Arc) {

      //
      // Arc.Fiber - extends GEN.Fiber
      //

      var Fiber = (function (_super) {

        GEN.__extends(Fiber, _super);

        //
        // params: [x, y, radius, startAngle, endAngle, anticlockwise]
        // https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Arcs
        //
        function Fiber(context2d, params, env) {
          _super.call(this, context2d, params, env);
        }

        Fiber.prototype.draw = function() {
          this.context2dBeginPath();
          this.context2dSet(this.env);
          this.context2d.arc.apply(this.context2d, this.params);
          this.context2dStroke();
        };

        return Fiber;

      })(GEN.Fiber || {});

      Arc.Fiber = Fiber;


      //
      // Arc.Subpath - extends GEN.Subpath
      //

      var Subpath = (function (_super) {

        GEN.__extends(Subpath, _super);

        //
        // params: [x, y, radius, startAngle, endAngle, anticlockwise]
        // https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Arcs
        //
        function Subpath(context2d, params, env, genParams) {
          _super.call(this, context2d, params, env, genParams);
        }

        Subpath.prototype.to = function () {
          _super.prototype.to.call(this);
          var fiberCount = Math.round(this.fiberDensity * this.lineWidth);  // 24
          var minLW = 0.125 * this.lineWidth;
          var maxLW = 0.2 * this.lineWidth;
          var rVar = 0.0015 * this.lineWidth;
          var cpVar = 0.0015 * length * this.lineWidth;
          //
          // TODO: consider partial arc fibers
          //
          /*
          var arcLength = this.params[4] - this.params[3];
          var bisectAngle = 0.5 * arcLength + this.params[3];
          var anglePointVar = 0 * arcLength;
          */
          var lineWidth, lwDelta, radVar, minRad, maxRad, radius, mpDeltaMin, mpDeltaMax, fiberLength, startAngle, endAngle, fiber, fiberParams, env;
          //
          // TODO: consider object pooling
          //
          for (var i=0; i<fiberCount; i++) {
            //
            lineWidth = Math.floor( Math.max(1, GEN.random(minLW, maxLW)));
            lwDelta = this.lineWidth - lineWidth;
            radVar = lwDelta / 2;
            minRad = this.params[2] - radVar;
            maxRad = this.params[2] + radVar;
            radius = Math.floor ( GEN.random(minRad, maxRad) );
            mpDeltaMax = 0.125 * (this.params[2] - radius + lwDelta);
            mpDeltaMin = 0 - mpDeltaMax;
            //
            // TODO: Consider partial arc fibers
            //
            /*
            fiberLength = arcLength * GEN.random();
            if (this.params[5]) {
              startAngle = this.params[3];
              endAngle = this.params[4];
            } else {        
              startAngle = Math.max(this.params[3] + GEN.random(0-anglePointVar, anglePointVar), bisectAngle - fiberLength);
              endAngle = Math.min(this.params[4] + GEN.random(0-anglePointVar, anglePointVar), bisectAngle + fiberLength);
            }
            */
            fiberParams = [
              this.params[0] + GEN.random(mpDeltaMin, mpDeltaMax),
              this.params[1] + GEN.random(mpDeltaMin, mpDeltaMax),
              GEN.random(minRad, maxRad),
              this.params[3],
              this.params[4],
              this.params[5]
            ];
            //
            env = {
              lineWidth: Math.floor((maxLW - minLW) * GEN.random() + minLW),
              strokeStyle: this.color.randomVariationHsl()
            };
            // note: following line will need full qualification if Fiber class def is moved elsewhere
            fiber = new Fiber(this.context2d, fiberParams, env);
            this.addFiber(fiber);
          }

        };

        return Subpath;

      })(GEN.Subpath || {});

      Arc.Subpath = Subpath;

    })(Painterly.Arc || (Painterly.Arc = {}));


    //
    // arc extension to GEN.Painterly.Context.prototype
    //

    (function (Context) {

      var arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {

        var subpath = new Painterly.Arc.Subpath(
          this.context2d,
          [x, y, radius, startAngle, endAngle, anticlockwise],
          {
            lineWidth: this.lineWidth,
            lineCap: this.lineCap
          },
          {
            color: this.color || new GEN.Color(this.strokeStyle)
          }
        );
        subpath.to();
        this.addToPath(subpath);

      };

      Context.prototype.arc = arc;

    })(Painterly.Context || (Painterly.Context = { prototype: {} })); // TODO: not sure about this pattern

  })(GEN.Painterly || (GEN.Painterly = {}));

})(GEN || (GEN = {}));

//
//  painterly/line.js
//
//  defines class GEN.Painterly.Line.Fiber
//  defines class GEN.Painterly.Line.Subpath
//  and
//  extends GEN.Painterly.Context to have a lineTo prototype method
//  that exposes GEN.Painterly.Line.Subpath class' "to" prototype method
//  as a context method a la the Context2d API
//

var GEN;

(function (GEN) {

  (function (Painterly) {

    //
    // Line submodule
    //

    (function (Line) {

      //
      // Line.Fiber - extends GEN.Fiber
      //

      var Fiber = (function (_super) {

        GEN.__extends(Fiber, _super);

        //
        // params: [x, y]
        // see https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Lines
        //
        function Fiber(context2d, params, env, genParams) {
          _super.call(this, context2d, params, env, genParams);
        }

        Fiber.prototype.draw = function() {
          this.context2dBeginPath();
          this.context2dSet(this.env);
          this.context2dMoveTo(this.startPosition.x, this.startPosition.y);
          this.context2d.lineTo.apply(this.context2d, this.params);
          this.context2dStroke();
        };

        return Fiber;

      })(GEN.Fiber || {});

      Line.Fiber = Fiber;


      //
      // Line.Subpath - extends GEN.Subpath
      //

      var Subpath = (function (_super) {

        GEN.__extends(Subpath, _super);

        //
        // params: [x, y]
        // see https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Lines
        //
        function Subpath(context2d, params, env, genParams) {
          _super.call(this, context2d, params, env, genParams);
        }

        Subpath.prototype.to = function () {
          _super.prototype.to.call(this);
          var length = Math.sqrt( Math.pow(this.params[0] - this.startPosition.x, 2) + Math.pow(this.params[1] - this.startPosition.y, 2) );
          var fiberCount = Math.round(this.fiberDensity * this.lineWidth);
          var minLW = 0.1 * this.lineWidth;
          var maxLW = 0.3 * this.lineWidth;
//          var pVar = 0.0015 * length * this.lineWidth;
          var pVar = 0.55 * this.lineWidth;
          var fiber, fiberParams, env, startPosition;
          //
          // TODO: consider object pooling
          //
          for (var i=0; i<fiberCount; i++) {
            //
            fiberParams = [
              Math.floor(this.params[0] + GEN.random() * pVar - pVar / 2),
              Math.floor(this.params[1] + GEN.random() * pVar - pVar / 2)
            ];
            //
            env = {
              lineWidth: Math.floor((maxLW - minLW) * GEN.random() + minLW),
              strokeStyle: this.color.randomVariationHsl()
            };
            startPosition = {
              x: Math.floor(this.startPosition.x + pVar * GEN.random() - pVar/2),
              y: Math.floor(this.startPosition.y + pVar * GEN.random() - pVar/2)
            };
            // note: following line will need full qualification if Fiber class def is moved elsewhere
            fiber = new Fiber(
              this.context2d,
              fiberParams,
              env,
              { startPosition: startPosition }
            );
            this.addFiber(fiber);
          }

        };

        return Subpath;

      })(GEN.Subpath || {});

      Line.Subpath = Subpath;

    })(Painterly.Line || (Painterly.Line = {}));


    //
    // lineTo extension to GEN.Painterly.Context.prototype
    //

    (function (Context) {

      var lineTo = function(x, y) {

        var subpath = new Painterly.Line.Subpath(
          this.context2d,
          [x, y],
          {
            lineWidth: this.lineWidth,
            lineCap: this.lineCap
          },
          {
            color: this.color || new GEN.Color(this.strokeStyle),
            startPosition: this.currentPosition(),
            fiberDensity: this.fiberDensity
          }
        );
        subpath.to();
        this.addToPath(subpath);

      };

      Context.prototype.lineTo = lineTo;

    })(Painterly.Context || (Painterly.Context = { prototype: {} })); // TODO: not sure about this pattern

  })(GEN.Painterly || (GEN.Painterly = {}));

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
        context.strokeStyle = this.color.randomVariationHsl(0.4);
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
        context.strokeStyle = rootColor.randomVariationHsl(0.4);
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

