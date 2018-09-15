(function () {
    'use strict';

    angular.module('mpu')
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'ngMetaProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, ngMetaProvider) {

            ngMetaProvider.useTitleSuffix(true);
            ngMetaProvider.setDefaultTag('author', 'https://plus.google.com/105034652436636507879');

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $urlRouterProvider.otherwise('/');
            $locationProvider.hashPrefix('!');

            $stateProvider
                .state('/', {
                    url: '/',
                    templateUrl: '/html/views/home.html',
                    data: {
                        meta: {
                            title: 'Mobili per Ufficio e arredamento ufficio, prezzi e offerte in pronta consegna',
                            description: 'Vendita diretta e online di mobili per ufficio, sedie, poltrone, pareti divisorie, arredo ufficio moderno, classico e design, offerte a prezzi scontati'
                        }
                    },
                    controller: 'homeCtrl',
                    resolve: {
                        loc: ['$transition$', function ($transition$) {
                            return $transition$.params().loc;
                        }]
                    }
                })
                .state('home', {
                    url: '/:loc/home',
                    templateUrl: '/html/views/home.html',
                    data: {
                        meta: {
                            title: 'Mobili per Ufficio e arredamento ufficio, prezzi e offerte in pronta consegna',
                            description: 'Vendita diretta e online di mobili per ufficio, sedie, poltrone, pareti divisorie, arredo ufficio moderno, classico e design, offerte a prezzi scontati'
                        }
                    },
                    controller: 'homeCtrl',
                    resolve: {
                        loc: ['$transition$', function ($transition$) {
                            return $transition$.params().loc;
                        }]
                    }
                })
                .state('categoria', {
                    url: '/:loc/categoria/:categoria',
                    templateUrl: '/html/views/categoria.html',
                    data: {
                        meta: {
                            title: 'Test page',
                            description: 'Test the site'
                        }
                    }
                })
        }]);
})();