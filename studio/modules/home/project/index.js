module.exports = angular.module('modules.home.project', [
        require('./project-summary').name,
        require('./project-attachments').name,
        require('./project-designbrief').name,
        require('./project-attach').name
    ])
    .directive('projectView', require('./projectDirective'))
    .controller('ProjectCtrl', require('./ProjectController'));