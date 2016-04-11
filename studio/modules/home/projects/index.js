module.exports = angular.module('modules.home.projects', [])
    .directive('projectsView', require('./projectsDirective'))
    .controller('ProjectsCtrl', require('./ProjectsController'));