var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat');

var paths = require('../studioConstants.js').paths;

module.exports = function () {
    return gulp.src(paths.css.src)
        .pipe(concat('admin.style.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.css.dest));
};