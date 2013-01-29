
//
//  random.js - random number generator
//

var GEN;

(function (GEN) {

  var random = function(min, max) {
    if (min && max) {
      return (max - min) * Math.random() + min;
    }
    return Math.random();
  };

  GEN.random = random;

})(GEN || (GEN = {}));

