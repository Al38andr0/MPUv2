(function () {
    "use strict";

    let underscore = angular.module('underscore', []);
    underscore.factory('_', function() {
        return window._;
    });

    angular.module("mpu", ['ui.router', 'underscore', 'ngCookies', 'ngTouch', 'ngSanitize']);
})();

