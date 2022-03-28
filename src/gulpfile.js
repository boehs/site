
const g = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const postcssConfig = require("./.postcssrc.js")
const postcss = require('gulp-postcss');

const ts = require('gulp-typescript');
const jsInject = require('@boehs/gulp-js-text-inject')
const terser = require('gulp-terser');

const del = require('del');

const run = require('gulp-run')

const htmlmin = require('gulp-htmlmin');

function removeDist() {
    return del('dist')
}

function scss() {
    return g.src('_public/scss/*(main|code).scss')
        .pipe(sass.sync({outputStyle: 'compressed'})
            .on('error', sass.logError))
        .pipe(postcss(postcssConfig.plugins))
        .pipe(g.dest('dist/'))
}

function type() {
    return g.src('_public/ts/main.ts')
        .pipe(ts({
            lib: ['ES6','DOM'],
            module: "CommonJS",
            moduleResolution: "node",
            target: 'ES6'
        }))
        .pipe(jsInject({
            basepath: './'
        }))
        .pipe(terser({
            module: true,
            ecma: 2016,
            compress: {
                booleans_as_integers: true,
                unsafe: true,
                unsafe_math: true,
            },
            
        }))
        .pipe(g.dest('dist/'))
}

function eleventy() {
    return run('ELEVENTY_ENV=production eleventy --quiet').exec()
}

function elevendev() {
    return run('ELEVENTY_ENV=development eleventy --serve --quiet --incremental').exec()
}

function html() {
    return g.src('dist/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true
        }))
        .pipe(g.dest('dist'));
}

//function subfont() {
//    return run('subfont dist/*.html -ir --no-fallbacks --formats woff,woff2').exec()
//}

exports.clean = removeDist
exports.ts = type
exports.css = scss
exports.html = html

exports.dev = async function() {
    removeDist()
    elevendev()
    g.watch('_public/scss/*.scss',{ ignoreInitial: false },scss)
    g.watch('_public/ts/*.ts',{ ignoreInitial: false },type)
    // causes loop
    //g.watch('dist/**/*.html',html)    
}

exports.default = g.series(removeDist,g.parallel(scss,type),eleventy,html)