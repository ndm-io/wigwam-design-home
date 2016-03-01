var Base = require('./WWBase');
var crypto = require('crypto');

function User(json) {
    if (json) {
        this.initFromJson(json);
    }
}

User.prototype.initPrimitives = Base.initPrimitives;

User.prototype.initFromJson = function (json) {
    this.initPrimitives(json);
};

User.prototype.gravatar = function (size) {
    size = size || 200;
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = User;