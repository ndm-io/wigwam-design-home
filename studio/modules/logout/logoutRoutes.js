'use strict';

function logoutRoutes($stateProvider, USER_ROLES) {

    var logout = {
        name: 'logout', // state name
        url: '/logout', // url path that activates this state
        template: '<div logout-view></div>',
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'home', // assign a page-specific class to the <body> tag
            pageTitle: 'You have logged out of Wigwam Design Studio', // set the title in the <head> section of the index.html file
            pageDescription: 'Logout', // meta description in <head>
            authorizationLevel: USER_ROLES.anon
        }

    };

    $stateProvider.state(logout);

}

logoutRoutes.$inject = ['$stateProvider', 'USER_ROLES'];
module.exports = logoutRoutes;