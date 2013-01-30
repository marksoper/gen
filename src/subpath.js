

//
//  subpath.js - defines a class Gen.Subpath
//  which is a collection of one or more Gen.Fiber objects
//  many Gen.Subpath objects (lines, curves, arcs, etc.) are combined to produce a Gen.Context.Path object
//

var GEN;

(function (GEN) {

  var Subpath = (function () {

    function Subpath(context2d, params, env) {
      this.context2d = context2d;
      this.params = params || [];
      env = env || {};
      this.color = env.color || new GEN.Color(env.strokeStyle);
      this.startPosition = env.startPosition || {x: 0, y: 0};
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

