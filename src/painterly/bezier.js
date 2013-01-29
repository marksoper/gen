
//
//  painterly/bezier.js
//
//  extends the Painterly class to have
//  bezierCurveTo prototype method
//

var GEN;

(function (GEN) {

  var bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
    var oPos = this.currentPosition();
    var oLW = this.lineWidth || this.contextGet("lineWidth");
    var oSS = this.strokeStyle || this.contextGet("strokeStyle");
    var rootColor = new GEN.Color(oSS);
    var length = Math.sqrt( Math.pow(x - oPos.x, 2) + Math.pow(y - oPos.y, 2) );
    var reps = 5;
    var minLW = 0.1 * oLW;
    var maxLW = 0.4 * oLW;
    var pVar = 0.1 * length;
    var cpVar = 0.1 * length;
    var params = {};
    for (var i=0; i<reps; i++) {
      this.contextCall(
        "moveTo",
        Math.floor(oPos.x + pVar * GEN.random() - pVar/2),
        Math.floor(oPos.y + pVar * GEN.random() - pVar/2)
      );
      this.contextSet({
        "lineWidth": Math.floor((maxLW - minLW) * GEN.random() + minLW),
        "strokeStyle": rootColor.getRandomShade(0.8).rgba()
      });
      params.cp1x = Math.floor(cp1x + GEN.random() * cpVar - cpVar / 2);
      params.cp1y = Math.floor(cp1y + GEN.random() * cpVar - cpVar / 2);
      params.cp2x = Math.floor(cp2x + GEN.random() * cpVar - cpVar / 2);
      params.cp2y = Math.floor(cp2y + GEN.random() * cpVar - cpVar / 2);
      params.x = Math.floor(x + GEN.random() * pVar - pVar / 2);
      params.y = Math.floor(y + GEN.random() * pVar - pVar / 2);
      this.contextCall(
        "bezierCurveTo",
        params.cp1x,
        params.cp1y,
        params.cp2x,
        params.cp2y,
        params.x,
        params.y
      );
    }
    this.contextSet({
      lineWidth: oLW,
      strokeStyle: oSS
    });
    this.contextCall(
      "moveTo",
      x,
      y
    );
  };

  GEN.Painterly.prototype.bezierCurveTo = bezierCurveTo;

})(GEN || (GEN = {}));
