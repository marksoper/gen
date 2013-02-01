
//
//  color.js - Color class
//

var GEN;

(function (GEN) {

  function bound(num) {
    return Math.min(255, Math.max(0, Math.floor(num)));
  }

  //
  // adapted from d3's d2_rgb_hsl function
  // https://github.com/mbostock/d3/blob/master/src/core/rgb.js
  // Thanks to Mike Bostock - http://bost.ocks.org/mike/
  //
  function rgb_hsl(r, g, b) {
    var min = Math.min(r /= 255, g /= 255, b /= 255),
        max = Math.max(r, g, b),
        d = max - min,
        h,
        s,
        l = (max + min) / 2;
    if (d) {
      s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
      if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
      else if (g == max) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
    } else {
      s = h = 0;
    }
    return { h: h, s: s, l: l};
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
      this.randomShadeVariance = 0.4;
    }

    Color.prototype.rgba = function () {
      return "rgba(" + [
        this.r,
        this.g,
        this.b,
        this.a
      ].join(",") + ")";
    };

    Color.prototype.setHsl = function() {
      var hsl = rgb_hsl(this.r, this.g, this.b);
      this.h = hsl.h;
      this.s = hsl.s;
      this.l = hsl.l;
    };

    Color.prototype.hsla = function(h,s,l,a) {
      return "hsla(" + [
        h || this.h,
        (s || this.s) * 100 + "%",
        (l || this.l) * 100 + "%",
        a || this.a
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

    Color.prototype.randomVariationHsl = function (variance) {
      variance = variance || this.randomShadeVariance;
      if (!this.h || !this.s || !this.l) {
        this.setHsl();
      }
      if (this.l > 0.5) {
        //variance = Math.pow(variance, 2);
        variance = Math.sqrt((1.0 - this.l)) * variance;
      }
      var vOver2 = 0.5 * variance;
      var l = GEN.random(this.l - vOver2, this.l + vOver2);
      var a = GEN.random(0.999, 1);  // TODO: re-evaluate best val here
      return this.hsla(undefined,undefined,l,a);
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

