var Base = require('./WWBase');
var crypto = require('crypto');
var Address = require('./Address');

function User(json) {
    if (json) {
        this.initFromJson(json);
    }
}

User.prototype.initPrimitives = Base.initPrimitives;

User.prototype.initFromJson = function (json) {
    this.initPrimitives(json);
    this.address = new Address(json.address);
    this.profile = json.profile;
};

User.prototype.gravatar = function (size) {
    size = size || 200;
    var email = this.email || 'info@example.com';

    var md5 = crypto.createHash('md5').update(email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

User.prototype.hasVerifiedAddress = function () {
    return (this.address.isVerified());
};

module.exports = User;