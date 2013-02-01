
//
//  painterly/arc.js
//
//  defines class GEN.Painterly.Arc.Fiber
//  defines class GEN.Painterly.Arc.Subpath
//  and
//  extends GEN.Painterly.Context to have a arc prototype method
//  that exposes GEN.Painterly.Arc.Subpath class' "to" prototype method
//  as a context method a la the Context2d API
//

var GEN;

(function (GEN) {

  (function (Painterly) {

    //
    // Arc submodule
    //

    (function (Arc) {

      //
      // Arc.Fiber - extends GEN.Fiber
      //

      var Fiber = (function (_super) {

        GEN.__extends(Fiber, _super);

        //
        // params: [cp1x, cp1y, cp2x, cp2y, x, y]
        // see https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Arc_and_quadratic_curves
        //
        function Fiber(context2d, params, env, startPosition) {
          _super.call(this, context2d, params, env, startPosition);
        }

        Fiber.prototype.draw = function() {
          this.context2dBeginPath();
          this.context2dSet(this.env);
          this.context2dMoveTo(this.startPosition.x, this.startPosition.y);
          this.context2d.arc.apply(this.context2d, this.params);
          this.context2dStroke();
        };

        return Fiber;

      })(GEN.Fiber || {});

      Arc.Fiber = Fiber;


      //
      // Arc.Subpath - extends GEN.Subpath
      //

      var Subpath = (function (_super) {

        GEN.__extends(Subpath, _super);

        //
        // params: [x, y, radius, startAngle, endAngle, anticlockwise]
        // https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Arcs
        //
        function Subpath(context2d, params, env, color, startPosition) {
          _super.call(this, context2d, params, env, color, startPosition);
        }

        Subpath.prototype.to = function () {
          _super.prototype.to.call(this);
          var fiberCount = 32;
          var minLW = 0.125 * this.lineWidth;
          var maxLW = 0.2 * this.lineWidth;
          var rVar = 0.0015 * this.lineWidth;
          var cpVar = 0.0015 * length * this.lineWidth;
          var arcLength = this.params[4] - this.params[3];
          var bisectAngle = 0.5 * arcLength;
          var angleVar = 0.05 * arcLength;
          //var lineWidth, lwDelta, radVar, minRadius, maxRadius, radius, mpDeltaMin, mpDeltaMax, fiber, fiberParams, env, startPosition;
          //
          // TODO: consider object pooling
          //
          for (var i=0; i<fiberCount; i++) {
            //
            lineWidth = Math.floor( Math.max(1, GEN.random(minLW, maxLW)));
            lwDelta = this.lineWidth - lineWidth;
            radVar = lwDelta / 2;
            minRad = this.params[2] - radVar;
            maxRad = this.params[2] + radVar;
            radius = Math.floor ( GEN.random(minRad, maxRad) );
            mpDeltaMax = 0.125 * (this.params[2] - radius + lwDelta);
            mpDeltaMin = 0 - mpVarMax;
            fiberLength = arcLength * GEN.random();
            startAngle = Math.max(this.params[3] + GEN.random(0-angleVAr, angleVar), bisectAngle - fiberLength);
            endAngle = Math.min(this.params[4] + GEN.random(0-angleVAr, angleVar), bisectAngle + fiberLength);
            fiberParams = [
              this.params[0] + GEN.random(mpDeltaMin, mpDeltaMax),
              this.params[1] + GEN.random(mpDeltaMin, mpDeltaMax),
              GEN.random(minRad, maxRad),
              startAngle,
              endAngle,
              this.params[5]
            ];
            //
            env = {
              lineWidth: Math.floor((maxLW - minLW) * GEN.random() + minLW),
              strokeStyle: this.color.getRandomShade(0.8).rgba()
            };
            // note: following line will need full qualification if Fiber class def is moved elsewhere
            fiber = new Fiber(this.context2d, fiberParams, env);
            this.addFiber(fiber);
          }

        };

        return Subpath;

      })(GEN.Subpath || {});

      Arc.Subpath = Subpath;

    })(Painterly.Arc || (Painterly.Arc = {}));


    //
    // arc extension to GEN.Painterly.Context.prototype
    //

    (function (Context) {

      var arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {

        var subpath = new Painterly.Arc.Subpath(
          this.context2d,
          [x, y, radius, startAngle, endAngle, anticlockwise],
          {
            lineWidth: this.lineWidth,
            lineCap: this.lineCap
          },
          this.color || new GEN.Color(this.strokeStyle)
        );
        subpath.to();
        this.addToPath(subpath);

      };

      Context.prototype.arc = arc;

    })(Painterly.Context || (Painterly.Context = { prototype: {} })); // TODO: not sure about this pattern

  })(GEN.Painterly || (GEN.Painterly = {}));

})(GEN || (GEN = {}));
