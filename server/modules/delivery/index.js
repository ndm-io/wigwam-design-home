var secrets = require('../../config/secrets');
var emailProvider = require('../email-templates-provider');
var fs = require('fs');

module.exports = function (tokenToSend, uidToSend, recipient, callback) {
    var link = secrets.host() + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend);
    var ctx = {
        link: link
    };

    emailProvider.loginEmail(ctx)
        .then(function (emailData) {
            fs.writeFile('./html.html', emailData.html, 'utf8', function (err){
                console.log(err);
                callback();
            });

        })
        .catch(function (err) {
            console.log(err);
        });

};