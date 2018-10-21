(function () {
    'use strict';

    angular.module('mpu')
        .service('marchiSrv', marchiSrv);

    marchiSrv.$inject = ['$http', '$rootScope', 'API'];

    function marchiSrv($http, $rootScope, API) {
        let reference = 'marchi',
            url = API + reference + '.php';

        let mapCurrent = function(data, current) {
            let marchi = [];
            _.each(JSON.parse(current), function (v) {
                if (v.v === 1) {
                    let marchio = _.find(data, function (num) {
                        return num.id === v.i;
                    });
                    if(v.s)
                        marchio.sconto = v.s;
                    if(v.d) {
                        _.each(marchio.linee, function (l) {
                            l.consegna = v.d;
                        });
                    }
                    marchi.push(marchio);
                }
            });
            return marchi;
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