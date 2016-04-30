var Base = require('./WWBase'),
    Encoder = require('./Encoder');

function WWFile(obj, onload) {
    if (obj instanceof File) {
        this.fromFile(obj, onload);
    } else {

    }
}

WWFile.prototype.fromFile = function (file, onload) {

    var self = this;

    self.guid = file.guid || Base.guid();
    self.type = file.type;


    var fileReader = new FileReader();
    fileReader.onload = function (event) {
        self.arrayBuffer = event.target.result;

        Encoder.base64UrlWithUint8Array(self.bytes(), self.type)
            .then(function (base64) {
                self._dataUri = base64;
                if (onload) onload(event.target.result);
            });

    };

    fileReader.readAsArrayBuffer(file);
};

WWFile.prototype.bytes = function () {
    if (!this._bytes) {
        if (this.arrayBuffer) {
            this._bytes = new Uint8Array(this.arrayBuffer);
        }
    }
    return this._bytes;
};

WWFile.prototype.dataUri = function () {
    return this._dataUri;
};

module.exports = WWFile;