var Base = require('./WWBase'),
    Encoder = require('./Encoder');

function WWFile(obj, onload) {
    if (obj instanceof File) {
        this.fromFile(obj, onload);
    } else {
        this.initFromJson(obj);
    }
}

WWFile.prototype.initFromJson = function (json) {

    if (!json) return;

    if (json instanceof String || typeof json === "string") {
        this._id = json;
        this.needsDownload = true;
    } else {
        this.guid = json.guid || Base.guid();
        this.type = json.type;
        this.size = json.size;
        this.name = json.name;
        this.note = json.note;

        if (json.arrayBuffer) {
            this.arrayBuffer = json.arrayBuffer.data;
            this.needsDownload = false;
        }
    }
};

WWFile.prototype.fromFile = function (file, onload) {

    var self = this;

    self.guid = file.guid || Base.guid();
    self.type = file.type;
    self.name = file.name;
    self.size = file.size;

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

    if (!this._dataUri) {
        var self = this;
        self._dataUri = '';
        Encoder.base64UrlWithUint8Array(self.bytes(), self.type)
            .then(function (base64) {
                self._dataUri = base64;
            });

    }

    return this._dataUri;
};

WWFile.prototype.model = function () {
    return {
        guid: this.guid,
        type: this.type,
        name: this.name,
        size: this.size,
        arrayBuffer: this.arrayBuffer
    };
};


module.exports = WWFile;