'use strict';

var DashCtrl = function ($scope, DataFactory) {

    $scope.chats = function () {
        return DataFactory.chat.chats();
    };

};

DashCtrl.$inject = ['$scope', 'DataFactory'];
module.exports = DashCtrl;