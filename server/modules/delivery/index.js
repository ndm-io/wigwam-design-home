var secrets         = require('../../config/secrets'),
    emailProvider   = require('../email-templates-provider'),
    emailer         = require('../emailer'),
    Promise         = require('promise'),
    User            = require('../../models/User'),
    randtoken       = require('rand-token');



var findUser = function (email) {
    return new Promise(function (resolve, reject) {
        User.findOne({email:email}, function (err, user) {
            if (err || !user) {
                reject(new Error('Unable to find user'));
            } else {
                resolve(user);
            }
        })
    });
};

var attachTokenToUser = function (user) {
    return new Promise(function (resolve, reject) {
        user.ioToken = randtoken.generate(16);
        user.save(function (err) {
            if (err) {
                reject(new Error('Unable to save io token'));
            } else {
                resolve(user);
            }
        });
    });
};

module.exports = function (tokenToSend, uidToSend, recipient, callback) {
    var link = secrets.host() + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend);
    var ctx = {
        link: link
    };

    findUser(uidToSend)
        .then(attachTokenToUser)
        .then(function (){
            return emailProvider.loginEmail(ctx);
        })
        .then(function (emailData) {
            return {
                to: uidToSend,
                from: "'Wigwam' <noreply@wigwam.design>",
                subject: 'One time login code',
                html: emailData.html,
                text: emailData.text
            };
        })
        .then(emailer.sendMail)
        .then(callback)
        .catch(callback);


};