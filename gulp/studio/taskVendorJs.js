var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify');

var filePath = require('../studioConstants').paths;

module.exports = function() {
    var b = browserify({
        debug: true,
        require: filePath.vendorJS.src
    });

    return b.bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(filePath.vendorJS.dest));
};