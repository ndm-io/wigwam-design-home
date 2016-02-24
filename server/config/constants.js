var HTMLDIR = 'server/public/html';

var serverDir = 'server/public';

var consts = {
    htmlDir : function () {
        return [serverDir, '/html'].join('');
    }
};

module.exports.HTMLDIR = function () {
    return consts.htmlDir();
};