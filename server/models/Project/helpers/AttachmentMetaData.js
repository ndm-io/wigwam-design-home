'use strict';

var Promise = require('promise'),
    Clarifai = require('clarifai'),
    sizeOf = require('image-size'),
    ColorThief = require('color-thief'),
    colorThief = new ColorThief(),
    _ = require('lodash');


var client = new Clarifai();

var addDimensionMetaData = function (attachment) {

    return new Promise(function (resolve) {
        var dimensions = sizeOf(attachment.arrayBuffer);

        attachment.dimensions.width = dimensions.width;
        attachment.dimensions.height = dimensions.height;
        attachment.dimensions.type = dimensions.type;

        resolve(attachment);
    });
};

var addTagMetaData = function (attachment) {

    return new Promise(function (resolve, reject) {
        client.tagFromBuffers('image', attachment.arrayBuffer, function (err, results) {
            if (err) reject(err);
            attachment.tags = _.map(results.tags, function (tag) {
                return {
                    "class":tag['class'],
                    probability: tag['probability']
                };
            });
            resolve(attachment);
        })
    });
};

var addColorMetaData = function (attachment) {
    return new Promise(function (resolve, reject) {

        attachment.palette = colorThief.getPalette(attachment.arrayBuffer, 8);
        resolve(attachment);
    });
};


function AttachmentMetaData (attachment) {
    return addDimensionMetaData(attachment)
        .then(addTagMetaData)
        .then(addColorMetaData);
}

module.exports = AttachmentMetaData;