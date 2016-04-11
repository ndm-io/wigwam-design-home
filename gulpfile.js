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
    studioLess = require('./gulp/studio/taskLess'),
    studioCommonImgTask = require('./gulp/studio/commonImgTask'),
    studioVendorCss = require('./gulp/studio/taskVendorCss'),
    studioVendorJs = require('./gulp/studio/taskVendorJs'),
    studioBrowserify = require('./gulp/studio/taskBrowserify'),
    studioFonts = require('./gulp/studio/taskFonts'),
    studioJson = require('./gulp/studio/taskJson');

gulp.task('studioCss', studioTaskCss);
gulp.task('studioLess', studioLess);
gulp.task('studioCommonImg', studioCommonImgTask);
gulp.task('studioVendorCss', studioVendorCss);
gulp.task('studioVendorJs', studioVendorJs);
gulp.task('studioBrowserify', studioBrowserify);
gulp.task('studioFonts', studioFonts);
gulp.task('studioJson', studioJson);



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
    gulp.watch(studioPaths.less.src, ['studioLess']);
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
    'studioLess',
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
    'studioLess',
    'studioVendorCss',
    'studioCommonImg',
    'studioVendorJs',
    'studioBrowserify',
    'studioFonts',
    'studioJson',
    'watchStudio',
    'watchHome'
];

var quick = ['studioBrowserify', 'watchStudio'];

gulp.task('default', defaults);
gulp.task('build', build);
gulp.task('quick', quick);
