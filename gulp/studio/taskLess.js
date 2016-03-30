var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin');

var paths = require('../studioConstants.js').paths;

module.exports = function () {
    return gulp.src(paths.less.src)
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(paths.less.dest));
};