#!/bin/bash
#npm install -G pnpm
#pnpm install
astro build
cd dist
declare i=1
for f in $(find * -name '*.html' -or -name ''); do
    echo "parsing file: $f, this is file $i"
    # File contents
    declare contents=$(cat $f)
    # css file name
    declare matchedcss=$(echo $contents | pcregrep -o1 -e '<link rel="stylesheet" href="(.*\/(.*)\.css)')
    # standard astro prefix
    declare matchedtag=$(echo $contents | pcregrep -o1 -e 'header class="(astro-.*?)"')
    echo "for what it's worth, the matched tag was $matchedtag"
    # Remove new lines
    if ! grep -q "script" "$f"; then
        echo -n $(tr -d "\n" < $f) > $f
    fi
    # Remove all astro prefixes
    sed -Ei "s/( class=\"$matchedtag\"| $matchedtag)//g;s/astro-/e/g;/^[[:space:]]*$/d" $f
    ### Time for CSS ###
    # Remove all astro prefixes
    echo "parsing css for file $i"
    sed -Ei "s/>\.$matchedtag/>\*/g;s/.$matchedtag//g;s/astro-/e/g" assets/$(basename $matchedcss)
    i=$(($i + 1))
done
# Move to site root
# MV fails on populated directory
if [[ $1 = 'prod' ]]
then
    echo 'is in prod, moving files to root'
    rm -r ../../assets/ && cp -r ./* ../../ && rm -r ./*
fi