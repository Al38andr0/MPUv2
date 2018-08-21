(function () {
    'use strict';

    angular.module('mpu')
        .service('rivenditoriSrv', rivenditoriSrv);

    rivenditoriSrv.$inject = ['$http', '$rootScope', 'api'];

    let reference = 'rivenditori';

    function rivenditoriSrv($http, $rootScope, api) {
        let getAll = function (success, fail) {
            $http.get(`${api}${reference}.php`, {params : {action : 'getAll'}, cache : true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log(`GET ALL ${reference}: SUCCESS`, data);
                        if(success)
                            return success(data.data);
                    },
                    function (error) {
                        if ($rootScope.debugConsole)
                            console.log(`GET ALL ${reference}: SUCCESS`, error);
                        if(fail)
                            return fail();
                    }
                )
        };

        let getByProv = function (prov, success, fail) {
            $http.get(`${api}${reference}.php`, {params : {action : 'getByProv', prov : prov}, cache : true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log(`GET ALL ${reference}: SUCCESS`, data);
                        if(success)
                            return success(data.data);
                    },
                    function (error) {
                        if ($rootScope.debugConsole)
                            console.log(`GET ALL ${reference}: SUCCESS`, error);
                        if(fail)
                            return fail();
                    }
                )
        };
        return {
            getAll: getAll,
            getByProv: getByProv
        }
    }
})();