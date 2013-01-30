
//
//  painterly/painterly.js - defines a GEN.Painterly submodule
//  and
//  the GEN.Painterly.Context
//  the GEN.Paintelry.Path
//

var GEN;

(function (GEN) {

  (function (Painterly) {

    //
    // GEN.Painterly.Path
    //

    var Path = (function () {

      function Path(context2d, subpaths) {
        this.context2d2d = context2d;
        this.subpaths = subpaths || [];
      }

      Path.prototype.stroke = function() {
        this.subpaths.forEach(function(subpath) {
          subpath.forEach(function(fiber) {
            fiber.stroke();
          });
        });
      };

      return Path;

    })();

    Painterly.Path = Path;

    //
    // GEN.Painterly.Context
    //

    var Context = (function (context2d) {

      function Context(context2d) {
        this.context2d2d = context2d;
        this._currentPosition = {x: 0, y: 0};
        this._path = new GEN.Painterly.Path(context2d);
      }

      Context.prototype.currentPosition = function(coords) {
        if (coords) {
          this._currentPosition = coords;
        } else {
          return this._currentPosition || { x: 0, y: 0};
        }
      };

      Context.prototype.moveTo = function(x,y) {
        this.context2d.moveTo(x,y);
        this.currentPosition({x: x, y: y});
      };

      Context.prototype.beginPath = function() {
        this._path = [];
      };

      Context.prototype.stroke = function() {
        this._path.stroke();
      };

      return Context;

    })();

    Painterly.Context = Context;

  })(GEN.Painterly || (GEN.Painterly = {}));

  var Painterly = GEN.Painterly;  // TODO: need this?
  
})(GEN || (GEN = {}));

