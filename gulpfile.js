var gulp = require('gulp'),
    homePaths = require('./gulp/homeConstants').paths,
    studioPaths = require('./gulp/studioConstants').paths;

/**
 * Home Site Tasks
 */

var homeTaskScripts = require('./gulp/home/taskScripts'),
    homeTaskHtml = require('./gulp/home/taskHtml'),
    homeTaskCss = require('./gulp/home/taskCss'),
    homeTaskImg = require('./gulp/home/taskImg'),
    homeTaskAssets = require('./gulp/home/taskAssets');

gulp.task('scripts', homeTaskScripts);
gulp.task('html', homeTaskHtml);
gulp.task('css', homeTaskCss);
gulp.task('img', homeTaskImg);
gulp.task('assets', homeTaskAssets);

/**
 * Studio site tasks
 */

var studioTaskCss = require('./gulp/studio/taskCss'),
    studioCommonImgTask = require('./gulp/studio/commonImgTask'),
    studioVendorCss = require('./gulp/studio/taskVendorCss'),
    studioVendorJs = require('./gulp/studio/taskVendorJs'),
    studioBrowserify = require('./gulp/studio/taskBrowserify'),
    studioFonts = require('./gulp/studio/taskFonts');

gulp.task('studioCss', studioTaskCss);
gulp.task('studioCommonImg', studioCommonImgTask);
gulp.task('studioVendorCss', studioVendorCss);
gulp.task('studioVendorJs', studioVendorJs);
gulp.task('studioBrowserify', studioBrowserify);
gulp.task('studioFonts', studioFonts);


/**
 * Watch Tasks
 */

gulp.task('watchHome', function () {
    gulp.watch(homePaths.html.src, ['html']);
    gulp.watch(homePaths.css.src, ['css']);
    gulp.watch(homePaths.img.src, ['img']);
    gulp.watch(homePaths.assets.src, ['assets']);
});

gulp.task('watchStudio', function () {
    gulp.watch(studioPaths.css.src, ['studioCss']);
    gulp.watch(studioPaths.img.src, ['studioCommonImg']);
    gulp.watch(studioPaths.browserify.watch, ['studioBrowserify']);
});

/**
 * Defaults
 */

var defaults = ['scripts',
    'html',
    'css',
    'assets',
    'img',
    'studioCss',
    'studioVendorCss',
    'studioCommonImg',
    'studioVendorJs',
    'studioBrowserify',
    'watchStudio',
    'watchHome'
];

var build = ['scripts',
    'html',
    'css',
    'assets',
    'img',
    'studioCss',
    'studioVendorCss',
    'studioCommonImg',
    'studioVendorJs',
    'studioBrowserify',
    'studioFonts',
    'watchStudio',
    'watchHome'
];

gulp.task('default', defaults);
gulp.task('build', build);
