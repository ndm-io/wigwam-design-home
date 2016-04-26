
var Attacher = require('../Common').attach,
    types = require('../../../config/IOTypes'),
    fs = require('fs'),
    path = require('path');

function TermsHandler (io, socket) {
    var attach = Attacher(socket);

    attach(types.terms, function () {

        var filename = path.join(__dirname, 'data.csv');

        fs.readFile(filename, function (err, data) {
            socket.emit(types.terms, data);
        });

    });

}

module.exports = TermsHandler;