'use strict';


module.exports = function attachmentThumbnailDirective() {



    return {
        restrict: 'EA',
        scope: {
            file:'='
        },
        template: require('./attachment-thumbnail.html')
    };
};
