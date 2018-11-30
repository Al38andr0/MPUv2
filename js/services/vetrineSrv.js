(function () {
    'use strict';

    angular.module('mpu')
        .service('vetrineSrv', vetrineSrv);

    vetrineSrv.$inject = ['$http', '$rootScope', 'API', 'settoriSrv'];

    function vetrineSrv($http, $rootScope, API, settoriSrv) {
        let reference = 'vetrine',
            url = API + reference + '.php';

        let _create = function (v) {
            let settori = [];
            _.each(v['cmp_settore'], function (v) {
                settori.push({
                    id: v,
                    nome : settoriSrv.createTitle('settore', settoriSrv.getNameFromId($rootScope.current.settori, v))
                });
            });
            return {
                id: v['cmp_id'],
                nome: v['cmp_nome'],
                titolo: v['cmp_title'],
                note: v['cmp_note'],
                marchio: v['cmp_mark_id'],
                linea: v['cmp_line_id'],
                posizione: v['cmp_pos'],
                settori: settori,
                prodotti : []
            }
        };

        let _prodotti = function(p) {
            return {
                id: p['prd_id'],
                codice: p['prd_cod'],
                titolo: p['prd_title'],
                note: p['prd_note'],
                dimensioni: p['prd_dim'],
                codiceFinitura: p['abb_cod'],
                tipologia: p['tab_nome'],
                prezzo: p['prd_price_array'],
                abbinamentiFiniture: p['abb_array'],
                abbinamento: p['prd_abb'],
                finitura: p['prd_fin'],
                quantita: p['cmpr_qnt']
            }
        };

        let getAllByLinea = function (id, success, fail) {
            $http.get(url, {params: {action: 'getAllByLinea', id: id}, cache: true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL BY LINEA ' + reference + ': SUCCESS', data);
                        if (success) {
                            let vetrine = [];
                            _.each(data.data, function (v) {
                                let vetrina = _create(v);
                                _.each(v.prodotti, function (p) {
                                    vetrina.prodotti.push(_prodotti(p));
                                });
                                vetrine.push(vetrina);
                            });
                            return success(vetrine);
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

        return {
            getAllByLinea: getAllByLinea
        }
    }
})();