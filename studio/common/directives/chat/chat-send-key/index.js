
module.exports = function (event) {
    return (!event.ctrlKey && event.keyCode === 13);
};