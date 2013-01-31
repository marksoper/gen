
//
//  color.js - Color class
//

var GEN;

(function (GEN) {

  function bound(num) {
    return Math.min(255, Math.max(0, Math.floor(num)));
  }

  var Color = (function () {

    //
    // TODO: Constructor input param should support all supported formats for context.fillStyle
    //
    function Color(val) {
      if(val instanceof Array) {
        this.r = bound(val[0]);
        this.g = bound(val[1]);
        this.b = bound(val[2]);
        this.a = val[3];
      } else if (typeof val === "string") {
        this.setFromHexString(val);
      } else if (!val) {
        this.r = Color.defaultRGB.r;
        this.g = Color.defaultRGB.g;
        this.b = Color.defaultRGB.b;
      }
      this.a = this.a || Color.defaultA;
    }

    Color.prototype.rgba = function () {
      return "rgba(" + [
        this.r,
        this.g,
        this.b,
        this.a
      ].join(",") + ")";
    };

    Color.prototype.setRandom = function () {
      this.setFromHexString((Math.floor(Math.random() * 16777215)).toString(16));
      this.a = this.a || 1;
    };

    Color.prototype.setFromHexString = function (hexStr) {
      if(hexStr.charAt(0) === "#") {
        hexStr = hexStr.substr(1);
      }
      this.r = parseInt(hexStr.substr(0, 2), 16);
      this.g = parseInt(hexStr.substr(2, 2), 16);
      this.b = parseInt(hexStr.substr(4, 2), 16);
      return this;
    };

    Color.prototype.toHexString = function () {
      return '#' + (this.b | (this.g << 8) | (this.r << 16)).toString(16);
    };

    //
    // TODO: Refactor this to convert back-forth to HSL
    // Doesn't seem that RGB will work for this, results haven't been all that good
    // especially for darker colors
    //
    Color.prototype.getRandomShade = function (shadeRange) {
      shadeRange = shadeRange || 0.5;
      var seed = 2 * Math.random() - 1;
      var cNorm;
      var delta;
      var cNew;
      var rgb = [];
      var self = this;
      [
        "r",
        "g",
        "b"
      ].forEach(function (c) {
        cNorm = self[c] / 255;
        delta = seed * shadeRange * Math.min(cNorm, 1 - cNorm);
        cNew = bound(255 * (cNorm + delta));
        rgb.push(cNew);
      });
      rgb[3] = 0.2*Math.random() + 0.8;
      return new Color(rgb);
    };

    //
    // default Color
    //

    Color.defaultRGB = {r: 0, g: 0, b: 0};
    Color.defaultA = 1;

    return Color;

  })();

  GEN.Color = Color;

})(GEN || (GEN = {}));

