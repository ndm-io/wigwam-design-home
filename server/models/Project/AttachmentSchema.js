'use strict';

var mongoose = require('mongoose'),
    tagSchema = require('./TagSchema'),
    _ = require('lodash');

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
    tags: [tagSchema],
    palette: []
});



attachmentSchema.statics.computeMetaData = function computeMetaData (attachment) {
    if (attachment.needsMeta) return attachmentMetaData(attachment);
    return Promise.resolve(attachment);
};

var saveAtt = function (attachment) {
    return new Promise(function (resolve, reject) {
        attachment.save(function (err) {
            if (err) {
                console.log('A saving error in Static method', err);
                reject(err);
            }
            resolve(attachment);
        });
    });
};

var imageTypes = ['image/jpg', 'image/jpeg', 'image/png'];

attachmentSchema.virtual('needsMeta').get(function needsMeta () {
    return _.contains(imageTypes, this.type);
});

attachmentSchema.methods.saveAttachment = function saveAttachment () {
    var att = this;
    return saveAtt(att);
};

attachmentSchema.statics.save = function save (attachment) {
    return saveAtt(attachment);
};

module.exports = attachmentSchema;