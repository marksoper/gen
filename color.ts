


module color {

  export class Color {

    r: number;
    g: number;
    b: number;
    a: number;

    constructor(val) {
      if (val instanceof Array) {
        this.r = val[0];
        this.g = val[1];
        this.b = val[2];
        this.a = val[3];
      } else if (typeof val === "string") {
        if (val.charAt(0) === "#") {
          val = val.substr(1);
        }
        val = parseInt(val, 16);
        this.setHex(val);
      }
      this.a = this.a || 255;
    }

    rgba() {
      return "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")";
    }

    setRandom() {
      this.setHex(Math.floor(Math.random()*16777215));
      this.a = 255;
    }

    setHex(hex: number) {
      hex = Math.floor( hex );
      this.r = ( hex >> 16 & 255 ) / 255;
      this.g = ( hex >> 8 & 255 ) / 255;
      this.b = ( hex & 255 ) / 255;
      return this;
    }

    toHexString() {
      return '#' + (this.b | (this.g << 8) | (this.r << 16)).toString(16);
    }

    getRandomShade(coeff, offset) {
      var seed = Math.random();
      var rgb = [];
      ["r", "g", "b"].forEach(function(c) {
        rgb.push(Math.floor(Math.max(0, Math.min(255, ((255 - this[c]) / 255) + coeff*seed + this[c] - offset))));
      });
      return new Color(rgb);
    }

  }

}
