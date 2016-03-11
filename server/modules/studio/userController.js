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