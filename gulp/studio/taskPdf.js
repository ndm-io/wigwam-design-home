var browserify = require('browserify'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    notify = require("gulp-notify");

var paths = require('../studioConstants').paths;

module.exports = function() {
    return browserify(paths.pdfjs.src)
        .bundle()
        .pipe(source('bundle.pdf.worker.js'))
        //.pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest(paths.pdfjs.dest))
};