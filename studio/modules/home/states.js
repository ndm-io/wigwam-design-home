'use strict';

var USER_ROLES = require('../../common/constants/USER_ROLES');

var states = {
    home: {
        name: 'home', // state name
        url: '/', // url path that activates this state
        template: '<div home-view></div>',
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'home', // assign a page-specific class to the <body> tag
            pageTitle: ':: Wigwam Design ::', // set the title in the <head> section of the index.html file
            pageDescription: 'Wigwam Design Studio Online Interior', // meta description in <head>
            authorizationLevel: USER_ROLES.guest
        }
    },

    dashboard: {
        name: 'home.dashboard',
        template: '<div dash-view></div>'
    },

    profile: {
        name: 'home.profile',
        template: '<div profile-view></div>'
    },

    messages: {
        name: 'home.messages',
        template: '<div messages-view></div>'
    },

    message: {
        name: 'home.message',
        params: {
            messageGuid: null,
            projectGuid: null,
            message: null
        },
        template: '<div message-view></div>'
    },

    calendar: {
        name: 'home.calendar',
        template: '<div calendar-view></div>'
    },

    users: {
        name: 'home.users',
        template: '<div users-view></div>'
    },

    projects: {
        name: 'home.projects',
        template: '<div projects-view></div>'
    },

    project: {
        name: 'home.project',
        template: '<div project-view></div>',
        params: {project: null}
    },

    projectSummary: {
        name: 'home.project.summary',
        template: '<div project-summary-view></div>'
    },

    projectImages: {
        name: 'home.project.images',
        template: '<div project-images-view></div>'
    }
};

module.exports = states;