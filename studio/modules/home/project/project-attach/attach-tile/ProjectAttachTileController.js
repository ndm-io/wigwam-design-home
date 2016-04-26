'use strict';

function ProjectAttachTileController ($scope) {

    var fileReader = new FileReader();

    function drawImageScaled(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width  / img.width;
        var vRatio =  canvas.height / img.height;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
        var centerShift_y = ( canvas.height - img.height*ratio ) / 2;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(img, 0,0, img.width, img.height,
            centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
    }

    fileReader.onload = function (event) {
        var img = new Image;
        img.onload = function() {
            drawImageScaled(img, $scope.ctx);
        };
        img.src = event.target.result;
    };

    $scope.fileChange = function (files) {
        fileReader.readAsDataURL(files[0]);
    };

    $scope.progress = 0;

}

ProjectAttachTileController.$inject = ['$scope'];
module.exports = ProjectAttachTileController;