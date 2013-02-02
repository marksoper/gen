

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

