'use strict';

var File = require('../../../../../common/models/WWFile'),
    drawImage = require('./DrawImage'),
    encoder = require('./Encoder'),
    _ = require('lodash'),
    $ = require('jquery');


function ProjectAttachTileController ($scope, $timeout) {

    $scope.files = undefined;
    $scope.progress = 0;


    function handleImage(bytes, file) {
        var img = new Image;
        img.onload = function() {
            drawImage(img, file);
        };
        img.src = encoder.base64UrlWithUint8Array(bytes, file.type);
    }

    function handleBytes(bytes, file) {
        handleImage(bytes, file);
    }


    $scope.fileChange = function (files) {

        $scope.files = _.map(files, function (file) {
            return new File(file);
        });


        console.log($scope.files);

        //$timeout(function () {
        //    $scope.files = files;
        //
        //    _.each(files, function (file) {
        //        var fileReader = new FileReader();
        //
        //        fileReader.onload = function (event) {
        //            var bytes = new Uint8Array(event.target.result);
        //            handleBytes(bytes, file);
        //        };
        //
        //        fileReader.readAsArrayBuffer(file);
        //    });
        //
        //},0);

    };

}

ProjectAttachTileController.$inject = ['$scope', '$timeout'];
module.exports = ProjectAttachTileController;