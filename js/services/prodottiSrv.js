(function () {
    'use strict';

    angular.module('mpu')
        .service('prodottiSrv', prodottiSrv);

    prodottiSrv.$inject = ['$http', '$rootScope', 'API'];

    function prodottiSrv($http, $rootScope, API) {
        let reference = 'prodotti',
            url = API + reference + '.php';

        let _create = function (v) {
            return {
                id: parseInt(v['prd_id']),
                tipologia: parseInt(v['prd_tbpr']),
                codice: v['prd_cod'],
                title: v['prd_title'],
                dimensioni: v['prd_dimensioni'],
                note: v['prd_note'],
                marchio: parseInt(v['prd_mark_id']),
                linea: parseInt(v['prd_line_id']),
                prezzi: JSON.parse(v['prd_price_array']),
                abbinamenti: parseInt(v['prd_abb']),
                finitura: parseInt(v['prd_fin']),
                posizione: parseInt(v['prd_pos'])
            }
        };

        let getAllByLinea = function (id, success, fail) {
            $http.get(url, {params: {action: 'getAllByLinea', id: id}, cache: true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL BY LINEA ' + reference + ': SUCCESS', data);
                        if (success) {
                            let prodotti = [];
                            _.each(data.data, function (v) {
                                let prodotto = _create(v);
                                prodotti.push(prodotto);
                            });
                            return success(prodotti);
                        }
                    },
                    function (error) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL BY LINEA' + reference + ': FAIL', error);
                        if (fail)
                            return fail();
                    }
                )
        };

        let getAllByMarchio = function (id, success, fail) {
            $http.get(url, {params: {action: 'getAllByMarchio', id: id}, cache: true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL BY MARCHIO ' + reference + ': SUCCESS', data);
                        if (success) {
                            let prodotti = [];
                            _.each(data.data, function (v) {
                                let prodotto = _create(v);
                                prodotti.push(prodotto);
                            });
                            return success(prodotti);
                        }
                    },
                    function (error) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL BY MARCHIO' + reference + ': FAIL', error);
                        if (fail)
                            return fail();
                    }
                )
        };

        return {
            getAllByLinea: getAllByLinea,
            getAllByMarchio: getAllByMarchio
        }
    }
})();