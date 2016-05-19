'use strict';

var types = require('../../../../../../server/config/IOTypes'),
    _ = require('lodash');

var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

var mockAllEvents = [
    {title: 'All Day Event',start: new Date(y, m, 1), editable: false},
    {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    {id: 999,title: 'Repeating Event With a long name and title',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
    {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
    {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
];

module.exports = function EventsInterface(sf, cache) {

    var _events = mockAllEvents;

    var allEvents = function () {
        return _events;
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

    var hasEventsForDate = function (date) {
        return (eventsForDate(date).length > 0) ? eventsForDate(date).length : false;
    };

    var eventSource = function (start, end, callback) {
        callback(mockAllEvents);
    };

    var addEventToProjectGuid = function (projectGuid, event) {
        cache.projectWithGuid(projectGuid)
            .addEvent(event);
        _events.push(event);
    };

    var eventInterface = {
        hasEventsForDate: hasEventsForDate,
        eventsForDate: eventsForDate,
        eventSource: eventSource,
        addEventToProjectGuid: addEventToProjectGuid
    };

    Object.defineProperty(eventInterface, 'allEvents', {
        get: function () {
            return _events;
        },
        set: function (events) {
            _events = events;
        }
    });

    return eventInterface;
};