var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    crypto = require('crypto'),
    GeoJSON = require('mongoose-geojson-schema'),
    status = require('../config/statuses'),
    Promise = require('promise');
// _ = require('lodash');

var userSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String,
    address: {
        address1: {type: String, default: ''},
        address2: {type: String, default: ''},
        address3: {type: String, default: ''},
        postcode: {type: String, default: ''},
        loc: GeoJSON.Feature
    },
    loc: GeoJSON.Feature,
    tokens: Array,
    settings: {
        messagePageSize: {type: Number, default: 5},
        startState: {type: String, default: 'home.dashboard'}
    },
    profile: {
        firstname: {type: String, default: ''},
        surname: {type: String, default: ''},
        phone: {type: String, default: ''},
        company: {type: String, default: ''},
        gender: {type: String, default: ''},
        location: {type: String, default: ''},
        website: {type: String, default: ''},
        picture: {type: String, default: ''},
        facebook: {type: String, default: ''},
        twitter: {type: String, default: ''},
        google: {type: String, default: ''},
        instagram: {type: String, default: ''},
        preferredContact: {type: String, default: 'phone'}
    },
    authorizedRoutes: [String],
    isPrivileged: {type: Boolean, default: false},
    role: {type: Number, default: 1},
    ioToken: {type: String},
    socketId: {type: String},
    chatStatus: {type: String, default: 'offline'}
});

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
        facebook: this.facebook,
        twitter: this.twitter,
        instagram: this.instagram,
        settings: this.settings,
        role: this.role,
        ioToken: this.ioToken,
        socketId: this.socketId,
        chatStatus: this.chatStatus
    };
};

userSchema.methods.card = function () {
    return {
        _id: this._id,
        email: this.email,
        phone: this.phone,
        profile: this.profile,
        facebook: this.facebook,
        twitter: this.twitter,
        instagram: this.instagram,
        role: this.role,
        socketId: this.socketId,
        chatStatus: this.chatStatus
    };
};

userSchema.statics.designers = function designers() {
    var model = this;
    return new Promise(function (resolve, reject) {
        model
            .where('role').gte(2)
            .where('chatStatus', status.online)
            .select('email profile chatStatus twitter facebook role socketId')
            .exec(function (err, docs) {
                if (err) {
                    reject(new Error('Unable to query designers'));
                } else {
                    resolve(docs);
                }
            });
    });
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

