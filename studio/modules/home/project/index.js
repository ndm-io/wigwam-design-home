module.exports = angular.module('modules.home.project', [
        require('./project-summary').name
    ])
    .directive('projectView', require('./projectDirective'))
    .controller('ProjectCtrl', require('./ProjectController'));