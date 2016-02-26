'use strict';

var DataFactory = function($rootScope) {
    return {
        sayHi:function (to){
            console.log('hi to' + to);
        }
    }

};

DataFactory.$inject = ['$rootScope'];
module.exports = DataFactory;
