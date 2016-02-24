var CONST = require('../config/constants');

var root = {root: CONST.HTMLDIR()};

exports.index = function (req, res) {

    res.sendFile('index.html', root);

};

exports.about = function (req, res) {

    res.sendFile('about.html', root);

};
	
