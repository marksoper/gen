
var mainBezierPerformance = function() {

  var canvas2d = document.getElementById('canvas2d');
  var context2d = canvas2d.getContext('2d');
  var canvasGen = document.getElementById('canvasGen');
  var contextGen2d = canvasGen.getContext('2d');
  var painterly = new GEN.Painterly.Context(contextGen2d);

  var testCount = 3000;
  var margin = 30;
  var lineWidth = 100;

  var resizeCanvas = function() {
    canvasGen.width = canvas2d.width  = window.innerWidth;
    canvasGen.height = canvas2d.height = window.innerHeight;
  };
  resizeCanvas();

  var clearContext2d = function() {
    context2d.clearRect(0, 0, context2d.canvas.width, context2d.canvas.height);
  };

  var clearContextGen = function() {
    painterly.context2d.clearRect(0, 0, painterly.context2d.canvas.width, painterly.context2d.canvas.height);
  };

  context2d.font = "10pt Helvetica";
  var drawText = function(text, x, y, fillStyle) {
    context2d.fillStyle = fillStyle || "#000000";
    context2d.fillText(text, x, y);
  };

  var draw = function() {

    var w = canvasGen.width;
    var h = canvasGen.height;

    var y=document.getElementById("header").offsetHeight + 2*margin;
    var initialY = y;

    var tDelta_2d = 0;
    var tDelta_gen = 0;

    var drawContext2d = function(y) {
      var tStart = Date.now();
      context2d.beginPath();
      context2d.moveTo(0.1*w, y + 2*margin);
      context2d.strokeStyle = "#ff69b4";  // hotpink
      context2d.lineWidth = lineWidth;
      context2d.bezierCurveTo(0.25*w, y-0.1*w, 0.35*w, y + 0.1*w, 0.4*w, y + 0.2*w);
      context2d.stroke();
      tDelta_2d += (Date.now() - tStart);
      drawText("Running total for: " + i + " tests: Bezier on normal context2d: " + tDelta_2d, 0.05*w, y + margin);
    };

    var drawContextGen = function(y) {
      var tStart = Date.now();
      painterly.beginPath();
      painterly.moveTo(5*w/8, y+2*margin);
      painterly.strokeStyle = "#ff69b4";  // hotpink
      painterly.lineWidth = lineWidth;
      painterly.bezierCurveTo(0.75*w, y-0.1*w, 0.85*w, y + 0.1*w, 0.9*w, y + 0.2*w);
      painterly.stroke();
      tDelta_gen += (Date.now() - tStart);
      drawText("Running total for: " + i + " tests: Bezier on Gen context: " + tDelta_gen, 0.55*w, y + margin);
    };

    
    for (var i=1; i<=testCount; i++) {
      var rand = Math.random();
      clearContext2d();
      clearContextGen();
      if (rand < 0.5) {
        drawContextGen(y);
        drawContext2d(y);
      } else {
        drawContext2d(y);
        drawContextGen(y);
      }

      console.log("draw completed for i: " + i);
      //y += 0.2*canvasGen.width + 2*margin;
    }

    console.log("printing final results");
    context2d.font = "16pt Helvetica";
    drawText("Grand total for: " + testCount + " tests: Bezier on normal context2d: " + tDelta_2d, 0.05*w, initialY - margin);
    drawText("Grand total for: " + testCount + " tests: Bezier on Gen context: " + tDelta_gen, 0.55*w, initialY - margin);

  };

  draw();

  window.painterly = painterly;

  /*
  var canvasResizing;
  window.addEventListener("resize", function() {
    if (canvasResizing) {
      console.log("window resize event ignored");
      return;
    }
    console.log("window resize event NOT ignored");
    canvasResizing = true;
    resizeCanvas();
    draw();
    canvasResizing = false;
  });
  */

};

window.addEventListener("load", mainBezierPerformance);


