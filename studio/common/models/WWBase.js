
var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

function Base(json) {
    this.genGuid();
    this.initPrimitives(json);
}

Base.prototype.initPrimitives = function (json) {
    for (var key in json) {
        if (json.hasOwnProperty(key) && !Array.isArray(json[key])) {
            if (typeof json[key] === 'string') {
                if (reISO.test(json[key])) {
                    this[key] = new Date(json[key]);
                } else {
                    this[key] = json[key];
                }
            } else {
                this[key] = json[key];
            }
        }
    }
};

Base.prototype.initArrayProperty = function (property, jsonArray, type) {
    this[property] = [];
    if (!jsonArray) return;
    for (var i = 0; i < jsonArray.length; i++) {
        var newType;
        if (type) {
            newType = new type();
            newType.initFromJson(jsonArray[i]);
        } else {
            newType = jsonArray[i];
        }
        this[property].push(newType);
    }
};



Base.prototype.genGuid = function () {
    var guid = (function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    })();

    this.guid = guid();

};

module.exports = Base;