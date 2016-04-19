'use strict';

var mongoose = require('mongoose');

var receiptSchema = new mongoose.Schema({
    guid: {type: String},
    createdDate: {type: Date, default: Date.now},
    amount: {type: Number}
});

module.exports = receiptSchema;