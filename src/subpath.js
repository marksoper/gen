

//
//  subpath.js - defines a class Gen.Subpath
//  which is a collection of one or more Gen.Fiber objects
//  many Gen.Subpath objects (lines, curves, arcs, etc.) are combined to produce a Gen.Context.Path object
//

var GEN;

(function (GEN) {

  var Subpath = (function () {

    //
    // needs to be called with all args for now
    // TODO: figure out a better multi-ariety parameterization
    //
    function Subpath(context2d, params, env, color, startPosition) {
      this.context2d = context2d;
      this.params = params || [];
      this.env = env || {};
      this.color = color || new GEN.Color(env.strokeStyle);
      this.startPosition = startPosition || {x: 0, y: 0};
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

    Subpath.defaultLineWidth = 10;
    Subpath.defaultLineCap = "round";

    return Subpath;

  })();



  GEN.Subpath = Subpath;
  
})(GEN || (GEN = {}));

