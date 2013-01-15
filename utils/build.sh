
mydir=${0%/*}
echo $mydir/../src/gen.ts
tsc $mydir/../src/gen.ts --out $mydir/../build/gen.js

