

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

