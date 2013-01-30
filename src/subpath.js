

//
//  subpath.js - defines a class Gen.Subpath
//  which is a collection of one or more Gen.Fiber objects
//  many Gen.Subpath objects (lines, curves, arcs, etc.) are combined to produce a Gen.Context.Path object
//

var GEN;

(function (GEN) {

  var Subpath = (function () {

    function Subpath(context2d) {
      this.context2d = context2d;
      this.fibers = [];
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

