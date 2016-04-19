'use strict';

var mongoose = require('mongoose');

var viewSchema = new mongoose.Schema({
    userEmail: {type: String},
    ip: {type: String},
    createdDate: {type: Date, default: Date.now},
    userId: {type: mongoose.Schema.Types.ObjectId}
});

module.exports = viewSchema;