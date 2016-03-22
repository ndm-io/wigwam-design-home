'use strict';

var Base = require('../../common/models/WWBase'),
    Message = require('../../common/models/Message');

function Chat (data) {
    if (!data) data = {};

    this.name = data.name || 'Chat:' + new Date().toString();
    this.occupants = data.occupants || [];
    this.instigator = data.instigator || {};
    this.messages = data.messages || [];
}

Chat.prototype.initPrimitives = Base.initPrimitives;
Chat.prototype.initArrayProperty = Base.initArrayProperty;

Chat.prototype.initFromJson = function (json) {
    this.initPrimitives(json);
    this.initArrayProperty('messages', json.messages, Message);
};

Chat.prototype.withUsers = function () {
    return this.occupants;
};

module.exports = Chat;