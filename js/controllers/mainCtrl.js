(function () {
    'use strict';

    angular.module('mpu')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$cookies', '$stateParams'];

    function mainCtrl($cookies, $stateParams) {
        let vm = this;
        vm.cookies = false;
        vm.loc = $stateParams

        vm.fnz = {
            findDomain: function () {
                return location.protocol + '//' + location.host;
            },
            acceptCookies: function () {
                vm.cookies = true;
                $cookies.put('MPU-K', 1);
            }
        };
    }
})();