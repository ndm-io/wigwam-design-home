var defaultBase64 = require('./defaultBase64'),
    base64WithUint8Array = require('./Base64WithUint8Array'),
    pdfFromUint8Array = require('./PDFFromUint8Array'),
    Promise = require('promise');

var returnImageType = function (bytes, type) {
    return base64WithUint8Array(bytes)
        .then(function (encoded) {
            return [
                'data:',
                type,
                ';base64,',
                encoded
            ].join('');
        });
};

var base64WithUint8ArrayAndType = function (bytes, type) {

    var ret;

    switch (type) {
        case 'image/png':

        case 'image/jpg':

        case 'image/gif':

        case 'image/svg+xml':
        {
            ret = returnImageType(bytes, type);
            break;
        }
        case 'application/x-photoshop':
        {
            ret = returnImageType(bytes, 'image/png');
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

    return base64WithUint8ArrayAndType(bytes, type);

};


module.exports = {
    base64UrlWithUint8Array: base64UrlWithUint8Array
};