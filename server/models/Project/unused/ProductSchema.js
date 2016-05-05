'use strict';

var mongoose = require('mongoose'),
    deepPopulate = require('mongoose-deep-populate')(mongoose);

var productSchema = new mongoose.Schema({
    guid: {type: String},
    name: {type: String},
    description: {type: String},
    category: {type: String},
    url: {type: String},
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],

    supplier: {type: String},
    supplierUrl: {type: String},

    vat: {type: Number, default: 0.2},
    _trade: {type: Number, default: 0},
    _retail: {type: Number, default: 0},
    _deliveryCost: {type: Number, default: 0},
    _deliveryPrice: {type: Number, default: 0},
    feePercent: {type: Number, default: 0.1},
    noCostItem: {type: Boolean, default: false},
    noVatItem: {type: Boolean, default: false},
    qty: {type: Number, default: 1},

    invoiced: {type: Boolean, default: false},
    quoted: {type: Boolean, default: false},

    createdDate: {type: Date, default: Date.now},
    selected: {type: Boolean, default: false}
});

productSchema.plugin(deepPopulate, {});

module.exports = productSchema;