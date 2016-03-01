/**
 * @ngdoc directive
 * @name app.directive:show-tab
 *
 * @param {string} initial-active The name of the tab to be default active
 * @restrict 'A'
 * @element A
 *
 * @description
 *
 * Directive to add to bootstrap tab block
 *
 * ######Example Usage
 *
 <div show-tab initial-active="home" class="tab-container tile media">
    <ul class="tab pull-left tab-vertical nav nav-tabs" style="height: auto;">
        <li class="{{activeClass('home')}}"><a ng-click="click('home')">Home</a></li>
        <li class="{{activeClass('profile')}}"><a ng-click="click('profile')">Profile</a></li>
        <li class="{{activeClass('messages')}}"><a ng-click="click('messages')">Messages</a></li>

    </ul>

    <div class="tab-content media-body">
        <div class="tab-pane {{activeClass('home')}}">
            <!-- Some div -->
        </div>
        <div class="tab-pane {{activeClass('profile')}}">
             <!-- Some div -->
        </div>
        <div class="tab-pane {{activeClass('messages')}}">
            <!-- Some div -->
        </div>
    </div>
 </div>
 *
 */


'use strict';

var $ = require('jquery');
var _ = require('lodash');

module.exports = function showTabDirective() {

    var currentlyActive;

    return {
        link: function (scope, element, attrs) {

            currentlyActive = attrs.initialActive;

            /**
             * @ngdoc method
             * @name activeClass
             * @methodOf app.directive:show-tab
             *
             * @param {string} heading The heading to query active status for
             *
             * @returns {string} The active class or blank string
             */

            scope.activeClass = function (heading) {
                return (currentlyActive === heading) ? 'active' : '';
            };

            /**
             * @ngdoc method
             * @name click
             * @methodOf app.directive:show-tab
             *
             * @param {string} heading The heading that was clicked on
             *
             */

            scope.click = function (heading) {
                currentlyActive = heading;
            };

        },
        controller: 'ShowTabCtrl',
        controllerAs: 'showTabCtrl',
        bindToController: true,
        restrict: 'A',
        scope: true
    };
};