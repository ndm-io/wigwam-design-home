'use strict';

var mongoose = require('mongoose'),
    Promise = require('promise');

var designbriefSchema = new mongoose.Schema({
    guid: {type: String},
    createdDate: {type: Date},
    brief: {type: mongoose.Schema.Types.Mixed, default: {}}
});

designbriefSchema.methods.updateWithJson = function updateWithJson(json) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.brief[json.key] = json.option;
        resolve(self);
    });
};

module.exports = designbriefSchema;