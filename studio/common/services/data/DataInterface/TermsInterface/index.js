var types = require('../../../../../../server/config/IOTypes');

module.exports = function (sf, cache) {
    return {
        sendGetTerms: function () {
            if (cache.terms.length === 0) sf.emit(types.terms);
        },
        terms: function () {
            return cache.terms;
        }
    }
};