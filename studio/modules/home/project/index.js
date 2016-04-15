module.exports = angular.module('modules.home.project', [
        require('./project-summary').name,
        require('./project-images').name,
        require('./project-designbrief').name
    ])
    .directive('projectView', require('./projectDirective'))
    .controller('ProjectCtrl', require('./ProjectController'));