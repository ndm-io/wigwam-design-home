var gulp = require('gulp'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var consts = require('../homeConstants.js');

var paths = consts.paths;
var vortexScriptsOrder = consts.vortexScriptsOrder;

module.exports = function () {
    return gulp.src(paths.scripts.src)
        .pipe(order(vortexScriptsOrder))
        .pipe(concat('app.js'))
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest(paths.scripts.dest));
};