'use strict';

var mongoose = require('mongoose'),
    tagSchema = require('./TagSchema'),
    colorItemSchema = require('../ColorItem');

var imageSchema = new mongoose.Schema({
    guid: {type: String},
    originalUrl: {type: String},
    projectId: {type: String},
    contentType: {type: String, default: 'image/jpeg'},
    isComplete: {type: Boolean, default: false},
    description: {type: String},
    createdDate: {type: Date, default: Date.now},
    createdById: {type: mongoose.Schema.Types.ObjectId},
    tags: [tagSchema],
    dimensions: {
        height: {type: Number, default: 0},
        width: {type: Number, default: 0},
        type: {type: String, default: ''}
    },
    palette: [colorItemSchema]
});

module.exports = imageSchema;
