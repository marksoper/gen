
dir=${0%/*}
cat $dir/../src/gen.js $dir/../src/extends.js $dir/../src/fiber.js $dir/../src/subpath.js $dir/../src/path.js $dir/../src/context.js $dir/../src/random.js $dir/../src/color.js $dir/../src/painterly/painterly.js $dir/../src/painterly/bezier.js $dir/../src/painterly/arc.js $dir/../src/stroke.js $dir/../src/arc.js > $dir/../build/gen.js

