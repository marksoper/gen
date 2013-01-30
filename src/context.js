
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

    return Context;

  })();

  GEN.Context = Context;
  
})(GEN || (GEN = {}));
