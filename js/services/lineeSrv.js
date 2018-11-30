(function () {
    'use strict';

    angular.module('mpu')
        .service('lineeSrv', lineeSrv);

    lineeSrv.$inject = ['$http', '$rootScope', 'API'];

    function lineeSrv($http, $rootScope, API) {
        let reference = 'linee',
            url = API + reference + '.php';

        let _find = function (list, value, param) {
            return _.find(list, function (num) {
                return num[value] === parseInt(param);
            });
        };

        let _create = function (v) {
            return {
                id: v['line_id'],
                nome: v['line_nome'],
                marchio: {
                    nome: v['mark_nome'],
                    id: v['mark_id'],
                    sconto: v['mark_disc'],
                    listino: v['mark_list']
                },
                settori: [
                    {
                        id: v['stln_set_id'],
                        prezzo: v['stln_price']
                    }
                ],
                consegna: v['line_time'],
                sconto: v['line_disc'],
                garanzia: v['line_war'],
                vetrina: (v['line_vtr'] === 1),
                specifiche: (v['line_spec_file'] === 1),
                catalogo: (v['line_pdf_file'] === 1),
                posizione: v['line_pos']
            }
        };

        let getAll = function (success, fail) {
            $http.get(url, {params: {action: 'getAll'}, cache: true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL ' + reference + ': SUCCESS', data);
                        if (success) {
                            let marchi = [];
                            _.each(data.data, function (v) {
                                let stored = _find(marchi, 'id', v['mark_id']);
                                if (!stored) {
                                    let marchio = {
                                        id: v['mark_id'],
                                        nome: v['mark_nome'],
                                        categoria: v['mark_cat_array'],
                                        sconto: v['mark_disc'],
                                        listino: v['mark_list'],
                                        settori: [v['stln_set_id']],
                                        linee: [_create(v)]
                                    };
                                    marchi.push(marchio);
                                } else {
                                    stored.settori.push(v['stln_set_id']);
                                    let linea = _find(stored.linee, 'id', v['line_id']);
                                    if (!linea)
                                        stored.linee.push(_create(v));
                                    else
                                        linea.settori.push(
                                            {
                                                id: v['stln_set_id'],
                                                prezzo: v['stln_price']
                                            }
                                        );
                                }
                            });
                            _.each(marchi, function (v) {
                                v.settori = _.uniq(_.flatten(v.settori));
                            });
                            return success(marchi);
                        }
                    },
                    function (error) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL ' + reference + ': FAIL', error);
                        if (fail)
                            return fail();
                    }
                )
        };

        return {
            getAll: getAll
        }
    }
})();