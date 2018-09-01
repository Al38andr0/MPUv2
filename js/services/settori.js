(function () {
    'use strict';

    angular.module('mpu')
        .service('settoriSrv', settoriSrv);

    settoriSrv.$inject = ['$http', '$rootScope', 'api', '_'];

    function settoriSrv($http, $rootScope, api, _) {
        let reference = 'settori',
            url = api + reference + '.php';

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

        let getAll = function (success, fail) {
            $http.get(url, {params: {action: 'getAll'}, cache: true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL ' + reference + ': SUCCESS', data);
                        if (success) {
                            let categorie = {
                                indices: [],
                                list: []
                            };
                            _.each(data.data, function (v) {
                                if (!_.contains(categorie.indices, v['cat_nome'])) {
                                    categorie.indices.push(v['cat_nome']);
                                    categorie.list.push({
                                        nome: v['cat_nome'],
                                        id: v['cat_id'],
                                        settori: []
                                    })
                                }
                                let index = categorie.indices.indexOf(v['cat_nome']);
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
            info: info
        }
    }
})();