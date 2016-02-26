exports.login = function (req, res) {
    res.send(req.user.model());
};

exports.logout = function (req, res) {
    req.logOut();
    res.sendStatus(200);
};