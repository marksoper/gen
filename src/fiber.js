
    Fiber.Fiber = (function () {

      function Fiber() {
      }

      return Fiber;

    })();

    Fiber.prototype.stroke = function() {
      
    };




//
//  fiber.js - defines a class Fiber
//  which is the atomic unit of drawing
//  many fibers are combined to produce lines, curves, arcs, etc. in the wrapped Fiber
//  a fiber involves a single-subpath path on the native Fiber
//

var GEN;

(function (GEN) {

  var Fiber = (function (context) {

    function Fiber(context) {
      this.context = context;
    }



    

    Fiber.prototype.FiberSet = function(props) {
      for (var propName in props) {
        this.Fiber[propName] = props[propName];
      }
    };

    Fiber.prototype.FiberGet = function(propName) {
      return this.Fiber[propName];
    };

    Fiber.prototype.FiberCall = function() {
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
      this.Fiber[method].apply(this.Fiber, args);
      this.currentPosition(pos);
    };

    //
    // currentPosition gets and sets state about the current
    // position of the "wrapped" Fiber
    //

    Fiber.prototype.currentPosition = function(coords) {
      if (coords) {
        this._currentPosition = coords;
      } else {
        return this._currentPosition || { x: 0, y: 0};
      }
    };

    //
    // Fiber implements many of the native Fiber methods
    //

    Fiber.prototype.moveTo = function(x,y) {
      this.Fiber.moveTo(x,y);
      this.currentPosition({x: x, y: y});
    };

    Fiber.prototype.beginPath = function() {
      this._path = [];
    };

    Fiber.prototype.stroke = function() {
      this._path.forEach(function(subpath) {
        subpath.forEach(function(fiber) {
          fiber.stroke();
        });
      });
    };

    return Fiber;

  })();

  GEN.Fiber = Fiber;
  
})(GEN || (GEN = {}));