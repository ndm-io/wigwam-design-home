'use strict';

var Base = require('./WWBase');

function WWColor (colorArray) {
    if (!colorArray) return this;
    this.r = colorArray[0];
    this.g = colorArray[1];
    this.b = colorArray[2];
}

WWColor.prototype.initPrimitives = Base.initPrimitives;

WWColor.prototype.initFromJson = function (json) {
    this.r = json[0];
    this.g = json[1];
    this.b = json[2];
};

WWColor.prototype.rgbValue = function () {
    var rgb = [this.r, this.g, this.b].join(',');
    return 'rgb(' + rgb + ')';
};

module.exports = WWColor;