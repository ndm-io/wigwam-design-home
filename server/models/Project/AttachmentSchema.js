'use strict';

var mongoose = require('mongoose'),
    tagSchema = require('./TagSchema');

var ColorThief = require('color-thief');
var colorThief = new ColorThief();
var sizeOf = require('image-size');

var Promise = require('promise');
var attachmentMetaData = require('./helpers/AttachmentMetaData');


var attachmentSchema = mongoose.Schema({
    guid: String,
    projectGuid: String,
    name: String,
    type: String,
    size: Number,
    timeStamp: String,
    note: String,
    arrayBuffer: Buffer,
    thumbnailUri: String,
    dimensions: {
        width: {type:Number},
        height: {type: Number},
        type: {type: String}
    },
    tags: [tagSchema]
});

attachmentSchema.methods.computeMetaData = function computeMetaData () {
    var att = this;
    return attachmentMetaData(att)
        .then(function (attachment) {
            return attachment;
        });
};

attachmentSchema.methods.saveAttachment = function saveAttachment () {
    var att = this;
    return new Promise(function (resolve, reject) {
        att.save(function (err) {
            if (err) reject(err);
            resolve(att);
        });
    });
};

module.exports = attachmentSchema;