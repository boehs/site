#!/bin/bash
#pnpm install
astro build
cd dist
declare i=1
for f in $(find * -name '*.html' -or -name ''); do
    echo "parsing file: $f, this is file $i"
    i=$(($i + 1))
    # File contents
    declare contents=$(cat $f)
    # Find css file names
    declare matchedcss=$(echo $contents | pcregrep -o1 -e '<link rel="stylesheet" href="(.*\/(.*)\.css)')
    # Find standard astro prefix
    declare matchedtag=$(echo $contents | pcregrep -o1 -e 'header class="(astro-.*?)"')
    # Remove new lines
    # echo -n $(tr -d "\n" < $f) > $f
    # Remove all astro prefixes
    sed -Ei "s/( class=\"$matchedtag\"| $matchedtag)//g;s/astro-//g" $f
    ### Time for CSS ###
    # Remove all astro prefixes
    echo "parsing css for file $i"
    sed -Ei "s/.$matchedtag//g;s/astro-//g" $matchedcss
done
# Move to site root
# MV fails on populated directory
cp -r ./* ../../ && rm -r ./*