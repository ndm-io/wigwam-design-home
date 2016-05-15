var defaultBase64 = require('./defaultBase64'),
    base64WithUint8Array = require('./Base64WithUint8Array'),
    pdfFromUint8Array = require('./PDFFromUint8Array'),
    Promise = require('promise');

var resize = function (mime) {

    return function (base64) {
        return new Promise(function (resolve, reject) {

            var origImage = new Image();

            origImage.onload = function () {
                var cvs = document.createElement('canvas');
                cvs.width = origImage.naturalWidth;
                cvs.height = origImage.naturalHeight;
                var ctx = cvs.getContext("2d").drawImage(origImage, 0, 0);
                var newImageData = cvs.toDataURL(mime, 0.5);
                resolve(newImageData);
            };

            origImage.src = base64
        });
    };

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
        .then(resize(type));
};

var returnUncompressedImageType = function (bytes, type) {
    return base64WithUint8Array(bytes)
        .then(toDataUri(type));
};

var _base64WithUint8ArrayAndType = function (bytes, type, compressed) {

    var ret;

    switch (type) {
        case 'image/png':

        case 'image/jpg':

        case 'image/jpeg':

        case 'image/gif':

        case 'application/x-photoshop':
        {
            ret = (compressed) ? returnCompressedImageType(bytes, type) : returnUncompressedImageType(bytes, type);
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

var base64WithUint8ArrayAndType = function (bytes, type) {
    return _base64WithUint8ArrayAndType(bytes, type, true);
};

var base64UrlWithUint8Array = function (bytes, type) {
    if (!bytes || bytes.length === 0) type = 'unknown';
    return base64WithUint8ArrayAndType(bytes, type);

};

var uncompressedBase64WithUint8Array = function (bytes, type) {
    return _base64WithUint8ArrayAndType(bytes, type, false);
};

module.exports = {
    base64UrlWithUint8Array: base64UrlWithUint8Array,
    uncompressedBase64WithUint8Array: uncompressedBase64WithUint8Array
};