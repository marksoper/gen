

//
//  path.js - defines a class Gen.Path
//  which is a collection of Gen.Subpath objects
//  Gen.Path has methods analogous to the Context2d path operations
//  e.g. beginPath, stroke, etc.
//  

var GEN;

(function (GEN) {

  var Path = (function () {

    function Path(context2d, subpaths) {
      this.context2d = context2d;
      this.subpaths = subpaths || [];
    }

    Path.prototype.stroke = function() {
      this.subpaths.forEach(function(subpath) {
        subpath.draw();
      });
    };

    return Path;

  })();

  GEN.Path = Path;
  
})(GEN || (GEN = {}));

