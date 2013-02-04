
var mainBikeAnimation = function() {

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
  var bodyJoints = {
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

  var bodySegments = [
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
    clearContext(legsContext);
    legsContext.beginPath();
    legsContext.lineWidth = Math.floor(0.10 * mainGrid.height);
    legsContext.fiberDensity = 2;
    legsContext.strokeStyle = "#" + GEN.Color.zeroPadToSix(legsColor.toString(16));
    bodySegments.forEach(function(seg) {
      legsContext.moveTo(bodyJoints[seg.start][t%4].x(), bodyJoints[seg.start][t%4].y());
      legsContext.lineTo(bodyJoints[seg.end][t%4].x(), bodyJoints[seg.end][t%4].y() );
    });
    legsContext.stroke();
    t += 1;
    setTimeout(drawLegs, 200);
  };



  //
  // main draw
  //

  var draw = function() {
    drawLegs();
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

window.onload = mainBikeAnimation;