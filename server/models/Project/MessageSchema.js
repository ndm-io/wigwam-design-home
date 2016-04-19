'use strict';

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    guid: {type: String, default: ''},
    projectGuid: {type: String},
    createdDate: {type: Date, default: Date.now},
    createdBy: {type: String},
    createdById: {type: String},
    createdByGravatar: {type: String},
    base64Encoded: {type: String},
    heading: {type: String, default: ''},
    readBy: {type: mongoose.Schema.Types.Mixed, default: {}}
});

messageSchema.methods.markReadBy = function markReadBy(userId, dateStr, cb) {

    if (this.readBy[userId]) {
        cb();
    } else {
        this.readBy[userId] = dateStr;
        this.markModified('readBy');
        this.save(function (err) {
            cb(err);
        });
    }
};

module.exports = messageSchema;