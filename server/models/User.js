var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    crypto = require('crypto'),
    GeoJSON = require('mongoose-geojson-schema');
   // _ = require('lodash');

var userSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String,
    phone: {type: String, default: ''},
    address: {
        address1: {type: String, default: ''},
        address2: {type: String, default: ''},
        address3: {type: String, default: ''},
        postcode: {type: String, default: ''}
    },
    loc: GeoJSON.Feature,
    facebook: String,
    twitter: String,
    google: String,
    instagram: String,
    tokens: Array,
    settings: {
        messagePageSize: {type: Number, default: 5}
    },
    profile: {
        firstname: {type: String, default: ''},
        surname: {type: String, default: ''},
        company: {type: String, default: ''},
        gender: {type: String, default: ''},
        location: {type: String, default: ''},
        website: {type: String, default: ''},
        picture: {type: String, default: ''}
    },
    authorizedRoutes: [String],
    isPrivileged: {type: Boolean, default: false},
    role: {type: Number, default: 1},

    resetPasswordToken: String,
    resetPasswordExpires: Date
});

/**
 * Hash the password for security.
 * "Pre" is a Mongoose middleware that executes before each user.save() call.
 */

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(5, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/**
 * Validate user's password.
 * Used by Passport-Local Strategy for password validation.
 */

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/**
 * Check user has privilege for route
 */
userSchema.methods.hasRole = function (role) {
    return this.role >= role;
};

userSchema.methods.model = function () {
    return {
        _id: this._id,
        email: this.email,
        phone: this.phone,
        address: this.address,
        profile: this.profile,
        settings: this.settings,
        role: this.role
    };
};

/**
 * Get URL to a user's gravatar.
 * Used in Navbar and Account Management page.
 */

userSchema.methods.gravatar = function (size) {
    if (!size) size = 200;

    if (!this.email) {
        return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
    }

    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = mongoose.model('User', userSchema);

