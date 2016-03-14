'use strict';

var User = require('../../models/User');

exports.updateAddress = function (req, res) {
    var address = req.body.address;
    updateUserObj(address, 'address', req, res);
};

exports.updateProfile = function (req, res) {
    var profile = req.body.profile;
    console.log(req.body);
    updateUserObj(profile, 'profile', req, res);
};

var updateUserObj = function (obj, key, req, res) {
    User.findById(req.user.id, function (err, user) {
        if (err) {
            res.send({error:err});
        } else {
            user[key] = obj;
            user.save(function(err) {
                if (err) return;
                res.send({status:'success'});
            });
        }
    });
};