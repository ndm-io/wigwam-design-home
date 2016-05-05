'use strict';

var mongoose = require('mongoose'),
    messageSchema = require('./MessageSchema');

var taskSchema = new mongoose.Schema({
    guid: {type: String, default: ''},
    assignedToId: {type: mongoose.Schema.Types.ObjectId},
    createdById: {type: mongoose.Schema.Types.ObjectId},
    projectGuid: {type: String},
    createdDate: {type: Date},
    start: {type: Date},
    end: {type: Date},
    allDay: {type: Boolean, default: false},
    completedDate: {type: Date},
    title: {type: String, default: 'Task'},
    taskNotes: [messageSchema],
    priority: {type: Number, default: 50},
    type: {type: String, default: 'event'},
    _today: {type: Date, default: new Date()}
});

module.exports = taskSchema;