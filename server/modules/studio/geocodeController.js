var geocoderProvider = 'opencage';
var httpAdapter = 'http';
var secrets = require('../../config/secrets');

var extra = {
    apiKey: secrets[geocoderProvider].apiKey
};

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);
var postcodeRe = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i;

var PostcodesIO = require('postcodesio-client');
var postcodes = new PostcodesIO();


exports.geocode = function (req, res) {
    var address = req.body.address;

    if (!address) {
        res.sendStatus(400);
        return;
    }

    if (postcodeRe.test(address)) {
        geocodePostcode(req, res, address.replace(/ /g,''));
    } else {
        geocode(req, res, address);
    }

};

var geocode = function (req, res, data) {
    data.countryCode = 'gb';
    geocoder.geocode(data)
        .then(function (result) {
            res.send(result);
        });
};

var geocodePostcode = function (req, res, data) {
    postcodes
        .lookup(data)
        .then(function (postcode) {
            return markerFromPostcode(postcode);
        })
        .then(function (marker) {
            res.send([marker]);
        })
        .catch(function (err) {
            res.statusCode(500);
            res.send({error:err});
        });
};

var markerFromPostcode = function (p) {
    return {
        latitude: p.latitude,
        longitude: p.longitude,
        streetNumber: '',
        streetName: '',
        county: p.admin_district,
        city: p.parish,
        state: p.admin_district,
        zipcode: p.postcode
    };
};

exports.reverse = function (req, res){
    var coords = req.body;

    if (!coords.lat || !coords.lon) {
        res.sendStatus(400);
        return;
    }

    geocoder.reverse(coords)
        .then(function(response) {
            return postcodes
                .reverseGeocode(coords.lat, coords.lon)
                .then(function (postcode) {
                    response[0].zipcode = postcode.postcode;
                    return response;
                });
        })
        .then(function (data) {
            res.send(data);
        })
        .catch(function(err) {
            console.log(err);
        });
};




