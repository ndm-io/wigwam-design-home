'use strict';

module.exports = angular.module('modules.home.project.attachments', [])
    .directive('projectAttachmentsView', require('./projectAttachmentsDirective'))
    .controller('ProjectAttachmentsCtrl', require('./ProjectAttachmentsController'));