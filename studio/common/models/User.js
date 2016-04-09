var Base = require('./WWBase'),
    FeatureFactory = require('./factories/FeatureFactory'),
    userRoleIcons = require('./UserRoleIcons'),
    crypto = require('crypto'),
    Address = require('./Address');

function User(json) {
    if (json) {
        this.initFromJson(json);
    } else {
        this.role = 0;
    }
    this._gravatar = {};
}

User.prototype.initPrimitives = Base.initPrimitives;

User.prototype.initFromJson = function (json) {
    this.initPrimitives(json);
    this.address = new Address(json.address);
    this.profile = json.profile;
    this.location = FeatureFactory(json.location);
};

User.prototype.gravatar = function (size) {

    size = size || 200;
    var key = size.toString();

    if (this._gravatar[key]) return this._gravatar[key];
    var email = this.email || 'info@example.com';

    var md5 = crypto.createHash('md5').update(email).digest('hex');
    this._gravatar[key] = 'https://gravatar.com/avatar/' + md5 + '?s=' + key + '&d=retro';

    return this._gravatar[key];
};

User.prototype.roleIcon = function () {
    return userRoleIcons[this.role.toString()];
};

User.prototype.hasVerifiedAddress = function () {
    return (this.address.isVerified());
};

User.prototype.formattedName = function () {
    var fullname = this.profile.firstname + ' ' + this.profile.surname;
    if (fullname.length > 1) return fullname;
    return this.email;
};

module.exports = User;