'use strict';

var Message = require('../../models/Message');

exports.messageWithTextAndUser = function messageWithTextAndUser (text, user) {
    var message = new Message();
    message.html(text);
    message.setCreatedByUser(user);
    return message;
};

exports.leaveRoomMessageWithUser = function leaveRoomMessageWithUser (user) {
  return;
};

exports.enterRoomMessageWithUser = function enterRoomMessageWithUser (user) {

};
