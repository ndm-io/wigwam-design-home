'use strict';



function TermsController($scope, DataFactory) {
    DataFactory.terms.sendGetTerms();

    Object.defineProperty($scope, 'terms', {
        get: function () {
            console.log(DataFactory.terms.terms());
            return DataFactory.terms.terms();
        }
    });

    var _headings = {};
    $scope.hasShownHeading = function (heading) {
        if (!_headings[heading]) return true;
        _headings[heading] = true;
    };
}

TermsController.$inject = ['$scope', 'DataFactory'];
module.exports = TermsController;