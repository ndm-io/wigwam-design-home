'use strict';

function progressBarHorizontal() {


    return {
        template: require('./progress-bar-horizontal.html'),
        scope:{
            value:'='
        }
    };
}

module.exports = progressBarHorizontal;