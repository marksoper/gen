
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

    return Painterly;

  })();

  GEN.Painterly = Painterly;
  
})(GEN || (GEN = {}));
