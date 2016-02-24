var serverDir = 'server';
var publicDir = serverDir + '/public';

var consts = {
    htmlDir : function () {
        return [publicDir, '/html'].join('');
    },
    studioDir: function () {
        return [serverDir, '/modules', '/studio'].join('');
    }
};

module.exports.HTMLDIR = function () {
    return consts.htmlDir();
};

module.exports.STUDIODIR = function () {
    return consts.studioDir();
};