(function () {
    'use strict';

    angular.module('mpu')
        .service('rivenditoriSrv', rivenditoriSrv);

    rivenditoriSrv.$inject = ['$http', '$rootScope', 'API'];

    function rivenditoriSrv($http, $rootScope, API) {
        let reference = 'rivenditori',
            url = API + reference + '.php';

        let mapCurrent = function(data) {
            return {
                rivenditore: data['riv_nome'],
                note: data['riv_note'],
                telefono: data['riv_tel'],
                email: data['riv_email'],
                webSite: data['riv_web'],
                marchi: data['riv_mark'],
                limite: data['riv_limite'],
                minimo: data['riv_minimo'],
                montaggio: data['riv_montaggio'],
                tipoMontaggio: data['riv_montaggio_type'],
                trasporto: data['riv_trasporto'],
                tipoTrasporto: data['riv_trasporto_type']
            };
        };

        let getAll = function (success, fail) {
            $http.get(url, {params : {action : 'getAll'}, cache : true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL ' + reference + ': SUCCESS', data);
                        if(success)
                            return success(data.data);
                    },
                    function (error) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL ' + reference + ': FAIL', error);
                        if(fail)
                            return fail();
                    }
                )
        };

        let getByProv = function (prov, success, fail) {
            $http.get(url, {params : {action : 'getByProv', prov : prov}, cache : true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET BY PROV ' + reference + ': SUCCESS', data);
                        if(success)
                            return success(data.data);
                    },
                    function (error) {
                        if ($rootScope.debugConsole)
                            console.log('GET BY PROV ' + reference + ': FAIL', error);
                        if(fail)
                            return fail();
                    }
                )
        };
        return {
            getAll: getAll,
            getByProv: getByProv,
            mapCurrent: mapCurrent
        }
    }
})();