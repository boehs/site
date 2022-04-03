
const g = require('gulp');

const del = require('del');

const run = require('gulp-run')

function removeDist() {
    return del('dist')
}

function eleventy() {
    return run('ELEVENTY_ENV=production eleventy --quiet').exec()
}

function elevendev() {
    return run('ELEVENTY_ENV=development eleventy --serve --quiet --incremental').exec()
}

exports.clean = removeDist
exports.ellty = eleventy

exports.dev = async function() {
    removeDist()
    elevendev()
}

exports.default = g.series(removeDist,eleventy)