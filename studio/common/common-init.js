'use strict';

var angular = require('angular');

function commonInit($rootScope, $state, AuthService, AUTH_EVENTS) {
    $rootScope.$state = $state;
    $rootScope.intendedState = $state.next;


    // Set bodyClasses, pageTitle, and pageDescription on state change (ui-router)
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $rootScope.bodyId = toState.data.bodyId || 'skin-blur-lights';
            $rootScope.pageTitle = toState.data.pageTitle;
            $rootScope.pageDescription = toState.data.pageDescription;
            $rootScope.bodyClasses = toState.data.moduleClasses + ' ' + toState.data.pageClasses;
        }
    });

    // Make sure the page scrolls to the top on all state transitions
    $rootScope.$on('$viewContentLoaded', function () {
        if (document.readyState === 'complete') {
            window.scrollTo(0, 0);
        }
    });

    // Page change authorization
    $rootScope.$on('$stateChangeStart', function (event, next) {

        var forRole = next.data.authorizationLevel;
        if (!AuthService.isAuthorized(forRole)) {
            event.preventDefault();
            if (AuthService.isAuthenticated()) {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                AuthService.profile()
                    .then(function (){
                        $state.go(next.name);
                    })
                    .catch(function () {
                        $state.go('login');
                    });
            }
        }

    });

    // Proper Regex Pattern for email input form validation
    $rootScope.emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

commonInit.$inject = ['$rootScope', '$state', 'AuthService', 'AUTH_EVENTS'];
module.exports = commonInit;
