(function () {
    'use strict';

    angular.module('mpu')
        .service('lineeSrv', lineeSrv);

    lineeSrv.$inject = ['$http', '$rootScope', 'API'];

    function lineeSrv($http, $rootScope, API) {
        let reference = 'linee',
            url = API + reference + '.php';

        let mapCurrent = function(data, current) {
            let array = [];
            _.each(data, function (v) {
                let m = _.find(JSON.parse(current), function (num) {
                    return num.i === parseInt(v['mark_id']);
                });

                if(m.v === 1)
                    array.push({
                        id : parseInt(v['mark_id']),
                        nome : v['mark_nome'],
                        categorie : JSON.parse(v['mark_cat_array']),
                        sconto : m.s,
                        consegna : m.d
                    })
            });
            return array;
        };

        let extractCategorie = function(data) {
            let array = [];
            _.each(data, function (v) {
                array.push(v.categorie);
            });
            return _.uniq(_.flatten(array));
        };

        let _find = function(list, value, param) {
            return _.find(list, function (num) {
                return num[value] === parseInt(param);
            });
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
                                if(!_find(marchi, 'id', v['mark_id'])) {
                                    let marchio = {
                                        id: parseInt(v['mark_id']),
                                        nome: v['mark_nome'],
                                        categoria: v['mark_cat_array'],
                                        settori: [],
                                        linee: []
                                    };
                                    marchi.push(marchio); //TODO add settori and linee
                                }
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
            getAll: getAll,
            mapCurrent: mapCurrent,
            extractCategorie: extractCategorie
        }
    }
})();