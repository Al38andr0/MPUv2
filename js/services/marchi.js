(function () {
    'use strict';

    angular.module('mpu')
        .service('marchiSrv', marchiSrv);

    marchiSrv.$inject = ['$http', '$rootScope', 'API'];

    function marchiSrv($http, $rootScope, API) {
        let reference = 'marchi',
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

        let getAll = function (success, fail) {
            $http.get(url, {params: {action: 'getAll'}, cache: true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL ' + reference + ': SUCCESS', data);
                        if (success) {
                            return success(data.data);
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