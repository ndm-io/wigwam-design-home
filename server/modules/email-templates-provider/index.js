
var Promise = require('promise'),
    EmailTemplates = require('swig-email-templates');

var templates = new EmailTemplates({root:'./server/modules/email-templates-provider/templates/'});

exports.loginEmail = function (data) {

    return new Promise(function (resolve, reject) {
        templates.render('login.html', data, function(err, html, text) {
            if (err) {
                reject(Error('Unable to render'));
            } else {
                resolve({html: html, text: text});
            }
        });
    });
};