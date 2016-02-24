var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    cssmin = require('gulp-cssmin'),
    order = require('gulp-order'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    headerfooter = require('gulp-headerfooter'),
    fs = require('fs');


var paths = {
    scripts: {
        src: 'home/js/**/*.js',
        dest: 'server/public/js'
    },
    html: {
        src: ['home/html/**/*.html','!./home/html/partials/*'],
        dest: 'server/public/html'
    },
    htmlPartials: {
        header: 'home/html/partials/header.html',
        footer: 'home/html/partials/footer.html'
    },
    css: {
        src: 'home/css/*.css',
        dest: 'server/public/css'
    },
    img: {
        src: 'home/img/**/*',
        dest: 'server/public/img'
    },
    assets: {
        src: 'home/assets/**/*',
        dest: 'server/public/assets'
    }
};

var vortexScriptsOrder = [
    "jquery-2.1.3.min.js",
    "bootstrap.min.js",
    "jquery.superslides.min.js",
    "jquery.mb.YTPlayer.min.js",
    "jquery.magnific-popup.min.js",
    "owl.carousel.min.js",
    "jquery.simple-text-rotator.min.js",
    "imagesloaded.pkgd.js",
    "isotope.pkgd.min.js",
    "packery-mode.pkgd.min.js",
    "appear.js",
    "jquery.easing.1.3.js",
    "wow.min.js",
    "jqBootstrapValidation.js",
    "jquery.fitvids.js",
    "jquery.parallax-1.1.3.js",
    "smoothscroll.js",
    "contact.js",
    "custom.js"
];


gulp.task('scripts', function () {
    gulp.src(paths.scripts.src)
        .pipe(order(vortexScriptsOrder))
        .pipe(print())
        .pipe(concat('app.js'))
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('html', function () {

    var header = fs.readFileSync(paths.htmlPartials.header);
    var footer = fs.readFileSync(paths.htmlPartials.footer);

    return gulp.src(paths.html.src)
        .pipe(headerfooter.header(header))
        .pipe(headerfooter.footer(footer))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.html.dest));
});

gulp.task('css', function () {
    return gulp.src(paths.css.src)
        .pipe(concat('style.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.css.dest));
});

gulp.task('img', function () {
    return gulp.src(paths.img.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('assets', function () {
    return gulp.src(paths.assets.src)
        .pipe(gulp.dest(paths.assets.dest));
});

gulp.task('watch', function () {

    gulp.watch(paths.html.src, ['html']);
    gulp.watch(paths.css.src, ['css']);
    gulp.watch(paths.img.src, ['img']);
    gulp.watch(paths.assets.src, ['assets']);
});

gulp.task('default', ['scripts', 'html', 'css', 'assets', 'img', 'watch']);
