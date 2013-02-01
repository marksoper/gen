

//
//  grid.js - defines a 2d rectangular area
//
//  with width and height
//  against which proportional x,y calcs can be done
//


var GEN;

(function (GEN) {

  var Grid = (function () {

    function Grid(originX, width, height) {
      this.origin = origin || { x: 0, y: 0 };
      this.width = width;
      this.height = height;
    }

    return Grid;

  })();

  GEN.Grid = Grid;
  
})(GEN || (GEN = {}));

