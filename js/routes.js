(function () {
    'use strict';

    angular.module("mpu").config('router', router);

    router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function router($stateProvider, $locationProvider, $urlRouterProvider) {
        console.log('XXXX')
        $locationProvider.html5Mode(true);
        $stateProvider
            .state(
                'home', {
                    name: 'home',
                    url: '/home',
                    templateUrl: 'views/home.html'
                }
            );

        $urlRouterProvider.otherwise('/home');
    }
})();