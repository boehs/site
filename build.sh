#!/bin/bash
#npm install -G pnpm
pnpm install

## prehook ##

sed -Ei 's/"isServer": false/"isServer": true/g' src/config.ts

# Move to site root
# MV fails on populated directory
if [[ $1 = 'prod' ]]
then
    echo 'is in prod, moving files to root'
    rm -r ../../assets/ && cp -r ./* ../../ && rm -r ./*
fi

cd ../
#sed -Ei 's/"isServer": true/"isServer": false/g' src/config.ts
