'use strict';
function MainCtrl($scope, USER_ROLES, AuthService, ModalService, AUTH_EVENTS, DIALOG_NAMES) {
    var vm = $scope;


    vm.userRoles = USER_ROLES;
    vm.isAuthorized = AuthService.isAuthorized;

    var _user = null;

    vm.currentUser = function (user) {
        if (user) {
            _user = user;
        }
        console.log(_user);
        return _user;
    };

    vm.logout = function () {
        AuthService.logout();
    };

    //vm.$on(AUTH_EVENTS.notAuthenticated, function () {
    //    ModalService.open(DIALOG_NAMES.login)
    //        .then(function(result){
    //            console.log('MainCtrl', result);
    //        })
    //});

    vm.$on(AUTH_EVENTS.loginSuccess, function (event, data) {
        vm.currentUser(data);
    })


}

MainCtrl.$inject = ['$scope', 'USER_ROLES', 'AuthService', 'ModalService', 'AUTH_EVENTS', 'DIALOG_NAMES'];
module.exports = MainCtrl;
