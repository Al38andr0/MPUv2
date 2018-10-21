(function () {
    "use strict";

    let underscore = angular.module('underscore', []);
    underscore.factory('_', function () {
        return window._;
    });

    let host = location.host,
        protocol = location.protocol,
        assets = '/dashboard/archivio_dati/',
        api = '/dashboard/api/',
        url = protocol + '//' + host;

    angular.module("mpu", ['ui.router', 'underscore', 'ngMeta', 'ngSanitize'])
        .constant('API', api)
        .constant('URL', url)
        .constant('ASSETS', assets)
        .run(['ngMeta', '$rootScope', '$transitions', 'rivenditoriSrv', 'lineeSrv', 'settoriSrv', 'marchiSrv', function (ngMeta, $rootScope, $transitions, rivenditoriSrv, lineeSrv, settoriSrv, marchiSrv) {
            ngMeta.init();
            $rootScope.debugConsole = true;
            $rootScope.loading = true;
            $transitions.onStart({}, function (event) {
                if ($rootScope.loading) {
                    let loc = event._treeChanges.entering[0].paramValues['loc'] || 'Roma';
                    let success = function (data) {
                        $rootScope.current = rivenditoriSrv.mapCurrent(data);
                        $rootScope.current.location = loc;
                        $rootScope.currentRiv = data;
                        let success = function (data) {
                            $rootScope.marchi = data;
                            $rootScope.current.marchi = marchiSrv.mapCurrent($rootScope.marchi, $rootScope.current.marchi);
                            let success = function (data) {
                                $rootScope.current.categorie = settoriSrv.extractCategorie(data.list, $rootScope.current.marchi);
                                $rootScope.current.settori = settoriSrv.extractSettori($rootScope.current.categorie);
                                settoriSrv.addLinee($rootScope.current.settori, $rootScope.current.marchi);

                                $rootScope.loading = false;
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