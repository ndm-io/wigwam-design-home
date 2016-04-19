'use strict';

var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    tag: {type: String},
    prob: {type: Number}
});

module.exports = tagSchema;