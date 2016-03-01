function Base() {

}

Base.reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

Base.initPrimitives = function (json) {
    for (var key in json) {
        if (json.hasOwnProperty(key) && !Array.isArray(json[key])) {
            if (typeof json[key] === 'string') {
                if (Base.reISO.test(json[key])) {
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

Base.initArrayProperty = function (property, jsonArray, type) {
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


Base.guid = function () {

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }


    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();


};

module.exports = Base;