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
            .when('/finiture', {
                templateUrl: 'views/finiture.html',
                controller: 'finitureCtrl'
            })
            .when('/finitureTabelle', {
                templateUrl: 'views/tabelle_finiture.html',
                controller: 'tabelleFinitureCtrl'
            })
            .when('/linee', {
                templateUrl: 'views/linee.html',
                controller: 'lineeCtrl'
            })
            .when('/lineeSettori', {
                templateUrl: 'views/settori_linee.html',
                controller: 'settoriLineeCtrl'
            })
            .when('/marchi', {
                templateUrl: 'views/marchi.html',
                controller: 'marchiCtrl'
            })
            .when('/marchiTabelle', {
                templateUrl: 'views/tabelle_prodotti.html',
                controller: 'tabelleProdottiCtrl'
            })
            .when('/prodotti', {
                templateUrl: 'views/prodotti.html',
                controller: 'prodottiCtrl'
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
                templateUrl: 'views/vetrine_prodotti.html',
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