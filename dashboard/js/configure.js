angular.module("mpuDashboard").config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.php',
                controller: 'mainCtrl'
            })
            .when('/home', {
                templateUrl: 'views/home.php',
                controller: 'mainCtrl'
            })
            .when('/abbinamenti', {
                templateUrl: 'views/abbinamenti.html',
                controller: 'abbinamentiCtrl'
            })
            .when('/categorie', {
                templateUrl: 'views/categorie.html',
                controller: 'categorieCtrl'
            })
            .when('/composti', {
                templateUrl: 'views/composti.html',
                controller: 'compostiCtrl'
            })
            .when('/compostiProdotti', {
                templateUrl: 'views/compostiProdotti.html',
                controller: 'compostiProdottiCtrl'
            })
            .when('/compostiSettori', {
                templateUrl: 'views/compostiSettori.html',
                controller: 'compostiSettoriCtrl'
            })
            .when('/esposizioni', {
                templateUrl: 'views/esposizioni.html',
                controller: 'esposizioniCtrl'
            })
            .when('/esposizioniProdotti', {
                templateUrl: 'views/esposizioniProdotti.html',
                controller: 'esposizioniProdottiCtrl'
            })
            .when('/esposizioniSettori', {
                templateUrl: 'views/esposizioniSettori.html',
                controller: 'esposizioniSettoriCtrl'
            })
            .when('/finiture', {
                templateUrl: 'views/finiture.html',
                controller: 'finitureCtrl'
            })
            .when('/finitureTabelle', {
                templateUrl: 'views/finitureTabelle.html',
                controller: 'finitureTabelleCtrl'
            })
            .when('/linee', {
                templateUrl: 'views/linee.html',
                controller: 'lineeCtrl'
            })
            .when('/lineeSettori', {
                templateUrl: 'views/lineeSettori.html',
                controller: 'lineeSettoriCtrl'
            })
            .when('/marchi', {
                templateUrl: 'views/marchi.html',
                controller: 'marchiCtrl'
            })
            .when('/marchiTabelle', {
                templateUrl: 'views/marchiTabelle.html',
                controller: 'marchiTabelleCtrl'
            })
            .when('/prodotti', {
                templateUrl: 'views/prodotti.html',
                controller: 'prodottiCtrl'
            })
            .when('/prodottiSettori', {
                templateUrl: 'views/prodottiSettori.html',
                controller: 'prodottiSettoriCtrl'
            })
            .when('/nazioni', {
                templateUrl: 'views/nazioni.html',
                controller: 'nazioniCtrl'
            })
            .when('/regioni', {
                templateUrl: 'views/regioni.html',
                controller: 'regioniCtrl'
            })
            .when('/province', {
                templateUrl: 'views/province.html',
                controller: 'provinceCtrl'
            })
            .when('/convenzioni', {
                templateUrl: 'views/convenzioni.html',
                controller: 'convenzioniCtrl'
            })
            .when('/settori', {
                templateUrl: 'views/settori.html',
                controller: 'settoriCtrl'
            })
            .when('/vetrine', {
                templateUrl: 'views/vetrine.html',
                controller: 'vetrineCtrl'
            })
            .when('/vetrineProdotti', {
                templateUrl: 'views/vetrineProdotti.html',
                controller: 'vetrineProdottiCtrl'
            })
            .when('/rivenditori', {
                templateUrl: 'views/rivenditori.html',
                controller: 'rivenditoriCtrl'
            })
            .when('/agenti', {
                templateUrl: 'views/agenti.html',
                controller: 'agentiCtrl'
            })
            .otherwise({
                templateUrl: 'views/home.php',
                controller: 'mainCtrl'
            });
    }]);