
#!/bin/bash
cd /mark/genpages
cp -r ../gen/demos/ demos
cp ../gen/build/gen.js ./build/
find demos -name "*.html" -type f -exec sed -i.bak 's|<\/head>|<script type="text\/javascript" src="\/js\/ga.js"><\/script><\/head>|g' {} \;
git add -A
git commit -m 'publish latest demos from master branch'
git push origin gh-pages
find demos -name "*.html.bak" -type f -exec rm {} \;
