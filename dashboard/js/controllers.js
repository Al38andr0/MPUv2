angular.module("mpuDashboard").controller("mainCtrl", ['$scope', '$rootScope', '$location', '_', '$cookies', 'dataSvc', '$timeout', 'dashboardPages', function($scope, $rootScope, $location, _, $cookies, dataSvc, $timeout, dashboardPages) {

    $scope.vm = {
        currentPage : 1,
        itemsPerPage : 10,
        maxSize : 10,
        dummy : {
            image : false
        },
        categorie : false,
        marchi : false,
        nuovaCategoria : {
            v : 1,
            r : false
        },
        nuovoSettore : {
            v : 1,
            g : false,
            r : false,
            o : 0
        },
        nuovoMarchio : {
            v : 1,
            g : [],
            b : 0,
            s : 0
        },
        nuovaTbpr : {
            y : 1,
            m : false
        },
        nuovaFinitura : {
            v : 1,
            p : 0,
            m : false,
            r : false
        },
        nuovaLinea : {
            a : [false],
            q : [],
            v : 1,
            z : 2,
            b :   0,
            y :   100,
            c :   0,
            s :   0,
            e :   25,
            w :   2,
            g :   false,
            r :   false,
            k :   false,
            j :   false
        },
        nuovaFinituraTabella : {
            m : false,
            l : false
        },
        nuovoAbbinamento : {
            m : false,
            l : false,
            u : false,
            f : [{i : false, n : ''}]
        },
        nuovoProdotto : {
            m : false,
            l : false,
            t : false,
            a : '',
            y : 1,
            f : 0,
            z : [{z : '', a : ''}]
        },
        nuovaLineaSettore : {
            v : 1,
            p : 0,
            z : 1,
            q :   [],
            m : false,
            r : false
        },
        nuovoProdottoSettore : {
            m : false,
            l : false,
            c : false,
            h : []
        },
        nuovaVetrina : {
            m : false,
            l : false,
            v : 1,
            y : 1
            // h : []
        },
        nuovoVetrinaProdotto : {
            c : false,
            p : false,
            m : false,
            k : false,
            l : false,
            j : false,
            u : false,
            f : false,
            y: 1,
            q: 1
        },
        nuovaEsposizione : {
            m : false,
            l : false,
            t : false,
            y : 1
        },
        nuovoEsposizioneProdotto : {
            c : false,
            p : false,
            m : false,
            k : false,
            l : false,
            j : false,
            u : false,
            f : false,
            y: 1,
            q: 1
        },
        nuovoEsposizioneSettore : {
            m : false,
            l : false,
            c : false,
            v : 0,
            h : []
        },
        nuovoComposto : {
            m : false,
            l : false,
            y : 1
        },
        nuovoCompostoProdotto : {
            c : false,
            p : false,
            m : false,
            k : false,
            l : false,
            j : false,
            u : false,
            f : false,
            y: 1,
            q: 1
        },
        nuovoCompostoSettore : {
            m : false,
            l : false,
            c : false,
            v : 0,
            h : []
        },
        nuovaNazione : {
            v: 1
        },
        nuovaRegione : {
            z : false
        },
        nuovaProvincia : {
            z : false,
            r : false,
            b : 0,
            l : 0,
            t : 0,
            j : 1,
            m : 0,
            k : 1
        },
        nuovaConvenzione : {},
        nuovoAgente : {
            r : false
        },
        nuovoRivenditore : {
            z : false,
            r : false,
            p : false,
            b : 0,
            l : 0,
            t : 0,
            j : 1,
            m : 0,
            k : 1,
            v : false,
            c : '',
            h : '',
            f : '',
            a : ''
            //o : "0, 0"
        }
    };

    $scope.vm.ftscroller = {
        scrollbars: true,
        scrollingX: false,
        snap: true,
        momentum: true,
        hScrollbar : false,
        updateOnWindowResize : true,
        updateOnChanges : true
    };

    $scope.filtro = {
        show : '',
        categoria : {
            i : false
        },
        settore : '',
        marchio : {
            i : false,
            n : ''
        },
        tbpr : {
            i : false,
            n : ''
        },
        finitura : {
            i : false,
            n : '',
            c : ''
        },
        linea : {
            i : false,
            n : ''
        },
        newLinea : {
            i : false,
            n : ''
        },
        finituraTabella : {
            i : false,
            n : ''
        },
        abbinamento : {
            i : false,
            c : ''
        },
        lineaSettore : {
            i : false,
            n : '',
            c : ''
        },
        prodotto : {
            c : ''
        },
        prodottoSettore : {
            n : ''
        },
        vetrina : {
            c : ''
        },
        vetrinaProdotto : {
            c : '',
            p : ''
        },
        esposizione : {
            c : ''
        },
        esposizioneProdotto : {
            e : '',
            p : ''
        },
        esposizioneSettore : {
            c : ''
        },
        composto : {
            c : ''
        },
        compostoProdotto : {
            c : '',
            p : ''
        },
        compostoSettore : {
            c : ''
        },
        nazione : {
            i : ''
        },
        regione : {
            n : '',
            i : ''
        },
        provincia : {
            n : ''
        },
        convenzione : {
            n : ''
        },
        rivenditore : {
            n : ''
        },
        agente : {
            r : ''
        }
    };

    $scope.$watch('filtro.marchio.i', function(){
        $scope.filtro.linea.n = '';
        $scope.filtro.linea.i = false;
    });

    $scope.errore = {
        marchio : false,
        tbpr : false,
        finitura : false,
        linea : false,
        finituraTabella : false,
        abbinamento : false,
        lineaSettore : false,
        prodotto : false,
        prodottoSettore : false,
        vetrina : false,
        vetrinaProdotto : false,
        esposizione : false,
        esposizioneProdotto : false,
        composto : false,
        compostoProdotto : false,
        regione : false,
        provincia : false,
        rivenditore : false,
        agente : false
    };

    $rootScope.saving = false;
    $rootScope.changing = false;

    $scope.vm.changeLink = function(link){
        $location.path(link.link);
        $scope.vm.currentPage = 1;
        $scope.vm.itemsPerPage = 10;
        $scope.filtro.show = '';
    };

    $scope.$on('$locationChangeSuccess', function() {
        var refreshUrl = $location.path();
        switch (true) {
            case refreshUrl == '/categorie' :
                $scope.vm.currentLink = 'categorie';
                break;
            case refreshUrl == '/settori' :
                $scope.vm.currentLink = 'settori';
                break;
            case refreshUrl === '/marchi' || refreshUrl === '/marchiTabelle' :
                $scope.vm.currentLink = 'gestione marchi';
                $scope.vm.currentSubLink = refreshUrl.slice(1);
                break;
            case refreshUrl == '/finiture' || refreshUrl == '/finitureTabelle' || refreshUrl == '/abbinamenti' :
                $scope.vm.currentLink = 'gestione finiture';
                $scope.vm.currentSubLink = refreshUrl.slice(1);
                break;
            case refreshUrl == '/linee' || refreshUrl == '/lineeSettori' :
                $scope.vm.currentLink = 'gestione linee';
                $scope.vm.currentSubLink = refreshUrl.slice(1);
                break;
            case refreshUrl == '/prodotti' || refreshUrl == '/prodottiSettori' :
                $scope.vm.currentLink = 'gestione prodotti';
                $scope.vm.currentSubLink = refreshUrl.slice(1);
                break;
            case refreshUrl == '/esposizioni' || refreshUrl == '/esposizioniProdotti' || refreshUrl == '/esposizioniSettori' :
                $scope.vm.currentLink = 'gestione esposizioni';
                $scope.vm.currentSubLink = refreshUrl.slice(1);
                break;
            case refreshUrl == '/composti' || refreshUrl == '/compostiProdotti' || refreshUrl == '/compostiSettori' :
                $scope.vm.currentLink = 'gestione composizioni';
                $scope.vm.currentSubLink = refreshUrl.slice(1);
                break;
            case refreshUrl == '/vetrine' || refreshUrl == '/vetrineProdotti' :
                $scope.vm.currentLink = 'gestione vetrine';
                $scope.vm.currentSubLink = refreshUrl.slice(1);
                break;
            case refreshUrl == '/nazioni' || refreshUrl == '/regioni' || refreshUrl == '/province' :
                $scope.vm.currentLink = 'mappa';
                $scope.vm.currentSubLink = refreshUrl.slice(1);
                break;
            case refreshUrl == '/rivenditori' || refreshUrl == '/agenti' || refreshUrl == '/convenzioni' :
                $scope.vm.currentLink = 'distribuzione';
                $scope.vm.currentSubLink = refreshUrl.slice(1);
                break;
            default :
                $scope.vm.currentLink = 'home';
        }
    });

    dataSvc.categorie().then(function (result) {
        $scope.vm.categorie = result.data;
        $scope.vm.catPerFilter = angular.copy($scope.vm.categorie);
        $scope.vm.catPerFilter.unshift({i: false, n: ' Tutte le categorie'});
        $scope.vm.nuovaCategoria.i = _.max($scope.vm.categorie, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.settori().then(function (result) {
        $scope.vm.settori = result.data;
        $scope.vm.nuovoSettore.i = _.max($scope.vm.settori, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.marchi().then(function (result) {
        $scope.vm.marchi = result.data;
        $scope.vm.markPerFilter = angular.copy($scope.vm.marchi);
        $scope.vm.markPerFilter.unshift({i: false, n: ' Tutti i marchi'});
        $scope.vm.nuovoMarchio.i = _.max($scope.vm.marchi, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.tbpr().then(function (result) {
        $scope.vm.tbpr = result.data;
        $scope.vm.nuovaTbpr.i = _.max($scope.vm.tbpr, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.finitureTabelle().then(function (result) {
        $scope.vm.finitureTabelle = result.data;
        $scope.vm.nuovaFinituraTabella.i = _.max($scope.vm.finitureTabelle, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.finiture().then(function (result) {
        $scope.vm.finiture = result.data;
        $scope.vm.nuovaFinitura.i = _.max($scope.vm.finiture, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.abbinamenti().then(function (result) {
        $scope.vm.abbinamenti = result.data;
        $scope.vm.nuovoAbbinamento.i = _.max($scope.vm.abbinamenti, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.prodotti().then(function (result) {
        $scope.vm.prodotti = result.data;
        $scope.vm.nuovoProdotto.i = _.max($scope.vm.prodotti, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.lineeSettori().then(function (result) {
        $scope.vm.lineeSettori = result.data;
        $scope.vm.nuovaLineaSettore.i = _.max($scope.vm.lineeSettori, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.prodottiSettori().then(function (result) {
        $scope.vm.prodottiSettori = result.data;
        $scope.vm.nuovoProdottoSettore.i = _.max($scope.vm.prodottiSettori, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.linee().then(function (result) {
        $scope.vm.linee = result.data;
        $scope.vm.nuovaLinea.i = _.max($scope.vm.linee, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.vetrine().then(function (result) {
        $scope.vm.vetrine = result.data;
        $scope.vm.nuovaVetrina.i = _.max($scope.vm.vetrine, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.vetrineProdotti().then(function (result) {
        $scope.vm.vetrineProdotti = result.data;
        $scope.vm.nuovoVetrinaProdotto.i = _.max($scope.vm.vetrineProdotti, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.esposizioni().then(function (result) {
        $scope.vm.esposizioni = result.data;
        $scope.vm.nuovaEsposizione.i = _.max($scope.vm.esposizioni, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.esposizioniProdotti().then(function (result) {
        $scope.vm.esposizioniProdotti = result.data;
        $scope.vm.nuovoEsposizioneProdotto.i = _.max($scope.vm.esposizioniProdotti, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.esposizioniSettori().then(function (result) {
        $scope.vm.esposizioniSettori = result.data;
        $scope.vm.nuovoEsposizioneSettore.i = _.max($scope.vm.esposizioniSettori, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.composti().then(function (result) {
        $scope.vm.composti = result.data;
        $scope.vm.nuovoComposto.i = _.max($scope.vm.composti, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.compostiProdotti().then(function (result) {
        $scope.vm.compostiProdotti = result.data;
        $scope.vm.nuovoCompostoProdotto.i = _.max($scope.vm.compostiProdotti, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.compostiSettori().then(function (result) {
        $scope.vm.compostiSettori = result.data;
        $scope.vm.nuovoCompostoSettore.i = _.max($scope.vm.compostiSettori, function(list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.nazioni().then(function (result) {
        $scope.vm.nazioni = result.data;
        if($scope.vm.nazioni.length == 0) {
            $scope.vm.nuovaNazione.i = 1;
        } else {
            $scope.vm.nuovaNazione.i = _.max($scope.vm.nazioni, function(list) {
                return list.i;
            }).i + 1;
        }
    });

    dataSvc.regioni().then(function (result) {
        $scope.vm.regioni = result.data;
        if($scope.vm.regioni.length == 0) {
            $scope.vm.nuovaRegione.i = 1;
        } else {
            $scope.vm.nuovaRegione.i = _.max($scope.vm.regioni, function(list) {
                return list.i;
            }).i + 1;
        }
    });

    dataSvc.province().then(function (result) {
        $scope.vm.province = result.data;
        if($scope.vm.province.length == 0) {
            $scope.vm.nuovaProvincia.i = 1;
        } else {
            $scope.vm.nuovaProvincia.i = _.max($scope.vm.province, function(list) {
                return list.i;
            }).i + 1;
        }
    });

    dataSvc.convenzioni().then(function (result) {
        $scope.vm.convenzioni = result.data;
        if($scope.vm.convenzioni.length == 0) {
            $scope.vm.nuovaConvenzione.i = 1;
        } else {
            $scope.vm.nuovaConvenzione.i = _.max($scope.vm.convenzioni, function(list) {
                return list.i;
            }).i + 1;
        }
    });

    dataSvc.agenti().then(function (result) {
        $scope.vm.agenti = (result.data) ? result.data : [];
        if($scope.vm.agenti.length == 0) {
            $scope.vm.nuovoAgente.i = 1;
        } else {
            $scope.vm.nuovoAgente.i = _.max($scope.vm.agenti, function(list) {
                return list.i;
            }).i + 1;
        }
    });

    dataSvc.rivenditori().then(function (result) {
        $scope.vm.rivenditori = result.data;
        $scope.vm.nuovoRivenditore.i = _.max($scope.vm.rivenditori, function(list) {
            return list.i;
        }).i + 1;
    });

    $scope.sorting = function(type){
        if($scope.vm.sorting == type) {
            $scope.vm.sorting = '-' + type
        } else {
            $scope.vm.sorting = type
        }
    };

    $scope.convert = function(ID, list, item) {
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
        }
    };

    Number.prototype.formatMoney = function(c, d, t){
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    $scope.convertPrice = function(price){
        return (price).formatMoney(2, ',', '.');
    };

    $scope.convertFinType = function(ID) {
        return (ID == 0) ? 'Finitura' : 'Rivestimento';
    };

    $scope.convertPriceType = function(ID) {
        switch (ID) {
            case 1 :
                return 'Best price';
            break;
            case 2 :
                return 'Economico';
            break;
            case 3 :
                return 'Design';
            break;
            case 4 :
                return 'Alto design';
            break;
            case 5 :
                return 'Luxury';
            break;
        }
    };

    $scope.vm.links = dashboardPages;

}]);

angular.module("mpuDashboard").controller("categorieCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', function($scope, $rootScope, _, dataSvc, $http) {

    $scope.selectItem = function(result) {
        $scope.categorie = {};
        $scope.categorie.selected = true;
        $scope.categorie.categoria= result;
    };

    $scope.vm.saveCategorieData = function(){
        $rootScope.saving = true;
        $http.post('php/categorie.php?type=save', $scope.vm.categorie).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/categorie.php?type=db', $scope.vm.categorie).success(function() {
            $rootScope.saving = false;
            dataSvc.categorie().then(function (result) {
                $scope.vm.categorie = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovaCategoria.n || !$scope.vm.nuovaCategoria.r || !$scope.vm.nuovaCategoria.x || isNaN($scope.vm.nuovaCategoria.y));
    };

    $scope.action = function(type) {
        if(type == 'N'){
            $rootScope.saving = true;
            $http.post('php/categorie.php?type=new', {
                    'id'    :   $scope.vm.nuovaCategoria.i,
                    'nome'  :   $scope.vm.nuovaCategoria.n,
                    'pos'   :   $scope.vm.nuovaCategoria.y,
                    'show'  :   $scope.vm.nuovaCategoria.v,
                    'image' :   $scope.vm.nuovaCategoria.r,
                    'text'  :   $scope.vm.nuovaCategoria.x
                }
            ).success(function(result) {
                    //console.log(result);
                    $scope.vm.categorie.push($scope.vm.nuovaCategoria);
                    $scope.vm.nuovaCategoria = {
                        v : 1,
                        r : false,
                        i : $scope.vm.nuovaCategoria.i + 1
                    };
                    $scope.vm.saveCategorieData();
                    $rootScope.saving = false;
                }).error(function(data, status) {
                    console.log(status);
                });
        }
    };
}]);

angular.module("mpuDashboard").controller("settoriCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.settori = {
        selected : false
    };

    $scope.selectSettore = function(result) {
        $scope.settori = {};
        $scope.settori.selected = true;
        $scope.settori.settore= result;
    };

    $scope.vm.saveSettoriData = function(){
        $rootScope.saving = true;
        $http.post('php/settori.php?type=save', $scope.vm.settori).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/settori.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.settori().then(function (result) {
                $scope.vm.settori = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.settore = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27)
            $scope.input = '';
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovoSettore.n || isNaN($scope.vm.nuovoSettore.y) || !$scope.vm.nuovoSettore.g || !$scope.vm.nuovoSettore.r || !$scope.vm.nuovoSettore.x);
    };

    $scope.action = function(type) {
        if(type == 'N'){
            $rootScope.saving = true;
            $http.post('php/settori.php?type=new', {
                    'id'    :   $scope.vm.nuovoSettore.i,
                    'nome'  :   $scope.vm.nuovoSettore.n,
                    'pos'   :   $scope.vm.nuovoSettore.y,
                    'show'  :   $scope.vm.nuovoSettore.v,
                    'cat'   :   $scope.vm.nuovoSettore.g,
                    'image' :   $scope.vm.nuovoSettore.r,
                    'text'  :   $scope.vm.nuovoSettore.x,
                    'home'  :   $scope.vm.nuovoSettore.o
                }
            ).success(function(result) {
                    //console.log('Risposta dalla pagina PHP', result);
                    delete $scope.vm.nuovoSettore.r;
                    $scope.vm.settori.push($scope.vm.nuovoSettore);
                    $scope.vm.nuovoSettore = {
                        v : 1,
                        i : $scope.vm.nuovoSettore.i + 1,
                        g : false,
                        r : false,
                        o : 0
                    };
                    $scope.vm.saveSettoriData();
                    $rootScope.saving = false;
                }).error(function(data, status) {
                    console.log(status);
                });
        }
    };
}]);

angular.module("mpuDashboard").controller("marchiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.marchi = {
        selected : false
    };

    $scope.vm.sorting = 'n';

    $scope.selectMarchio = function(result) {
        $scope.marchi = {};
        $scope.marchi.selected = true;
        $scope.marchi.marchio= result;
    };

    $scope.vm.saveMarchiData = function(){
        $rootScope.saving = true;
        $http.post('php/marchi.php?type=save', $scope.vm.marchi).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/marchi.php?type=db', $scope.vm.marchi).success(function() {
            $rootScope.saving = false;
            dataSvc.marchi().then(function (result) {
                $scope.vm.marchi = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.marchi = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27)
            $scope.input = '';
    };

    $scope.toggleSet = function(ID) {
        if($scope.vm.nuovoMarchio.g.indexOf(ID) == -1) {
            $scope.vm.nuovoMarchio.g.push(parseInt(ID));
        } else {
            $scope.vm.nuovoMarchio.g.splice($scope.vm.nuovoMarchio.g.indexOf(ID), 1);
        }
    };

    $scope.checkList = function(ID) {
        return ($scope.vm.nuovoMarchio.g.indexOf(ID) != -1);
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovoMarchio.n || $scope.vm.nuovoMarchio.g.length == 0 || isNaN($scope.vm.nuovoMarchio.b) || isNaN($scope.vm.nuovoMarchio.s));
    };

    var checkMarchio = function() {
        return _.findWhere($scope.vm.marchi, {n : $scope.vm.nuovoMarchio.n});
    };

    $scope.newMarchio = function() {
        $rootScope.saving = false;
        $scope.marchi.selected = false;
        $scope.vm.nuovoMarchio = {
            v : 1,
            i : $scope.vm.nuovoMarchio.i + 1,
            g : [],
            b : 0,
            s : 0
        };
        $scope.errore.marchio = false;
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkMarchio()){
                $rootScope.saving = true;
                var checkboxes = document.getElementsByClassName('categorieCheck');
                for(var i=0; checkboxes[i]; ++i){
                    if(checkboxes[i].checked){
                        checkboxes[i].checked = false;
                    }
                }
                $http.post('php/marchi.php?type=new', {
                        'id' : $scope.vm.nuovoMarchio.i,
                        'nome': $scope.vm.nuovoMarchio.n,
                        'show': $scope.vm.nuovoMarchio.v,
                        'list': $scope.vm.nuovoMarchio.b,
                        'disc': $scope.vm.nuovoMarchio.s,
                        'cat_array': $scope.vm.nuovoMarchio.g
                    }
                ).success(function(result) {
                        //console.log(result);
                        $scope.vm.marchi.push($scope.vm.nuovoMarchio);
                        $scope.newMarchio();
                        $scope.vm.saveMarchiData();
                    }).error(function(data, status) {
                        console.log(status);
                    });
            }  else {   $scope.errore.marchio = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("marchiTabelleCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.tbpr = {
        selected : false
    };

    $scope.vm.sorting = ['m', 'y'];

    $scope.selectTbpr = function(result) {
        $scope.tbpr = {};
        $scope.tbpr.selected = true;
        $scope.tbpr.tbpr= result;
    };

    $scope.vm.saveTbprData = function(){
        $rootScope.saving = true;
        $http.post('php/marchiTabelle.php?type=save', $scope.vm.tbpr).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/marchiTabelle.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.tbpr().then(function (result) {
                $scope.vm.tbpr = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.tbpr.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27)
            $scope.input = '';
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovaTbpr.n || isNaN($scope.vm.nuovaTbpr.y) || !$scope.vm.nuovaTbpr.m);
    };

    $scope.newTbpr = function() {
        $rootScope.saving = false;
        $scope.errore.tbpr = false;
        $scope.vm.nuovaTbpr = {
            i : $scope.vm.nuovaTbpr.i + 1,
            m : false,
            y : 1
        };
    };

    var checkTBpr = function() {
        return _.findWhere($scope.vm.tbpr, {n : $scope.vm.nuovaTbpr.n, m : $scope.vm.nuovaTbpr.m});
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkTBpr()) {
                $rootScope.saving = true;
                $http.post('php/marchiTabelle.php?type=new', {
                        'id'    :   $scope.vm.nuovaTbpr.i,
                        'nome'  :   $scope.vm.nuovaTbpr.n,
                        'pos'   :   $scope.vm.nuovaTbpr.y,
                        'mark'   :   $scope.vm.nuovaTbpr.m
                    }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        $scope.vm.tbpr.push($scope.vm.nuovaTbpr);
                        $scope.vm.nuovaTbpr = {
                            i : $scope.vm.nuovaTbpr.i + 1,
                            m : false
                        };
                        $scope.vm.saveTbprData();
                        $scope.newTbpr();
                    }).error(function(data, status) {
                        console.log(status);
                    });
            } else {    $scope.errore.tbpr = true   }
        }
    };
}]);

angular.module("mpuDashboard").controller("finitureCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.finitura = {
        selected : false
    };

    $scope.vm.sorting = ['m', 'n'];

    $scope.switchType = function() {
        return ($scope.vm.nuovaFinitura.p == 0) ? 'finitura' : 'rivestimento';
    };

    $scope.selectFinitura = function(result) {
        $scope.finitura = {};
        $scope.finitura.selected = true;
        $scope.finitura.finitura= result;
    };

    $scope.vm.saveFinituraData = function(){
        $rootScope.saving = true;
        $http.post('php/finiture.php?type=save', $scope.vm.finiture).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/finiture.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.finiture().then(function (result) {
                $scope.vm.finiture = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.finitura.n = tempFilterText;
        }, 250);
    });

    $scope.$watch('inputCod', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.finitura.c = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e, type){
        if (e.keyCode == 27)
        (!type) ? $scope.input = '' : $scope.inputCod = '';
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovaFinitura.n || !$scope.vm.nuovaFinitura.c || !$scope.vm.nuovaFinitura.m || !$scope.vm.nuovaFinitura.r);
    };

    var checkFinitura = function() {
        return _.findWhere($scope.vm.finiture, {n : $scope.vm.nuovaFinitura.n, c : $scope.vm.nuovaFinitura.c, m : $scope.vm.nuovaFinitura.m});
    };

    $scope.newFinitura = function(){
        $rootScope.saving = false;
        $scope.errore.finitura = false;
        $scope.vm.nuovaFinitura = {
            i : $scope.vm.nuovaFinitura.i + 1,
            v : 1,
            p : 0,
            m : false,
            r : false
        };
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkFinitura()) {
                $rootScope.saving = true;
                $http.post('php/finiture.php?type=new', {
                        'id'    :   $scope.vm.nuovaFinitura.i,
                        'nome'  :   $scope.vm.nuovaFinitura.n,
                        'cod'  :   $scope.vm.nuovaFinitura.c,
                        'show'  :   $scope.vm.nuovaFinitura.v,
                        'mark'   :   $scope.vm.nuovaFinitura.m,
                        'image'   :   $scope.vm.nuovaFinitura.r,
                        'type'   :   $scope.vm.nuovaFinitura.p
                    }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        delete $scope.vm.nuovaFinitura.r;
                        $scope.vm.finiture.push($scope.vm.nuovaFinitura);
                        $scope.vm.saveFinituraData();
                        $scope.newFinitura()
                    }).error(function(data, status) {
                        console.log(status);
                    });
            } else {    $scope.errore.finitura = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("lineeCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', 'lineeManager', function($scope, $rootScope, _, dataSvc, $http, $timeout, lineeManager) {

    $scope.linea = {
        selected : false
    };

    $scope.priceName = [
        {
            n : 'economico',
            i : 2
        },
        {
            n : 'design',
            i : 3
        },
        {
            n : 'top class',
            i : 4
        }
    ];

    $scope.vm.sorting = ['m', 'n', 'y'];
    $scope.vm.lineeManager = lineeManager;
    $scope.selectLinea = function(result) {
        $scope.linea = {};
        $scope.linea.selected = true;
        $scope.linea.linea= result;
    };

    $scope.vm.saveLineaData = function(){
        $rootScope.saving = true;
        $http.post('php/linee.php?type=save', $scope.vm.linee).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/linee.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.linee().then(function (result) {
                $scope.vm.linee = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB();

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.linea.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27)
            $scope.input = '';
    };

    $scope.addLink = function(){
        $scope.vm.nuovaLinea.a.push(false);
    };

    $scope.removeLink = function(index){
        if($scope.vm.nuovaLinea.a.length == 1) {
            $scope.vm.nuovaLinea.a = [false];
        } else {
            $scope.vm.nuovaLinea.splice(index, 1);
        }
    };

    $scope.toggleSet = function(ID) {
        if($scope.vm.nuovaLinea.q.indexOf(ID) == -1) {
            $scope.vm.nuovaLinea.q.push(parseInt(ID));
        } else {
            $scope.vm.nuovaLinea.q.splice($scope.vm.nuovaLinea.q.indexOf(ID), 1);
        }
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovaLinea.n || isNaN($scope.vm.nuovaLinea.e) || isNaN($scope.vm.nuovaLinea.w) || isNaN($scope.vm.nuovaLinea.s) || !$scope.vm.nuovaLinea.m);
    };

    var checkLinea = function() {
        return _.findWhere($scope.vm.linee, {nome : $scope.vm.nuovaLinea.n, mark : $scope.vm.nuovaLinea.m});
    };

    $scope.newLinea = function() {
        $rootScope.saving = false;
        $scope.errore.linea = false;
        $scope.vm.nuovaLinea = {
            i : $scope.vm.nuovaLinea.i + 1,
            q : [],
            a : [false],
            v : 1,
            z : 2,
            b :   0,
            y :   100,
            c :   0,
            s :   0,
            e :   25,
            w :   2,
            g :   false,
            r :   false,
            k :   false,
            j :   false
        };
    };


    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkLinea()) {
                $rootScope.saving = true;
                $http.post('php/linee.php?type=new', {
                    'id'        :   $scope.vm.nuovaLinea.i,
                    'nome'      :   $scope.vm.nuovaLinea.n,
                    'mark'      :   $scope.vm.nuovaLinea.m,
                    'disc'      :   $scope.vm.nuovaLinea.s,
                    'time'      :   $scope.vm.nuovaLinea.e,
                    'war'       :   $scope.vm.nuovaLinea.w,
                    'ctl'       :   $scope.vm.nuovaLinea.k,
                    'spc'       :   $scope.vm.nuovaLinea.j,
                    'image'     :   $scope.vm.nuovaLinea.r,
                    'show'      :   $scope.vm.nuovaLinea.v,
                    'price'     :   $scope.vm.nuovaLinea.z,
                    'cat'       :   $scope.vm.nuovaLinea.g,
                    'set'       :   $scope.vm.nuovaLinea.q,
                    'link'      :   $scope.vm.nuovaLinea.a,
                    'vtr'      :   $scope.vm.nuovaLinea.c,
                    'pos'      :   $scope.vm.nuovaLinea.y
                }
            ).success(function(result) {
                    console.log('Risposta dalla pagina PHP', result);
                    $scope.vm.nuovaLinea.k = ($scope.vm.nuovaLinea.k) ? 1 : false;
                    $scope.vm.nuovaLinea.j = ($scope.vm.nuovaLinea.j) ? 1 : false;
                    $scope.vm.linee.push($scope.vm.nuovaLinea);
                    $scope.vm.saveLineaData();
                    $scope.newLinea();
                }).error(function(data, status) {
                    console.log(status);
                });
            }  else {   $scope.errore.linea = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("finitureTabelleCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.finituraTabella = {
        selected : false
    };

    $scope.vm.sorting = ['m', 'l', 'n'];

    $scope.selectFinituraTabella = function(result) {
        $scope.finituraTabella = {};
        $scope.finituraTabella.selected = true;
        $scope.finituraTabella.finituraTabella= result;
    };

    $scope.vm.saveFinitureTabelleData = function(){
        $rootScope.saving = true;
        $http.post('php/finitureTabelle.php?type=save', $scope.vm.finitureTabelle).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/finitureTabelle.php?type=db').success(function(result) {
            $rootScope.saving = false;
            //console.log(result);
            dataSvc.finitureTabelle().then(function (result) {
                $scope.vm.finitureTabelle = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.finituraTabella.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27)
            $scope.input = '';
    };

    $scope.newFinituraTabella = function() {
        $rootScope.saving = false;
        $scope.errore.finituraTabella = false;
        $scope.vm.nuovaFinituraTabella = {
            i : $scope.vm.nuovaFinituraTabella.i + 1,
            m : false,
            l : false
        };
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovaFinituraTabella.n || !$scope.vm.nuovaFinituraTabella.m || !$scope.vm.nuovaFinituraTabella.l);
    };

    var checkFinituraTabella = function() {
        return _.findWhere($scope.vm.finitureTabelle, {n : $scope.vm.nuovaFinituraTabella.n, m : $scope.vm.nuovaFinituraTabella.m, l : $scope.vm.nuovaFinituraTabella.l});
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkFinituraTabella()) {
                $rootScope.saving = true;
                $http.post('php/finitureTabelle.php?type=new', {
                    'id'    :   $scope.vm.nuovaFinituraTabella.i,
                    'nome'  :   $scope.vm.nuovaFinituraTabella.n,
                    'line'   :   $scope.vm.nuovaFinituraTabella.l,
                    'mark'   :   $scope.vm.nuovaFinituraTabella.m
                }
            ).success(function(result) {
                    //console.log('Risposta dalla pagina PHP', result);
                    $scope.vm.finitureTabelle.push($scope.vm.nuovaFinituraTabella);
                    $scope.vm.saveFinitureTabelleData();
                    $scope.newFinituraTabella();
                }).error(function(data, status) {
                    console.log(status);
                });
            }  else {   $scope.errore.finituraTabella = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("abbinamentiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.abbinamento = {
        selected : false
    };

    $scope.vm.sorting = ['m', 'l', 'c'];

    $scope.$watch('vm.nuovoAbbinamento.m', function(){
        $scope.vm.nuovoAbbinamento.l = false;
        $scope.vm.nuovoAbbinamento.u = false;
        $scope.vm.nuovoAbbinamento.f = [{i : false, n : ''}];
    });

    $scope.$watch('vm.nuovoAbbinamento.l', function(){
        $scope.vm.nuovoAbbinamento.u = false;
        $scope.vm.nuovoAbbinamento.f = [{i : false, n : ''}];
    });

    $scope.$watch('filtro.marchio.i', function(){
        $scope.filtro.linea.i = false;
        $scope.filtro.finituraTabella.i = false;
    });

    $scope.$watch('filtro.linea.i', function(){
        $scope.filtro.finituraTabella.i = false;
    });

    $scope.addAbbinamento = function(){
        $scope.vm.nuovoAbbinamento.f.push({i : false, n : ''});
    };

    $scope.removeAbbinamento = function(index){
        $scope.vm.nuovoAbbinamento.f.splice(index, 1);
    };

    $scope.selectAbbinamento = function(result) {
        $scope.abbinamento = {};
        $scope.abbinamento.selected = true;
        $scope.abbinamento.abbinamento= result;
    };

    $scope.vm.saveAbbinamentiData = function(){
        $rootScope.saving = true;
        $http.post('php/abbinamenti.php?type=save', $scope.vm.abbinamenti).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/abbinamenti.php?type=db').success(function(result) {
            console.log(result);
            $rootScope.saving = false;
            dataSvc.abbinamenti().then(function (result) {
                $scope.vm.abbinamenti = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.abbinamento.c = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27)
            $scope.input = '';
    };

    $scope.newAbbinamento = function() {
        $rootScope.saving = false;
        $scope.errore.abbinamento = false;
        $scope.vm.nuovoAbbinamento = {
            i : $scope.vm.nuovoAbbinamento.i + 1,
            m : false,
            l : false,
            u : false,
            f : [{i : false, n : ''}]
        };
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovoAbbinamento.c || !$scope.vm.nuovoAbbinamento.u);
    };

    function checkAbbinamento() {
        return _.findWhere($scope.vm.abbinamenti, {c : $scope.vm.nuovoAbbinamento.c, l : $scope.vm.nuovoAbbinamento.l, u : $scope.vm.nuovoAbbinamento.u});
    }

    function checkFinArray() {
        var emptyArray = _.filter($scope.vm.nuovoAbbinamento.f, function(list){
            return !list.i || !list.n
        });
        return emptyArray.length;
    }

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkAbbinamento() && checkFinArray() === 0) {
                $rootScope.saving = true;
                $http.post('php/abbinamenti.php?type=new', {
                        'id'        :   $scope.vm.nuovoAbbinamento.i,
                        'cod'       :   $scope.vm.nuovoAbbinamento.c,
                        'line'      :   $scope.vm.nuovoAbbinamento.l,
                        'mark'      :   $scope.vm.nuovoAbbinamento.m,
                        'abb_array' :   $scope.vm.nuovoAbbinamento.f,
                        'tab'       :   $scope.vm.nuovoAbbinamento.u
                    }
                ).success(function(result) {
                        //console.log('Risposta dalla pagina PHP', result);
                        $scope.vm.abbinamenti.push($scope.vm.nuovoAbbinamento);
                        $scope.vm.saveAbbinamentiData();
                        $scope.newAbbinamento();
                    }).error(function(data, status) {
                        console.log(status);
                    });
            }  else {   $scope.errore.abbinamento = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("lineeSettoriCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', 'lineeManager', function($scope, $rootScope, _, dataSvc, $http, $timeout, lineeManager) {

    $scope.lineaSettore = {
        selected : false
    };

    $scope.vm.lineeManager = lineeManager;

    $scope.vm.sorting = ['m'];

    $scope.selectLineaSettore = function(result) {
        $scope.lineaSettore = {};
        $scope.lineaSettore.selected = true;
        $scope.lineaSettore.lineaSettore= result;
    };

    $scope.vm.saveLineaSettoreData = function(){
        $rootScope.saving = true;
        $http.post('php/lineeSettori.php?type=save', $scope.vm.lineeSettori).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/lineeSettori.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.lineeSettori().then(function (result) {
                $scope.vm.lineeSettori = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB();

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.lineaSettore.n = tempFilterText;
        }, 250);
    });

    $scope.$watch('inputCod', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.lineaSettore.c = tempFilterText;
        }, 250);
    });

    $scope.toggleSet = function(ID) {
        if($scope.vm.nuovaLineaSettore.q.indexOf(ID) == -1) {
            $scope.vm.nuovaLineaSettore.q.push(parseInt(ID));
        } else {
            $scope.vm.nuovaLineaSettore.q.splice($scope.vm.nuovaLineaSettore.q.indexOf(ID), 1);
        }
    };

    $scope.checkList = function(ID) {
        return ($scope.vm.nuovaLineaSettore.q.indexOf(ID) != -1);
    };

    var checkList = function(ID) {
        return ($scope.vm.nuovaLineaSettore.length);
    };

    $scope.eraseInput = function(e, type){
        if (e.keyCode == 27)
            (!type) ? $scope.input = '' : $scope.inputCod = '';
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovaLineaSettore.h || !$scope.vm.nuovaLineaSettore.l || !$scope.vm.nuovaLineaSettore.r);
    };

    var checkLineaSettori = function() {
        return _.findWhere($scope.vm.lineeSettori, {m : $scope.vm.nuovaLineaSettore.m, l : $scope.vm.nuovaLineaSettore.l, h : $scope.vm.nuovaLineaSettore.h});
    };

    $scope.newItem = function(){
        $rootScope.saving = false;
        $scope.errore.lineaSettore = false;
        $scope.vm.nuovaLineaSettore = {
            i : $scope.vm.nuovaLineaSettore.i + 1,
            v : 1,
            p : 0,
            z : 1,
            q : [],
            m : false,
            r : false

        };
        $scope.errore.lineaSettore = false;
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkLineaSettori() && checkList() != 0) {
                $rootScope.saving = true;
                $http.post('php/lineeSettori.php?type=new', {
                        'id'    :   $scope.vm.nuovaLineaSettore.i,
                        'line'  :   $scope.vm.nuovaLineaSettore.l,
                        'price'  :   $scope.vm.nuovaLineaSettore.z,
                        'show'  :   $scope.vm.nuovaLineaSettore.v,
                        'mark'   :   $scope.vm.nuovaLineaSettore.m,
                        'man'   :   $scope.vm.nuovaLineaSettore.q,
                        'image'   :   $scope.vm.nuovaLineaSettore.r,
                        'set'   :   $scope.vm.nuovaLineaSettore.h
                    }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        delete $scope.vm.nuovaLineaSettore.r;
                        $scope.vm.lineeSettori.push($scope.vm.nuovaLineaSettore);
                        $scope.vm.saveLineaSettoreData();
                        $scope.newItem();
                    }).error(function(data, status) {
                        console.log(status);
                    });
            } else {    $scope.errore.lineaSettore = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("prodottiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.prodotto = {
        selected : false
    };

    $scope.vm.sorting = 'c';

    $scope.$watch('vm.nuovoProdotto.m', function(){
        $scope.vm.nuovoProdotto.l = false;
        $scope.vm.nuovoProdotto.u = false;
        $scope.vm.nuovoProdotto.t = false;
        $scope.vm.nuovoProdotto.x = false;
        $scope.vm.nuovoProdotto.z = [{z : '', a : ''}];
    });

    $scope.$watch('vm.nuovoProdotto.l', function(){
        $scope.vm.nuovoProdotto.u = false;
        $scope.vm.nuovoProdotto.t = false;
        $scope.vm.nuovoProdotto.x = false;
        $scope.vm.nuovoProdotto.z = [{z : '', a : ''}];
    });

    $scope.$watch('filtro.marchio.i', function(){
        $scope.filtro.linea.i = false;
    });

    $scope.addProdotto = function(){
        $scope.vm.nuovoProdotto.z.push({z : '', a : ''});
    };

    $scope.removeProdotto = function(index){
        $scope.vm.nuovoProdotto.z.splice(index, 1);
    };

    $scope.selectProdotto = function(result) {
        $scope.prodotto = {};
        $scope.prodotto.selected = true;
        $scope.prodotto.prodotto= result;
    };

    $scope.vm.saveProdottoData = function(){
        $rootScope.saving = true;
        $http.post('php/prodotti.php?type=save', $scope.vm.prodotti).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/prodotti.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.prodotti().then(function (result) {
                $scope.vm.prodotti = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.prodotto.c = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27) $scope.input = '';
    };

    $scope.updateCheck = function() {
        return(
            !$scope.vm.nuovoProdotto.c ||
            !$scope.vm.nuovoProdotto.n ||
            !$scope.vm.nuovoProdotto.m ||
            !$scope.vm.nuovoProdotto.l ||
            !$scope.vm.nuovoProdotto.x ||
            !$scope.vm.nuovoProdotto.t ||
            !$scope.vm.nuovoProdotto.r
        );
    };

    var checkProdotto = function() {
        return _.findWhere($scope.vm.prodotti, {c : $scope.vm.nuovoProdotto.c, l : $scope.vm.nuovoProdotto.l});
    };

    var checkPricesArray = function() {
        var emptyArray = _.filter($scope.vm.nuovoProdotto.z, function(list){
            return isNaN(list.z) || !list.z || !list.a
        });
        return emptyArray.length;
    };

    $scope.newProdotto = function(){
        $rootScope.saving = false;
        $scope.errore.prodotto = false;
        $scope.vm.nuovoProdotto = {
            i : $scope.vm.nuovoProdotto.i + 1,
            m : false,
            l : false,
            t : false,
            a : '',
            y : 1,
            f : 0,
            z : [{z : '', a : ''}]
        };
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkProdotto() && checkPricesArray() === 0) {
                $rootScope.saving = true;
                $http.post('php/prodotti.php?type=new', {
                        'id'        :   $scope.vm.nuovoProdotto.i,
                        'mark'      :   $scope.vm.nuovoProdotto.m,
                        'line'      :   $scope.vm.nuovoProdotto.l,
                        'cod'       :   $scope.vm.nuovoProdotto.c,
                        'title'     :   $scope.vm.nuovoProdotto.n,
                        'tbpr'      :   $scope.vm.nuovoProdotto.t,
                        'dim'       :   $scope.vm.nuovoProdotto.d,
                        'pos'       :   $scope.vm.nuovoProdotto.y,
                        'lnfn'      :   $scope.vm.nuovoProdotto.x,
                        'note'      :   $scope.vm.nuovoProdotto.o,
                        'abb'       :   $scope.vm.nuovoProdotto.a,
                        'fin'       :   $scope.vm.nuovoProdotto.f,
                        'prices'     :   $scope.vm.nuovoProdotto.z,
                        'image'     :   $scope.vm.nuovoProdotto.r
                    }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        delete $scope.vm.nuovoProdotto.r;
                        $scope.vm.prodotti.push($scope.vm.nuovoProdotto);
                        $scope.vm.saveProdottoData();
                        $scope.newProdotto()
                    }).error(function(data, status) {
                        console.log(status);
                    });
            } else {    $scope.errore.prodotto = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("prodottiSettoriCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.prodottoSettore = {
        selected : false
    };

    $scope.vm.sorting = 'n';

    $scope.$watch('vm.nuovoProdottoSettore.m', function(){
        $scope.vm.nuovoProdottoSettore.l = false;
        $scope.vm.nuovoProdottoSettore.w = false;
        $scope.vm.nuovoProdottoSettore.c = false;
    });

    $scope.$watch('vm.nuovoProdottoSettore.l', function(newVal){
        $scope.vm.nuovoProdottoSettore.c = false;
    });

    $scope.$watch('vm.nuovoProdottoSettore.w', function(newVal){
        $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l : newVal});
        _.each($scope.settoriAvailable, function(v){
            v.n = _.findWhere($scope.vm.settori, {i : v.h}).n;
        });

        $scope.prodottiAvailable = [{c: ' Tutti', i:-1}];
        var prodottiPerLinea = _.where($scope.vm.prodotti, {l : $scope.vm.nuovoProdottoSettore.l});
        _.each(prodottiPerLinea, function(v){
            if(!_.find($scope.vm.prodottiSettori, function(list) { return (list.c === v.i && newVal === v.l) }))
                $scope.prodottiAvailable.push(v);
        });
    });

    $scope.$watch('vm.nuovoProdottoSettore.c', function(newVal){
        if(newVal && newVal != -1){
            var prdList = _.find($scope.vm.prodotti, function(list) { return list.i == newVal});
            $scope.vm.nuovoProdottoSettore.n = prdList.c;
        }
    });

    $scope.toggleSet = function(ID) {
        if($scope.vm.nuovoProdottoSettore.h.indexOf(ID) == -1) {
            $scope.vm.nuovoProdottoSettore.h.push(parseInt(ID));
        } else {
            $scope.vm.nuovoProdottoSettore.h.splice($scope.vm.nuovoProdottoSettore.h.indexOf(ID), 1);
        }
    };

    $scope.selectProdottoSettore = function(result) {
        $scope.prodottoSettore = {};
        $scope.prodottoSettore.selected = true;
        $scope.prodottoSettore.prodottoSettore= result;
    };

    $scope.vm.saveProdottoSettoreData = function(){
        $rootScope.saving = true;
        $http.post('php/prodottiSettori.php?type=save', $scope.vm.prodottiSettori).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/prodottiSettori.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.prodottiSettori().then(function (result) {
                $scope.vm.prodottiSettori = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.prodottoSettore.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27)
            $scope.input = '';
    };

    $scope.newProdottoSettore = function(newID) {
        $rootScope.saving = false;
        $scope.errore.prodottoSettore = false;
        $scope.vm.nuovoProdottoSettore = {
            m : false,
            l : false,
            c : false,
            h : []
        };
        $scope.vm.nuovoProdottoSettore.i = (!newID) ? $scope.vm.nuovoProdottoSettore.i + 1 : parseInt(newID) + 1;
        console.log($scope.vm.nuovoProdottoSettore.i)
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovoProdottoSettore.m || !$scope.vm.nuovoProdottoSettore.l || !$scope.vm.nuovoProdottoSettore.w || !$scope.vm.nuovoProdottoSettore.c);
    };

    function checkSetArray() {
        return $scope.vm.nuovoProdottoSettore.h.length;
    }

    $scope.action = function(type) {
        if(type == 'N'){
            if(checkSetArray() != 0) {
                $rootScope.saving = true;
                $http.post('php/prodottiSettori.php?type=new', {
                        'id'        :   $scope.vm.nuovoProdottoSettore.i,
                        'mark'      :   $scope.vm.nuovoProdottoSettore.m,
                        'line'      :   $scope.vm.nuovoProdottoSettore.l,
                        'nwln'      :   $scope.vm.nuovoProdottoSettore.w,
                        'array'     :   $scope.vm.nuovoProdottoSettore.h,
                        'cod'       :   $scope.vm.nuovoProdottoSettore.c
                    }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        if($scope.vm.nuovoProdottoSettore.c != -1) {
                            $scope.vm.prodottiSettori.push($scope.vm.nuovoProdottoSettore);
                            $scope.vm.saveProdottoSettoreData();
                        } else {
                            $scope.saveDataDB();
                        }
                        $scope.newProdottoSettore(result);
                    }).error(function(data, status) {
                        console.log(status);
                    });
            }  else {   $scope.errore.prodottoSettore = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("vetrineCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.vetrina = {
        selected : false
    };

    $scope.generateSettoriInLinea = function(id) {
        if(id) {
            var array = [];
            var settori = _.find($scope.vm.linee, function(num) {
                return num.i === id
            }).q;
            _.each(settori, function(v) {
                var settore = _.find($scope.vm.settori, function (num) {
                    return num.i === v;
                }).n;
                array.push({i: v, n: settore});
            });
            return array;
        }
    };

    $scope.settoriInLinea = false;

    $scope.selectVetrina = function(result) {
        $scope.vetrina = {};
        $scope.vetrina.selected = true;
        $scope.vetrina.vetrina= result;
    };

    $scope.vm.sorting = 'c';

    $scope.toggleSet = function(ID) {
        if($scope.vm.nuovaVetrina.s.indexOf(ID) == -1) {
            $scope.vm.nuovaVetrina.s.push(parseInt(ID));
        } else {
            $scope.vm.nuovaVetrina.s.splice($scope.vm.nuovaVetrina.s.indexOf(ID), 1);
        }
    };

    $scope.$watch('vm.nuovaVetrina.m', function(){
        $scope.vm.nuovaVetrina.l = false;
        $scope.vm.nuovaVetrina.h = [];
    });

    $scope.$watch('vm.nuovaVetrina.l', function(n, o){
        $scope.vm.nuovaVetrina.h = [];
        $scope.settoriInLinea = $scope.generateSettoriInLinea(n);
    });

    $scope.vm.saveVetrinaData = function(){
        $rootScope.saving = true;
        $http.post('php/vetrine.php?type=save', $scope.vm.vetrine).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/vetrine.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.vetrine().then(function (result) {
                $scope.vm.vetrine = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.vetrina.c = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27) $scope.input = '';
    };

    $scope.updateCheck = function() {
        return(
        !$scope.vm.nuovaVetrina.c ||
        !$scope.vm.nuovaVetrina.n ||
        !$scope.vm.nuovaVetrina.m ||
        !$scope.vm.nuovaVetrina.l ||
        !$scope.vm.nuovaVetrina.r ||
        !$scope.vm.nuovaVetrina.s ||
        isNaN($scope.vm.nuovaVetrina.y)
        );
    };

    var checkVetrina = function() {
        return _.findWhere($scope.vm.vetrine, {c : $scope.vm.nuovaVetrina.c, l : $scope.vm.nuovaVetrina.l});
    };

/*
    function checkSetArray() {
        return $scope.vm.nuovaVetrina.h.length;
    }
*/

    $scope.newVetrina = function(){
        $rootScope.saving = false;
        $scope.errore.vetrina = false;
        $scope.vm.nuovaVetrina = {
            i : $scope.vm.nuovaVetrina.i + 1,
            m : false,
            l : false,
            s : false,
            y : 1,
            v : 1
            // h : []
        };
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkVetrina()) {
                $rootScope.saving = true;
                $http.post('php/vetrine.php?type=new', {
                        'id'        :   $scope.vm.nuovaVetrina.i,
                        'mark'      :   $scope.vm.nuovaVetrina.m,
                        'line'      :   $scope.vm.nuovaVetrina.l,
                        'cod'       :   $scope.vm.nuovaVetrina.c,
                        'title'     :   $scope.vm.nuovaVetrina.n,
                        'pos'       :   $scope.vm.nuovaVetrina.y,
                        'show'      :   $scope.vm.nuovaVetrina.v,
                        'note'      :   $scope.vm.nuovaVetrina.o,
                        'settore'      :   $scope.vm.nuovaVetrina.s,
                        // 'array'      :   $scope.vm.nuovaVetrina.h,
                        'image'     :   $scope.vm.nuovaVetrina.r
                    }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        delete $scope.vm.nuovaVetrina.r;
                        $scope.vm.vetrine.push($scope.vm.nuovaVetrina);
                        $scope.vm.saveVetrinaData();
                        $scope.newVetrina()
                    }).error(function(data, status) {
                        console.log(status);
                    });
            } else {    $scope.errore.vetrina = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("vetrineProdottiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.vetrinaProdotto = {
        selected : false
    };

    $scope.vm.sorting = ['y', 'j', 'c'];

    $scope.$watch('vm.nuovoVetrinaProdotto.k', function(newVal){
        $scope.vm.nuovoVetrinaProdotto.m = newVal;
        $scope.vm.nuovoVetrinaProdotto.j = false;
    });

    $scope.$watch('vm.nuovoVetrinaProdotto.j', function(newVal){
        $scope.vm.nuovoVetrinaProdotto.l = newVal;
        $scope.vm.nuovoVetrinaProdotto.c = false;
    });

    $scope.$watch('vm.nuovoVetrinaProdotto.m', function(){
        $scope.vm.nuovoVetrinaProdotto.l = false;
    });

    $scope.$watch('vm.nuovoVetrinaProdotto.l', function(){
        $scope.vm.nuovoVetrinaProdotto.p = false;
    });

    $scope.$watch('vm.nuovoVetrinaProdotto.p', function(newVal){
        if(newVal) {
            var prodotto = _.findWhere($scope.vm.prodotti, {i : newVal});
            var idsList = _.pluck(prodotto.z, 'a');
            $scope.tabsAvailable = [];
            for(var i = 0; i < idsList.length; i++) {
                var tab = _.findWhere($scope.vm.finitureTabelle, {i : idsList[i]});
                $scope.tabsAvailable.push({'i' : idsList[i], 'n' : tab.n});
            }
            return $scope.tabsAvailable;
        } else {
            $scope.vm.nuovoVetrinaProdotto.u = false;
        }
    });

    $scope.$watch('vm.nuovoVetrinaProdotto.u', function(newVal){
        if(newVal) {
            $scope.finsAvailable = _.where($scope.vm.abbinamenti, {u : newVal});
            return $scope.finsAvailable;
        } else {
            $scope.vm.nuovoVetrinaProdotto.f = false;
        }
    });

    $scope.selectVetrinaProdotto = function(result) {
        $scope.vetrinaProdotto = {};
        $scope.vetrinaProdotto.selected = true;
        $scope.vetrinaProdotto.vetrinaProdotto= result;
    };

    $scope.vm.saveVetrineProdottiData = function(){
        $rootScope.saving = true;
        $http.post('php/vetrineProdotti.php?type=save', $scope.vm.vetrineProdotti).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/vetrineProdotti.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.vetrineProdotti().then(function (result) {
                $scope.vm.vetrineProdotti = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            if (tempFilterText || tempFilterText != '') {
                var espIDS = [];
                _.each($scope.vm.vetrine, function (v) {
                    if (v.c == tempFilterText) espIDS.push(v.i);
                });
                $scope.filtro.vetrinaProdotto.c = espIDS;
            } else {
                $scope.filtro.vetrinaProdotto.c = false;
            }
        }, 250);
    });

    $scope.$watch('inputCod', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            if(tempFilterText) tempFilterText = tempFilterText.toUpperCase();
            if(tempFilterText != '') {
                var prodotto = _.findWhere($scope.vm.prodotti, {c : tempFilterText});
                if(prodotto) $scope.filtro.vetrinaProdotto.p = prodotto.i;
            } else {
                $scope.filtro.vetrinaProdotto.p = false;
            }
        }, 250);
    });

    $scope.eraseInput = function(e, type){
        if (e.keyCode == 27)
            (!type) ? $scope.input = '' : $scope.inputCod = '';
    };

    $scope.newVetrinaProdotto = function() {
        $rootScope.saving = false;
        $scope.errore.vetrinaProdotto = false;
        $scope.vm.nuovoVetrinaProdotto = {
            i : $scope.vm.nuovoVetrinaProdotto.i + 1,
            c : false,
            p : false,
            m : false,
            k : false,
            l : false,
            j : false,
            u : false,
            f : false,
            y: 1,
            q: 1
        };
    };

    $scope.updateCheck = function() {
        return(
                !$scope.vm.nuovoVetrinaProdotto.c ||
                !$scope.vm.nuovoVetrinaProdotto.p ||
                !$scope.vm.nuovoVetrinaProdotto.l ||
                !$scope.vm.nuovoVetrinaProdotto.j ||
                !$scope.vm.nuovoVetrinaProdotto.u ||
                !$scope.vm.nuovoVetrinaProdotto.f ||
                isNaN($scope.vm.nuovoVetrinaProdotto.y) ||
                isNaN($scope.vm.nuovoVetrinaProdotto.q)
        );
    };

    $scope.action = function(type) {
        if(type == 'N'){
            $rootScope.saving = true;
            $http.post('php/vetrineProdotti.php?type=new', {
                    'id'        :   $scope.vm.nuovoVetrinaProdotto.i,
                    'comp'      :   $scope.vm.nuovoVetrinaProdotto.c,
                    'prd'       :   $scope.vm.nuovoVetrinaProdotto.p,
                    'pline'     :   $scope.vm.nuovoVetrinaProdotto.l,
                    'cline'     :   $scope.vm.nuovoVetrinaProdotto.j,
                    'pmark'     :   $scope.vm.nuovoVetrinaProdotto.m,
                    'cmark'     :   $scope.vm.nuovoVetrinaProdotto.k,
                    'fin'       :   $scope.vm.nuovoVetrinaProdotto.f,
                    'tab'       :   $scope.vm.nuovoVetrinaProdotto.u,
                    'pos'       :   $scope.vm.nuovoVetrinaProdotto.y,
                    'qnt'       :   $scope.vm.nuovoVetrinaProdotto.q
                }
            ).success(function(result) {
                    //console.log('Risposta dalla pagina PHP', result);
                    $scope.vm.vetrineProdotti.push($scope.vm.nuovoVetrinaProdotto);
                    $scope.vm.saveVetrineProdottiData();
                    $scope.newVetrinaProdotto();
                }).error(function(data, status) {
                    console.log(status);
                });
        }
    };
}]);

angular.module("mpuDashboard").controller("nazioniCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', function($scope, $rootScope, _, dataSvc, $http) {

    $scope.vm.saveNazioniData = function(){
        $rootScope.saving = true;
        $http.post('php/nazioni.php?type=save', $scope.vm.nazioni).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/nazioni.php?type=db', $scope.vm.nazioni).success(function() {
            $rootScope.saving = false;
            dataSvc.nazioni().then(function (result) {
                $scope.vm.nazioni = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovaNazione.n || !$scope.vm.nuovaNazione.x);
    };

    $scope.action = function(type) {
        if(type == 'N'){
            $rootScope.saving = true;
            $http.post('php/nazioni.php?type=new', {
                    'id' : $scope.vm.nuovaNazione.i,
                    'nome': $scope.vm.nuovaNazione.n,
                    'show': $scope.vm.nuovaNazione.v,
                    'prx': $scope.vm.nuovaNazione.x
                }
            ).success(function(result) {
                    //console.log(result);
                    $scope.vm.nazioni.push($scope.vm.nuovaNazione);
                    $scope.vm.nuovaNazione = {
                        v : 1,
                        i : $scope.vm.nuovaNazione.i + 1
                    };
                    $scope.vm.saveNazioniData();
                    $rootScope.saving = false;
                }).error(function(data, status) {
                    console.log(status);
                });
        }
    };
}]);

angular.module("mpuDashboard").controller("regioniCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.vm.sorting = 'n';

    $scope.regione = {
        selected : false
    };

    $scope.selectRegione = function(result) {
        $scope.regione = {};
        $scope.regione.selected = true;
        $scope.regione.regione= result;
    };

    $scope.vm.saveRegioniData = function(){
        $rootScope.saving = true;
        $http.post('php/regioni.php?type=save', $scope.vm.regioni).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/regioni.php?type=db', $scope.vm.regioni).success(function() {
            $rootScope.saving = false;
            dataSvc.regioni().then(function (result) {
                $scope.vm.regioni = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovaRegione.n || !$scope.vm.nuovaRegione.z);
    };

    var checkExist = function() {
        return _.findWhere($scope.vm.regioni, {n : $scope.vm.nuovaRegione.n, z : $scope.vm.nuovaRegione.z});
    };

    $scope.newItem = function(){
        $rootScope.saving = false;
        $scope.regione.selected = false;
        $scope.errore.regione = false;
        $scope.vm.nuovaRegione = {
            i : $scope.vm.nuovaRegione.i + 1,
            z : false
        }
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.regione.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27) $scope.input = '';
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkExist()) {
                $rootScope.saving = true;
                $http.post('php/regioni.php?type=new', {
                        'id'        : $scope.vm.nuovaRegione.i,
                        'nome'      : $scope.vm.nuovaRegione.n,
                        'nazione'   : $scope.vm.nuovaRegione.z
                    }
                ).success(function(result) {
                        //console.log('Risposta dalla pagina PHP', result);
                        $scope.vm.regioni.push($scope.vm.nuovaRegione);
                        $scope.newItem();
                        $scope.vm.saveRegioniData();
                    }).error(function(data, status) {
                        console.log(status);
                    });
            }  else {    $scope.errore.regione = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("provinceCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', 'priceManager', function($scope, $rootScope, _, dataSvc, $http, $timeout, priceManager) {

    $scope.vm.sorting = ['z', 'r', 'n'];

    $scope.provincia = {
        selected : false
    };

    $scope.vm.priceManager = priceManager;

    $scope.$watch('filtro.nazione.i', function(newVal){
        $scope.filtro.regione.i = false;
    });

    $scope.selectItem = function(result) {
        $scope.provincia = {};
        $scope.provincia.selected = true;
        $scope.provincia.provincia= result;
    };

    $scope.vm.saveProvinceData = function(){
        $rootScope.saving = true;
        $http.post('php/province.php?type=save', $scope.vm.province).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/province.php?type=db', $scope.vm.province).success(function() {
            $rootScope.saving = false;
            dataSvc.province().then(function (result) {
                $scope.vm.province = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovaProvincia.n || !$scope.vm.nuovaProvincia.z);
    };

    var checkExist = function() {
        return _.findWhere($scope.vm.province, {n : $scope.vm.nuovaProvincia.n, c : $scope.vm.nuovaProvincia.c, z : $scope.vm.nuovaProvincia.z, r : $scope.vm.nuovaProvincia.r});
    };

    $scope.newItem = function(){
        $rootScope.saving = false;
        $scope.provincia.selected = false;
        $scope.errore.provincia = false;
        $scope.vm.nuovaProvincia = {
            i : $scope.vm.nuovaProvincia.i + 1,
            z : false,
            r : false,
            b : 0,
            l : 0,
            t : 0,
            j : 1,
            m : 0,
            k : 1
        }
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.provincia.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27) $scope.input = '';
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkExist()) {
                $rootScope.saving = true;
                $http.post('php/province.php?type=new', {
                        'id'        : $scope.vm.nuovaProvincia.i,
                        'nome'      : $scope.vm.nuovaProvincia.n,
                        'sigla'     : $scope.vm.nuovaProvincia.c,
                        'nazione'   : $scope.vm.nuovaProvincia.z,
                        'regione'   : $scope.vm.nuovaProvincia.r,
                        'trasporto'   : $scope.vm.nuovaProvincia.t,
                        'trasporto_type'   : $scope.vm.nuovaProvincia.j,
                        'montaggio'   : $scope.vm.nuovaProvincia.m,
                        'montaggio_type'   : $scope.vm.nuovaProvincia.k,
                        'limite'   : $scope.vm.nuovaProvincia.l,
                        'minimo'   : $scope.vm.nuovaProvincia.b
            }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        $scope.vm.province.push($scope.vm.nuovaProvincia);
                        $scope.newItem();
                        $scope.vm.saveProvinceData();
                    }).error(function(data, status) {
                        console.log(status);
                    });
            }  else {    $scope.errore.provincia = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("convenzioniCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', function($scope, $rootScope, _, dataSvc, $http) {

    $scope.vm.saveConvenzioniData = function(){
        $rootScope.saving = true;
        $http.post('php/convenzioni.php?type=save', $scope.vm.convenzioni).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/convenzioni.php?type=db', $scope.vm.convenzioni).success(function() {
            $rootScope.saving = false;
            dataSvc.convenzioni().then(function (result) {
                $scope.vm.convenzioni = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovaConvenzione.n);
    };

    $scope.action = function(type) {
        if(type == 'N'){
            $rootScope.saving = true;
            $http.post('php/convenzioni.php?type=new', {
                    'id' : $scope.vm.nuovaConvenzione.i,
                    'nome': $scope.vm.nuovaConvenzione.n,
                    'email': $scope.vm.nuovaConvenzione.e
                }
            ).success(function(result) {
                    //console.log(result);
                    $scope.vm.convenzioni.push($scope.vm.nuovaConvenzione);
                    $scope.vm.nuovaConvenzione = {
                        i : $scope.vm.nuovaConvenzione.i + 1
                    };
                    $scope.vm.saveConvenzioniData();
                    $rootScope.saving = false;
                }).error(function(data, status) {
                    console.log(status);
                });
        }
    };
}]);

angular.module("mpuDashboard").controller("agentiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.vm.sorting = 'n';

    $scope.agente = {
        selected : false
    };

    $scope.selectItem = function(result) {
        $scope.agente = {};
        $scope.agente.selected = true;
        $scope.agente.agente = result;
    };

    $scope.vm.saveAgentiData = function(){
        $rootScope.saving = true;
        $http.post('php/agenti.php?type=save', $scope.vm.agenti).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/agenti.php?type=db', $scope.vm.agenti).success(function() {
            $rootScope.saving = false;
            dataSvc.agenti().then(function (result) {
                $scope.vm.agenti = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.agente.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27) $scope.input = '';
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovoAgente.n || !$scope.vm.nuovoAgente.e || !$scope.vm.nuovoAgente.p || !$scope.vm.nuovoAgente.r || !$scope.vm.nuovoAgente.t);
    };

    $scope.newItem = function() {
        $rootScope.saving = false;
        $scope.vm.nuovoAgente = {
            i : $scope.vm.nuovoAgente.i + 1,
            r : false
        };
    };

    $scope.action = function(type) {
        if(type == 'N'){
            $rootScope.saving = true;
            $http.post('php/agenti.php?type=new', {
                    'id' : $scope.vm.nuovoAgente.i,
                    'nome': $scope.vm.nuovoAgente.n,
                    'email': $scope.vm.nuovoAgente.e,
                    'password': $scope.vm.nuovoAgente.p,
                    'tel': $scope.vm.nuovoAgente.t,
                    'riv': $scope.vm.nuovoAgente.r
                }
            ).success(function(result) {
                    //console.log(result);
                    $scope.vm.agenti.push($scope.vm.nuovoAgente);
                    $scope.vm.saveAgentiData();
                    $scope.newItem()
                    $rootScope.saving = false;
                }).error(function(data, status) {
                    console.log(status);
                });
        }
    };
}]);

angular.module("mpuDashboard").controller("rivenditoriCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', 'priceManager', function($scope, $rootScope, _, dataSvc, $http, $timeout, priceManager) {

    $scope.rivenditore = {
        selected : false
    };

    $scope.vm.priceManager = priceManager;

    $scope.vm.sorting = ['n'];

    $scope.switchType = function() {
        return ($scope.vm.nuovoRivenditore.p == 0) ? 'rivenditore' : 'rivestimento';
    };

    $scope.selectItem = function(result) {
        $scope.rivenditore = {};
        $scope.rivenditore.selected = true;
        $scope.rivenditore.rivenditore= result;
    };

    $scope.vm.saveRivenditoreData = function(){
        $rootScope.saving = true;
        $http.post('php/rivenditori.php?type=save', $scope.vm.rivenditori).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/rivenditori.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.rivenditori().then(function (result) {
                $scope.vm.rivenditori = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.openMarchi = function(){
        $scope.vm.mv = !$scope.vm.mv;
    };

    var markManager = function() {
        $scope.vm.mv = false;
        $scope.vm.nuovoRivenditore.y = angular.copy($scope.vm.marchi);
        _.each($scope.vm.nuovoRivenditore.y, function(v){
            v.s = 0;
            v.d = 0;
            delete v.n;
            delete v.b;
            delete v.g;
        });
        return $scope.vm.nuovoRivenditore.y;
    };

    markManager();

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.rivenditore.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27) $scope.input = '';
    };

    $scope.$watch('vm.nuovoRivenditore.v', function(newVal){
        if(newVal) {
            $scope.vm.nuovoRivenditore.z = false;
            $scope.vm.nuovoRivenditore.r = false;
            $scope.vm.nuovoRivenditore.p = false;
        }
    });

    $scope.updateCheck = function() {
            return(
                (
                    (
                        !$scope.vm.nuovoRivenditore.z ||    //nazione
                        !$scope.vm.nuovoRivenditore.r ||    //regione
                        !$scope.vm.nuovoRivenditore.p       //provincia
                    ) &&
                    !$scope.vm.nuovoRivenditore.v
                ) ||
            !$scope.vm.nuovoRivenditore.n ||    //nome società
            !$scope.vm.nuovoRivenditore.x ||    //referente
            !$scope.vm.nuovoRivenditore.s ||    //sede
                (
                    !$scope.vm.nuovoRivenditore.h &&    //telefono
                    !$scope.vm.nuovoRivenditore.c       //cellulare
                ) ||
            !$scope.vm.nuovoRivenditore.e ||    //email
            !$scope.vm.nuovoRivenditore.w ||    //password
            !$scope.vm.nuovoRivenditore.g       //immagine
            );
    };


    var checkItem = function() {
        if($scope.vm.nuovoRivenditore.p) {
            return _.findWhere($scope.vm.rivenditori, { p : $scope.vm.nuovoRivenditore.p });
        } else {
            return false;
        }
    };

    $scope.newItem = function() {
        $rootScope.saving = false;
        $scope.errore.rivenditore = false;
        $scope.vm.nuovoRivenditore = {
            i : $scope.vm.nuovoRivenditore.i + 1,
            z : false,
            r : false,
            p : false,
            b : 0,
            l : 0,
            t : 0,
            j : 1,
            m : 0,
            k : 1,
            v : false,
            c : '',
            h : '',
            f : '',
            a : ''
            //o : "0, 0"
        };
        markManager();
    };

    var showInfo = [];
    $scope.showInfoFnc = function(index, action){
        if(action == 'add') {
            showInfo.push(index);
        } else {
            var position = showInfo.indexOf(index);
            showInfo.splice(position, 1);
        }
    };

    $scope.checkShowInfo = function(index) {
        return showInfo.indexOf(index)
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkItem()) {
                $rootScope.saving = true;
                $http.post('php/rivenditori.php?type=new', {
                        'id'            :   $scope.vm.nuovoRivenditore.i,
                        'nome'          :   $scope.vm.nuovoRivenditore.n,
                        'naz'           :   $scope.vm.nuovoRivenditore.z,
                        'reg'           :   $scope.vm.nuovoRivenditore.r,
                        'prov'          :   $scope.vm.nuovoRivenditore.p,
                        'conv'          :   $scope.vm.nuovoRivenditore.v,
                        'rif'           :   $scope.vm.nuovoRivenditore.x,
                        'sede'          :   $scope.vm.nuovoRivenditore.s,
                        'tel'           :   $scope.vm.nuovoRivenditore.h,
                        'fax'           :   $scope.vm.nuovoRivenditore.f,
                        'cell'          :   $scope.vm.nuovoRivenditore.c,
                        'web'           :   $scope.vm.nuovoRivenditore.q,
                        'email'         :   $scope.vm.nuovoRivenditore.e,
                        'psw'           :   $scope.vm.nuovoRivenditore.w,
                        'limite'        :   $scope.vm.nuovoRivenditore.l,
                        'minimo'        :   $scope.vm.nuovoRivenditore.b,
                        'trasporto'     :   $scope.vm.nuovoRivenditore.t,
                        'trasporto_type':   $scope.vm.nuovoRivenditore.j,
                        'montaggio'     :   $scope.vm.nuovoRivenditore.m,
                        'montaggio_type':   $scope.vm.nuovoRivenditore.k,
                        'mark'          :   $scope.vm.nuovoRivenditore.y,
                        'notes'          :   $scope.vm.nuovoRivenditore.a,
                        //'coords'        :   $scope.vm.nuovoRivenditore.o,
                        'image'         :   $scope.vm.nuovoRivenditore.g
                    }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        delete $scope.vm.nuovoRivenditore.g;
                        $scope.vm.rivenditori.push($scope.vm.nuovoRivenditore);
                        $scope.vm.saveRivenditoreData();
                        $scope.newItem()
                    }).error(function(data, status) {
                        console.log(status);
                    });
            } else {    $scope.errore.rivenditore = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("esposizioniCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.esposizione = {
        selected : false
    };

    $scope.selectItem = function(result) {
        $scope.esposizione = {};
        $scope.esposizione.selected = true;
        $scope.esposizione.esposizione= result;
    };

    $scope.vm.sorting = ['l', 'c', 'f'];

    $scope.$watch('vm.nuovaEsposizione.l', function(newVal){
        $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l : newVal});
        _.each($scope.settoriAvailable, function(v){
            v.n = _.findWhere($scope.vm.settori, {i : v.h}).n;
        });
    });

    $scope.$watch('vm.nuovaEsposizione.m', function(){
        $scope.vm.nuovaEsposizione.l = false;
        $scope.vm.nuovaEsposizione.t = false;
    });

    $scope.$watch('vm.nuovaEsposizione.l', function(){
        $scope.vm.nuovaEsposizione.t = false;
    });

    $scope.vm.saveEsposizioneData = function(){
        $rootScope.saving = true;
        $http.post('php/esposizioni.php?type=save', $scope.vm.esposizioni).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/esposizioni.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.esposizioni().then(function (result) {
                $scope.vm.esposizioni = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.esposizione.c = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27) $scope.input = '';
    };

    $scope.updateCheck = function() {
        return(
        !$scope.vm.nuovaEsposizione.c ||
        !$scope.vm.nuovaEsposizione.f ||
        !$scope.vm.nuovaEsposizione.m ||
        !$scope.vm.nuovaEsposizione.l ||
        !$scope.vm.nuovaEsposizione.t ||
        !$scope.vm.nuovaEsposizione.r ||
        isNaN($scope.vm.nuovaEsposizione.y)
        );
    };

    var checkItem = function() {
        return _.findWhere($scope.vm.esposizioni, {
            c : $scope.vm.nuovaEsposizione.c,
            f : $scope.vm.nuovaEsposizione.f,
            l : $scope.vm.nuovaEsposizione.l
        });
    };

    $scope.newItem = function(){
        $rootScope.saving = false;
        $scope.errore.esposizione = false;
        $scope.vm.nuovaEsposizione = {
            i : $scope.vm.nuovaEsposizione.i + 1,
            m : false,
            l : false,
            t : false,
            y : 1
        };
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkItem()) {
                $rootScope.saving = true;
                $http.post('php/esposizioni.php?type=new', {
                        'id'        :   $scope.vm.nuovaEsposizione.i,
                        'mark'      :   $scope.vm.nuovaEsposizione.m,
                        'line'      :   $scope.vm.nuovaEsposizione.l,
                        'tbpr'      :   $scope.vm.nuovaEsposizione.t,
                        'cod'       :   $scope.vm.nuovaEsposizione.c,
                        'fin'       :   $scope.vm.nuovaEsposizione.f,
                        'dim'       :   $scope.vm.nuovaEsposizione.d,
                        'pos'       :   $scope.vm.nuovaEsposizione.y,
                        'nome'      :   $scope.vm.nuovaEsposizione.n,
                        'image'     :   $scope.vm.nuovaEsposizione.r
                    }
                ).success(function(result) {
                        //console.log('Risposta dalla pagina PHP', result);
                        delete $scope.vm.nuovaEsposizione.r;
                        $scope.vm.esposizioni.push($scope.vm.nuovaEsposizione);
                        $scope.vm.saveEsposizioneData();
                        $scope.newItem()
                    }).error(function(data, status) {
                        console.log(status);
                    });
            } else {    $scope.errore.esposizione = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("compostiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.composto = {
        selected : false
    };

    $scope.selectItem = function(result) {
        $scope.composto = {};
        $scope.composto.selected = true;
        $scope.composto.composto= result;
    };

    $scope.vm.sorting = ['l', 'c', 'f'];

    $scope.$watch('vm.nuovoComposto.m', function(){
        $scope.vm.nuovoComposto.l = false;
    });

    $scope.vm.saveCompostoData = function(){
        $rootScope.saving = true;
        $http.post('php/composti.php?type=save', $scope.vm.composti).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/composti.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.composti().then(function (result) {
                $scope.vm.composti = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            $scope.filtro.composto.c = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27) $scope.input = '';
    };

    $scope.updateCheck = function() {
        return(
        !$scope.vm.nuovoComposto.c ||
        !$scope.vm.nuovoComposto.f ||
        !$scope.vm.nuovoComposto.m ||
        !$scope.vm.nuovoComposto.l ||
        !$scope.vm.nuovoComposto.n ||
        !$scope.vm.nuovoComposto.r ||
        isNaN($scope.vm.nuovoComposto.y)
        );
    };

    var checkItem = function() {
        return _.findWhere($scope.vm.composti, {
            c : $scope.vm.nuovoComposto.c,
            f : $scope.vm.nuovoComposto.f,
            l : $scope.vm.nuovoComposto.l
        });
    };

    $scope.newItem = function(){
        $rootScope.saving = false;
        $scope.errore.composto = false;
        $scope.vm.nuovoComposto = {
            i : $scope.vm.nuovoComposto.i + 1,
            m : false,
            l : false,
            y : 1
        };
    };

    $scope.action = function(type) {
        if(type == 'N'){
            if(!checkItem()) {
                $rootScope.saving = true;
                $http.post('php/composti.php?type=new', {
                        'id'        :   $scope.vm.nuovoComposto.i,
                        'mark'      :   $scope.vm.nuovoComposto.m,
                        'line'      :   $scope.vm.nuovoComposto.l,
                        'cod'       :   $scope.vm.nuovoComposto.c,
                        'fin'       :   $scope.vm.nuovoComposto.f,
                        'pos'       :   $scope.vm.nuovoComposto.y,
                        'nome'      :   $scope.vm.nuovoComposto.n,
                        'image'     :   $scope.vm.nuovoComposto.r
                    }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        delete $scope.vm.nuovoComposto.r;
                        $scope.vm.composti.push($scope.vm.nuovoComposto);
                        $scope.vm.saveCompostoData();
                        $scope.newItem()
                    }).error(function(data, status) {
                        console.log(status);
                    });
            } else {    $scope.errore.composto = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("esposizioniProdottiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.esposizioneProdotto = {
        selected : false
    };

    $scope.vm.sorting = ['j', 'e', 'c'];

    $scope.$watch('vm.nuovoEsposizioneProdotto.k', function(newVal){
        $scope.vm.nuovoEsposizioneProdotto.m = newVal;
        $scope.vm.nuovoEsposizioneProdotto.j = false;
    });

    $scope.$watch('vm.nuovoEsposizioneProdotto.j', function(newVal){
        $scope.vm.nuovoEsposizioneProdotto.l = newVal;
        $scope.vm.nuovoEsposizioneProdotto.c = false;
    });

    $scope.$watch('vm.nuovoEsposizioneProdotto.m', function(){
        $scope.vm.nuovoEsposizioneProdotto.l = false;
    });

    $scope.$watch('vm.nuovoEsposizioneProdotto.l', function(){
        $scope.vm.nuovoEsposizioneProdotto.p = false;
    });

    $scope.$watch('vm.nuovoEsposizioneProdotto.p', function(newVal){
        if(newVal) {
            var prodotto = _.findWhere($scope.vm.prodotti, {i : newVal});
            var idsList = _.pluck(prodotto.z, 'a');
            $scope.tabsAvailable = [];
            for(var i = 0; i < idsList.length; i++) {
                var tab = _.findWhere($scope.vm.finitureTabelle, {i : idsList[i]});
                $scope.tabsAvailable.push({'i' : idsList[i], 'n' : tab.n});
            }
            return $scope.tabsAvailable;
        } else {
            $scope.vm.nuovoEsposizioneProdotto.u = false;
        }
    });

    $scope.$watch('vm.nuovoEsposizioneProdotto.u', function(newVal){
        if(newVal) {
            $scope.finsAvailable = _.where($scope.vm.abbinamenti, {u : newVal});
            return $scope.finsAvailable;
        } else {
            $scope.vm.nuovoEsposizioneProdotto.f = false;
        }
    });

    $scope.selectItem = function(result) {
        $scope.esposizioneProdotto = {};
        $scope.esposizioneProdotto.selected = true;
        $scope.esposizioneProdotto.esposizioneProdotto= result;
    };

    $scope.vm.saveEsposizioniProdottiData = function(){
        $rootScope.saving = true;
        $http.post('php/esposizioniSettori.php?type=save', $scope.vm.esposizioniSettori).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/esposizioniSettori.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.esposizioniSettori().then(function (result) {
                $scope.vm.esposizioniSettori = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            if (tempFilterText || tempFilterText != '') {
                var espIDS = [];
                _.each($scope.vm.esposizioni, function (v) {
                    if (v.c == tempFilterText) espIDS.push(v.i);
                });
                $scope.filtro.esposizioneProdotto.c = espIDS;
            } else {
                $scope.filtro.esposizioneProdotto.c = false;
            }
        }, 250);
    });


    $scope.$watch('inputCod', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            if(tempFilterText) tempFilterText = tempFilterText.toUpperCase();
            if(tempFilterText != '') {
                var prodotto = _.findWhere($scope.vm.prodotti, {c : tempFilterText});
                if(prodotto) $scope.filtro.esposizioneProdotto.p = prodotto.i;
            } else {
                $scope.filtro.esposizioneProdotto.p = false;
            }
        }, 250);
    });

    $scope.eraseInput = function(e, type){
        if (e.keyCode == 27)
            (!type) ? $scope.input = '' : $scope.inputCod = '';
    };

    $scope.newItem = function() {
        $rootScope.saving = false;
        $scope.errore.esposizioneProdotto = false;
        $scope.vm.nuovoEsposizioneProdotto = {
            i : $scope.vm.nuovoEsposizioneProdotto.i + 1,
            c : false,
            p : false,
            m : false,
            k : false,
            l : false,
            j : false,
            u : false,
            f : false,
            y: 1,
            q: 1
        };
    };

    $scope.updateCheck = function() {
        return(
        !$scope.vm.nuovoEsposizioneProdotto.c ||
        !$scope.vm.nuovoEsposizioneProdotto.p ||
        !$scope.vm.nuovoEsposizioneProdotto.l ||
        !$scope.vm.nuovoEsposizioneProdotto.j ||
        !$scope.vm.nuovoEsposizioneProdotto.u ||
        !$scope.vm.nuovoEsposizioneProdotto.f ||
        isNaN($scope.vm.nuovoEsposizioneProdotto.y) ||
        isNaN($scope.vm.nuovoEsposizioneProdotto.q)
        );
    };

    $scope.action = function(type) {
        if(type == 'N'){
            $rootScope.saving = true;
            $http.post('php/esposizioniSettori.php?type=new', {
                    'id'        :   $scope.vm.nuovoEsposizioneProdotto.i,
                    'comp'      :   $scope.vm.nuovoEsposizioneProdotto.c,
                    'prd'       :   $scope.vm.nuovoEsposizioneProdotto.p,
                    'pline'     :   $scope.vm.nuovoEsposizioneProdotto.l,
                    'cline'     :   $scope.vm.nuovoEsposizioneProdotto.j,
                    'pmark'     :   $scope.vm.nuovoEsposizioneProdotto.m,
                    'cmark'     :   $scope.vm.nuovoEsposizioneProdotto.k,
                    'fin'       :   $scope.vm.nuovoEsposizioneProdotto.f,
                    'tab'       :   $scope.vm.nuovoEsposizioneProdotto.u,
                    'pos'       :   $scope.vm.nuovoEsposizioneProdotto.y,
                    'qnt'       :   $scope.vm.nuovoEsposizioneProdotto.q
                }
            ).success(function(result) {
                    console.log('Risposta dalla pagina PHP', result);
                    $scope.vm.esposizioniSettori.push($scope.vm.nuovoEsposizioneProdotto);
                    $scope.vm.saveEsposizioniProdottiData();
                    $scope.newItem();
                }).error(function(data, status) {
                    console.log(status);
                });
        }
    };
}]);

angular.module("mpuDashboard").controller("compostiProdottiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.compostoProdotto = {
        selected : false
    };

    $scope.vm.sorting = ['j', 'e', 'c', 'y'];

    $scope.$watch('vm.nuovoCompostoProdotto.k', function(newVal){
        $scope.vm.nuovoCompostoProdotto.m = newVal;
        $scope.vm.nuovoCompostoProdotto.j = false;
    });

    $scope.$watch('vm.nuovoCompostoProdotto.j', function(newVal){
        $scope.vm.nuovoCompostoProdotto.l = newVal;
        $scope.vm.nuovoCompostoProdotto.c = false;
    });

    $scope.$watch('vm.nuovoCompostoProdotto.m', function(){
        $scope.vm.nuovoCompostoProdotto.l = false;
    });

    $scope.$watch('vm.nuovoCompostoProdotto.l', function(){
        $scope.vm.nuovoCompostoProdotto.p = false;
    });

    $scope.$watch('vm.nuovoCompostoProdotto.p', function(newVal){
        if(newVal) {
            var prodotto = _.findWhere($scope.vm.prodotti, {i : newVal});
            var idsList = _.pluck(prodotto.z, 'a');
            $scope.tabsAvailable = [];
            for(var i = 0; i < idsList.length; i++) {
                var tab = _.findWhere($scope.vm.finitureTabelle, {i : idsList[i]});
                $scope.tabsAvailable.push({'i' : idsList[i], 'n' : tab.n});
            }
            return $scope.tabsAvailable;
        } else {
            $scope.vm.nuovoCompostoProdotto.u = false;
        }
    });

    $scope.$watch('vm.nuovoCompostoProdotto.u', function(newVal){
        if(newVal) {
            $scope.finsAvailable = _.where($scope.vm.abbinamenti, {u : newVal});
            return $scope.finsAvailable;
        } else {
            $scope.vm.nuovoCompostoProdotto.f = false;
        }
    });

    $scope.selectItem = function(result) {
        $scope.compostoProdotto = {};
        $scope.compostoProdotto.selected = true;
        $scope.compostoProdotto.compostoProdotto= result;
    };

    $scope.vm.saveCompostoProdottiData = function(){
        $rootScope.saving = true;
        $http.post('php/compostiProdotti.php?type=save', $scope.vm.compostiProdotti).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/compostiProdotti.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.compostiProdotti().then(function (result) {
                $scope.vm.compostiProdotti = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            if (tempFilterText || tempFilterText != '') {
                var espIDS = [];
                _.each($scope.vm.composti, function (v) {
                    if (v.c == tempFilterText) espIDS.push(v.i);
                });
                $scope.filtro.compostoProdotto.c = espIDS;
            } else {
                $scope.filtro.compostoProdotto.c = false;
            }
        }, 250);
    });


    $scope.$watch('inputCod', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            if(tempFilterText) tempFilterText = tempFilterText.toUpperCase();
            if(tempFilterText != '') {
                var prodotto = _.findWhere($scope.vm.prodotti, {c : tempFilterText});
                if(prodotto) $scope.filtro.compostoProdotto.p = prodotto.i;
            } else {
                $scope.filtro.compostoProdotto.p = false;
            }
        }, 250);
    });

    $scope.eraseInput = function(e, type){
        if (e.keyCode == 27)
            (!type) ? $scope.input = '' : $scope.inputCod = '';
    };

    $scope.newItem = function() {
        $rootScope.saving = false;
        $scope.errore.compostoProdotto = false;
        $scope.vm.nuovoCompostoProdotto = {
            i : $scope.vm.nuovoCompostoProdotto.i + 1,
            c : false,
            p : false,
            m : false,
            k : false,
            l : false,
            j : false,
            u : false,
            f : false,
            y: 1,
            q: 1
        };
    };

    $scope.updateCheck = function() {
        return(
        !$scope.vm.nuovoCompostoProdotto.c ||
        !$scope.vm.nuovoCompostoProdotto.p ||
        !$scope.vm.nuovoCompostoProdotto.l ||
        !$scope.vm.nuovoCompostoProdotto.j ||
        !$scope.vm.nuovoCompostoProdotto.u ||
        !$scope.vm.nuovoCompostoProdotto.f ||
        isNaN($scope.vm.nuovoCompostoProdotto.y) ||
        isNaN($scope.vm.nuovoCompostoProdotto.q)
        );
    };

    $scope.action = function(type) {
        if(type == 'N'){
            $rootScope.saving = true;
            $http.post('php/compostiProdotti.php?type=new', {
                    'id'        :   $scope.vm.nuovoCompostoProdotto.i,
                    'comp'      :   $scope.vm.nuovoCompostoProdotto.c,
                    'prd'       :   $scope.vm.nuovoCompostoProdotto.p,
                    'pline'     :   $scope.vm.nuovoCompostoProdotto.l,
                    'cline'     :   $scope.vm.nuovoCompostoProdotto.j,
                    'pmark'     :   $scope.vm.nuovoCompostoProdotto.m,
                    'cmark'     :   $scope.vm.nuovoCompostoProdotto.k,
                    'fin'       :   $scope.vm.nuovoCompostoProdotto.f,
                    'tab'       :   $scope.vm.nuovoCompostoProdotto.u,
                    'pos'       :   $scope.vm.nuovoCompostoProdotto.y,
                    'qnt'       :   $scope.vm.nuovoCompostoProdotto.q
                }
            ).success(function(result) {
                    console.log('Risposta dalla pagina PHP', result);
                    $scope.vm.compostiProdotti.push($scope.vm.nuovoCompostoProdotto);
                    $scope.vm.saveCompostoProdottiData();
                    $scope.newItem();
                }).error(function(data, status) {
                    console.log(status);
                });
        }
    };
}]);

angular.module("mpuDashboard").controller("esposizioniSettoriCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.esposizioneSettore = {
        selected : false
    };

    $scope.vm.sorting = '-i';

    $scope.$watch('vm.nuovoEsposizioneSettore.m', function(){
        $scope.vm.nuovoEsposizioneSettore.l = false;
        $scope.vm.nuovoEsposizioneSettore.w = false;
        $scope.vm.nuovoEsposizioneSettore.c = false;
    });

    $scope.$watch('vm.nuovoEsposizioneSettore.l', function(newVal){
        $scope.vm.nuovoEsposizioneSettore.c = false;
    });

    $scope.$watch('vm.nuovoEsposizioneSettore.w', function(newVal){
        $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l : newVal});
        _.each($scope.settoriAvailable, function(v){
            v.n = _.findWhere($scope.vm.settori, {i : v.h}).n;
        });

        $scope.esposizioniAvailable = [{c: ' Tutti', i:-1}];
        var esposizioniPerLinea = _.where($scope.vm.esposizioni, {l : $scope.vm.nuovoEsposizioneSettore.l});
        _.each(esposizioniPerLinea, function(v){
            if(!_.find($scope.vm.esposizioniSettori, function(list) { return (list.c === v.i && newVal === v.l) }))
                $scope.esposizioniAvailable.push(v);
        });
    });

    $scope.$watch('vm.nuovoEsposizioneSettore.c', function(newVal){
        if(newVal && newVal != -1){
            var prdList = _.find($scope.vm.prodotti, function(list) { return list.i == newVal});
            $scope.vm.nuovoEsposizioneSettore.n = prdList.c;
        }
    });

    $scope.toggleSet = function(ID) {
        if($scope.vm.nuovoEsposizioneSettore.h.indexOf(ID) == -1) {
            $scope.vm.nuovoEsposizioneSettore.h.push(parseInt(ID));
        } else {
            $scope.vm.nuovoEsposizioneSettore.h.splice($scope.vm.nuovoEsposizioneSettore.h.indexOf(ID), 1);
        }
    };

    $scope.selectItem = function(result) {
        $scope.esposizioneSettore = {};
        $scope.esposizioneSettore.selected = true;
        $scope.esposizioneSettore.esposizioneSettore= result;
    };

    $scope.vm.saveEsposizioneSettoreData = function(){
        $rootScope.saving = true;
        $http.post('php/esposizioniSettori.php?type=save', $scope.vm.esposizioniSettori).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/esposizioniSettori.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.esposizioniSettori().then(function (result) {
                $scope.vm.esposizioniSettori = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            if (tempFilterText || tempFilterText != '') {
                var espIDS = [];
                _.each($scope.vm.esposizioni, function (v) {
                    if (v.c == tempFilterText) espIDS.push(v.i);
                });
                $scope.filtro.esposizioneSettore.c = espIDS;
            } else {
                $scope.filtro.esposizioneSettore.c = false;
            }
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27)
            $scope.input = '';
    };

    $scope.newItem = function() {
        $rootScope.saving = false;
        $scope.errore.esposizioneSettore = false;
        $scope.vm.nuovoEsposizioneSettore = {
            i : $scope.vm.nuovoEsposizioneSettore.i + 1,
            m : false,
            l : false,
            c : false,
            v : 0,
            h : []
        };
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovoEsposizioneSettore.m || !$scope.vm.nuovoEsposizioneSettore.l || !$scope.vm.nuovoEsposizioneSettore.w || !$scope.vm.nuovoEsposizioneSettore.c);
    };

    function checkSetArray() {
        return $scope.vm.nuovoEsposizioneSettore.h.length;
    }

    $scope.action = function(type) {
        if(type == 'N'){
            if(checkSetArray() != 0) {
                $rootScope.saving = true;
                $http.post('php/esposizioniSettori.php?type=new', {
                        'id'        :   $scope.vm.nuovoEsposizioneSettore.i,
                        'mark'      :   $scope.vm.nuovoEsposizioneSettore.m,
                        'line'      :   $scope.vm.nuovoEsposizioneSettore.l,
                        'nwln'      :   $scope.vm.nuovoEsposizioneSettore.w,
                        'array'     :   $scope.vm.nuovoEsposizioneSettore.h,
                        'cod'       :   $scope.vm.nuovoEsposizioneSettore.c,
                        'view'       :   $scope.vm.nuovoEsposizioneSettore.v
                    }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        if($scope.vm.nuovoEsposizioneSettore.c != -1) {
                            $scope.vm.esposizioniSettori.push($scope.vm.nuovoEsposizioneSettore);
                            $scope.vm.saveEsposizioneSettoreData();
                        } else {
                            $scope.saveDataDB();
                        }
                        $scope.newItem();
                    }).error(function(data, status) {
                        console.log(status);
                    });
            }  else {   $scope.errore.esposizioneSettore = true;  }
        }
    };
}]);

angular.module("mpuDashboard").controller("compostiSettoriCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.compostoSettore = {
        selected : false
    };

    $scope.vm.sorting = '-i';

    $scope.$watch('vm.nuovoCompostoSettore.m', function(){
        $scope.vm.nuovoCompostoSettore.l = false;
        $scope.vm.nuovoCompostoSettore.w = false;
        $scope.vm.nuovoCompostoSettore.c = false;
    });

    $scope.$watch('vm.nuovoCompostoSettore.l', function(newVal){
        $scope.vm.nuovoCompostoSettore.c = false;
    });

    $scope.$watch('vm.nuovoCompostoSettore.w', function(newVal){
        $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l : newVal});
        _.each($scope.settoriAvailable, function(v){
            v.n = _.findWhere($scope.vm.settori, {i : v.h}).n;
        });

        $scope.compostoAvailable = [{c: ' Tutti', i:-1}];
        var esposizioniPerLinea = _.where($scope.vm.composti, {l : $scope.vm.nuovoCompostoSettore.l});
        _.each(esposizioniPerLinea, function(v){
            if(!_.find($scope.vm.compostiSettori, function(list) { return (list.c === v.i && newVal === v.l) }))
                $scope.compostoAvailable.push(v);
        });
    });

    $scope.$watch('vm.nuovoCompostoSettore.c', function(newVal){
        if(newVal && newVal != -1){
            var prdList = _.find($scope.vm.prodotti, function(list) { return list.i == newVal});
            $scope.vm.nuovoCompostoSettore.n = prdList.c;
        }
    });

    $scope.toggleSet = function(ID) {
        if($scope.vm.nuovoCompostoSettore.h.indexOf(ID) == -1) {
            $scope.vm.nuovoCompostoSettore.h.push(parseInt(ID));
        } else {
            $scope.vm.nuovoCompostoSettore.h.splice($scope.vm.nuovoCompostoSettore.h.indexOf(ID), 1);
        }
    };

    $scope.selectItem = function(result) {
        $scope.compostoSettore = {};
        $scope.compostoSettore.selected = true;
        $scope.compostoSettore.compostoSettore= result;
    };

    $scope.vm.saveCompostoSettoreData = function(){
        $rootScope.saving = true;
        $http.post('php/compostiSettori.php?type=save', $scope.vm.compostiSettori).success(function() {
            $rootScope.saving = false;
        }).error(function(data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function(){
        $rootScope.saving = true;
        $http.post('php/compostiSettori.php?type=db').success(function() {
            $rootScope.saving = false;
            dataSvc.compostiSettori().then(function (result) {
                $scope.vm.compostiSettori = result.data;
            });
        }).error(function(data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    var tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function() {
            if (tempFilterText || tempFilterText != '') {
                var espIDS = [];
                _.each($scope.vm.composti, function (v) {
                    if (v.c == tempFilterText) espIDS.push(v.i);
                });
                $scope.filtro.compostoSettore.c = espIDS;
            } else {
                $scope.filtro.compostoSettore.c = false;
            }
        }, 250);
    });

    $scope.eraseInput = function(e){
        if (e.keyCode == 27)
            $scope.input = '';
    };

    $scope.newItem = function() {
        $rootScope.saving = false;
        $scope.errore.compostoSettore = false;
        $scope.vm.nuovoCompostoSettore = {
            i : $scope.vm.nuovoCompostoSettore.i + 1,
            m : false,
            l : false,
            c : false,
            v : 0,
            h : []
        };
    };

    $scope.updateCheck = function() {
        return(!$scope.vm.nuovoCompostoSettore.m || !$scope.vm.nuovoCompostoSettore.l || !$scope.vm.nuovoCompostoSettore.w || !$scope.vm.nuovoCompostoSettore.c);
    };

    function checkSetArray() {
        return $scope.vm.nuovoCompostoSettore.h.length;
    }

    $scope.action = function(type) {
        if(type == 'N'){
            if(checkSetArray() != 0) {
                $rootScope.saving = true;
                $http.post('php/compostiSettori.php?type=new', {
                        'id'        :   $scope.vm.nuovoCompostoSettore.i,
                        'mark'      :   $scope.vm.nuovoCompostoSettore.m,
                        'line'      :   $scope.vm.nuovoCompostoSettore.l,
                        'nwln'      :   $scope.vm.nuovoCompostoSettore.w,
                        'array'     :   $scope.vm.nuovoCompostoSettore.h,
                        'cod'       :   $scope.vm.nuovoCompostoSettore.c,
                        'view'       :   $scope.vm.nuovoCompostoSettore.v
                    }
                ).success(function(result) {
                        console.log('Risposta dalla pagina PHP', result);
                        if($scope.vm.nuovoCompostoSettore.c != -1) {
                            $scope.vm.compostiSettori.push($scope.vm.nuovoCompostoSettore);
                            $scope.vm.saveCompostoSettoreData();
                        } else {
                            $scope.saveDataDB();
                        }
                        $scope.newItem();
                    }).error(function(data, status) {
                        console.log(status);
                    });
            }  else {   $scope.errore.compostoSettore = true;  }
        }
    };
}]);
