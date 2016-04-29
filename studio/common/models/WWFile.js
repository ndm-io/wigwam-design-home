var Base = require('./WWBase'),
    Encoder = require('./Encoder');

function WWFile (nativeFileObject) {
    nativeFileObject.guid = nativeFileObject.guid || Base.guid();

    var fileReader = new FileReader();
    fileReader.onload = function (event) {
        nativeFileObject.bytes = new Uint8Array(event.target.result);
        if (nativeFileObject.onload) nativeFileObject.onload();
    };
    fileReader.readAsArrayBuffer(nativeFileObject);


    var _dataUri = undefined;
    Object.defineProperty(nativeFileObject, 'dataUri', {
        get: function () {
            if (!_dataUri) {
                if (nativeFileObject.bytes) {
                    _dataUri = Encoder.base64UrlWithUint8Array(nativeFileObject.bytes, nativeFileObject.type);
                } else {
                    return '';
                }
            }
            return _dataUri;
        }
    });


    return nativeFileObject;
}

module.exports = WWFile;