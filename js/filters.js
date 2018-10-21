(function () {
    'use strict';
    angular.module('mpu')
        .filter('capitalize', capitalize);

    function capitalize() {
        return function (s) {
            return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
        };
    }
});