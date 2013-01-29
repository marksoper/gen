
//
//  painterly/bezier.js
// 
//  extends the Painterly class to have
//  bezierCurveTo prototype method
//

var GEN;

(function (GEN) {

  var bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
    var oSP = this.currentPosition();
    var oLW = this.get("lineWidth");
    var length = Math.sqrt( Math.pow(x - oSP.x, 2) + Math.pow(y - oSP.y, 2) );
    var reps = 30;
    var minLW = 0.1 * oLW;
    var maxLW = 0.4 * oLW;
    var pVar = 0.1 * length;
    var cpVar = 0.1 * length;
    var params = {};
    for (var i=0; i<reps; i++) {
      this.execute(
        "moveTo",
        oSP.x + pVar * GEN.random() - pVar/2,
        oSP.y + pVar * GEN.random() - pVar/2
      );
      this.set({
        "lineWidth": (maxLW - minLW) * GEN.random() + minLW
      });
      params.cp1x = cp1x + GEN.random() * cpVariance - cpVariance / 2;
      params.cp1y = cp1y + GEN.random() * cpVariance - cpVariance / 2;
      params.cp2x = cp2x + GEN.random() * cpVariance - cpVariance / 2;
      params.cp2y = cp2y + GEN.random() * cpVariance - cpVariance / 2;
      params.x = cp1x + GEN.random() * cpVariance - cpVariance / 2;
      params.y = cp1y + GEN.random() * cpVariance - cpVariance / 2;
      this.execute(
        "bezierCurveTo",
        params.cp1x,
        params.cp1y,
        params.cp2x,
        params.cp2y,
        params.x,
        params.y
      );
    }
    this.set({
      lineWidth: oLW
    });
    this.execute(
      "moveTo",
      x,
      y
    );
  };

  GEN.Painterly.prototype.bezierCurveTo = bezierCurveTo;

})(GEN || (GEN = {}));
