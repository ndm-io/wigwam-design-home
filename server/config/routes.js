var urls = require('./urls');

var checkRoleMiddleware = function (requiredRole) {
    return function (req, res, next) {
        if (req.user.role >= requiredRole) {
            next();
        } else {
            res.sendStatus(401);
        }

    };
};

exports.urls = urls;
exports.initRoutes = function (app, passwordless) {

    /**
     * Main routes for SPA
     */

    app.get(urls.home.url, urls.home.fn);
    app.get(urls.about.url, urls.about.fn);

    /**
     * Studio Route
     */

    app.get(urls.studio.url, urls.studio.fn);

    /**
     * API Routes
     */


    app.get(urls.profile.url, urls.profile.fn); // Check user is logged in. If so sends user model
    app.post(urls.sendToken.url, urls.sendToken.fn(passwordless), urls.sendToken.complete); // Sends a token
    app.post(urls.logout.url, urls.logout.fn(passwordless)); // Destroys session

    app.post(urls.geocode.url, passwordless.restricted(), urls.geocode.fn);
    app.post(urls.reverse.url, passwordless.restricted(), urls.reverse.fn);

    app.post(urls.updateAddress.url, passwordless.restricted(), urls.updateAddress.fn);
    app.post(urls.updateProfile.url, passwordless.restricted(), urls.updateProfile.fn);

    app.get(urls.projects.url, passwordless.restricted(), checkRoleMiddleware(urls.projects.role), urls.projects.fn);

};
