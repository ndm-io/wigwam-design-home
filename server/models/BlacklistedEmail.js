'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {type: String, index: {unique: true}},
    ip: {type: String},
    timestamp: {type: Date}
});

module.exports = mongoose.model('BlacklistedEmail', schema);