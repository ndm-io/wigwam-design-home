'use strict';

var USER_ROLES = require('../../common/constants/USER_ROLES');

var states = {
    print: {
        name: 'print', // state name
        url: '/print', // url path that activates this state
        template: '<div print-view></div>',
        params: {
            data: null
        },
        data: {
            moduleClasses: 'page', // assign a module class to the <body> tag
            pageClasses: 'print', // assign a page-specific class to the <body> tag
            pageTitle: ':: Print Design ::', // set the title in the <head> section of the index.html file
            pageDescription: 'Wigwam Design Studio Online Interior', // meta description in <head>
            bodyId:'print', // Body id for background image style
            authorizationLevel: USER_ROLES.guest
        }
    },
    printTerms: {
        name: 'print.terms',
        template: '<div terms-print-view></div>'
    }
};

module.exports = states;