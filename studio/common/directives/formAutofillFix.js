'use strict';

var $ = require('jquery');

var formAutofillFix = function ($timeout) {
    var link = function (scope, element, attrs) {
        element.prop('method', 'post');
        if (attrs.ngSubmit) {
            $timeout(function () {
                var el = $(element);
                el
                    .unbind('submit')
                    .bind('submit', function (event) {
                        event.preventDefault();
                        console.log(el);
                        el
                            .find('input, textarea, select')
                            .trigger('input')
                            .trigger('change')
                            .trigger('keydown');
                        scope.$apply(attrs.ngSubmit);
                    });
            });
        }
    };

    return {
        link: link
    }
};

formAutofillFix.$inject = ['$timeout'];
module.exports = formAutofillFix;
