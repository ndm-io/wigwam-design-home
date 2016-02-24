var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat');

var paths = require('../studioConstants.js').paths;

module.exports = function () {
    return gulp.src(paths.vendorCSS.src)
        .pipe(concat('vendor.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.vendorCSS.dest));
};