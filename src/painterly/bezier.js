
//
//  painterly/bezier.js
// 
//  extends the Painterly class to have
//  bezierCurveTo prototype method
//

var GEN;

(function (GEN) {

  var bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {

    var reps = 30;
    var params = {};
    for (var i=0; i<reps; i++) {
      this.context.bezierCurveTo()
    }


  };

  GEN.Painterly.prototype.bezierCurveTo = bezierCurveTo;

})(GEN || (GEN = {}));
