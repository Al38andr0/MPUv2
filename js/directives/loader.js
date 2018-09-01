(function () {
    'use strict';

    angular.module('mpu')
        .directive('loader', loader);

    function loader() {
        return {
            restrict: 'E',
            template: '<div class="loader"><div class="lds-ellipsis"> <div></div> <div></div> <div></div> <div></div></div></div>'
        }
    }
})();