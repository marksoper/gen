
//
//  extends.js - defines a helper function GEN.__extends
//  that gets used for class inheritance
//

var GEN;

(function (GEN) {

  var __extends = function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
  };

  GEN.__extends = __extends;
  
})(GEN || (GEN = {}));

