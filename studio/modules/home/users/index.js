module.exports = angular.module('modules.home.users', [])
    .directive('usersView', require('./usersDirective'))
    .controller('UsersCtrl', require('./UsersController'));