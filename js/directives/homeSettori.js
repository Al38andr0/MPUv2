(function () {
    'use strict';

    angular.module('mpu')
        .directive('homeSettori', homeSettori);

    homeSettori.$inject = [];

    function homeSettori() {
        return {
            restrict: 'E',
            templateUrl: '/html/templates/homeSettori.html',
            scope: {
                settore: '<'
            },
            link: function (scope, elem, attrs) {
                scope.applyBackground = function (path) {
                    return {
                        background: 'url("' + path + '") no-repeat center'
                    }
                }
            }
        }
    }
})();