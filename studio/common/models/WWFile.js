var Base = require('./WWBase');

function WWFile (nativeFileObject) {
    nativeFileObject.guid = Base.guid();
    return nativeFileObject;
}

module.exports = WWFile;