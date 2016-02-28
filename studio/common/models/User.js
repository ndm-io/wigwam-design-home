var Base = require('./WWBase');
var crypto = require('crypto');

function User(json) {
    Base.call(this, json)
}

User.prototype = Object.create(Base.prototype);

User.prototype.gravatar = function (size) {
    size = size || 200;
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = User;