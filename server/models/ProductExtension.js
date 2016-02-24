var _ = require('lodash');


var metricAsGBP = function (metric) {
    return metric * 100;
};

var priceEachPennies = function () {
    var each;
    if (this.noVatItem) {
        each = this._trade;
    } else {
        each = (this._trade * this.vat) + this._trade;
    }
    var buyingFee = each * this.feePercent;
    return each + buyingFee
};

var priceFn = function () {
    var metric = this.priceEachPennies() * this.qty;
    metric = this.metricAsGBP(metric);
    return this.format(metric);
};

var format = function format (metric) {
    return metric.toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
};

var imageSrc = function () {
    var image = this.images[0];
    if (image) return '/api/project/' + image.projectId + '/image/' + image.guid;
    return '';
};

var addFns = function (json) {
    json.price = priceFn;
    json.metricAsGBP = metricAsGBP;
    json.priceEachPennies = priceEachPennies;
    json.imageSrc = imageSrc;
    json.format = format;
    return json;
};


exports.toProducts = function (array) {
    return _.map(array, function (json) {
        return addFns(json);
    })
};

exports.priceTotal = function (products) {
    var total =_.reduce(products, function (sum, product) {
        return sum + (product.priceEachPennies() * product.qty);
    }, 0);
    return format(metricAsGBP(total));
};
