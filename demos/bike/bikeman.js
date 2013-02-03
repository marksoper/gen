
var mainBikeman = function() {

  var canvas = document.getElementById('canvas');
  var context = new GEN.Painterly.Context((canvas.getContext('2d')));

  var margin = 20;
  var origin = {
    x: margin,
    y: margin
  };
  var grid = new GEN.Grid(origin);

  var resize = function() {
    canvas.width = window.innerWidth - 0.8*margin;
    canvas.height = window.innerHeight - 1.2*margin;
    grid.width = canvas.width - 2*margin;
    grid.height = canvas.height - 2*margin;
  };
  resize();

  var colors = ["aqua", "black", "brown", "coral", "crimson", "darkslateblue", "deeppink", "green", "indigo", "lightseagreen", "orangered", "orange", "purple", "steelblue", "teal", "sienna"];
  var randomColor = function() {
    return colors[Math.floor(colors.length * Math.random())];
  };



  //
  // sky
  //

  var skyColor = genColorKeywords["lightblue"];
  var drawSky= function() {
    context.lineWidth = Math.floor(0.15 * grid.height);
    context.fiberDensity = 2;
    context.strokeStyle = "#" + GEN.Color.zeroPadToSix(skyColor.toString(16));
    context.beginPath();
    for (var i=-1; i<10; i++) {
      context.moveTo(Math.floor(-0.1*grid.width), Math.floor(0.1*i*grid.height));
      context.lineTo(Math.floor(1.1*grid.width), Math.floor(0.1*i*grid.height));
    }
    context.stroke();
  };


  //
  // ground
  //

  var groundColor = genColorKeywords["orange"];
  var groundSegments = [
    {
      start: new GEN.Point(-0.1, 0.7, grid),
      end: new GEN.Point(0.3, 1.1, grid)
    },
    {
      start: new GEN.Point(0, 1.2, grid),
      end: new GEN.Point(1.1, 0.65, grid)
    }
  ];
  var drawGround = function() {
    context.beginPath();
    groundSegments.forEach(function(seg) {
      context.lineWidth = Math.floor(0.45 * grid.height);
      context.fiberDensity = 2;
      context.strokeStyle = "#" + GEN.Color.zeroPadToSix(groundColor.toString(16));
      context.moveTo(seg.start.x(), seg.start.y());
      context.lineTo(seg.end.x(), seg.end.y());
    });
    context.stroke();
  };

  //
  // tar
  //

  var tarColor = genColorKeywords["black"];
  var tarSegments = [
    {
      start: new GEN.Point(-0.1, 0.95, grid),
      end: new GEN.Point(1.1, 0.95, grid)
    }
  ];
  var drawTar = function() {
    context.beginPath();
    tarSegments.forEach(function(seg) {
      context.lineWidth = Math.floor(0.55 * grid.height);
      context.fiberDensity = 2;
      context.strokeStyle = "#" + GEN.Color.zeroPadToSix(tarColor.toString(16));
      context.moveTo(seg.start.x(), seg.start.y());
      context.lineTo(seg.end.x(), seg.end.y());
    });
    context.stroke();
  };


  //
  // wheels
  //

  var wheelColor = {
    front: genColorKeywords["orangered"],
    rear: genColorKeywords["orangered"]
  };
  var wheelSegments = {
    front: {
      mp: new GEN.Point(0.45,0.64,grid),
      radius: 0.15
    },
    rear: {
      mp: new GEN.Point(0.75,0.48,grid),
      radius: 0.15
    }
  };
  var drawWheel = {
    front: function() {
      context.beginPath();
      context.lineWidth = Math.floor(0.05 * grid.height);
      context.fiberDensity = 2;
      context.strokeStyle = "#" + GEN.Color.zeroPadToSix(wheelColor.front.toString(16));
      context.arc(
        wheelSegments.front.mp.x(),
        wheelSegments.front.mp.y(),
        wheelSegments.front.radius * grid.height,
        0,
        2*Math.PI
      );
      context.stroke();
    },
    rear: function() {
      context.beginPath();
      context.lineWidth = Math.floor(0.05 * grid.height);
      context.fiberDensity = 2;
      context.strokeStyle = "#" + GEN.Color.zeroPadToSix(wheelColor.rear.toString(16));
      context.arc(
        wheelSegments.rear.mp.x(),
        wheelSegments.rear.mp.y(),
        wheelSegments.rear.radius * grid.height,
        0,
        2*Math.PI
      );
      context.stroke();
    }
  };
  var drawWheels = function() {
    drawWheel.front();
    drawWheel.rear();
  };



  //
  // wheels
  //

  /*

  var wheelColor = genColorKeywords[randomColor()];

  var wheels = {
    "frontWheel": {
      type: "arc",
      params: {
        x: function() {

        }
        y:
        radius:
        startAngle:
        endAngle:
        anticlockwise:
      },
      shape: new GEN.Arc(0.78*dim, 0.66*dim, 0.17*dim, 0, Math.PI * 2),
      color: wheelColor,
      lineWidth: 0.07*dim
    },
    "rearWheel": {
      shape: new GEN.Arc(0.22*dim, 0.69*dim, 0.17*dim, 0, Math.PI * 2),
      color: wheelColor,
      lineWidth: 0.07*dim
    }
  };

  var ground = function() {
    return {
      shape: new GEN.Stroke(0, dim, dim, 0.93*dim, -Math.PI/12),
      color: groundColor,
      lineWidth: 0.2*dim
    };
  };

  */

  var draw = function() {
    drawSky();
    drawWheels();
    drawTar();
    drawGround();
    /*
    var part;
    var partsNow = parts();
    for (var partName in partsNow) {
      part = partsNow[partName];
      hexColorStr = zeroPadToSix(part.color.toString(16));
      context.strokeStyle = "#" + hexColorStr;
      context.lineWidth = part.lineWidth;
      console.log("drawing: " + partName);
      part.shape.draw(context);
    }
    */
  };
  draw();

  var canvasResizing;
  window.addEventListener("resize", function() {
    if (canvasResizing) {
      console.log("window resize event ignored");
      return;
    }
    console.log("window resize event NOT ignored");
    canvasResizing = true;
    resize();
    draw();
    canvasResizing = false;
  });


};

window.onload = mainBikeman;