

exports.sendToken = function (passwordless) {
    return function (req, res, next) {
        return passwordless.requestToken(function (user, delivery, callback) {
            callback(null, user);

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

exports.login = function (req, res) {
    res.send(req.user.model());
};

exports.logout = function (passwordless) {
   return function (req, res, next) {
       req.session.destroy();
       passwordless.logout();
       res.sendStatus(200);
   };
};