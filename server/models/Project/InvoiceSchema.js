'use strict';

var mongoose = require('mongoose'),
    viewSchema = require('./ViewSchema'),
    receiptSchema = require('./ReceiptSchema');

var invoiceSchema = new mongoose.Schema({
    guid: {type: String},
    projectName: {type: String, default: ''},
    projectDescription: {type: String, default: ''},
    projectUrn: {type: String, default: ''},
    products: [mongoose.Schema.Types.Mixed],
    clients: [mongoose.Schema.Types.Mixed],
    views: [viewSchema],
    receipts: [receiptSchema],
    createdDate: {type: Date, default: Date.now},
    sentDate: {type: Date},
    paidDate: {type: Date},
    receiptDate: {type: Date},
    sha256: {type: String}
});

module.exports = invoiceSchema;