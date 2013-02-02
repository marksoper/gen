

//
//  point.js - defines a class Gen.Point
//
//  a 2d point with x and y coords
//

var GEN;

(function (GEN) {

  var Point = (function () {

    function Point(x,y,grid) {
      if (grid) {
        this.grid = grid;
      }
      this._x = x;
      this._y = y;
    }

    Point.prototype.x = function() {
      if (this.grid) {
        return Math.floor(this.grid.origin.x + this._x * this.grid.width);
      } else {
        return _x;
      }
    };

    Point.prototype.y = function() {
      if (this.grid) {
        return Math.floor(this.grid.origin.y + this._y * this.grid.height);
      } else {
        return _y;
      }
    };

    Point.prototype.coords = function() {
      return {
        x: this.x(),
        y: this.y()
      };
    };

    return Point;

  })();

  GEN.Point = Point;
  
})(GEN || (GEN = {}));

