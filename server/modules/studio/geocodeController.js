var geocoderProvider = 'opencage';
var httpAdapter = 'http';
var secrets = require('../../config/secrets');

var extra = {
    apiKey: secrets[geocoderProvider].apiKey
};

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

exports.geocode = function (req, res) {
    var address = req.body.address;

    if (!address) {
        res.sendStatus(400);
        return;
    }

    geocoder.geocode(address)
        .then(function (result) {
            console.log(result);
            res.send(result);
        })
};

exports.reverse = function (req, res){
    var coords = req.body;

    if (!coords.lat || !coords.lon) {
        res.sendStatus(400);
        return;
    }

    geocoder.reverse(coords)
        .then(function(response) {
            console.log(response);
            res.send(response);
        })
        .catch(function(err) {
            console.log(err);
        });
};




