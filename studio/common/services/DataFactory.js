'use strict';

var Promise = require('promise'),
    Project = require('../models/Project'),
    User = require('../models/User'),
    Chat = require('../models/Chat'),
    types = require('../../../server/config/IOTypes');

var DataFactory = function (CommsFactory, SocketFactory) {

    var cache = {
        projects: undefined,
        designers: [],
        chats: []
    };

    var handle = function (event, opts) {

        var cacheProp = opts.prop,
            Model = opts.model,
            clobber = opts.clobber || false;

        SocketFactory.on(event, function (data) {

            if (!_.isArray(data)) {
                data = [data];
            }

            var objects = _.map(data, function (json) {
                var model = new Model();
                model.initFromJson(json);
                return model;
            });

            if (clobber) {
                cache[cacheProp].length = 0;
            }

            cache[cacheProp] = _.union(cache[cacheProp], objects);

        });
    };

    handle(types.designersAvailable, {prop: 'designers', model: User, clobber: true});
    handle(types.requestChat, {prop: 'chats', model: Chat, clobber: false});

    SocketFactory.on(types.userLeftRoom, function (data) {
        var room = data.room, user = data.user;

        var chat = _.find(cache.chats, function (chat) {
            return chat.name === room;
        });

        console.log(chat.occupants);

        _.remove(chat.occupants, function (occ) {
            return occ.email === user.email;
        });

        if (chat.occupants.length === 0) {
            _.remove(cache.chats, function (chat) {
                return chat.name === room;
            });
        }

    });
    //handle(types.userLeftRoom, {prop: 'chats', dataKey: 'user', dataComparisonKey: 'email', remove: true});


    //SocketFactory.forward(types.requestChat);

    return {
        projects: function () {
            if (cache.projects) {
                return Promise.resolve(cache.projects);
            }
            return CommsFactory.projects()
                .then(function (projects) {
                    cache.projects = _.map(projects, function (json) {
                        var project = new Project();
                        project.initFromJson(json);
                        return project;
                    });
                    return cache.projects;
                });
        },
        designers: function () {
            return cache.designers;
        },
        chats: function () {
            return cache.chats;
        },
        chatStatus: function (status) {
            SocketFactory.emit(types.chatStatus, status);
        },
        instigateChat: function (chat) {
            SocketFactory.emit(types.requestChat, chat);
        },
        leaveRoom: function (roomName) {
            _.remove(cache.chats, function (chat) {
                return chat.name === roomName;
            });
            SocketFactory.emit(types.leaveRoom, roomName);
        }
    };

};

DataFactory.$inject = ['CommsFactory', 'SocketFactory'];
module.exports = DataFactory;
