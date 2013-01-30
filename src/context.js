
//
//  context.js - defines a class Context
//  that wraps the normal canvas "2d" context
//

var GEN;

(function (GEN) {

  var Context = (function (context) {

    function Context(context) {
      this.context = context;
      this._currentPosition = {x: 0, y: 0};
      this._path = [];
    }

    //
    // "context" methods manage data and call native methods on
    // this.context, the original passed-in "2d" context
    //

    Context.prototype.contextSet = function(props) {
      for (var propName in props) {
        this.context[propName] = props[propName];
      }
    };

    Context.prototype.contextGet = function(propName) {
      return this.context[propName];
    };

    Context.prototype.contextCall = function() {
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
    // Context implements many of the native context methods
    //

    Context.prototype.moveTo = function(x,y) {
      this.context.moveTo(x,y);
      this.currentPosition({x: x, y: y});
    };

    Context.prototype.beginPath = function() {
      this._path = [];
    };

    Context.prototype.stroke = function() {
      this._path.forEach(function(subpath) {
        subpath.forEach(function(fiber) {
          fiber.stroke();
        });
      });
    };

    return Context;

  })();

  GEN.Context = Context;
  
})(GEN || (GEN = {}));
