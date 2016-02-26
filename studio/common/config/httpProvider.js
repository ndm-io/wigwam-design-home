'use strict';

var httpProviderConfig = function ($httpProvider) {
    $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
            return $injector.get('AuthInterceptor');
        }
    ]);
};

httpProviderConfig.$inject = ['$httpProvider'];
module.exports = httpProviderConfig;