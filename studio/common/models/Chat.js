'use strict';

var Base = require('../../common/models/WWBase'),
    User = require('../../common/models/User'),
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
    this.initArrayProperty('occupants', json.occupants, User);
};

Chat.prototype.withUsers = function () {
    return this.occupants;
};

Chat.prototype.addOccupant = function (user) {
    this.occupants.push(user);
};

Chat.prototype.isMostRecentMessage = function (message) {
    var idx = this.messages.indexOf(message);
    return (idx === this.messages.length - 1);
};

module.exports = Chat;