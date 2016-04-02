'use strict';

var Base = require('../../common/models/WWBase'),
    User = require('../../common/models/User'),
    Message = require('../../common/models/Message'),
    _ = require('lodash');

function Chat (data) {

    console.log('add chat', data);
    if (data) {
        this.initFromJson(data);
        if (!data.name) this.name = this.defaultName();
    } else {
        this.name = this.defaultName();
        this.occupants = [];
        this.instigator = [];
        this.messages = [];
    }
}

Chat.prototype.defaultName = function () {
    return 'Chat:' + new Date().toString();
};

Chat.prototype.initPrimitives = Base.initPrimitives;
Chat.prototype.initArrayProperty = Base.initArrayProperty;

Chat.prototype.initFromJson = function (json) {
    this.initPrimitives(json);
    this.initArrayProperty('messages', json.messages, Message);
    this.initArrayProperty('occupants', json.occupants, User);
};

Chat.prototype.requests = function () {
    var chat = this;
    return _.map(this.occupants, function (occupant) {
        return {user: occupant, chat: chat};
    });
};

Chat.prototype.withUsers = function () {
    return this.occupants;
};

Chat.prototype.addOccupant = function (user) {
    var existing = _.find(this.occupants, function (occupant) {
        return occupant._id === user._id;
    });

    if (!existing) this.occupants.push(user);
};

Chat.prototype.isMostRecentMessage = function (message) {
    var idx = this.messages.indexOf(message);
    return (idx === this.messages.length - 1);
};

module.exports = Chat;