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

module.exports.paths = paths;
module.exports.vortexScriptsOrder = vortexScriptsOrder;