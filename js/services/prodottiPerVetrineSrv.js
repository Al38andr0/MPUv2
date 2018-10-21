(function () {
    'use strict';

    angular.module('mpu')
        .service('prodottiPerVetrineSrv', prodottiPerVetrineSrv);

    prodottiPerVetrineSrv.$inject = ['$http', '$rootScope', 'API'];

    function prodottiPerVetrineSrv($http, $rootScope, API) {
        let reference = 'prodottiPerVetrine',
            url = API + reference + '.php';

        let _create = function (v) {
            return {
                id: parseInt(v['cmpr_id']),
                vetrina: {
                    id: parseInt(v['cmpr_comp']),
                    marchio: parseInt(v['cmpr_mark_cmp_id']),
                    linea: parseInt(v['cmpr_line_cmp_id'])
                },
                prodotto: {
                    id: parseInt(v['cmpr_prd']),
                    abbinamento: parseInt(v['cmpr_tab']),
                    finitura: parseInt(v['cmpr_cod']),
                },
                marchio: parseInt(v['cmpr_mark_id']),
                linea: parseInt(v['cmpr_line_id']),
                quantita: parseInt(v['cmpr_qnt']),
                posizione: parseInt(v['cmpr_pos'])
            }
        };

        let getAllByMarchio = function (id, success, fail) {
            $http.get(url, {params: {action: 'getAllByMarchio', id: id}, cache: true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL BY MARCHIO ' + reference + ': SUCCESS', data);
                        if (success) {
                            let vetrine = [];
                            _.each(data.data, function (v) {
                                let vetrina = _create(v);
                                vetrine.push(vetrina);
                            });
                            return success(vetrine);
                        }
                    },
                    function (error) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL BY MARCHIO ' + reference + ': FAIL', error);
                        if (fail)
                            return fail();
                    }
                )
        };

        return {
            getAllByMarchio: getAllByMarchio
        }
    }
})();