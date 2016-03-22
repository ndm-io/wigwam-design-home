
module.exports = function chatStatusWidget() {
    return {
        controller: 'ChatStatusWidgetCtrl',
        controllerAs: 'chatStatusWidgetCtrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./chat-status-widget.html')
    };
};
