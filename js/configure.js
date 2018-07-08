angular.module("mpu").config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    //$locationProvider.hashPrefix('!');
    $locationProvider.html5Mode({
        enabled: true
    });
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
    })
    .when('/:loc/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
    })
    .when('/:loc/categoria', {
        templateUrl: 'views/categoria.html',
        controller: 'categoriaCtrl'
        })
    .when('/:loc/settore', {
        templateUrl: 'views/settore.html',
        controller: 'settoreCtrl'
    })
    .when('/:loc/linea', {
        templateUrl: 'views/linea.html',
        controller: 'lineaCtrl'
    })
    .when('/:loc/vetrina', {
        templateUrl: 'views/vetrine.html',
        controller: 'lineaCtrl'
    })
    .when('/:loc/composizione', {
        templateUrl: 'views/composizione.html',
        controller: 'lineaCtrl'
    })
    .when('/:loc/listino', {
        templateUrl: 'views/listino.html',
        controller: 'lineaCtrl'
    })
/*
    .when('/:loc/composizioni', {
        templateUrl: 'views/composizioni.html',
        controller: 'lineaCtrl'
    })
*/
/*
    .when('/:loc/composizione', {
        templateUrl: 'views/composizione.html',
        controller: 'lineaCtrl'
    })
*/
    .when('/:loc/articolo', {
        templateUrl: 'views/articolo.html',
        controller: 'lineaCtrl'
    })
    .when('/:loc/preventivo', {
        templateUrl: 'views/preventivo.html',
        controller: 'preventivoCtrl'
    })
    .when('/:loc/form', {
        templateUrl: 'views/form.html',
        controller: 'formCtrl'
    })
    .when('/:loc/ordine', {
        templateUrl: 'views/ordine.html',
        controller: 'ordineCtrl'
    })
    .when('/:loc/contatti', {
        templateUrl: 'views/contatti.html'
    })
    .when('/:loc/distributori', {
        templateUrl: 'views/contatti.html'
    })
    .when('/:loc/condizioni', {
        templateUrl: 'views/condizioni.html'
    })
    .when('/:loc/progettazione', {
        templateUrl: 'views/progettazione.html'
    })
    .when('/:loc/privacy', {
        templateUrl: 'views/privacy.html'
    })
    .when('/:loc/cookies', {
        templateUrl: 'views/cookies.html'
    })
    .when('/:loc/faq', {
        templateUrl: 'views/faq.html',
            controller: 'faqCtrl'
    })
    .otherwise({
        templateUrl: 'views/home.html'
        // templateUrl: '404.html'
    });
}])
.run(['$rootScope', '$timeout', 'dataSvc', function ($rootScope, $timeout, dataSvc) {
    $rootScope.dt = {
        loaded : false,
        count : 1
    };
    dataSvc.marchi().then(function (result) {
        $rootScope.dt.marchi = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.tbpr().then(function (result) {
        $rootScope.dt.marchiTabelle = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.categorie().then(function (result) {
        $rootScope.dt.categorie = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.settori().then(function (result) {
        $rootScope.dt.settori = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
/*
    dataSvc.lineeSettori().then(function (result) {
        $rootScope.dt.lineeSettori = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
*/
    dataSvc.linee().then(function (result) {
        $rootScope.dt.linee = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.nazioni().then(function (result) {
        $rootScope.dt.nazioni = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.regioni().then(function (result) {
        $rootScope.dt.regioni = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.province().then(function (result) {
        $rootScope.dt.province = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.age().then(function (result) {
        $rootScope.dt.agenti = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.riv().then(function (result) {
        $rootScope.dt.rivenditori = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.vetrine().then(function (result) {
        $rootScope.dt.vetrine = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.prodotti().then(function (result) {
        $rootScope.dt.prodotti = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
/*
    dataSvc.prodottiSettori().then(function (result) {
        $rootScope.dt.prodottiSettori = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
*/
    dataSvc.vetrineProdotti().then(function (result) {
        $rootScope.dt.vetrineProdotti = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
/*
    dataSvc.composti().then(function (result) {
        $rootScope.dt.composti = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.compostiSettori().then(function (result) {
        $rootScope.dt.compostiSettori = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.compostiProdotti().then(function (result) {
        $rootScope.dt.compostiProdotti = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
*/
    dataSvc.abbinamenti().then(function (result) {
        $rootScope.dt.abbinamenti = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.finiture().then(function (result) {
        $rootScope.dt.finiture = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    dataSvc.finitureTabelle().then(function (result) {
        $rootScope.dt.finitureTabelle = result.data;
        $rootScope.dt.count++;
    }, function (error) {
        console.log(error)
    });
    $rootScope.$watch('dt.count', function (v) {
        if (v == 17) return $rootScope.dt.loaded = true;
    });
}]);