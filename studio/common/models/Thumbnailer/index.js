var defaultBase64 = require('./defaultBase64'),
    base64WithUint8Array = require('./Base64WithUint8Array'),
    pdfFromUint8Array = require('./PDFFromUint8Array'),
    Promise = require('promise');

var resize = function (base64) {

    return new Promise(function (resolve, reject) {
        var img = new Image();
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        img.onload = function () {
            var height = 100;
            var width = height * img.height / img.width;
            canvas.height = height;
            canvas.width = width;

            ctx.drawImage(img, 0, 0, 100, width);
            resolve(canvas.toDataURL());
        };
        img.src = base64;
    });

};

var toDataUri = function (type) {
    return function (encoded) {
        return [
            'data:',
            type,
            ';base64,',
            encoded
        ].join('');
    }
};

var returnCompressedImageType = function (bytes, type) {
    return base64WithUint8Array(bytes)
        .then(toDataUri(type))
        .then(resize);
};

var returnUncompressedImageType = function (bytes, type) {
    return base64WithUint8Array(bytes)
        .then(toDataUri(type));
};

var base64WithUint8ArrayAndType = function (bytes, type) {

    var ret;

    switch (type) {
        case 'image/png':

        case 'image/jpg':

        case 'image/gif':

        case 'application/x-photoshop':
        {
            ret = returnCompressedImageType(bytes, type);
            break;
        }
        case 'image/svg+xml':
        {
            ret = returnUncompressedImageType(bytes, type);
            break;
        }
        case 'application/pdf':
        {
            ret = pdfFromUint8Array(bytes);
            break;
        }
        default:
        {
            var data = 'data:image/svg+xml;base64,' + defaultBase64;
            ret = Promise.resolve(data);
            break;
        }
    }

    return ret;

};

var base64UrlWithUint8Array = function (bytes, type) {
    if (!bytes || bytes.length === 0) type = 'unknown';
    return base64WithUint8ArrayAndType(bytes, type);

};


module.exports = {
    base64UrlWithUint8Array: base64UrlWithUint8Array
};