var gen;
(function (gen) {
    function bound(num) {
        return Math.min(255, Math.max(0, Math.floor(num)));
    }
    var Color = (function () {
        function Color(val) {
            if(val instanceof Array) {
                this.r = bound(val[0]);
                this.g = bound(val[1]);
                this.b = bound(val[2]);
                this.a = bound(val[3]);
            } else {
                if(typeof val === "string") {
                    this.setFromHexString(val);
                }
            }
            this.a = this.a || 255;
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
            this.a = 255;
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
        Color.prototype.getRandomShade = function (coeff, offset) {
            var seed = Math.random();
            var rgb = [];
            [
                "r", 
                "g", 
                "b"
            ].forEach(function (c) {
                rgb.push(Math.floor(Math.max(0, Math.min(255, ((255 - this[c]) / 255) + coeff * seed + this[c] - offset))));
            });
            return new Color(rgb);
        };
        return Color;
    })();
    gen.Color = Color;    
})(gen || (gen = {}));
