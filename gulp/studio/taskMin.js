var gulp = require('gulp'),
    uglify = require('gulp-uglify');

module.exports = function () {
    return gulp.src('server/public/js/vendor.js')
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('server/public/js/vendor.min.js'));
};