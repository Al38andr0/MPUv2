(function () {
    "use strict";

    let underscore = angular.module('underscore', []);
    underscore.factory('_', function () {
        return window._;
    });

    let host = location.host,
        protocol = location.protocol,
        api = '/dashboard/api/',
        url = `${protocol}//${host}`;

        angular.module("mpu", ['ui.router', 'underscore', 'ngMeta'])
        .constant('api', url + api)
        .constant('url', url)
        .run(['ngMeta', '$rootScope', function (ngMeta, $rootScope) {
            ngMeta.init();
            $rootScope.debugConsole = true;
            $rootScope.loading = true;
        }]);
})();