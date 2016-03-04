'use strict';

var ClickableMapCtrl = function ($scope, leafletMarkerEvents) {

    $scope.$watch('mapId', function (n, o) {

        if (!n) return;

        var markerEvents = leafletMarkerEvents.getAvailableEvents();

        for (var k in markerEvents) {
            var eventName = 'leafletDirectiveMarker.' + n + '.' + markerEvents[k];
            $scope.$on(eventName, function (event, args) {
                $scope.clickableMapCtrl.eventHandler(eventName, event, args);
            });
        }

    });


};

ClickableMapCtrl.$inject = ['$scope', 'leafletMarkerEvents'];
module.exports = ClickableMapCtrl;