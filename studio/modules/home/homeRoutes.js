'use strict';

function homeRoutes($stateProvider, USER_ROLES) {

    var home = {
        name: 'home', // state name
        url: '/', // url path that activates this state
        template: '<div home-view></div>', // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'home', // assign a page-specific class to the <body> tag
            pageTitle: ':: Wigwam Design ::', // set the title in the <head> section of the index.html file
            pageDescription: 'Wigwam Design Studio Online Interior', // meta description in <head>
            authorizationLevel: USER_ROLES.guest
        }
    };

    var dashboard = {
        name: 'home.dashboard',
        parent: home,
        template: '<div dash-view></div>'
    };

    var profile = {
        name: 'home.profile',
        parent: home,
        template: '<div profile-view></div>'
    };

    var messages = {
        name: 'home.messages',
        parent: home,
        template: '<div messages-view></div>'
    };

    var message = {
        name: 'home.message',
        params: {
            messageGuid: null,
            projectGuid: null,
            message: null
        },
        parent: home,
        template: '<div message-view></div>'
    };

    var calendar = {
        name: 'home.calendar',
        parent: home,
        template: '<div calendar-view></div>'
    };

    var users = {
        name: 'home.users',
        parent: home,
        template: '<div users-view></div>'
    };

    var projects = {
        name: 'home.projects',
        parent: home,
        template: '<div projects-view></div>'
    };

    $stateProvider.state(home);
    $stateProvider.state(dashboard);
    $stateProvider.state(messages);
    $stateProvider.state(message);
    $stateProvider.state(profile);
    $stateProvider.state(calendar);
    $stateProvider.state(users);
    $stateProvider.state(projects);


}

homeRoutes.$inject = ['$stateProvider', 'USER_ROLES'];
module.exports = homeRoutes;