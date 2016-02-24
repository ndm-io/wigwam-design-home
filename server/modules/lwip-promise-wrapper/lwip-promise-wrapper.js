var lwip = require('lwip');
var Promise = require('promise');

var lwipOpen = Promise.denodeify(lwip.open);
var Image = require('./Image-Extension');

exports.open = function (data, type) {
    return lwipOpen(data, type);
};
