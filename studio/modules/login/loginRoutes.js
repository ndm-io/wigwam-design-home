'use strict';

function loginRoutes($stateProvider, USER_ROLES) {

    var login = {
        name: 'login', // state name
        url: '/login', // url path that activates this state
        template: '<div login-view></div>',
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'home', // assign a page-specific class to the <body> tag
            pageTitle: 'Login', // set the title in the <head> section of the index.html file
            pageDescription: 'Meta Description goes here', // meta description in <head>
            authorizationLevel: USER_ROLES.anon
        }

    };

    $stateProvider.state(login);

}

loginRoutes.$inject = ['$stateProvider', 'USER_ROLES'];
module.exports = loginRoutes;