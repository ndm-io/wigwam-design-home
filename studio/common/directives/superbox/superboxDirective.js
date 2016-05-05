'use strict';

require('./superbox');


function superboxDirective ($timeout) {

    var link = function (scope, el) {
        $timeout(function () {
            jQuery(el).SuperBox();
        },10);
    };

    return {
        link:link
    };
}

superboxDirective.$inject = ['$timeout'];
module.exports = superboxDirective;