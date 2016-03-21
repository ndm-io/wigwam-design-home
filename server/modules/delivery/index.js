var secrets = require('../../config/secrets');
var emailProvider = require('../email-templates-provider');
var emailer = require('../emailer');

module.exports = function (tokenToSend, uidToSend, recipient, callback) {
    var link = secrets.host() + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend);
    var ctx = {
        link: link
    };

    emailProvider.loginEmail(ctx)
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