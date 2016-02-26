var serverDir = 'server',
    publicDir = serverDir + '/public';

var constants = {

    apiPrefix: '/api/v1/',
    consts:  {
        htmlDir : function () {
            return [publicDir, '/html'].join('');
        },
        studioDir: function () {
            return [serverDir, '/modules', '/studio'].join('');
        }
    },
    roles: {
        anon: 0,
        guest: 1,
        editor: 2,
        admin: 3
    }
};



module.exports.HTMLDIR = function () {
    return constants.consts.htmlDir();
};

module.exports.STUDIODIR = function () {
    return constants.consts.studioDir();
};

module.exports.ROLES = constants.roles;

module.exports.API_PREFIX = constants.apiPrefix;