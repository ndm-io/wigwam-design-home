'use strict';

var types = require('../../../../../../server/config/IOTypes'),
    _ = require('lodash');


var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

var events = [
    {title: 'All Day Event',start: new Date(y, m, 1)},
    {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
    {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
    {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
];

module.exports = function EventsInterface(sf, cache) {


    var allEvents = function () {
        return _(cache.projects)
            .map(function (project) {
                return project.events;
            })
            .flatten()
            .value();
    };

    var eventsForDate = function (date) {
        var dayNum = date.getDate(),
            month = date.getMonth();

        return _.map(allEvents(), function (event) {
                return event.start;
            })
            .filter(function (d) {
                return (d.getDate() === dayNum && d.getMonth() === month);
            });
    };

    var eventsBetween = function (start, end) {
        var startTime = start.getTime(),
            endTime = end.getTime();

        var et =  _(cache.projects)
            .map(function (project) {
                return project.events;
            })
            .flatten()
            .filter(function (event) {
                return (event.start.getTime() > startTime && event.start.getTime() < endTime);
            })
            .value();

        return (et.length > 0) ? et : undefined;

    };

    var hasEventsForDate = function (date) {
        return (eventsForDate(date).length > 0) ? eventsForDate(date).length : false;
    };

    var eventSource = function (start, end, callback) {
        callback(eventsBetween(start, end));
    };

    var addEventToProjectGuid = function (projectGuid, event) {
        cache.projectWithGuid(projectGuid)
            .addEvent(event);
    };

    var ei = {
        hasEventsForDate: hasEventsForDate,
        eventsForDate: eventsForDate,
        eventSource: eventSource,
        addEventToProjectGuid: addEventToProjectGuid
    };

    Object.defineProperty(ei, 'allEvents', {
        get: function () {
            return events;
        }
    });

    return ei;

};