
var mainBikeman = function() {


  /*

  var mainCanvas = document.getElementById('mainCanvas');
  var mainContext = new GEN.Painterly.Context((mainCanvas.getContext('2d')));

  var legsCanvas = document.getElementById('legsCanvas');
  var legsContext = new GEN.Painterly.Context((legsCanvas.getContext('2d')));

  var margin = 20;
  var mainOrigin = {
    x: margin,
    y: margin
  };
  var mainGrid = new GEN.Grid(mainOrigin);

  var legsOrigin = {
    x: margin,
    y: margin
  };
  var mainGrid = new GEN.Grid(mainOrigin);

  var resize = function() {
    ["mainCanvas", "legsCanvas"].forEach(function(canvas) {
      canvas.width = window.innerWidth - 0.8*margin;
      canvas.height = window.innerHeight - 1.2*margin;
      mainGrid.width = canvas.width - 2*margin;
      mainGrid.height = canvas.height - 2*margin;
    });
  };
  resize();

  */


  var mainCanvas = document.getElementById('mainCanvas');
  var mainContext = new GEN.Painterly.Context((mainCanvas.getContext('2d')));

  var legsCanvas = document.getElementById('legsCanvas');
  var legsContext = new GEN.Painterly.Context((legsCanvas.getContext('2d')));

  var margin = 20;
  var mainOrigin = {
    x: margin,
    y: margin
  };
  var mainGrid = new GEN.Grid(mainOrigin);

  var legsGrid = new GEN.Grid();

  var resize = function() {
    [mainCanvas, legsCanvas].forEach(function(canvas) {
      canvas.width = window.innerWidth - 0.8*margin;
      canvas.height = window.innerHeight - 1.2*margin;
    });
    //
    mainGrid.width = mainCanvas.width - 2*margin;
    mainGrid.height = mainCanvas.height - 2*margin;
    legsGrid.origin = { x: 0.5*mainGrid.width, y: 0.5*mainGrid.height };
    legsGrid.width = 0.2*legsCanvas.width;
    legsGrid.height = 1.66*legsGrid.width;
  };
  resize();

  var clearContext = function(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  var colors = ["aqua", "black", "brown", "coral", "crimson", "darkslateblue", "deeppink", "green", "indigo", "lightseagreen", "crimson", "orange", "purple", "steelblue", "teal", "sienna"];
  var randomColor = function() {
    return colors[Math.floor(colors.length * Math.random())];
  };


  //
  // legs
  //

  var legsColor = genColorKeywords["darkslateblue"];

  var hipJoint = new GEN.Point(0, 0, legsGrid);
  var legJoints = {
    hip: [
      hipJoint,
      hipJoint,
      hipJoint,
      hipJoint
    ],
    knee: [
      new GEN.Point(1.0, 0, legsGrid),
      new GEN.Point(1.0, 0.2, legsGrid),
      new GEN.Point(0.83, 0.4, legsGrid),
      new GEN.Point(0.83, 0.3, legsGrid)
    ],
    ankle: [
      new GEN.Point(0.666, 0.6, legsGrid),
      new GEN.Point(1.0, 0.8, legsGrid),
      new GEN.Point(0.66, 1.0, legsGrid),
      new GEN.Point(0.33, 0.8, legsGrid)
    ]
  };

  var legSegments = [
    {
      start: "hip",
      end: "knee"
    },
    {
      start: "knee",
      end: "ankle"
    }
  ];

  var t = 0;
  var drawLegs = function() {
    clearContext(legsContext.context2d);
    legsContext.beginPath();
    legsContext.lineWidth = Math.floor(0.10 * mainGrid.height);
    legsContext.fiberDensity = 2;
    legsContext.strokeStyle = "#" + GEN.Color.zeroPadToSix(legsColor.toString(16));
    legSegments.forEach(function(seg) {
      legsContext.moveTo(legJoints[seg.start][t%4].x(), legJoints[seg.start][t%4].y());
      legsContext.lineTo(legJoints[seg.end][t%4].x(), legJoints[seg.end][t%4].y() );
    });
    legsContext.stroke();
    t += 1;
    setTimeout(drawLegs, 200);
  };


  //
  // sky
  //

  var skyColor = genColorKeywords["lightblue"];
  var drawSky= function() {
    mainContext.lineWidth = Math.floor(0.15 * mainGrid.height);
    mainContext.fiberDensity = 2;
    mainContext.strokeStyle = "#" + GEN.Color.zeroPadToSix(skyColor.toString(16));
    mainContext.beginPath();
    for (var i=-1; i<10; i++) {
      mainContext.moveTo(Math.floor(-0.1*mainGrid.width), Math.floor(0.1*i*mainGrid.height));
      mainContext.lineTo(Math.floor(1.1*mainGrid.width), Math.floor(0.1*i*mainGrid.height));
    }
    mainContext.stroke();
  };


  //
  // ground
  //

  var groundColor = genColorKeywords["orange"];
  var groundSegments = [
    {
      start: new GEN.Point(-0.1, 0.7, mainGrid),
      end: new GEN.Point(0.3, 1.1, mainGrid)
    },
    {
      start: new GEN.Point(0, 1.2, mainGrid),
      end: new GEN.Point(1.1, 0.65, mainGrid)
    }
  ];
  var drawGround = function() {
    mainContext.beginPath();
    groundSegments.forEach(function(seg) {
      mainContext.lineWidth = Math.floor(0.45 * mainGrid.height);
      mainContext.fiberDensity = 2;
      mainContext.strokeStyle = "#" + GEN.Color.zeroPadToSix(groundColor.toString(16));
      mainContext.moveTo(seg.start.x(), seg.start.y());
      mainContext.lineTo(seg.end.x(), seg.end.y());
    });
    mainContext.stroke();
  };

  //
  // tar
  //

  var tarColor = genColorKeywords["black"];
  var tarSegments = [
    {
      start: new GEN.Point(-0.1, 0.95, mainGrid),
      end: new GEN.Point(1.1, 0.95, mainGrid)
    }
  ];
  var drawTar = function() {
    mainContext.beginPath();
    tarSegments.forEach(function(seg) {
      mainContext.lineWidth = Math.floor(0.55 * mainGrid.height);
      mainContext.fiberDensity = 2;
      mainContext.strokeStyle = "#" + GEN.Color.zeroPadToSix(tarColor.toString(16));
      mainContext.moveTo(seg.start.x(), seg.start.y());
      mainContext.lineTo(seg.end.x(), seg.end.y());
    });
    mainContext.stroke();
  };


  //
  // wheels
  //

  var wheelColor = {
    front: genColorKeywords["maroon"],
    rear: genColorKeywords["maroon"]
  };
  var wheelSegments = {
    front: {
      mp: new GEN.Point(0.45,0.64,mainGrid),
      radius: 0.15
    },
    rear: {
      mp: new GEN.Point(0.75,0.48,mainGrid),
      radius: 0.15
    }
  };
  var drawWheel = {
    front: function() {
      mainContext.beginPath();
      mainContext.lineWidth = Math.floor(0.05 * mainGrid.height);
      mainContext.fiberDensity = 2;
      mainContext.strokeStyle = "#" + GEN.Color.zeroPadToSix(wheelColor.front.toString(16));
      mainContext.arc(
        wheelSegments.front.mp.x(),
        wheelSegments.front.mp.y(),
        wheelSegments.front.radius * mainGrid.height,
        0,
        2*Math.PI
      );
      mainContext.stroke();
    },
    rear: function() {
      mainContext.beginPath();
      mainContext.lineWidth = Math.floor(0.05 * mainGrid.height);
      mainContext.fiberDensity = 2;
      mainContext.strokeStyle = "#" + GEN.Color.zeroPadToSix(wheelColor.rear.toString(16));
      mainContext.arc(
        wheelSegments.rear.mp.x(),
        wheelSegments.rear.mp.y(),
        wheelSegments.rear.radius * mainGrid.height,
        0,
        2*Math.PI
      );
      mainContext.stroke();
    }
  };
  var drawWheels = function() {
    drawWheel.front();
    drawWheel.rear();
  };



  //
  // body
  //

  var bodyColor = genColorKeywords["darkslateblue"];

  var bodyJoints = {
    toe: new GEN.Point(0.66, 0.54, mainGrid),
    heel: new GEN.Point(0.55, 0.58, mainGrid)
  };

  var bodySegments = [
    {
      start: "toe",
      end: "heel",
      cp1: new GEN.Point(0.62, 0.54, mainGrid),
      cp2: new GEN.Point(0.57, 0.58, mainGrid)
    }
  ];

  var drawBody = function() {
    mainContext.beginPath();
    mainContext.lineWidth = Math.floor(0.10 * mainGrid.height);
    mainContext.fiberDensity = 2;
    mainContext.strokeStyle = "#" + GEN.Color.zeroPadToSix(bodyColor.toString(16));
    bodySegments.forEach(function(seg) {
      mainContext.moveTo(bodyJoints[seg.start].x(), bodyJoints[seg.start].y());
      mainContext.bezierCurveTo(seg.cp1.x(), seg.cp2.y(), seg.cp2.x(), seg.cp2.y(), bodyJoints[seg.end].x(), bodyJoints[seg.end].y() );
    });
    mainContext.stroke();
  };



  //
  // main draw
  //

  var draw = function() {
    drawSky();
    drawWheels();
    drawTar();
    drawGround();
    //drawBody();
    //drawLegs();
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