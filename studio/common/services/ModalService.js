'use strict';

var ModalService = function ($uibModal) {
    var modalService = {};

    var modals = {
        login: {
            animation: true,
            template: require('../../modules/login/login-modal.html'),
            controller: 'LoginCtrl',
            size: 'lg'
        }
    };

    modalService.open = function (modal) {
        var modalInstance = $uibModal.open(modals[modal]);
        return modalInstance.result;
    };

    return modalService;
};

ModalService.$inject = ['$uibModal'];
module.exports = ModalService;
