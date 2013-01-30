
//
//  painterly/bezier.js
//  defines class GEN.Painterly.Bezier.Fiber
//  defines class GEN.Painterly.Bezier.Subpath
//  and
//  extends GEN.Painterly.Context to have a bezierCurveTo prototype method
//  that exposes GEN.Painterly.Bezier.Subpath class' "to" prototype method
//  as a context method a la the Context2d API
//

var GEN;

(function (GEN) {

  (function (Painterly) {

    (function (Bezier) {

      //
      // Bezier submodule
      //


      //
      // Bezier.Fiber - extends GEN.Fiber
      //

      var Fiber = (function (_super) {

        GEN.__extends(Fiber, _super);

        //
        // params: [cp1x, cp1y, cp2x, cp2y, x, y]
        // see https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Bezier_and_quadratic_curves
        //
        function Fiber(context2d, params, env) {
          _super.call(this, context2d);
        }

        Fiber.prototype.to = function () {
          _super.prototype.to.call(this);
          var length = Math.sqrt( Math.pow(this.params.x - this.startPosition.x, 2) + Math.pow(this.params.y - this.startPosition.y, 2) );
          var reps = 5;
          var minLW = 0.1 * this.lineWidth;
          var maxLW = 0.4 * this.lineWidth;
          var pVar = 0.1 * length;
          var cpVar = 0.1 * length;
          var fiber;
          for (var i=0; i<reps; i++) {
            fiber = new GEN.


            this.contextCall(
              "moveTo",
              Math.floor(this.startPosition.x + pVar * GEN.random() - pVar/2),
              Math.floor(this.startPosition.y + pVar * GEN.random() - pVar/2)
            );
            this.contextSet({
              "lineWidth": Math.floor((maxLW - minLW) * GEN.random() + minLW),
              "strokeStyle": this.color.getRandomShade(0.8).rgba()
            });
            params.cp1x = Math.floor(cp1x + GEN.random() * cpVar - cpVar / 2);
            params.cp1y = Math.floor(cp1y + GEN.random() * cpVar - cpVar / 2);
            params.cp2x = Math.floor(cp2x + GEN.random() * cpVar - cpVar / 2);
            params.cp2y = Math.floor(cp2y + GEN.random() * cpVar - cpVar / 2);
            params.x = Math.floor(x + GEN.random() * pVar - pVar / 2);
            params.y = Math.floor(y + GEN.random() * pVar - pVar / 2);
            this.contextCall(
              "bezierCurveTo",
              params.cp1x,
              params.cp1y,
              params.cp2x,
              params.cp2y,
              params.x,
              params.y
            );
          }

        };

        return Fiber;

      })(GEN.Fiber || {});

      Bezier.Fiber = Fiber;


      //
      // Bezier.Subpath - extends GEN.Subpath
      //

      var Subpath = (function (_super) {

        GEN.__extends(Subpath, _super);

        //
        // params: [cp1x, cp1y, cp2x, cp2y, x, y]
        // see https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Bezier_and_quadratic_curves
        //
        function Subpath(context2d, params, env) {
          _super.call(this, context2d);
        }

        Subpath.prototype.to = function () {
          _super.prototype.to.call(this);
          var length = Math.sqrt( Math.pow(this.params.x - this.startPosition.x, 2) + Math.pow(this.params.y - this.startPosition.y, 2) );
          var reps = 5;
          var minLW = 0.1 * this.lineWidth;
          var maxLW = 0.4 * this.lineWidth;
          var pVar = 0.1 * length;
          var cpVar = 0.1 * length;
          var fiber;
          for (var i=0; i<reps; i++) {
            fiber = new GEN.


            this.contextCall(
              "moveTo",
              Math.floor(this.startPosition.x + pVar * GEN.random() - pVar/2),
              Math.floor(this.startPosition.y + pVar * GEN.random() - pVar/2)
            );
            this.contextSet({
              "lineWidth": Math.floor((maxLW - minLW) * GEN.random() + minLW),
              "strokeStyle": this.color.getRandomShade(0.8).rgba()
            });
            params.cp1x = Math.floor(cp1x + GEN.random() * cpVar - cpVar / 2);
            params.cp1y = Math.floor(cp1y + GEN.random() * cpVar - cpVar / 2);
            params.cp2x = Math.floor(cp2x + GEN.random() * cpVar - cpVar / 2);
            params.cp2y = Math.floor(cp2y + GEN.random() * cpVar - cpVar / 2);
            params.x = Math.floor(x + GEN.random() * pVar - pVar / 2);
            params.y = Math.floor(y + GEN.random() * pVar - pVar / 2);
            this.contextCall(
              "bezierCurveTo",
              params.cp1x,
              params.cp1y,
              params.cp2x,
              params.cp2y,
              params.x,
              params.y
            );
          }

        };

        return Subpath;

      })(GEN.Subpath || {});

      Bezier.Subpath = Subpath;


    })(Painterly.Bezier || (Painterly.Bezier = {}));


    //
    // bezierCurveTo extension to GEN.Painterly.Context.prototype
    //

    (function (Context) {

      var bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {







      };

      Context.prototype.bezierCurveTo = bezierCurveTo;

    })(Painterly.Context || (Painterly.Context = { prototype: {} })); // TODO: not sure about this pattern

  })(GEN.Painterly || (GEN.Painterly = {}));

})(GEN || (GEN = {}));
