var gulp = require('gulp');
var paths = require('../homeConstants.js').paths;

module.exports = function () {
    return gulp.src(paths.assets.src)
        .pipe(gulp.dest(paths.assets.dest));
};