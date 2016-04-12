'use strict';

var _ = require('lodash'),
    Message = require('../../models/Message'),
    User = require('../../models/User'),
    Chat = require('../../models/Chat'),
    ProjectFactory = require('../../models/factories/ProjectFactory');

module.exports = function () {

    var chatWithRoom = function (room) {
        return _.find(ret.chats, function (chat) {
            return chat.name === room;
        });
    };

    var removeUserFromChats = function (user) {
        _.each(ret.chats, function (chat) {
            chat.removeOccupant(user);
        });
        _.remove(ret.onlineUsers, function (onlineUser) {
            return onlineUser.email === user.email;
        });
    };

    var addUserToChats = function (data) {
        var user = new User(data.user);
        var rooms = _.map(data.chats, function (chat) {
            return chat.name;
        });

        _.each(ret.chats, function (chat) {
            if (_.contains(rooms, chat.name)) chat.addOccupant(user);
        });

        ret.onlineUsers.push(user);
    };

    var addUserToChat = function (data) {
        var chat = chatWithRoom(data.chat.name);
        if (!chat) {
            chat = new Chat(data.chat);
            ret.chats.push(chat);
        }
        var user = new User(data.user);
        chat.addOccupant(user);
    };

    var removeUserFromRoom = function (user, room) {
        var chat = chatWithRoom(room);
        if (chat) chat.removeOccupant(user);
        return chat;
    };

    var removeChatWithRoomName = function (roomName) {
        _.remove(ret.chats, function (chat) {
            return roomName === chat.name;
        });
    };

    var addMessageDataToRoom = function (data, room) {
        var chat = chatWithRoom(room);
        var message = new Message();
        message.initFromJson(data);
        chat.messages.push(message);
    };

    var addOnlineUsers = function (data) {
        ret.onlineUsers = _.map(data, function (json) {
            return new User(json);
        });
    };

    var newProject = function (data) {
        var project = ProjectFactory.projectWithJson(data);
        ret._projects[project.guid] = project;
    };

    var projectWithGuid = function (guid) {
        return ret._projects[guid];
    };

    var ret = {
        _projects:{},
        projectWithGuid: projectWithGuid,
        designers: [],
        chats: [],
        onlineUsers: [],
        removeUserFromChats: removeUserFromChats,
        removeUserFromRoom: removeUserFromRoom,
        removeChatWithRoomName: removeChatWithRoomName,
        addUserToChats: addUserToChats,
        addUserToChat: addUserToChat,
        addMessageDataToRoom: addMessageDataToRoom,
        addOnlineUsers: addOnlineUsers,
        newProject: newProject,
        isTyping: {}
    };

    ret.__defineGetter__('projects', function () {
        return _.values(ret._projects);
    });

    return ret;
};