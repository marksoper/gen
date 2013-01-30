

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

