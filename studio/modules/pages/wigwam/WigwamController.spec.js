/*jshint expr: true*/

'use strict';

describe('WigwamController', function() {

    var ctrl, scope;

    beforeEach(angular.mock.module('app'));

    beforeEach(function() {

        angular.mock.inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('WigwamCtrl', {
                $scope: scope
            });
        });

    });

    it('should exist', function() {
        expect(ctrl).to.not.be.undefined;
    });

});