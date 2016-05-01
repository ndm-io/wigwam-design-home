'use strict';

var mongoose = require('mongoose');

var attachmentSchema = mongoose.Schema({
    guid: String,
    name: String,
    type: String,
    size: Number,
    note: String,
    arrayBuffer: Buffer
});

module.exports = attachmentSchema;