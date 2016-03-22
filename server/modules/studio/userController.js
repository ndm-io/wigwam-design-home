'use strict';

var User = require('../../models/User');
var validateEmail = require('../email-validator');

var updateUserObj = function (obj, key, req, res) {
    User.findById(req.user.id, function (err, user) {
        if (err) {
            res.send({error: err});
        } else {
            user[key] = obj;
            user.save(function (err) {
                if (err) return;
                res.send({status: 'success'});
            });
        }
    });
};

exports.updateAddress = function (req, res) {
    var address = req.body.address;
    updateUserObj(address, 'address', req, res);
};

exports.updateProfile = function (req, res) {
    var profile = req.body.profile;
    updateUserObj(profile, 'profile', req, res);
};

exports.userMiddleware = function (req, res, next) {


    if (!req.pUser) {
        next();
        return;
    }

    validateEmail(req.pUser)
        .then(function (email) {
            User.findOne({email: email}, function (err, user) {

                if (!user) return new Error('No such user');
                req.user = user;
                next();
            });
        })
        .catch(function (err) {
            console.log(err);
            next();
        });

};
