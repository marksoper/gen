
//
//  painterly/painterly.js
//
//  defines a GEN.Painterly submodule
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

    var Path = (function (_super) {

      GEN.__extends(Path, _super);

      function Path(context2d, subpaths) {
        _super.call(this, context2d, subpaths);
      }

      return Path;

    })(GEN.Path || {});

    Painterly.Path = Path;

    //
    // GEN.Painterly.Context
    //

    var Context = (function (_super) {

      GEN.__extends(Context, _super);

      function Context(context2d, fiberDensity) {
        _super.call(this, context2d);
        this.fiberDensity = fiberDensity || 1;  // fibers per lineWidth pixel
      }

      return Context;

    })(GEN.Context || (GEN.Context = {}));

    Painterly.Context = Context;

  })(GEN.Painterly || (GEN.Painterly = {}));

  // var Painterly = GEN.Painterly;  // TODO: need this?
  
})(GEN || (GEN = {}));

