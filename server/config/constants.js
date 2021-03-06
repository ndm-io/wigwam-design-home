var serverDir = 'server',
    publicDir = serverDir + '/public',
    secrets = require('./secrets');

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
    },
    identities: {
        twitter: {
            handle:'@SJIDesign',
            url:'http://www.twitter.com/sjidesign'
        }
    },
    mapBox: {
        apiKey: "pk.eyJ1IjoibmRtLWlvIiwiYSI6ImNpbjBpenk0NjAwbnp3NW0xemNsNWlrbnUifQ.Z5YrsWhgpPsvlD-bECOLrQ"
    }
};



module.exports.HTMLDIR = function () {
    return constants.consts.htmlDir();
};

module.exports.STUDIODIR = function () {
    return constants.consts.studioDir();
};

module.exports.identities = constants.identities;

module.exports.ROLES = constants.roles;
module.exports.mapBox = constants.mapBox;
module.exports.API_PREFIX = constants.apiPrefix;