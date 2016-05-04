'use strict';

var mongoose = require('mongoose');

var attachmentSchema = mongoose.Schema({
    guid: String,
    projectGuid: String,
    name: String,
    type: String,
    size: Number,
    timeStamp: String,
    note: String,
    arrayBuffer: Buffer,
    thumbnailUri: String
});

module.exports = attachmentSchema;