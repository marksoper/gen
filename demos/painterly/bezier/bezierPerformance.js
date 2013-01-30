
var mainBezierPerformance = function() {

  var canvas = document.getElementById('canvas');
  var context2d = canvas.getContext('2d');
  var painterly = new GEN.Painterly.Context(context2d);

  var margin = 30;

  var resizeCanvas = function() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();

  var hexColorStr;

  var y=document.getElementById("header").offsetHeight + 2*margin;

  painterly.moveTo(100,100);
  painterly.beginPath();
  painterly.strokeStyle = "#ff69b4";  // hotpink
  painterly.lineWidth = 12;
  painterly.bezierCurveTo(200,150,600,350,800,400);
  painterly.stroke();

  window.painterly = painterly;

};

window.addEventListener("load", mainBezierPerformance);

