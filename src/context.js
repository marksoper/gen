
//
//  context.js - defines a class Gen.Context
//  that wraps Context2d - the normal canvas "2d" context ()
//
//
//  TODO: more explanation
//

var GEN;

(function (GEN) {

  var Context = (function (context2d) {

    function Context(context2d) {
      this.context2d = context2d;
      this._currentPosition = {x: 0, y: 0};
      this._path = [];
    }

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
