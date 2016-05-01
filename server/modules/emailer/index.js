var nodemailer = require('nodemailer');

var SparkPost = require('sparkpost');
var client = new SparkPost();

exports.sendMail = function (opts) {
    return new Promise(function (resolve, reject) {

        client.transmissions.send({
            transmissionBody: {
                content: opts,
                recipients: [
                    {address: opts.to}
                ]
            }
        }, function (err, res) {
            if (err) {
                console.log(err);
                reject(new Error('Unable to send mail via spark post'));
            } else {
                resolve();
            }
        });


    });
};