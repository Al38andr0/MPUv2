"use strict";
var app = angular.module("print", ['ngRoute', 'underscore', 'ui.bootstrap', 'ngTouch', 'services']);

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'it', includedLanguages: 'en'}, 'google_translate_element');
}

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    //$locationProvider.hashPrefix('!');
    $locationProvider.html5Mode({
        enabled: true
    });
    $routeProvider
        .when('/:loc/preventivo/:id', {
            templateUrl: 'views/preventivo.html',
            controller: 'prvCtrl'
        })
        .when('/:loc/ordine/:id', {
            templateUrl: 'views/ordine.html',
            controller: 'prvCtrl'
        })
        .when('/:loc/condizioni', {
            templateUrl: 'views/condizioni.html'
        })
        .when('/:loc/privacy', {
            templateUrl: 'views/privacy.html'
        })
        .when('/:loc/vetrina/:id', {
            templateUrl: 'views/composizione.html',
            controller: 'vetrinaCtrl'
        })
        .when('/:loc/composizione/:id', {
            templateUrl: 'views/composizione.html',
            controller: 'vetrinaCtrl'
        })
        .when('/:loc/articolo/:id', {
            templateUrl: 'views/articolo.html',
            controller: 'articoloCtrl'
        })
}]);

app.controller("mainCtrl", ['$scope', '$http', '$rootScope', '$location', '_', 'dataSvc', '$window', function($scope, $http, $rootScope, $location, _, dataSvc, $window) {

    $scope.vm = {};
    $scope.fnz = {};
    dataSvc.nazioni().then(function(result)    {   $scope.vm.nazioni = result.data;       });
    dataSvc.province().then(function(result)    {   $scope.vm.province = result.data;       });
    //dataSvc.riv().then(function(result)         {   $scope.vm.rivenditori = result.data;    });
    dataSvc.riv().then(function(result) {
        $scope.vm.rivenditori = result.data;
        _.each($scope.vm.rivenditori, function(v){
            if(v.v == 0) {
                var provincia = _.find($scope.vm.province, function(list){return list.i == v.p});
                v.prv = provincia.n;
            }
        });
    });
    dataSvc.age().then(function(result)      {   $scope.vm.agenti = result.data;    });
    dataSvc.marchi().then(function(result)      {   $scope.vm.marchi = result.data;         });
    dataSvc.prodotti().then(function (result)   {   $scope.vm.prodotti = result.data;     });
    dataSvc.linee().then(function (result)      {   $scope.vm.linee = result.data;          });
    dataSvc.vetrine().then(function (result)    {   $scope.vm.vetrine = result.data;        });
    dataSvc.composti().then(function (result)   {   $scope.vm.composti = result.data;     });
    dataSvc.abbinamenti().then(function(result) {   $scope.vm.abbinamenti = result.data;  });
    dataSvc.finiture().then(function(result)    {   $scope.vm.finiture = result.data;     });
    dataSvc.finitureTabelle().then(function(result) {$scope.vm.finitureTabelle = result.data;});
    $scope.fnz.convertToPositive = function(v) {
        return Math.abs(v);
    };

    $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });

    Number.prototype.formatMoney = function(c, d, t){
        var n = this;
        var cc;
        cc = isNaN(c = Math.abs(c)) ? 2 : c;
        d = d == undefined ? "." : d;
        t = t == undefined ? "," : t;
        var s = n < 0 ? "-" : "";
        var i = parseInt(n = Math.abs(+n || 0).toFixed(cc)) + "";
        var j;
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (cc ? d + Math.abs(n - i).toFixed(cc).slice(2) : "");
    };
    $scope.fnz.convertPrice = function(price){
        return (price).formatMoney(2, ',', '.');
    };
    $scope.fnz.convert = function(ID, list, item) {
        var array = [];
        var element = '';
        if(typeof ID === "object") {
            for(var i = 0; i < ID.length; i++){
                _.each($scope.vm[list], function(v) {
                    if(v.i == ID[i]){
                        array.push(v[item])
                    }
                })
            }
            return array;
        } else {
            _.each($scope.vm[list], function(v) {
                if(v.i == ID){
                    element = v[item];
                }
            });
            return element;
/*
            var object = _.find($scope.vm[list], function(l) { return l.i == ID});
            return object[item];
*/
        }
    };

    function getPosition(str, m, i) {
        return str.split(m, i).join(m).length;
    }
    //var cod = $location.search().id;
    $scope.fnz.findLoc = function() {
        var first = getPosition($location.path(), '/', 1);
        var second = getPosition($location.path(), '/', 2);
        return $location.path().slice(first + 1, second);
    };
    $scope.fnz.findPage = function() {
        var first = getPosition($location.path(), '/', 2);
        var second = getPosition($location.path(), '/', 3);
        return $location.path().slice(first + 1, second);
    };
    $scope.fnz.findID = function() {
        var slash = getPosition($location.path(), '/', 3);
        return $location.path().slice(slash + 1);
    };

    // ***************************** INIZIALIZZAZIONE UTENTE ***************************** //

    if ($scope.fnz.findLoc() != 'mpu') {
        {
            var loc = $scope.fnz.findLoc();
            var locName = loc.split('_').join(' ');
            dataSvc.province().then(function (prv) {
                var riv = false;
                var prvObject = _.find(prv.data, function (list) {
                    return list.n == locName
                });
                if (prvObject) {
                    riv = _.find($scope.vm.rivenditori, function (list) {
                        return list.p == prvObject.i
                    });
                } else {
                    riv = _.find($scope.vm.rivenditori, function (list) {
                        return list.n == locName
                    });
                }
                if (riv) {
                    _.each(riv.y, function (a) {
                        _.each($scope.vm.marchi, function (m) {
                            if (a.i == m.i) {
                                m.s = (a.s == 0) ? m.s : a.s;
                                m.v = a.v;
                                m.d = a.d;
                            }
                        });
                    });
                    $scope.vm.rivenditore = riv;
                }
            })
        }
    } else {
        $scope.vm.rivenditore = false;
    }

    var cod = $scope.fnz.findID();
    $http.post('../php/preventivo.php?p=' + cod, {}).success(function (result) {
        //console.log(result);
        $scope.prv = result;
    });

    $scope.fnz.resumePrv = function(page){
        var loc = $scope.fnz.findLoc();
        var cod = $scope.fnz.findID();
        var result = $scope.prv;
        if (result.prv.u != 0) {
            var riv = _.find($scope.vm.rivenditori, function (list) {
                return list.i == result.prv.u
            });
            if (riv.v != 0) {
                loc = riv.n;
            } else {
                var prvNome = $scope.fnz.convert(riv.p, 'province', 'n');
                loc = prvNome.split(' ').join('_');
            }
            if(page == 0) {
                window.open('../' + loc + '/preventivo?q=' + cod, '_blank');
            } else {
                window.open('../' + loc + '/form?q=' + cod, '_blank');
            }
        } else {
            if(page == 0) {
                window.open('../' + loc + '/preventivo?q=' + cod, '_blank');
            } else {
                window.open('../' + loc + '/form?q=' + cod, '_blank');
            }
        }
    };
    $scope.fnz.scontistica = function (price, scontoMarchio, maggiorazioneListino, scontoLinea) {
        var scontistica = price + ((price * maggiorazioneListino) / 100);
        scontistica += (scontistica * scontoMarchio) / 100;
        scontistica += (scontistica * scontoLinea) / 100;
        return Math.ceil(scontistica);
        // return Math.ceil(price + ((price * scontoMarchio) / 100) + ((price * maggiorazioneListino) / 100) + ((price * scontoLinea) / 100));
    };

/*
    $scope.fnz.scontistica = function (price, scontoMarchio, maggiorazioneListino, scontoLinea) {
        return Math.ceil(price + ((price * scontoMarchio) / 100) + ((price * maggiorazioneListino) / 100) + ((price * scontoLinea) / 100));
    };
*/

}]);

app.controller("prvCtrl", ['$scope', '$http', '$rootScope', '$location', '_', '$timeout', 'pagamenti',function($scope, $http, $rootScope, $location, _, $timeout, pagamenti) {

    $scope.rivenditore = {
        nome : false,
        tel : false,
        email : false
    };
    $scope.agente = {
        nome : false
    };

    $scope.vm.pagamenti = pagamenti;
    var render = function() {
        if($http.pendingRequests.length > 0) {
            $timeout(render);
        } else {
            $scope.date = new Date($scope.prv.data * 1000);
            $scope.ordDate = new Date($scope.prv.OrdData * 1000);
            var riv, rivenditore, agente;
            var alias = $scope.prv.prv;
            $scope.dataPrv = {};
            $scope.dataPrv.quantificare = false;
            $scope.dataPrv.rivenditore = false;
            $scope.dataPrv.totale = $scope.fnz.convertPrice(alias.z);

// ******************* INIZIALIZZAZIONE TITOLO ******************* //

            if(alias.u != 0) {
                rivenditore = _.find($scope.vm.rivenditori, function(list){return list.i == alias.u});
                $scope.rivenditore.nome = rivenditore.n;
                $scope.rivenditore.tel = rivenditore.h;
                $scope.rivenditore.email = rivenditore.e;
                $scope.rivenditore.conv = (rivenditore.v != 0);
                //console.log($scope.rivenditore)
                //console.log($scope.prv)
            } else {
                riv = _.find($scope.vm.rivenditori, function (list) {return list.p == alias.pr});
                if(riv) {
                    $scope.dataPrv.rivNome = riv.n;
                    $scope.dataPrv.rivTel = riv.h;
                    $scope.dataPrv.rivMail = riv.e;
                    $scope.dataPrv.rivenditore = true;
                } else {
                    riv = _.find($scope.vm.province, function (list) { return list.i == alias.pr });
                    $scope.dataPrv.rivenditore = false;
                }
            }
            if(alias.g != 0) {
                agente = _.find($scope.vm.agenti, function(list){return list.i == alias.g});
                $scope.agente.nome = agente.n;
                $scope.agente.tel = agente.t;
                $scope.agente.email = agente.e;
            }

// ******************* FINE INIZIALIZZAZIONE TITOLO ******************* //

            if(alias.pr == 0) {
                $scope.dataPrv.prNome = $scope.fnz.convert(rivenditore.p, 'province', 'n');
            } else {
                $scope.dataPrv.prNome = $scope.fnz.convert(alias.pr, 'province', 'n');
            }

            if (alias.tm == 2 || alias.tm == 1) {
                switch (alias.j) {
                    case 1:
                        if (alias.t == 0) {
                            $scope.dataPrv.trasporto = 'gratuito';
                        } else {
                            $scope.dataPrv.trasporto = $scope.fnz.convertPrice(alias.t) + ' €';
                        }
                        $scope.dataPrv.quantificare = false;
                        break;
                    case 2:
                        $scope.dataPrv.trasporto = $scope.fnz.convertPrice(alias.t) + ' €';
                        $scope.dataPrv.quantificare = false;
                        break;
                    case 3:
                        alias.t = 0;
                        $scope.dataPrv.trasporto = 'N/A**';
                        $scope.dataPrv.quantificare = true;
                        alias.b = 0;
                        break;
                }
                if (alias.tm == 2) {
                    switch (alias.k) {
                        case 1:
                            if (alias.m == 0) {
                                $scope.dataPrv.montaggio = 'gratuito';
                            } else {
                                $scope.dataPrv.montaggio = $scope.fnz.convertPrice(alias.m) + ' €';
                            }
                            $scope.dataPrv.quantificare = false;
                            break;
                        case 2:
                            $scope.dataPrv.montaggio = $scope.fnz.convertPrice(alias.m) + ' €';
                            $scope.dataPrv.quantificare = false;
                            break;
                        case 3:
                            alias.m = 0;
                            $scope.dataPrv.montaggio = 'N/A**';
                            $scope.dataPrv.quantificare = true;
                            alias.b = 0;
                            break;
                    }
                } else {
                    alias.m = 0;
                    $scope.dataPrv.montaggio = 'non richiesto';
                    $scope.dataPrv.quantificare = false;
                }
            } else {
                alias.t = 0;
                $scope.dataPrv.trasporto = 'non richiesto';
                alias.m = 0;
                $scope.dataPrv.montaggio = 'non richiesto';
                $scope.dataPrv.quantificare = false;
            }
            if (alias.z < alias.l && !$scope.dataPrv.quantificare) {
                $scope.dataPrv.minimo = $scope.fnz.convertPrice(alias.b);
                $scope.dataPrv.limite = $scope.fnz.convertPrice(alias.l);
            } else {
                alias.b = 0;
                $scope.dataPrv.minimo = false;
                $scope.dataPrv.limite = false;
            }

            $scope.dataPrv.sav = Math.ceil((alias.z * alias.a) / 100);
            $scope.dataPrv.sas = $scope.fnz.convertPrice($scope.dataPrv.sav);
            // $scope.dataPrv.sav = ((alias.z + $scope.dataPrv.ivaNumber) * alias.a) / 100;
/*
            $scope.dataPrv.ivaNumber = ((alias.z + $scope.dataPrv.sav) * 22) / 100;
            $scope.dataPrv.iva = $scope.fnz.convertPrice($scope.dataPrv.ivaNumber) + ' €';
*/

            var complessivo = alias.z + alias.b + alias.t + alias.m + $scope.dataPrv.sav;
            $scope.dataPrv.ivaNumber = (complessivo * 22) / 100;
            $scope.dataPrv.iva = $scope.fnz.convertPrice($scope.dataPrv.ivaNumber) + ' €';
            $scope.dataPrv.complessivo = $scope.fnz.convertPrice(alias.z + alias.b + alias.t + alias.m + $scope.dataPrv.sav + $scope.dataPrv.ivaNumber);

//            $scope.dataPrv.complessivo = $scope.fnz.convertPrice(alias.z + alias.b + alias.t + alias.m +           $scope.dataPrv.sav + $scope.dataPrv.ivaNumber);

            //console.log($scope.dataPrv);
        }
    };

    $timeout(render);
}]);

app.controller("vetrinaCtrl", ['$scope', '$http', '$rootScope', '$location', '_', '$timeout', 'dataSvc',function($scope, $http, $rootScope, $location, _, $timeout, dataSvc) {
    $scope.replaceAll = function(string, find, replace) {
        return string.replace(new RegExp(find, 'g'), replace);
    };
    $scope.cmp = {
        prd : [],
        prezzo : 0,
        cmp : {}
    };

    var folder = 'Vetrina';
    var type = 'vtr';
    var svc = 'vetrineProdotti';
    var data = 'vetrine';
    var renderCmp = function(){
        if($http.pendingRequests.length > 0) {
            $timeout(function(){renderCmp()});
        } else {
            $scope.cmp.cmp = _.find($scope.vm[data], function(list) { return list.i == $scope.fnz.findID()});
            $scope.cmp.cmp.marchio = $scope.fnz.convert($scope.cmp.cmp.m, 'marchi', 'n');
            $scope.cmp.cmp.linea = $scope.fnz.convert($scope.cmp.cmp.l, 'linee', 'n');
            $scope.cmp.cmp.consegna = $scope.fnz.convert($scope.cmp.cmp.l, 'linee', 'e');
            $scope.cmp.cmp.garanzia = $scope.fnz.convert($scope.cmp.cmp.l, 'linee', 'w');
            $scope.cmp.cmp.marchioPath = $scope.replaceAll($scope.cmp.cmp.marchio, ' ', '_');
            $scope.cmp.cmp.lineaPath = $scope.replaceAll($scope.cmp.cmp.linea, ' ', '_');
            $scope.cmp.cmp.path = '../dashboard/archivio_dati/' + $scope.cmp.cmp.marchioPath + '/' + $scope.cmp.cmp.lineaPath + '/' + folder + '/' + $scope.cmp.cmp.lineaPath + '_' + $scope.cmp.cmp.c + '.jpg';
            $scope.cmp.cmp.type = type;
            dataSvc[svc]().then(function (result){
                var list = _.filter(result.data, function(list) { return list.c == $scope.fnz.findID()});
                _.each(list, function (v) {
                    var art = _.find($scope.vm.prodotti, function(list) { return list.i == v.p});
                    art.qnt = v.q;
                    art.pos = v.y;
                    art.abb = v.u;
                    art.fin = v.f;
                    var prezzo = _.find(art.z, function(list) { return list.a == v.u }).z;
                    art.marchio = $scope.fnz.convert(v.m, 'marchi', 'n');
                    var ms = $scope.fnz.convert(v.m, 'marchi', 's');
                    var mb = $scope.fnz.convert(v.m, 'marchi', 'b');
                    art.linea = $scope.fnz.convert(v.l, 'linee', 'n');
                    var ls = $scope.fnz.convert(v.l, 'linee', 's');
                    art.prezzo = $scope.fnz.scontistica(prezzo, ms, mb, ls);
                    art.marchioPath = $scope.replaceAll(art.marchio, ' ', '_');
                    art.lineaPath = $scope.replaceAll(art.linea, ' ', '_');
                    art.consegna = $scope.fnz.convert(v.l, 'linee', 'e');
                    art.garanzia = $scope.fnz.convert(v.l, 'linee', 'w');
                    art.path = '../dashboard/archivio_dati/' + art.marchioPath + '/' + art.lineaPath + '/Prodotti/';
                    $scope.cmp.prezzo += art.prezzo * v.q;
                    $scope.cmp.prd.push(art);
                });
            });
            //console.log($scope.cmp)
        }
    };
    renderCmp();
}]);
app.controller("articoloCtrl", ['$scope', '$http', '$rootScope', '$location', '_', '$timeout', 'dataSvc',function($scope, $http, $rootScope, $location, _, $timeout, dataSvc) {
    $scope.replaceAll = function(string, find, replace) {
        return string.replace(new RegExp(find, 'g'), replace);
    };

    $scope.articolo = {};

    var renderArt = function(){
        if($http.pendingRequests.length > 0) {
            $timeout(function(){renderArt()});
        } else {
            $scope.articolo = _.find($scope.vm.prodotti, function(list) { return list.i == $scope.fnz.findID()});
            $scope.articolo.marchio = $scope.fnz.convert($scope.articolo.m, 'marchi', 'n');
            $scope.articolo.linea = $scope.fnz.convert($scope.articolo.l, 'linee', 'n');
            $scope.articolo.consegna = $scope.fnz.convert($scope.articolo.l, 'linee', 'e');
            $scope.articolo.garanzia = $scope.fnz.convert($scope.articolo.l, 'linee', 'w');
            $scope.articolo.marchioPath = $scope.replaceAll($scope.articolo.marchio, ' ', '_');
            $scope.articolo.lineaPath = $scope.replaceAll($scope.articolo.linea, ' ', '_');
            $scope.articolo.path = '../dashboard/archivio_dati/' + $scope.articolo.marchioPath + '/' + $scope.articolo.lineaPath + '/Prodotti/';

            var ms = $scope.fnz.convert($scope.articolo.m, 'marchi', 's');
            var mb = $scope.fnz.convert($scope.articolo.m, 'marchi', 'b');
            var ls = $scope.fnz.convert($scope.articolo.l, 'linee', 's');
            var price = $scope.fnz.scontistica($scope.articolo.z[0].z, ms, mb, ls);

            $scope.articolo.prezzo = $scope.fnz.convertPrice(price);
            if($scope.articolo.f != 0) {
                $scope.articolo.abb = _.find($scope.vm.abbinamenti, function(list) { return list.i == $scope.articolo.a});
                $scope.articolo.fin = $scope.fnz.convert($scope.articolo.abb.f[0].i, 'finiture', 'n');
            } else {
                _.each($scope.articolo.z, function(v) {
                    v.tab = $scope.fnz.convert(v.a, 'finitureTabelle', 'n');
                    var price = $scope.fnz.scontistica(v.z, ms, mb, ls);
                    v.prezzo = $scope.fnz.convertPrice(price)
                })
            }
            console.log($scope.articolo)
        }
    };
    renderArt();
}]);

app.directive('preventivo', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/preventivo.html',
        scope : {
            fnz : "=",
            index : "=",
            articolo : "=",
            prv : '=',
            vm : '='
        },
        controller : function($scope, $timeout, $http){
            //console.log($scope.prv);
            //$scope.index = $scope.index + 1;
            $scope.replaceAll = function(string, find, replace) {
                return string.replace(new RegExp(find, 'g'), replace);
            };
            var renderPrd = function(ID) {
                if($http.pendingRequests.length > 0) {
                    $timeout(function(){renderPrd(ID)});
                } else {
                    var prd = _.find($scope.vm.prodotti, function(list) {return list.i == ID});
                    $scope.item = angular.copy(prd);
                    $scope.item.abb = _.find($scope.vm.abbinamenti, function(list) {return list.i == $scope.articolo.a});
                    var marchio = _.find($scope.vm.marchi, function(list) {return list.i == $scope.item.m});
                    var linea = _.find($scope.vm.linee, function(list){return list.i == $scope.item.l});
                    $scope.item.price = $scope.fnz.convertPrice($scope.articolo.z);
                    $scope.item.linea = linea.n;
                    var marchioNome = $scope.replaceAll(marchio.n, ' ', '_');
                    var lineaNome = $scope.replaceAll(linea.n, ' ', '_');
                    var path = '../dashboard/archivio_dati/' + marchioNome + '/' + lineaNome + '/';
                    $scope.item.pathPdf = path + lineaNome + '_specifiche.pdf';
                    $scope.item.pathImg = path + 'Prodotti/' + $scope.item.c + '.jpg';
                    $scope.item.pathFin = '../dashboard/archivio_dati/' + marchioNome + '/Finiture/';
                    if(marchio.d && marchio.d != 0) {
                        $scope.item.consegna = marchio.d;
                    } else {
                        $scope.item.consegna = linea.e;
                    }
                    $scope.item.garanzia = linea.w;
                    $scope.item.q = 1;
                    $scope.tbpr = $scope.item.t;
                    var tabName = _.find($scope.vm.finitureTabelle, function(list) {return list.i == $scope.articolo.u});
                    $scope.item.u = tabName.n;
                    delete $scope.item.a;
                    delete $scope.item.f;
                    delete $scope.item.m;
                    delete $scope.item.y;
                    delete $scope.item.x;
                    delete $scope.item.z;
                    delete $scope.item.q;
                    //console.log($scope.item)
                }
            };
            //console.log($scope.articolo);
            $timeout(function(){renderPrd($scope.articolo.i)});
        }
    }
});

app.directive('composizione', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/composizione.html',
        scope : {
            item : "=",
            prezzo : "=",
            fnz : '='
        }
    }
});

app.directive('articolo', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/articolo.html',
        scope : {
            item : "=",
            vm : "=",
            fnz : '=',
            obj : '@'
        }
    }
});

