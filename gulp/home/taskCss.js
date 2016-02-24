var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat');

var paths = require('../homeConstants.js').paths;

module.exports = function () {
    return gulp.src(paths.css.src)
        .pipe(concat('vortex.style.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.css.dest));
};