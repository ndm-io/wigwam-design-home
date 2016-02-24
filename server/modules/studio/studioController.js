
exports.index = function (req, res) {

    res.sendFile('index.html',{root:'./server/views/'});

};
