(function () {
    'use strict';

    angular.module('dashboardApp')
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $urlRouterProvider.otherwise('/_dashboard/categorie');
        $locationProvider.hashPrefix('!');

        $stateProvider
            .state('abbinamenti', {
                url: '/_dashboard/abbinamenti',
                templateUrl: 'views/abbinamenti.html',
                controller: 'abbinamentiCtrl'
            })
            .state('categorie', {
                url: '/_dashboard/categorie',
                templateUrl: 'views/categorie.html',
                controller: 'categorieCtrl'
            })
            .state('finiture', {
                url: '/_dashboard/finiture',
                templateUrl: 'views/finiture.html',
                controller: 'finitureCtrl'
            })
            .state('tabelle_finiture', {
                url: '/_dashboard/tabelle_finiture',
                templateUrl: 'views/tabelle_finiture.html',
                controller: 'tabelleFinitureCtrl'
            })
            .state('linee', {
                url: '/_dashboard/linee',
                templateUrl: 'views/linee.html',
                controller: 'lineeCtrl'
            })
            .state('settori_linee', {
                url: '/_dashboard/settori_linee',
                templateUrl: 'views/settori_linee.html',
                controller: 'settoriLineeCtrl'
            })
            .state('marchi', {
                url: '/_dashboard/marchi',
                templateUrl: 'views/marchi.html',
                controller: 'marchiCtrl'
            })
            .state('tabelle_prodotti', {
                url: '/_dashboard/tabelle_prodotti',
                templateUrl: 'views/tabelle_prodotti.html',
                controller: 'tabelleProdottiCtrl'
            })
            .state('prodotti', {
                url: '/_dashboard/prodotti',
                templateUrl: 'views/prodotti.html',
                controller: 'prodottiCtrl'
            })
            .state('province', {
                url: '/_dashboard/province',
                templateUrl: 'views/province.html',
                controller: 'provinceCtrl'
            })
            .state('convenzioni', {
                url: '/_dashboard/convenzioni',
                templateUrl: 'views/convenzioni.html',
                controller: 'convenzioniCtrl'
            })
            .state('settori', {
                url: '/_dashboard/settori',
                templateUrl: 'views/settori.html',
                controller: 'settoriCtrl'
            })
            .state('vetrine', {
                url: '/_dashboard/vetrine',
                templateUrl: 'views/vetrine.html',
                controller: 'vetrineCtrl'
            })
            .state('vetrine_prodotti', {
                url: '/_dashboard/vetrine_prodotti',
                templateUrl: 'views/vetrine_prodotti.html',
                controller: 'vetrineProdottiCtrl'
            })
            .state('rivenditori', {
                url: '/_dashboard/rivenditori',
                templateUrl: 'views/rivenditori.html',
                controller: 'rivenditoriCtrl'
            })
            .state('agenti', {
                url: '/_dashboard/agenti',
                templateUrl: 'views/agenti.html',
                controller: 'agentiCtrl'
            })
    }])
})();