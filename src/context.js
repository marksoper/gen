
//
//  context.js - defines a class Gen.Context
//  that wraps Context2d - the normal canvas "2d" context ()
//
//
//  TODO: more explanation
//

var GEN;

(function (GEN) {

  var Context = (function () {

    function Context(context2d) {
      this.context2d = context2d;
      this._currentPosition = {x: 0, y: 0};
      this._path = new GEN.Path(context2d);
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
    //  GEN.Context versions of native Context2d operations
    //

    Context.prototype.moveTo = function(x,y) {
      this.context2d.moveTo(x,y);
      this.currentPosition({x: x, y: y});
    };

    Context.prototype.beginPath = function() {
      this._path.begin();
    };

    Context.prototype.addToPath = function(subpath) {
      this._path.addSubpath(subpath);
    };

    Context.prototype.stroke = function() {
      // TODO: should probably take an optional path arg
      this._path.stroke();
    };

    return Context;

  })();

  GEN.Context = Context;
  
})(GEN || (GEN = {}));
