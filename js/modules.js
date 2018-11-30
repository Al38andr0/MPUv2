(function () {
    "use strict";

    let underscore = angular.module('underscore', []);
    underscore.factory('_', function () {
        return window._;
    });

    let host = location.host,
        protocol = location.protocol,
        assets = '/_dashboard/archivio_dati/',
        api = '/_dashboard/api/',
        url = protocol + '//' + host;

    angular.module("mpu", ['ui.router', 'underscore', 'ngMeta', 'ngSanitize', 'services'])
        .constant('API', api)
        .constant('URL', url)
        .constant('ASSETS', assets)
        .run(['ngMeta', '$rootScope', '$transitions', 'rivenditoriSrv', 'lineeSrv', 'settoriSrv', 'marchiSrv', function (ngMeta, $rootScope, $transitions, rivenditoriSrv, lineeSrv, settoriSrv, marchiSrv) {
            ngMeta.init();
            $rootScope.debugConsole = true;
            $rootScope.loading = true;
            $rootScope.current = {};
            $transitions.onStart({}, function (event) {
                if ($rootScope.loading) {
                    let param = event._treeChanges.entering[0].paramValues['loc'],
                        loc = param || 'Roma';
                    let success = function (data) {
                        $rootScope.current.rivenditore = rivenditoriSrv.mapCurrent(data);
                        $rootScope.current.location = loc;
                        $rootScope.current.vetrine = {};
                        $rootScope.currentRiv = data;
                        let success = function (data) {
                            $rootScope.current.marchi = marchiSrv.mapCurrent(data, $rootScope.current.rivenditore.marchi);
                            let success = function (data) {
                                $rootScope.current.categorie = settoriSrv.extractCategorie(data.list, $rootScope.current.marchi);
                                $rootScope.current.settori = settoriSrv.extractSettori($rootScope.current.categorie);
                                settoriSrv.addLinee($rootScope.current.settori, $rootScope.current.marchi);
                                settoriSrv.mapSettoriInLinee($rootScope.current.settori, $rootScope.current.marchi);
                                $rootScope.loading = false;
                            };
                            settoriSrv.getAll(success);
                        };
                        lineeSrv.getAll(success);
                    };
                    rivenditoriSrv.getByProv(loc, success);
                }
            });
            $transitions.onSuccess({}, function () {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            })
        }]);
})();