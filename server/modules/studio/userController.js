'use strict';

var User = require('../../models/User');

exports.updateAddress = function (req, res) {
    var address = req.body.address;


    User.findById(req.user.id, function(err, user) {

        if (err) {
            res.send({error:err});
        } else {
            user.address = address;
            user.save(function(err) {
                if (err) return;
                res.send({status:'success'});
            });
        }


    });
};

exports.updateProfile = function (req, res) {
    var data = req.body.data;
    User.findById(req.user.id, function (err, user) {
        if (err) {
            res.send({error:err});
        } else {
            user.profile.firstname = data.firstname;
            user.profile.surname = data.surname;
            user.email = data.email;
            user.facebook = data.facebook;
            user.twitter = data.twitter;
            user.instagram = data.instagram;

            user.save(function(err) {
                if (err) return;
                res.send({status:'success'});
            });
        }
    });

};