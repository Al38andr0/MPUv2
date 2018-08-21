(function () {
    'use strict';

    angular.module('mpu')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$stateParams', '$state', '$transitions', '$rootScope', 'rivenditoriSrv', 'ngMeta'];

    function mainCtrl($stateParams, $state, $transitions, $rootScope, rivenditoriSrv, ngMeta) {
        let vm = this;

        vm.rivenditori = {
            list : false,
            getAll : function (callback) {
                let success = function(data) {
                    vm.rivenditori.list = data;
                    if(callback)
                        callback()
                };
                rivenditoriSrv.getAll(success);
            },
            getByProv : function (callback) {
                let success = function(data) {
                    vm.rivenditori.list = data;
                    if(callback)
                        callback()
                };
                rivenditoriSrv.getByProv(success);
            }
        };

        $transitions.onStart({}, function () {
            if(!vm.rivenditori.list) {
                let callback = function() {
                    $rootScope.loading = false;
                };
                vm.rivenditori.getAll(callback);
            }
        });

        $transitions.onSuccess({}, function () {
            let loc = $stateParams['loc'];
            if(loc)
                ngMeta.setTitle(` | ${loc}`);
        });
    }
})();