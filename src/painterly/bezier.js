
//
//  painterly/bezier.js
//
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

    //
    // Bezier submodule
    //

    (function (Bezier) {

      //
      // Bezier.Fiber - extends GEN.Fiber
      //

      var Fiber = (function (_super) {

        GEN.__extends(Fiber, _super);

        //
        // params: [cp1x, cp1y, cp2x, cp2y, x, y]
        // see https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Bezier_and_quadratic_curves
        //
        function Fiber(context2d, params, env, genParams) {
          _super.call(this, context2d, params, env, genParams);
        }

        Fiber.prototype.draw = function() {
          this.context2dBeginPath();
          this.context2dSet(this.env);
          this.context2dMoveTo(this.startPosition.x, this.startPosition.y);
          this.context2d.bezierCurveTo.apply(this.context2d, this.params);
          this.context2dStroke();
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
        function Subpath(context2d, params, env, genParams) {
          _super.call(this, context2d, params, env, genParams);
        }

        Subpath.prototype.to = function () {
          _super.prototype.to.call(this);
          var length = Math.sqrt( Math.pow(this.params[4] - this.startPosition.x, 2) + Math.pow(this.params[5] - this.startPosition.y, 2) );
          var fiberCount = Math.round(this.fiberDensity * this.lineWidth);  // 32
          var minLW = 0.1 * this.lineWidth;
          var maxLW = 0.3 * this.lineWidth;
          var pVar = 0.0015 * length * this.lineWidth;
          var cpVar = 0.0015 * length * this.lineWidth;
          var fiber, fiberParams, env, startPosition;
          //
          // TODO: consider object pooling
          //
          for (var i=0; i<fiberCount; i++) {
            //
            fiberParams = [
              Math.floor(this.params[0] + GEN.random() * cpVar - cpVar / 2),
              Math.floor(this.params[1] + GEN.random() * cpVar - cpVar / 2),
              Math.floor(this.params[2] + GEN.random() * cpVar - cpVar / 2),
              Math.floor(this.params[3] + GEN.random() * cpVar - cpVar / 2),
              Math.floor(this.params[4] + GEN.random() * pVar - pVar / 2),
              Math.floor(this.params[5] + GEN.random() * pVar - pVar / 2)
            ];
            //
            env = {
              lineWidth: Math.floor((maxLW - minLW) * GEN.random() + minLW),
              strokeStyle: this.color.randomVariationHsl()
            };
            startPosition = {
              x: Math.floor(this.startPosition.x + pVar * GEN.random() - pVar/2),
              y: Math.floor(this.startPosition.y + pVar * GEN.random() - pVar/2)
            };
            // note: following line will need full qualification if Fiber class def is moved elsewhere
            fiber = new Fiber(
              this.context2d,
              fiberParams,
              env,
              { startPosition: startPosition }
            );
            this.addFiber(fiber);
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

        var subpath = new Painterly.Bezier.Subpath(
          this.context2d,
          [cp1x, cp1y, cp2x, cp2y, x, y],
          {
            lineWidth: this.lineWidth,
            lineCap: this.lineCap
          },
          {
            color: this.color || new GEN.Color(this.strokeStyle),
            startPosition: this.currentPosition()
          }
        );
        subpath.to();
        this.addToPath(subpath);

      };

      Context.prototype.bezierCurveTo = bezierCurveTo;

    })(Painterly.Context || (Painterly.Context = { prototype: {} })); // TODO: not sure about this pattern

  })(GEN.Painterly || (GEN.Painterly = {}));

})(GEN || (GEN = {}));
