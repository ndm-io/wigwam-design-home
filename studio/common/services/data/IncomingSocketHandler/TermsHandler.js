var _ = require('lodash'),
    types = require('../../../../../server/config/IOTypes'),
    Buffer = require('buffer').Buffer;

var Converter = require("csvtojson").Converter;

function TermsHandler(sf, cache) {

    sf.on(types.terms, function (data) {
        var buf = new Buffer(data);
        var str = buf.toString();
        var converter = new Converter({});

        converter.fromString(str, function(err,result){
            cache.terms = result;
        });

    });

}

module.exports = TermsHandler;