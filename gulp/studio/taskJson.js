var gulp = require('gulp');

var paths = require('../studioConstants.js').paths;

module.exports = function () {
    return gulp.src(paths.json.src)
        .pipe(gulp.dest(paths.json.dest));
};