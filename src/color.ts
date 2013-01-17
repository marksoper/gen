


module GEN {

  function bound(num: number) {
    return Math.min(255, Math.max(0, Math.floor(num))); 
  }

  export class Color {

    r: number;
    g: number;
    b: number;
    a: number;

    constructor(val) {
      if (val instanceof Array) {
        this.r = bound(val[0]);
        this.g = bound(val[1]);
        this.b = bound(val[2]);
        this.a = bound(val[3]);
      } else if (typeof val === "string") {
        this.setFromHexString(val);
      }
      this.a = this.a || 255;
    }

    rgba() {
      return "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")";
    }

    setRandom() {
      this.setFromHexString((Math.floor(Math.random()*16777215)).toString(16));
      this.a = 255;
    }

    setFromHexString(hexStr: string) {
      if (hexStr.charAt(0) === "#") {
        hexStr = hexStr.substr(1);
      }
      this.r = parseInt(hexStr.substr(0,2), 16);
      this.g = parseInt(hexStr.substr(2,2), 16);
      this.b = parseInt(hexStr.substr(4,2), 16);
      return this;
    }

    toHexString() {
      return '#' + (this.b | (this.g << 8) | (this.r << 16)).toString(16);
    }

    //
    // TODO: look into color theory and HSL / HSV for better shading
    //
    getRandomShade(rangeCoeff) {
      var seed = 2 * Math.random() - 1;
      var cNorm;
      var delta;
      var cNew;
      var rgb = [];
      var self = this;
      ["r", "g", "b"].forEach(function(c) {
        cNorm = self[c] / 255;
        if (seed >= 0) {
          delta = (1 - cNorm) * seed * rangeCoeff;
        } else {
          delta = cNorm * seed * rangeCoeff;
        }
        cNew = bound( 255 * (cNorm + delta) );
        rgb.push(cNew);
      });
      return new Color(rgb);
    }

  }

}
