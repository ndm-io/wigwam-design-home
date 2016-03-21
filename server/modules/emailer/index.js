var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var secrets = require('../../config/secrets');

var transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.mandrillapp.com',
    port: 587,
    auth: {
        user: secrets.mandrill.user,
        pass: secrets.mandrill.password
    }
}));

exports.sendMail = function (opts) {
    return new Promise(function (resolve, reject) {

        transport.sendMail(opts, function (err) {
            if (!err) {
                resolve();
            } else {
                reject(Error('Problem sending mail'));
            }
        });

    });
};