'use strict';



function TermsController($scope, DataFactory) {
    DataFactory.terms.sendGetTerms();

    Object.defineProperty($scope, 'terms', {
        get: function () {
            return DataFactory.terms.terms();
        }
    });

    var _headings = {};
    $scope.hasShownHeading = function (heading) {
        if (!_headings[heading]) return true;
        _headings[heading] = true;
        return false;
    };
}

TermsController.$inject = ['$scope', 'DataFactory'];
module.exports = TermsController;