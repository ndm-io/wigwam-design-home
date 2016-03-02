'use strict';

var $ = require('jquery');
require('./calendar.min.js');


module.exports = function calendarWidgetDirective() {

    var fullSizeOpts = {
        header: {
            center: 'title',
            left: 'prev, next',
            right: ''
        },
        editable: true
    };

    var widgetOpts = {
        editable: false,
        events: [],
        header: {
            left: 'title'
        }
    };

    var link = function (vm, el, attr) {

        vm.el = $(el);
        var opts = (vm.el.parent().hasClass('s-widget')) ? widgetOpts : fullSizeOpts;

        vm.el.fullCalendar(opts);

    };

    return {
        link: link,
        controller: 'CalendarWidgetCtrl',
        controllerAs: 'calendarWidgetCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./calendar-widget.html')
    };
};