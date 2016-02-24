var gulp = require('gulp');

var paths = require('../studioConstants').paths;

module.exports = function () {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
};