'use strict';

var User = require('../../models/User');
var validateEmail = require('../email-validator'),
    Promise = require('promise');

var updateUserObj = function (obj, key, req, res) {
    User.findById(req.user.id, function (err, user) {
        if (err) {
            if (res) res.send({error: err});
        } else {
            user[key] = obj;
            if (res) {
                user.save(function (err) {
                    if (err) return;
                    res.send({status: 'success'});
                });
            }
        }
    });
};

var user = function (userId) {
    return new Promise(function(resolve, reject) {
        User.findById(userId, function (err, user) {
            if (err) reject(new Error('Unable to find a user with this ID'));
            resolve(user);
        });
    });
};

exports.updateAddress = function (req, res) {

    user(req.user.id)
        .then(function (user) {
            user.address = req.body.address;
            user.location = req.body.location;
            return user;
        })
        .then(function (user) {
            user.save(function (err) {
                res.send({status:'success'});
            });
        })
        .catch(function (err) {
            console.log(err);
            res.send({status:'fail', err:err});
        });
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
