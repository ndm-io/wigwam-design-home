'use strict';

function padded(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var time = function () {
    var now = new Date();
    return {
        hours: padded(now.getHours()),
        min: padded(now.getMinutes())
    };
};

var ClockWidgetCtrl = function ($scope, $interval) {

    $scope.time = time();

    $interval(function () {
        $scope.time = time();
        console.log($scope.time);
    }, 1000 * 60);

};

ClockWidgetCtrl.$inject = ['$scope', '$interval'];
module.exports = ClockWidgetCtrl;