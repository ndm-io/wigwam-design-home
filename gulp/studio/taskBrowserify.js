var browserify = require('browserify'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    notify = require("gulp-notify");

var paths = require('../studioConstants').paths;

module.exports = function() {
    return browserify(paths.browserify.src)
        .bundle()
        .pipe(source('bundle.js'))
        //.pipe(buffer())
        //.pipe(uglify())
        .pipe(notify('Finished Browserify'))
        .pipe(gulp.dest(paths.browserify.dest))
};