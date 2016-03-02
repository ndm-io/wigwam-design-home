'use strict';

var ClickableMapCtrl = function ($scope) {
    var vm = $scope;

    //angular.extend(vm, vm.clickableMapCtrl.model);

    console.log(vm);

    vm.$on("leafletDirectiveMarker.map.dragend", function(event, args) {
        vm.clickableMapCtrl.eventHandler(event, args);
    });



};

ClickableMapCtrl.$inject = ['$scope'];
module.exports = ClickableMapCtrl;