(function () {
    'use strict';

    angular.module('mpu')
        .service('settoriSrv', settoriSrv);

    settoriSrv.$inject = ['$http', '$rootScope', 'API', '_'];

    function settoriSrv($http, $rootScope, API, _) {
        let reference = 'settori',
            url = API + reference + '.php';

        let info = function () {
            return [
                {
                    nome: 'Chi siamo',
                    restrict: 'mpu'
                },
                {
                    nome: 'Contatti',
                    restrict: 'mpu'
                },
                {
                    nome: 'Condizioni',
                    restrict: 'all'
                },
                {
                    nome: 'Progettazione',
                    restrict: 'mpu'
                },
                {
                    nome: 'Adamantx',
                    restrict: 'all'
                },
                {
                    nome: 'F.A.Q.',
                    restrict: 'all'
                },
                {
                    nome: 'Privacy & Cookies',
                    restrict: 'all'
                },
                {
                    nome: 'Facebook page',
                    restrict: 'mpu'
                },
                {
                    nome: 'Google+ page',
                    restrict: 'mpu'
                }
            ];
        };

        let mapCurrent = function(data, current) {

        };

        let extractSettori = function (list, nome) {
            return _.find(list, function (num) {
                return num.nome === nome;
            }).settori;
        };

        let getAll = function (success, fail) {
            $http.get(url, {params: {action: 'getAll'}, cache: true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL ' + reference + ': SUCCESS', data);
                        if (success) {
                            let categorie = {
                                    list: []
                                },
                                indices = [];

                            _.each(data.data, function (v) {
                                if (!_.contains(indices, v['cat_id'])) {
                                    indices.push(v['cat_id']);
                                    categorie.list.push({
                                        nome: v['cat_nome'],
                                        id: v['cat_id'],
                                        settori: []
                                    })
                                }
                                let index = indices.indexOf(v['cat_id']);
                                categorie.list[index].settori.push({
                                    nome: v['set_nome'],
                                    id: v['set_id']
                                })
                            });
                            return success(categorie);
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
            info: info,
            extractSettori: extractSettori
        }
    }
})();