(function () {
    'use strict';

    angular.module('mpu')
        .service('marchiSrv', marchiSrv);

    marchiSrv.$inject = ['$http', '$rootScope', 'API'];

    function marchiSrv($http, $rootScope, API) {
        let reference = 'marchi',
            url = API + reference + '.php';

        let mapCurrent = function(data, current) {
            if(current.length > 0) {
                _.each(data, function (v) {
                    v.visibile = 1;
                    _.find(current, function (num) {
                        if (num.i === v.id) {
                            v.sconto = num.s || v.sconto;
                            if(num.d)
                                v.consegna = num.d;
                            v.visibile = num.v
                        }
                    })
                });
                return _.filter(data, function (num) {
                    return num.visibile;
                })
            } else
                return data;
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

        let getMarchioIdFromName = function (list, name) {
            return _.find(list, function (num) {
                return num.nome = name;
            }).id;
        };

        return {
            getAll: getAll,
            mapCurrent: mapCurrent,
            getMarchioIdFromName: getMarchioIdFromName
        }
    }
})();