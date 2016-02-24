var Image = require('../../../node_modules/lwip/lib/Image.js');
var Promise = require('promise');

Image.prototype.scaledSize = function (maxW, maxH) {
    var currH = this.height(),
        currW = this.width();

    var ratio = currH / currW;

    if (currW >= maxW && ratio <= 1) {
        currW = maxW;
        currH = currW * ratio;
    } else if (currH >= maxH) {
        currH = maxH;
        currW = currH / ratio;
    }

    return {w: currW, h: currH};
};

Image.prototype.aspectResize = function (maxW, maxH) {
    var size = this.scaledSize(maxW, maxH);
    var self = this;
    return new Promise(function (fulfill, reject) {
        self.resize(size.w, size.h, 'lanczos', function (err, image) {
            if (err) reject(err);
            else fulfill(image);
        });
    });
};

Image.prototype.toBase64EncodedFormData = function () {
    var self = this;
    return new Promise(function (fulfill, reject) {
        self.toBuffer('jpg', function (err, buffer) {
            if (err) reject(err);

            var base64 = buffer.toString('base64');
            var form = [];
            form["encoded_data"] = base64;
            fulfill(form);

        });
    });
};