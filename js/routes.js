(function () {
    'use strict';

    angular.module('mpu')
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'ngMetaProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, ngMetaProvider) {
            ngMetaProvider.useTitleSuffix(true);
            ngMetaProvider.setDefaultTitleSuffix(' | Best Website on the Internet!');
            ngMetaProvider.setDefaultTag('author', 'John Smith');

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
                            title: 'Login page',
                            titleSuffix: ' | Login to YourSiteName',
                            description: 'Login to the site'
                        }
                    }
                })
                .state('home', {
                    url: '/home',
                    templateUrl: '/html/views/home.html'
                })
                .state('test', {
                    url: '/:loc/test',
                    templateUrl: '/html/views/test.html',
                    data: {
                        meta: {
                            title: 'Test page',
                            titleSuffix: ' | Test Page',
                            description: 'Test the site'
                        }
                    }
                })
        }]);
})();