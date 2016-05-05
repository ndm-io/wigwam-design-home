'use strict';

var Promise = require('promise'),
    _ = require('lodash'),
    Clarifai = require('./clarifai_node'),
    secrets = require('../../../config/secrets'),
    sizeOf = require('image-size');

Clarifai.initAPI(secrets.clarifai.clientId, secrets.clarifai.clientSecret);

var addDimensionMetaData = function (attachment) {
    var dimensions = sizeOf(attachment.arrayBuffer);

    attachment.dimensions.width = dimensions.width;
    attachment.dimensions.height = dimensions.height;
    attachment.dimensions.type = dimensions.type;

    return Promise.resolve(attachment);
};

var addImageMetaData = function (attachment) {
    return Clarifai.tagAttachment(attachment);
};


function AttachmentMetaData (attachment) {
    return addDimensionMetaData(attachment)
        .then(addImageMetaData);
}

module.exports = AttachmentMetaData;