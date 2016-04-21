'use strict';

var Base = require('./WWBase.js'),
    itemsModel = require('./DesignbriefItems'),
    _ = require('lodash');

function Designbrief(json) {
    if (json) {
        this.initFromJson(json);
    } else {
        this.guid = Base.guid();
        this.createdDate = new Date();
        this.completedDate = undefined;
        this.brief = {};
        this._content = undefined;
    }

    var designbrief = this;
    Object.defineProperty(designbrief, 'locked', {
        get: function () {
            return (designbrief.completedDate);
        },
        set: function () {

        }
    });

    Object.defineProperty(designbrief, 'content', {
        get: function () {
            if (!designbrief._content) {
                designbrief._content = _(Object.keys(designbrief.brief))
                    .sortBy(function (o) {
                        return itemsModel.orderForLabel(o);
                    })
                    .map(function (heading) {
                        return {
                            heading: heading,
                            subheading: designbrief.brief[heading].label,
                            content: designbrief.brief[heading].description,
                            image: designbrief.brief[heading].img
                        };
                    })
                    .value();
            }
            return designbrief._content;
        }
    });

}

Designbrief.prototype.initFromJson = function (json) {
    if (!json) return;
    this.initPrimitives(json);
};

Designbrief.prototype.initPrimitives = Base.initPrimitives;
Designbrief.prototype.initArrayProperty = Base.initArrayProperty;

Designbrief.prototype.selectWithObj = function (obj) {
    this._content = undefined;
    this.brief[obj.key] = obj.option;
};

Designbrief.prototype.select = function (item, option) {
    var obj = {
        key: item.label,
        option: {
            label: option.label,
            description: option.description
        }
    };
    this.selectWithObj(obj);
};

Designbrief.prototype.isSelected = function (item, option) {
    if (!this.brief[item.label]) return false;
    return (this.brief[item.label].label === option.label);
};


module.exports = Designbrief;