#!/bin/bash
#npm install -G pnpm
#pnpm install

## prehook ##

sed -Ei 's/"isServer": false/"isServer": true/g' src/config.ts

npx astro build
cd dist
declare i=1
for f in $(find * -name '*.html' -or -name ''); do
    echo "parsing file: $f, this is file $i"
    # File contents
    declare contents=$(cat $f)
    # css file name
    declare matchedcss=$(sed -nE 's/  <link rel="stylesheet" href="(.*?\/(.*?)\.css)">/\1/p' $f)
    # Remove new lines
    if ! grep -q "script" "$f"; then
        echo -n $(tr -d "\n" < $f) > $f
    fi
    # Remove all astro prefixes
    sed -Ei "s/( class=\"$matchedtag\"| $matchedtag)//g;s/astro-/e/g;/^[[:space:]]*$/d;s/(e[A-Z0-9]{3})[A-Z0-9]{5}/\1/g" $f

    # fix =>
    sed -Ei "s/fix=&gt;/=>/g" $f
    i=$(($i + 1))
done
# Move to site root
# MV fails on populated directory
if [[ $1 = 'prod' ]]
then
    echo 'is in prod, moving files to root'
    rm -r ../../assets/ && cp -r ./* ../../ && rm -r ./*
fi

cd ../
sed -Ei 's/"isServer": true/"isServer": false/g' src/config.ts
