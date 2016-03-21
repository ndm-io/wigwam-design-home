
var Promise         = require('promise'),
    EmailTemplates  = require('swig-email-templates'),
    identities      = require('../../config/constants').identities,
    templates       = new EmailTemplates({root:'./server/modules/email-templates-provider/templates/'});

var urls = {
    login:'./login/login.html'
};

var renderTemplate = function (tmpl, data) {
    return new Promise(function (resolve, reject) {
        data.identities = identities;
        templates.render(tmpl, data, function(err, html, text) {
            if (err) {
                reject(Error('Unable to render'));
            } else {
                resolve({html: html, text: text});
            }
        });
    });
};

exports.loginEmail = function (data) {
    return renderTemplate(urls.login, data);
};