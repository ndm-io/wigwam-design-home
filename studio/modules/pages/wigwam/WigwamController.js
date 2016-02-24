'use strict';

function WigwamCtrl($scope) {
    $scope.aboutVar = 'Wigwam module';
}

WigwamCtrl.$inject = ['$scope'];
module.exports = WigwamCtrl;