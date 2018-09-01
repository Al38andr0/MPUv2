(function () {
    'use strict';

    angular.module('mpu')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$stateParams', '$state', '$transitions', '$rootScope', 'rivenditoriSrv', 'ngMeta', 'settoriSrv', '$interval'];

    function mainCtrl($stateParams, $state, $transitions, $rootScope, rivenditoriSrv, ngMeta, settoriSrv, $interval) {
        let vm = this;

        vm.rivenditori = {
            list : [],
            getAll : function (callback) {
                let success = function(data) {
                    vm.rivenditori.list = data;
                    if(callback)
                        callback()
                };
                rivenditoriSrv.getAll(success);
            },
            getByProv : function (prov, callback) {
                let success = function(data) {
                    vm.rivenditori.list = data;
                    if(callback)
                        callback()
                };
                rivenditoriSrv.getByProv(prov, success);
            },
            current: false
        };

        vm.categorie = {
            list : [],
            getAll : function (callback) {
                let success = function(data) {
                    vm.categorie.list = data;
                    if(callback)
                        callback()
                };
                settoriSrv.getAll(success);
            },
            info : settoriSrv.info()
        };

        vm.settori = {
            extractSettori : function (nome) {
                return _.find(vm.categorie.list.list, function (num) {
                    return num.nome === nome;
                }).settori;
            }
        };

        $transitions.onStart({}, function () {
            if(vm.rivenditori.list.length === 0) {
                let callback = function() {
                    let callback = function() {
                        let callback = () => $rootScope.loading = false;
                        vm.categorie.getAll(callback);
                    };
                    let prov = (!$stateParams['loc'] || $stateParams['loc'] === 'mpu') ? 'Roma' : $stateParams['loc'];
                    vm.rivenditori.getByProv(prov, callback);
                };
                vm.rivenditori.getAll(callback);
            }
        });

        $transitions.onSuccess({}, function () {
            let loc = $stateParams['loc'];
            if(loc)
                ngMeta.setTitle('| ' + loc);
        });
    }
})();