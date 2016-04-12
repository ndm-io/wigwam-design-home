module.exports = angular.module('modules.home.projects', [])
    .directive('projectsView', require('./projectsDirective'))
    .directive('noProjects', require('./no-projects'))
    .controller('ProjectsCtrl', require('./ProjectsController'));