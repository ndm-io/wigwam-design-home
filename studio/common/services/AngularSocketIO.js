/*
 * @license
 * angular-socket-io v0.7.0
 * (c) 2014 Brian Ford http://briantford.com
 * License: MIT
 */

var io = require('socket.io-client');
var types = require('../../../server/config/IOTypes');
var ss = require('socket.io-stream');
//var Buffer = require('buffer').Buffer;

var socketDefaults = function (socket, $rootScope, SessionService, $timeout) {

    var perform = function (obj, key, value) {
        $timeout(function () {
            obj[key] = value;
        },0);
    };

    socket.on(types.socketId, function (data) {
        SessionService.user.socketId = data;
    });

    socket.on(types.dataStart, function () {
        perform($rootScope, 'loading', true);

    });

    socket.on(types.dataEnd, function () {
        perform($rootScope, 'loading', false);
    });

};

var SocketFactory = function ($rootScope, $timeout, SessionService) {

    'use strict';

    // when forwarding events, prefix the event name
    var defaultPrefix = 'socket:',
        ioSocket;


    var asyncAngularify = function (socket, callback) {
        return callback ? function () {
            var args = arguments;
            $timeout(function () {
                callback.apply(socket, args);
            }, 0);
        } : angular.noop;
    };

    return (function socketFactory(options) {
        options = options || {};
        var socket = options.ioSocket || io.connect();

        SessionService.onReady()
            .then(function (user) {
                socket.emit(types.authenticate, {email: user.email, ioToken: user.ioToken});
            });

        socketDefaults(socket, $rootScope, SessionService, $timeout);

        var prefix = options.prefix === undefined ? defaultPrefix : options.prefix;
        var defaultScope = options.scope || $rootScope;

        var addListener = function (eventName, callback) {
            socket.on(eventName, callback.__ng = asyncAngularify(socket, callback));
        };

        var addOnceListener = function (eventName, callback) {
            socket.once(eventName, callback.__ng = asyncAngularify(socket, callback));
        };

        var wrappedSocket = {
            socket: socket,
            on: addListener,
            addListener: addListener,
            once: addOnceListener,

            emit: function (eventName, data, callback) {
                var lastIndex = arguments.length - 1;
                var callback = arguments[lastIndex];
                if (typeof callback == 'function') {
                    callback = asyncAngularify(socket, callback);
                    arguments[lastIndex] = callback;
                }
                return socket.emit.apply(socket, arguments);
            },

            removeListener: function (ev, fn) {
                if (fn && fn.__ng) {
                    arguments[1] = fn.__ng;
                }
                return socket.removeListener.apply(socket, arguments);
            },

            removeAllListeners: function () {
                return socket.removeAllListeners.apply(socket, arguments);
            },

            disconnect: function (close) {
                return socket.disconnect(close);
            },

            connect: function () {
                return socket.connect();
            },

            // when socket.on('someEvent', fn (data) { ... }),
            // call scope.$broadcast('someEvent', data)
            forward: function (events, scope) {
                if (events instanceof Array === false) {
                    events = [events];
                }
                if (!scope) {
                    scope = defaultScope;
                }
                events.forEach(function (eventName) {
                    var prefixedEvent = prefix + eventName;
                    var forwardBroadcast = asyncAngularify(socket, function () {
                        Array.prototype.unshift.call(arguments, prefixedEvent);
                        scope.$broadcast.apply(scope, arguments);
                    });
                    scope.$on('$destroy', function () {
                        socket.removeListener(eventName, forwardBroadcast);
                    });
                    socket.on(eventName, forwardBroadcast);
                });
            }
        };

        return wrappedSocket;
    })();
};

SocketFactory.$inject = ['$rootScope', '$timeout', 'SessionService'];
module.exports = SocketFactory;