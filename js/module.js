(function () {
    "use strict";

    let underscore = angular.module('underscore', []);
    underscore.factory('_', function () {
        return window._;
    });

    let host = location.host,
        protocol = location.protocol,
        api = '/dashboard/api/',
        url = protocol + '/' + host;

        angular.module("mpu", ['ui.router', 'underscore', 'ngMeta'])
        .constant('api', api)
        .constant('url', url)
        .run(['ngMeta', '$rootScope', '$transitions', function (ngMeta, $rootScope, $transitions) {
            ngMeta.init();
            $rootScope.debugConsole = true;
            $rootScope.loading = true;
            $transitions.onStart({}, function (event) {
                console.log(event._treeChanges.entering[0].paramValues.loc);
            });
        }]);
})();