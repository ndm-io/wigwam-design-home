'use strict';

function homeRoutes($stateProvider, USER_ROLES) {

    var home = {
        name: 'home', // state name
        url: '/', // url path that activates this state
        template: '<div home-view></div>', // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'home', // assign a page-specific class to the <body> tag
            pageTitle: 'Home', // set the title in the <head> section of the index.html file
            pageDescription: 'Meta Description goes here', // meta description in <head>
            authorizationLevel: USER_ROLES.guest
        }
    };

    $stateProvider.state(home);

}

homeRoutes.$inject = ['$stateProvider', 'USER_ROLES'];
module.exports = homeRoutes;