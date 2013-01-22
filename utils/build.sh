
#!/bin/bash
cd /mark/genpages
cp -r ../gen/demos/ demos
cp ../gen/build/gen.js ./build/
git add -A
git commit -m 'publish latest demos from master branch'
git push origin gh-pages