(function () {
    'use strict';

    angular.module('mpu')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$stateParams', '$state', '$transitions', '$rootScope', 'rivenditoriSrv', 'ngMeta', 'settoriSrv'];

    function mainCtrl($stateParams, $state, $transitions, $rootScope, rivenditoriSrv, ngMeta, settoriSrv) {
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
            list : []
        };

/*
        $transitions.onStart({}, function () {
            if(vm.rivenditori.list.length === 0) {
                let callback = function() {
                    let callback = () => $rootScope.loading = false;
                    vm.categorie.getAll(callback);
                };
                vm.rivenditori.getAll(callback);
            }
            console.log('START');
        });
*/


        $transitions.onSuccess({}, function () {
            // console.log('SUCCESS');
        });

        $transitions.onEnter({}, function () {
            // console.log('ENTER');
        });
    }
})();