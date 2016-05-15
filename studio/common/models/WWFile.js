var Base = require('./WWBase'),
    WWColor = require('./WWColor'),
    _ = require('lodash'),
    Thumbnailer = require('./Thumbnailer');

function WWFile(file, onload) {
    if (!file) return;

    var self = this;

    self.guid = file.guid || Base.guid();
    self.type = file.type;
    self.name = file.name;
    self.size = file.size;
    self.timeStamp = file.timeStamp || new Date();
    self.onload = onload;

    var fileReader = new FileReader();
    fileReader.onload = function (event) {
        self.arrayBuffer = event.target.result;

        Thumbnailer.base64UrlWithUint8Array(self.bytes(), self.type)
            .then(function (base64) {
                self.thumbnailUri = base64;
                if (self.onload) self.onload();
            })
            .catch(function (err) {
                console.log(err);
            });
    };


    fileReader.readAsArrayBuffer(file);

}


WWFile.prototype.bytes = function () {
    if (this.arrayBuffer) return new Uint8Array(this.arrayBuffer);
};

WWFile.prototype.initPrimitives = Base.initPrimitives;
WWFile.prototype.initArrayProperty = Base.initArrayProperty;


WWFile.prototype.initFromJson = function (json) {
    this.updateFromJson(json);
};

WWFile.prototype.updateFromJson = function (json) {
    this.initPrimitives(json);
    this.initArrayProperty('palette', json.palette, WWColor);
    this.tags = json.tags;

    if (json.arrayBuffer) {
        var uint8Array = new Uint8Array(json.arrayBuffer.data);
        this.arrayBuffer = uint8Array.buffer;
    }

};

WWFile.prototype.model = function (projectGuid) {
    return {
        guid: this.guid,
        projectGuid: projectGuid,
        type: this.type,
        name: this.name,
        size: this.size,
        timeStamp: this.timeStamp,
        thumbnailUri: this.thumbnailUri,
        arrayBuffer: this.arrayBuffer
    };
};

WWFile.prototype.tagStrings = function () {
    return _.map(this.tags, function (tag) {
        return tag['class'];
    });
};


module.exports = WWFile;