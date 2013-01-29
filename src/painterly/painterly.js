
//
//  painterly.js - defines a "painterly" context
//  that wraps the normal canvas "2d" context
//

var GEN;

(function (GEN) {

  var Painterly = (function (context) {

    function Painterly(context) {
      this.context = context;
    }

    Painterly.prototype.set = function(props) {
      for (var propName in props) {
        this.context[propName] = props[prop];
      }
    };

    Painterly.prototype.get = function(propName) {
      return this.context[propName];
    };

    Painterly.prototype.currentPosition = function(coords) {
      if (coords) {
        this._currentPosition = coords;
      } else {
        return this._currentPosition || { x: 0, y: 0};
      }
    };

    Painterly.prototype.execute = function() {
      var args = Array.prototype.slice(arguments);
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

    return Painterly;

  })();

  GEN.Painterly = Painterly;
  
})(GEN || (GEN = {}));
