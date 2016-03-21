
var BlacklistedEmail = require('../../models/BlacklistedEmail'),
    Promise = require('promise');

var validateEmail = (function () {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return function (email) {
        return new Promise(function (resolve, reject) {
            if (re.test(email)) {
                resolve(email);
            } else {
                reject(Error('Not a valid email address'));
            }
        }).then(function (email) {
            return new Promise(function (resolve, reject) {
                BlacklistedEmail.findOne({email: email}, function (err, doc) {
                    if (doc) {
                        reject(Error('Email Blacklisted'));
                    } else {
                        resolve(email);
                    }
                });
            });
        });

    };


}());

module.exports = validateEmail;