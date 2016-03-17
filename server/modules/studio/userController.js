'use strict';

var User = require('../../models/User');
var validateEmail = require('../email-validator');

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

exports.updateAddress = function (req, res) {
    var address = req.body.address;
    updateUserObj(address, 'address', req, res);
};

exports.updateProfile = function (req, res) {
    var profile = req.body.profile;
    updateUserObj(profile, 'profile', req, res);
};

exports.userMiddleware = function (req, res, next) {
    if (req.pUser && validateEmail(req.pUser)) {
        User.findOne({email: req.pUser}, function (err, user) {
            if (!user) {
                user = new User({email:req.pUser});
                user.save();
            }
            req.user = user;
            next();
        });
    } else {
        next();
    }

};
