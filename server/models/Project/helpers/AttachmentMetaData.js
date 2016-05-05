'use strict';

var Promise = require('promise'),
    Clarifai = require('clarifai'),
    sizeOf = require('image-size');

var client = new Clarifai();

var addDimensionMetaData = function (attachment) {
    //var dimensions = sizeOf(attachment.arrayBuffer);
    //
    //attachment.dimensions.width = dimensions.width;
    //attachment.dimensions.height = dimensions.height;
    //attachment.dimensions.type = dimensions.type;
    //
    //return Promise.resolve(attachment);
    return new Promise(function (resolve) {
        var dimensions = sizeOf(attachment.arrayBuffer);

        attachment.dimensions.width = dimensions.width;
        attachment.dimensions.height = dimensions.height;
        attachment.dimensions.type = dimensions.type;

        resolve(attachment);
    });
};

var addImageMetaData = function (attachment) {

    return new Promise(function (resolve, reject) {
        client.tagFromBuffers('image', attachment.arrayBuffer, function (err, results) {
            if (err) reject(err);
            attachment.tags = results.tags;
            resolve(attachment);
        })
    });
};


function AttachmentMetaData (attachment) {
    return addDimensionMetaData(attachment)
        .then(addImageMetaData);
}

module.exports = AttachmentMetaData;