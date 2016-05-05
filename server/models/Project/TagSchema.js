'use strict';

var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    "class":[{type: String}],
    conceptId:[{type:String}],
    probability:[{type:Number}]
});

module.exports = tagSchema;