var emailValidator = require('../email-validator');

exports.sendToken = function (passwordless) {
    return function (req, res, next) {
        return passwordless.requestToken(function (user, delivery, callback, req) {
            emailValidator(user)
                .then(function (email) {
                    callback(null, email);
                })
                .catch(function (err) {
                    console.log('An error with the validation', err);
                    callback(null, null);
                });

        })(req, res, next);
    };
};

exports.complete = function (req, res) {
    res.sendStatus(200);
};

exports.profile = function (req, res) {
    if (req.user) {
        res.send(req.user.model());
    } else {
        res.sendStatus(401);
    }
};

//exports.login = function (req, res) {
//    res.send(req.user.model());
//};

exports.logout = function (passwordless) {
    return function (req, res, next) {
        req.session.destroy();
        passwordless.logout();
        req.user.ioToken = undefined;
        req.user.save();
        res.sendStatus(200);
    };
};