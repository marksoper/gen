
//
//  painterly.js - defines a "painterly" context
//  that wraps the normal canvas "2d" context
//

var GEN;

(function (GEN) {

  var Painterly = (function (context) {

    function Painterly(context) {
      this.context = context;
      this._currentPosition = {x: 0, y: 0};
      this._path = [];
    }

    Painterly.Fiber = (function () {

      function Fiber() {
      }

      return Fiber;

    })();

    Fiber.prototype.stroke = function() {
      
    };

    Painterly.prototype.contextSet = function(props) {
      for (var propName in props) {
        this.context[propName] = props[propName];
      }
    };

    Painterly.prototype.contextGet = function(propName) {
      return this.context[propName];
    };

    Painterly.prototype.currentPosition = function(coords) {
      if (coords) {
        this._currentPosition = coords;
      } else {
        return this._currentPosition || { x: 0, y: 0};
      }
    };

    Painterly.prototype.contextCall = function() {
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

    Painterly.prototype.moveTo = function(x,y) {
      this.context.moveTo(x,y);
      this.currentPosition({x: x, y: y});
    };

    Painterly.prototype.beginPath = function() {
      this._path = [];
    };

    Painterly.prototype.stroke = function() {
      this._path.forEach(function(subpath) {
        subpath.forEach(function(fiber) {
          fiber.stroke();
        });
      });
    };

    return Painterly;

  })();

  GEN.Painterly = Painterly;
  
})(GEN || (GEN = {}));
