
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
        // params: [x, y, radius, startAngle, endAngle, anticlockwise]
        // https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Drawing_shapes#Arcs
        //
        function Fiber(context2d, params, env) {
          _super.call(this, context2d, params, env);
        }

        Fiber.prototype.draw = function() {
          this.context2dBeginPath();
          this.context2dSet(this.env);
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
        function Subpath(context2d, params, env, genParams) {
          _super.call(this, context2d, params, env, genParams);
        }

        Subpath.prototype.to = function () {
          _super.prototype.to.call(this);
          var fiberCount = Math.round(this.fiberDensity * this.lineWidth);  // 24
          var minLW = 0.125 * this.lineWidth;
          var maxLW = 0.2 * this.lineWidth;
          var rVar = 0.0015 * this.lineWidth;
          var cpVar = 0.0015 * length * this.lineWidth;
          //
          // TODO: consider partial arc fibers
          //
          /*
          var arcLength = this.params[4] - this.params[3];
          var bisectAngle = 0.5 * arcLength + this.params[3];
          var anglePointVar = 0 * arcLength;
          */
          var lineWidth, lwDelta, radVar, minRad, maxRad, radius, mpDeltaMin, mpDeltaMax, fiberLength, startAngle, endAngle, fiber, fiberParams, env;
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
            mpDeltaMin = 0 - mpDeltaMax;
            //
            // TODO: Consider partial arc fibers
            //
            /*
            fiberLength = arcLength * GEN.random();
            if (this.params[5]) {
              startAngle = this.params[3];
              endAngle = this.params[4];
            } else {        
              startAngle = Math.max(this.params[3] + GEN.random(0-anglePointVar, anglePointVar), bisectAngle - fiberLength);
              endAngle = Math.min(this.params[4] + GEN.random(0-anglePointVar, anglePointVar), bisectAngle + fiberLength);
            }
            */
            fiberParams = [
              this.params[0] + GEN.random(mpDeltaMin, mpDeltaMax),
              this.params[1] + GEN.random(mpDeltaMin, mpDeltaMax),
              GEN.random(minRad, maxRad),
              this.params[3],
              this.params[4],
              this.params[5]
            ];
            //
            env = {
              lineWidth: Math.floor((maxLW - minLW) * GEN.random() + minLW),
              strokeStyle: this.color.randomVariationHsl()
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
          {
            color: this.color || new GEN.Color(this.strokeStyle)
          }
        );
        subpath.to();
        this.addToPath(subpath);

      };

      Context.prototype.arc = arc;

    })(Painterly.Context || (Painterly.Context = { prototype: {} })); // TODO: not sure about this pattern

  })(GEN.Painterly || (GEN.Painterly = {}));

})(GEN || (GEN = {}));
