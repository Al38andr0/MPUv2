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
        .constant('API', api)
        .constant('URL', url)
        .run(['ngMeta', '$rootScope', '$transitions', 'rivenditoriSrv', 'marchiSrv', 'settoriSrv', function (ngMeta, $rootScope, $transitions, rivenditoriSrv, marchiSrv, settoriSrv) {
            ngMeta.init();
            $rootScope.debugConsole = true;
            $rootScope.loading = true;
            $transitions.onStart({}, function (event) {
                if($rootScope.loading) {
                    let loc = event._treeChanges.entering[0].paramValues['loc'] || 'Roma';
                    if(loc !== 'mpu') {
                        let success =  function(data) {
                            $rootScope.current = rivenditoriSrv.mapCurrent(data);
                            $rootScope.currentRiv = data;
                            $rootScope.loading = false;

                            let success = function(data) {
                                $rootScope.marchi = data;
                                $rootScope.current.marchi = marchiSrv.mapCurrent($rootScope.marchi, $rootScope.current.marchi);
                                let categorie = marchiSrv.extractCategorie($rootScope.current.marchi);
                                let success = function(data) {};
                                settoriSrv.getAll(success);
                            };
                            marchiSrv.getAll(success);
                        };
                        rivenditoriSrv.getByProv(loc, success);
                    }
                }
            });
        }]);
})();