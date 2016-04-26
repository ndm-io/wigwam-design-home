'use strict';

var $ = require('jquery');

function inputFileChange() {
    var link = function (scope, el, attrs) {

        var input = $(el).find('input');

        input.on('change', function (event) {
            scope.onFileChange(event.target.files);
        });

        scope.selectFile = function () {
            input.click();
        };

    };

    return {
        link: link,
        restrict: 'E',
        scope: {
            onFileChange: '='
        },
        template: require('./input-file-change.html')
    };
}

module.exports = angular.module('modules.home.project.attach.tile.inputFileChange', [])
    .directive('inputFileChange', inputFileChange);