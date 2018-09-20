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
        .run(['ngMeta', '$rootScope', '$transitions', 'rivenditoriSrv', 'lineeSrv', 'settoriSrv', function (ngMeta, $rootScope, $transitions, rivenditoriSrv, lineeSrv, settoriSrv) {
            ngMeta.init();
            $rootScope.debugConsole = true;
            $rootScope.loading = true;
            $transitions.onStart({}, function (event) {
                if ($rootScope.loading) {
                    let loc = event._treeChanges.entering[0].paramValues['loc'] || 'Roma';
                    let success = function (data) {
                        $rootScope.current = rivenditoriSrv.mapCurrent(data);
                        $rootScope.currentRiv = data;
                        $rootScope.loading = false;

                        let success = function (data) {
                            $rootScope.marchi = data;
                            // $rootScope.current.marchi = marchiSrv.mapCurrent($rootScope.marchi, $rootScope.current.marchi);
                            // let categorie = marchiSrv.extractCategorie($rootScope.current.marchi);
                            console.log(data);
                            let success = function (data) {
/*
                                $rootScope.categorie = [];
                                _.each(data.list, function (v) {
                                    if(_.contains(categorie, parseInt(v.id)))
                                        $rootScope.categorie.push(v);
                                });
*/
                            };
                            settoriSrv.getAll(success);
                        };
                        lineeSrv.getAll(success);
                    };
                    rivenditoriSrv.getByProv(loc, success);
                }
            });
        }]);
})();