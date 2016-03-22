'use strict';

var DashCtrl = function ($scope, DataFactory) {

    $scope.chats = function () {
        return DataFactory.chats();
    };

};

DashCtrl.$inject = ['$scope', 'DataFactory'];
module.exports = DashCtrl;