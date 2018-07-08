"use strict";

angular.module("mpu").controller("homeCtrl", ['$scope', '$rootScope', '$location', '_', '$timeout', '$interval', function ($scope, $rootScope, $location, _, $timeout, $interval) {

    var alphaChars = "nabcdefghilmn".toUpperCase().split("");
    $scope.intro = {};
    $scope.intro.index = 0;
    var intervallo = 4000;

    var action = function (currentChar, nextChar, i) {
        $timeout(function () {
            $scope.intro[currentChar] = false;
            $scope.intro[nextChar] = true;
            $scope.intro.index = i;
        }, intervallo * i);
    };

    $interval(function () {
        for (var i = 0; i < alphaChars.length - 1; i++) {
            action(alphaChars[i], alphaChars[i + 1], i);
        }
    }, 1000, 1);
    $interval(function () {
        for (var i = 0; i < alphaChars.length - 1; i++) {
            action(alphaChars[i], alphaChars[i + 1], i);
        }
    }, (intervallo * alphaChars.length) + 1000);

    $scope.fnz.visitWebSite = function (url) {
        window.open('http://' + url);
    };

    $scope.fnz.selectReg = function (ID) {
        $scope.filtro.prv = false;
        $scope.filtro.reg = ($scope.filtro.reg == ID) ? false : ID;
    };

    $scope.fnz.checkReg = function (ID) {
        return _.contains($scope.vm.rivRegList, ID);
    };
}]);


angular.module("mpu").controller("mainCtrl", ['$scope', '$rootScope', '$location', '_', '$cookies', 'dataSvc', '$timeout', '$window', '$http', function ($scope, $rootScope, $location, _, $cookies, dataSvc, $timeout, $window, $http) {

    $rootScope.$watch('dt.loaded', function (v) {
        if (v) {
            $scope.prv.nz = (_.filter($rootScope.dt.nazioni, function (list) {
                return list.v == 1
            }).length > 1) ? false : $rootScope.dt.nazioni[0].i;
            _.each($rootScope.dt.rivenditori, function (v) {
                if (v.v == 0) {
                    v.prv = _.find($rootScope.dt.province, function (list) {
                        return list.i == v.p
                    }).n;
                }
            });
            $scope.vm.categorie = $scope.fnz.categorie($rootScope.dt.marchi);
            $scope.vm.lineeSettori = $scope.fnz.lineeSettori($rootScope.dt.marchi);
            $scope.vm.settori = $scope.fnz.settori();

            // ***************************** INIZIALIZZAZIONE UTENTE ***************************** //

            if ($location.search().q) {
                var cod = $location.search().q;
                $http.post('php/preventivo.php?p=' + cod, {}).success(function (result) {
                    $scope.prv = result.prv;
                    $cookies.put('MPU-A', result.prv.g);
                    $cookies.put('MPU-I', result.prv.u);
                    $cookies.putObject('MPU-P', result.prv);
                    $cookies.put('MPU-Q', $location.search().q);
                });
            }

            // console.log($cookies.get('MPU-A'));
            if ($cookies.get('MPU-A')) {
                if ($cookies.get('MPU-A') == 0) {
                    $scope.data.agente = false;
                    $scope.prv.g = 0;
                } else {
                    $scope.data.agente = true;
                    $scope.prv.g = $cookies.get('MPU-A');
                    var agente = _.find($rootScope.dt.agenti, function (list) {
                        return list.i == $cookies.get('MPU-A')
                    });
                    $scope.data.nomeAgente = agente.n;
                    var rivenditore = _.find($rootScope.dt.rivenditori, function (list) {
                        return list.i == agente.r
                    });
                    if (rivenditore.p === 0) {
                        $scope.vm.loc = rivenditore.n.split(' ').join('_');
                    } else {
                        $scope.vm.loc = rivenditore.prv.split(' ').join('_');
                    }
                    $location.path('/' + $scope.vm.loc + '/home');
                }
            } else {
                $cookies.put('MPU-A', 0);
                $scope.data.agente = false;
                $scope.prv.g = 0;
            }

            if ($scope.fnz.findLoc() === 'mpu' || $location.path() == '/' || !$location.path()) {
                $cookies.put('MPU-I', 0);
                $cookies.put('MPU-A', 0);
                $timeout(function () {
                    $scope.fnz.render();
                });
                $scope.data.rivenditore = false;
                $scope.prv.u = 0;
            } else {
                $scope.vm.loc = $scope.fnz.findLoc();
                var locName = $scope.vm.loc.split('_').join(' ');
                var riv = false;
                var prvObject = _.find($rootScope.dt.province, function (list) {
                    return list.n == locName
                });
                if (prvObject) {
                    riv = _.find($rootScope.dt.rivenditori, function (list) {
                        return list.p == prvObject.i
                    });
                } else {
                    riv = _.find($rootScope.dt.rivenditori, function (list) {
                        return list.n == locName
                    });
                }
                if (riv) {
                    var ID = riv.i;
                    $cookies.put('MPU-I', ID);
                    $scope.prv.u = ID;
                    $timeout(function () {
                        $scope.fnz.render(ID)
                    });
                } else {
                    $cookies.put('MPU-I', 0);
                    if ($cookies.get('MPU-A')) {
                        $cookies.put('MPU-A', $cookies.get('MPU-A'));
                        $scope.prv.g = $cookies.get('MPU-A');
                    } else {
                        $cookies.put('MPU-A', 0);
                        $scope.prv.g = $cookies.get('MPU-A');
                    }
                    // $location.url('/mpu/home');
                    $location.url('404.html');
                    $scope.prv.u = 0;
                    $timeout(function () {
                        $scope.fnz.render();
                    });
                    $scope.data.rivenditore = false;
                }
            }

            $scope.vm.loaded = true;
        }
    });

    $scope.vm = {
        loaded: false,
        listinoLoaded: false,
        cookie: false,
        translate: false,
        translateMobile: false,
        login: false,
        footerOpen: false,
        hover: false,
        credits: false,
        menuCat: false,
        prv: false,
        added: false,
        cleanPrv: false,
        menu: false,
        menuArt: false,
        menuCmp: false,
        prvShare: false,
        prvEmail: false,
        prvSearch: false,
        prvSearchID: '',
        prvSearchError: false,
        prdShare: false,
        prdEmail: false,
        dwgEmail: false,
        menuShare: false,
        menuEmail: false,
        order: false,
        findPlace: '',
        cookies: false,
        lineaIsSet: false,
        prevLinea: false,
        prevCmp: false,
        //tbprLimit : 1,
        catLimit: 8,
        showScroll: false,
        optionLinea: "SCEGLI LINEA",
        optionSettore: "SCEGLI SETTORE",
        optionCategoria: "SCEGLI COLLEZIONE",
        showContatti: false,
        orderFailed: false,
        sendingOrder: false,
        description: "Vendita diretta e online di mobili per ufficio, sedie, poltrone, pareti divisorie, arredo ufficio moderno, classico e design, offerte a prezzi scontati",
        title: "Mobili per Ufficio e arredamento ufficio, prezzi e offerte in pronta consegna"
    };
    $scope.show = {
        sezioni: false,
        vetrina: false,
        composizioni: false,
        listino: true,
        txt: {
            vetrina: false,
            listino: false,
            composizioni: false
        }
    };
    $scope.dataPrv = {};
    $scope.data = {};
    $scope.current = {};
    $scope.fnz = {};
    $scope.login = {
        error: false
    };
    $scope.prv = {
        i: 0,
        //nz : 1,
        //rg : false,
        //pr : false,
        tm: 2,
        a: 0, //sconto agente
        u: 0,
        list: [],
        g: 0
    };
    $scope.filtro = {
        prv: false,
        reg: false,
        price: false,
        cmp: false,
        prd: '',
        prdValue: '',
        esp: '',
        espValue: '',
        tbpr: false,
        consegna: false,
        linee: [],
        priceList: [],
        place: false,
        nomeLinea: ''
    };
    $scope.mobile = {
        contatti: false,
        tools: false,
        prodotti: true
    };
    $scope.vm.ftscroller = {
        scrollbars: true,
        scrollingX: false,
        snap: true,
        momentum: true,
        hScrollbar: false,
        updateOnWindowResize: true,
        updateOnChanges: true,
        baseAlignments: {
            x: -1,
            y: -1
        }
    };
    $scope.cliente = {
        t: 1, //SOCIETA'(1) O PRIVATO(2)
        s: '', //NOME SOCIETA
        v: '', //PARTITA IVA
        es: '', //EMAIL SOCIETA
        a: '', //INDIRIZZO
        c: '', //CITTA
        p: '', //CAP
        t1: '', //TELEFONO 1
        t2: '', //TELEFONO 2
        f: '', //FAX
        n: '', //REFERENTE
        en: '', //EMAIL REFERENTE
        dn: '', //CONSEGNA REFERENTE
        de: '', //CONSEGNA EMAIL
        da: '', //CONSEGNA INDIRIZZO
        dc: '', //CONSEGNA CITTA
        dp: '', //CONSEGNA CAP
        dt1: '', //CONSEGNA TELEFONO 1
        dt2: '', //CONSEGNA TELEFONO 2
        df: '', //CONSEGNA FAX
        dm: '', //CONSEGNA NOTE
        d: 1, //CONSEGNA
        m: 1, //PAGAMENTO
        py: false,
        cv: false
    };

    $scope.request = {
        u: false,
        r: false,
        p: false
    };

    $scope.nm = {
        navTitle: false,
        navSelection: false,
        terms: false,
        privacy: false,
        categorie: false,
        linea: false
    };

    $scope.fnz.switchMenu = function (ID) {
        $scope.vm.menuEmail = false;
        $scope.vm.menuShare = false;
        $scope.vm.login = false;
        $scope.vm.prvSearch = false;
        switch (ID) {
            case 1:
                $scope.nm.navSelection = ($scope.nm.navSelection == ID) ? false : ID;
                break;
            case 2:
                $scope.nm.navSelection = ($scope.nm.navSelection == ID) ? false : ID;
                break;
            case 3:
                $.getScript('//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
                break;
            case 4:
                if ($scope.prv.list.length != 0) {
                    if ($scope.fnz.findPage() != 'preventivo') {
                        $location.url('/' + $scope.vm.loc + '/preventivo');
                        $scope.nm.navSelection = ($scope.nm.navSelection == ID) ? false : ID;
                    } else {
                        $window.history.back();
                        $scope.nm.navSelection = false;
                    }
                }
                $scope.fnz.scrollTop();
                break;
            case 5:
                if ($scope.fnz.findPage() != 'contatti') {
                    $location.url('/' + $scope.vm.loc + '/contatti');
                    $scope.nm.navSelection = ($scope.nm.navSelection == ID) ? false : ID;
                } else {
                    $window.history.back();
                    $scope.nm.navSelection = false;
                }
                $scope.fnz.scrollTop();
                break;
            case 6:
                if ($scope.fnz.findPage() != 'condizioni') {
                    $location.url('/' + $scope.vm.loc + '/condizioni');
                } else {
                    $window.history.back();
                }
                $scope.nm.navSelection = ($scope.nm.navSelection == ID) ? false : ID;
                $scope.fnz.scrollTop();
                break;
            case 7:
                if ($scope.fnz.findPage() != 'progettazione') {
                    $location.url('/' + $scope.vm.loc + '/progettazione');
                } else {
                    $window.history.back();
                }
                $scope.nm.navSelection = ($scope.nm.navSelection == ID) ? false : ID;
                $scope.fnz.scrollTop();
                break;
            case 8:
                if ($scope.fnz.findPage() != 'distributori') {
                    $location.url('/' + $scope.vm.loc + '/distributori');
                } else {
                    $window.history.back();
                }
                $scope.nm.navSelection = ($scope.nm.navSelection == ID) ? false : ID;
                $scope.fnz.scrollTop();
                break;
            case 9:
                if ($scope.fnz.findPage() != 'faq') {
                    $location.url('/' + $scope.vm.loc + '/faq');
                } else {
                    $window.history.back();
                }
                $scope.nm.navSelection = ($scope.nm.navSelection == ID) ? false : ID;
                $scope.fnz.scrollTop();
                break;
            case 0:
                $scope.nm.navSelection = false;
                break;
        }
        $scope.vm.translateMobile = (ID != 3) ? false : !$scope.vm.translateMobile;
    };

    $scope.vm.ww = ($window.innerWidth <= 1080) ? 0 : 1;

    $scope.$on('$viewContentLoaded', function (event) {
        $window.ga('send', 'pageview', {page: $location.url()});
    });

    $(window).on("resize.doResize", function () {
        $scope.$apply(function () {
            return $scope.vm.ww = ($window.innerWidth <= 1080) ? 0 : 1;
        });
    });

    $(window).scroll(function () {
        $scope.vm.showScroll = (document.body.scrollTop >= 150);
        $scope.nm.navTitle = (document.body.scrollTop != 0);
        $scope.$apply();
    });

    $scope.mobile.setProdotti = function () {
        if (!$scope.mobile.prodotti) {
            $scope.mobile.prodotti = true;
            $cookies.put('MPU-M', true);
        } else {
            $scope.mobile.prodotti = false;
            $cookies.remove('MPU-M');
        }
    };

    $scope.mobile.prodotti = $cookies.get('MPU-M');

    //var snd = new Audio("img/sound.mp3"); // buffers automatically when created

    $scope.fnz.deselectMenu = function (type) {
        switch (type) {
            case 'menu':
                $scope.vm.menuEmail = false;
                $scope.vm.menuShare = false;
                $scope.vm.login = false;
                $scope.vm.translate = false;
                $scope.vm.translateMobile = false;
                $scope.vm.prvSearch = false;
                $scope.vm.menu = !$scope.vm.menu;
                break;
            case 'translate':
                $.getScript('//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
                $scope.vm.menuEmail = false;
                $scope.vm.menuShare = false;
                $scope.vm.login = false;
                $scope.vm.menu = false;
                $scope.vm.prvSearch = false;
                $scope.vm.translate = !$scope.vm.translate;
                break;
            case 'share':
                $scope.vm.menuEmail = false;
                $scope.vm.menuShare = !$scope.vm.menuShare;
                $scope.vm.prvSearch = false;
                $scope.vm.login = false;
                break;
            case 'login':
                $scope.vm.menuEmail = false;
                $scope.vm.menuShare = false;
                $scope.vm.prvSearch = false;
                $scope.vm.login = !$scope.vm.login;
                break;
            case 'prdShare':
                $scope.vm.prdEmail = false;
                $scope.vm.prdShare = !$scope.vm.prdShare;
                break;
            case 'prvShare':
                $scope.vm.prvEmail = false;
                $scope.vm.prvSearch = false;
                $scope.vm.prvShare = !$scope.vm.prvShare;
                break;
            case 'prvSearch':
                $scope.vm.menuEmail = false;
                $scope.vm.prvEmail = false;
                $scope.vm.menuShare = false;
                $scope.vm.login = false;
                $scope.vm.prvSearch = !$scope.vm.prvSearch;
                break;
        }
    };
    $scope.fnz.resetCurrent = function () {
        $scope.current = {
            cat: false,
            sett: false,
            lin: false,
            page: false,
            tbpr: false,
            tbesp: false,
            vtr: false,
            cmp: false,
            art: false,
            listino: [],
            marchiTabelle: []
        };
        $scope.filtro.tbpr = false;
    };
    $scope.fnz.resetCurrent();

    $scope.$watch('filtro.tbpr', function () {
        $scope.nm.linea = false;
    });
    var cleanSession = function () {
        $scope.fnz.resetCurrent();
    };

    $scope.fnz.cleanAll = function () {
        $scope.vm.menuCat = false;
        cleanSession();
    };

    $scope.fnz.goHome = function () {
        $location.url('/' + $scope.vm.loc + '/home');
        $scope.fnz.scrollTop();
        $scope.nm.navSelection = false;
    };
    if ($location.search().c && !$scope.current.cat) {
        $scope.current.cat = parseInt($location.search().c);
    }
    if ($location.search().s && !$scope.current.sett) {
        $scope.current.sett = parseInt($location.search().s);
    }

    /*
     if($location.search().a && !$scope.current.art) {
     $scope.current.art = _.findWhere($rootScope.dt.prodotti, {i: parseInt($location.search().a)});
     }
     */

    function getPosition(str, m, i) {
        return str.split(m, i).join(m).length;
    }

    $scope.fnz.findLoc = function () {
        var slash = getPosition($location.path(), '/', 2);
        return $location.path().slice(1, slash);
    };
    $scope.vm.loc = ($scope.fnz.findLoc()) ? $scope.fnz.findLoc() : 'mpu';

    $scope.fnz.findPage = function () {
        var slash = getPosition($location.path(), '/', 2);
        var end = $location.path().length;
        return $location.path().slice(slash + 1, end);
    };

    $scope.fnz.findDomain = function () {
        var slash = getPosition($location.absUrl(), '/', 3);
        return $location.absUrl().slice(0, slash);
    };

    $scope.fnz.goToPrev = function () {
        $location.url('/' + $scope.vm.loc + '/preventivo');
        $scope.vm.added = false;
    };
    $scope.fnz.goToVetrina = function () {
        $location.url('/' + $scope.vm.loc + '/vetrina?l=' + $scope.current.lin.i);
        $scope.fnz.scrollTop();
    };
    $scope.fnz.goToCategoria = function (ID) {
        var categoria = (ID) ? ID : $scope.current.lin.g;
        $location.url('/' + $scope.vm.loc + '/categoria?c=' + categoria);
        $scope.nm.navSelection = false;
        $scope.fnz.scrollTop();
    };
    $scope.fnz.goToArticolo = function (articolo, cmp) {
        $scope.current.art = articolo;
        $scope.current.lin = _.findWhere($rootScope.dt.linee, {i: parseInt(articolo.l)});
        $location.url('/' + $scope.vm.loc + '/articolo?a=' + articolo.i);
        if (cmp) {
            $scope.vm.prevCmp = cmp.i;
            $cookies.put('MPU-L', cmp.i);
        }
        $scope.fnz.scrollTop();
    };
    $scope.fnz.goToCmp = function (ID) {
        $scope.fnz.creaComposizione(ID);
        $scope.current.lin = _.findWhere($rootScope.dt.linee, {i: $scope.current.cmp.l});
        $scope.vm.prevCmp = false;
        $cookies.remove('MPU-C');
        $scope.fnz.scrollTop();
    };

    $scope.fnz.findQuery = function () {
        var slash = getPosition($location.url(), '?', 1);
        return $location.url().slice(slash);
    };

    $scope.fnz.absoluteUrl = function () {
        if ($location.absUrl() === 'http://mobiliperufficio.com/' || $location.absUrl() === 'http://mobiliperufficio.com/' + $scope.fnz.findLoc() + '/home') {
            return "http://mobiliperufficio.com/"
        } else {
            return "http://mobiliperufficio.com/mpu/" + $scope.fnz.findPage() + $scope.fnz.findQuery();
        }
    };

    if ($cookies.getObject('MPU-P')) $scope.prv = $cookies.getObject('MPU-P');

    $scope.$watchCollection('prv', function (v) {
        if (v.list.length == 0) {
            v.nz = 1;
            v.rg = false;
            v.pr = false;
            v.tm = 2;
        }
        $cookies.putObject('MPU-P', v);
    });

    $scope.$on('$locationChangeSuccess', function () {
        $timeout(function () {
            switch ($scope.fnz.findPage()) {
                case 'categoria' :
                    switch ($location.search().c) {
                        case '28':
                            $scope.vm.description = "Mobili per ufficio, i migliori prezzi e offerte per arredi e arredamenti ufficio direzionali, arredi uffici operativi, arredi reception; in pronta consegna";
                            $scope.vm.title = "Mobili per Ufficio e arredamento ufficio, prezzi e offerte in pronta consegna";
                            break;
                        case '54':
                            $scope.vm.description = "Sedute per ufficio, prezzi per sedie ufficio direzionali, sedute operative, sgabelli, poltrone e divani per ufficio; in pronta consegna, richiedi preventivo";
                            $scope.vm.title = "Sedie per ufficio, sedie direzionali, sedute operative poltrone e divani ufficio";
                            break;
                        case '55':
                            $scope.vm.description = "Art & Design Ufficio, i migliori articoli di design per ufficio, tavolo scrivania, tavoli riunioni, complementi arredo di design, scegli l'ufficio di design";
                            $scope.vm.title = "Art & Design Ufficio, scopri i migliori articoli di arte e design per il tuo ufficio";
                            break;
                        case '52':
                            $scope.vm.description = "Pareti divisorie per ufficio, prezzi economici e design per la suddivisione spazi del tuo ufficio o negozio, pareti divisorie, vetrate e pareti attrezzate";
                            $scope.vm.title = "Pareti divisorie economiche e di design per il tuo ufficio o negozio";
                            break;
                        case '40':
                            $scope.vm.description = "Accessori e complementi per ufficio, appendiabiti, cestini gettacarta, tavolini, lampade e accessori per scrivanie; acquista o richiedi un preventivo";
                            $scope.vm.title = "Accessori e complementi mobili per ufficio, appendiabiti, gettacarta, tavoli";
                            break;
                    }
                    break;
                case 'listino' :
                    $scope.vm.description = "mobiliperufficio.com presenta il listino della linea " + $scope.current.lin.n + ". Una lista di tutti i prodotti della linea " + $scope.current.lin.n + " completa dei singoli prezzi.";
                    $scope.vm.title = "Tutti i prezzi dei prodotti della linea" + $scope.current.lin.n;
                    break;
                case 'vetrina' :
                    $scope.vm.description = "mobiliperufficio.com presenta la vetrina della linea " + $scope.current.lin.n + ". Una paronamica delle composizioni presenti nella linea " + $scope.current.lin.n + " completa di prezzi.";
                    $scope.vm.title = "Esposizione online della linea" + $scope.current.lin.n + " con prezzi, specifiche e dettagli";
                    break;
                case 'articolo' :
                    $scope.vm.description = "mobiliperufficio.com presenta l'articolo " + $scope.current.art.c + ", " + $scope.current.art.n + ", dimensioni " + $scope.current.art.d + " della linea " + $scope.current.lin.n;
                    $scope.vm.title = "Prezzi, specifiche e colori dell'articolo  " + $scope.current.art.c;
                    break;
                case 'composizione' :
                    $scope.vm.description = "mobiliperufficio.com presenta la composizione " + $scope.current.lin.n + " " + $scope.current.cmp.c + ", " + $scope.current.cmp.n + ", della linea " + $scope.current.lin.n;
                    $scope.vm.title = "Un arredo selezionato pronto all'acquisto della linea" + $scope.current.lin.n;
                    break;
                case 'contatti' :
                    $scope.vm.description = "La lista dei contatti di tutti i distributori che collaborano con mobiliperufficio.com. Siamo presenti a Roma, Milano, Napoli, Torino e molte altre città.";
                    $scope.vm.title = "Cercaci a Roma, Milano, Torino, Napoli, Firenze e in altre città d'Italia";
                    break;
                case 'distributori' :
                    $scope.vm.description = "Una lista completa di tutti i distributori che collaborano con mobiliperufficio.com. Siamo presenti a Roma, Milano, Napoli, Torino e molte altre città.";
                    $scope.vm.title = "Cercaci a Roma, Torino, Napoli, Milano, Firenze e in altre città d'Italia";
                    break;
                case 'condizioni' :
                    $scope.vm.description = "Le nostre condizioni di vendita di mobili per ufficio. Un altro esempio di trasparenza e voglia di metterci a disposizione dei nostri clienti.";
                    $scope.vm.title = "Poche regole per acquistare il tuo arredo per ufficio in trasparenza e sicurezza";
                    break;
                case 'faq' :
                    $scope.vm.description = "Se avete qualche domanda da porci consultate la nostra FAQ, dove abbiamo inserito un lista di tutte le domande frequentemente richieste, con sintetiche, ma esaustive, risposte.";
                    $scope.vm.title = "Contattaci per ogni richiesta o informazione se non trovate le vostre risposte in questa pagina";
                    break;
                case 'progettazione' :
                    $scope.vm.description = "mobiliperufficio.com offre la progettazione gratuita degli ambienti di lavoro conforme ai requisiti di sicurezza e comfort per gli utilizzatori finali.";
                    $scope.vm.title = "Servizio di progettazione gratuito in tutta Italia per un servizio completo ed efficiente";
                    break;
                case 'preventivo' :
                    $scope.vm.description = "Preventivo online interamente personalizzato. Diamo la possibilità ai nostri clienti di crearsi il preventivo a loro completo piacimento, con tutti i costi e sconti riservati";
                    $scope.vm.title = "Creati il preventivo dei tuoi mobili per ufficio personalizzato senza spese aggiunte";
                    break;
                case 'form' :
                    $scope.vm.description = "Completi questo semplice form con i suoi dati e le modalità di pagamento, quanto prima riceverà la nostra conferma d'ordine di acquisto dei prodotti scelti.";
                    $scope.vm.title = "Acquistare l'arredamento per ufficio non è mai stato così semplice e sicuro";
                    break;
                case 'privacy' :
                    $scope.vm.description = "mobiliperufficio.com, come ogni servizio online che si rispetti, offre un servizio informazione per la tutela privacy di ogni visitatore.";
                    $scope.vm.title = "La tutela dei nostri utenti viene rispettata sotto ogni aspetto, dalla prima visita fino all'acquisto degli arredi per ufficio";
                    break;
                default :
                    $scope.vm.description = "Vendita diretta e online di mobili per ufficio, sedie, poltrone, pareti divisorie, arredo ufficio moderno, classico e design, offerte a prezzi scontati";
                    $scope.vm.title = "Mobili per Ufficio e arredamento ufficio, prezzi e offerte in pronta consegna"
            }
        }, 100);
        $scope.vm.catLimit = 8;
        $scope.fnz.scrollTop();
        $scope.vm.menuCat = false;
        $scope.nm.linea = false;
        $scope.vm.lineaIsSet = ($location.search().l) ? true : false;
        $scope.current.path = $location.url();
        $scope.vm.cookies = ($cookies.get('MPU-K'));
        if ($cookies.get('MPU-L')) $scope.vm.prevLinea = $cookies.get('MPU-L');
        if ($cookies.get('MPU-C')) $scope.vm.prevCmp = $cookies.get('MPU-C');
        if ($scope.fnz.findPage() != 'listino') {
            $scope.vm.prevLinea = false;
            $cookies.remove('MPU-L');
        }
        if ($scope.fnz.findPage() != 'articolo') {
            $scope.vm.prevCmp = false;
            $cookies.remove('MPU-C');
        }
        $scope.request.u = false;
        $scope.request.t = '';
        $scope.filtro.price = false;
        $scope.filtro.nomeLinea = '';
        $scope.filtro.prd = '';
        $scope.filtro.prdValue = '';
        if ($scope.fnz.findPage() != 'listino') {
            $scope.filtro.tbpr = false;
        }
        if ($scope.fnz.findPage() != 'vetrina' && $scope.fnz.findPage() != 'listino' && $scope.fnz.findPage() != 'articolo' && $scope.fnz.findPage() != 'composizione' && $location.search().c != $scope.current.cat) {
            $scope.filtro.linee = [];
            $scope.filtro.priceList = [];
            $scope.filtro.consegna = false;
        }
        if ($location.search().a) {
            $scope.current.art = _.findWhere($rootScope.dt.prodotti, {i: parseInt($location.search().a)});
        }
        $scope.vm.prv = ($scope.fnz.findPage() == 'preventivo' || $scope.fnz.findPage() == 'ordine' || $scope.fnz.findPage() == 'form');
        $scope.vm.order = ($scope.fnz.findPage() == 'form');
    });

    $scope.$watch('filtro.price', function () {
        var tile = document.getElementsByClassName("SWD");
        var i = -1;
        $timeout(function () {
            $scope.fnz.myLoop(i, tile.length);
        });
    });

    $scope.fnz.categorie = function (list) {
        var marchi = _.pluck(_.where(list, {v: 1}), 'g');
        var catAv = [];
        _.each(marchi, function (v) {
            _.each(v, function (a) {
                catAv.push(a);
            })
        });
        var categorie = [];
        _.each(_.uniq(catAv), function (v) {
            _.each($rootScope.dt.categorie, function (a) {
                if (a.i == v) categorie.push(a)
            })
        });
        _.each(list, function (m) {
            _.each($rootScope.dt.linee, function (l) {
                if (l.m == m.i && m.v == 0) {
                    l.v = 0;
                }
            })
        });
        //console.log(categorie);
        return categorie;
    };
    $scope.fnz.lineeSettori = function (list) {
        var marchi = _.pluck(_.where(list, {v: 1}), 'i');
        var lineeSettori = [];
        _.each(marchi, function (v) {
            _.each($rootScope.dt.lineeSettori, function (a) {
                if (a.m == v) lineeSettori.push(a)
            })
        });
        //console.log($scope.vm.lineeSettori);
        return lineeSettori;
    };
    $scope.fnz.settori = function () {
        var linee = _.pluck(_.where($scope.vm.lineeSettori, {v: 1}), 'h');
        var settori = [];
        _.each(_.uniq(linee), function (v) {
            _.each($rootScope.dt.settori, function (a) {
                if (a.i == v) settori.push(a)
            })
        });
        //console.log($scope.vm.settori);
        return settori;
    };

    $scope.fnz.rivenditori = function (ID) {
        $scope.data.rivenditore = _.find($rootScope.dt.rivenditori, function (list) {
            return list.i == ID
        });
        $scope.prv.nz = false;
        $scope.prv.rg = false;
        $scope.prv.pr = false;
        _.each($scope.data.rivenditore.y, function (a) {
            _.each($rootScope.dt.marchi, function (m) {
                if (a.i == m.i) {
                    m.s = (a.s == 0) ? m.s : a.s;
                    m.v = a.v;
                    m.d = a.d;
                }
            });
        });
        //console.log($scope.data.rivenditore)
        //console.log($rootScope.dt.marchi)
        //$scope.vm.categorie = $scope.fnz.categorie($rootScope.dt.marchi);
    };
    $scope.fnz.render = function (ID) {
        //$scope.vm.loaded = false;
        if (ID) {
            $scope.fnz.rivenditori(ID);
        }
        $scope.vm.categorie = $scope.fnz.categorie($rootScope.dt.marchi);
        $scope.fnz.checkZad = function () {
            return _.find($scope.vm.categorie, function (list) {
                return list.i === 55
            })
        };
        /*
         if(!ID){
         if($http.pendingRequests.length > 0) { //SETTARE A 1 SE BISOGNA CARICARE I PRODOTTI NEL MAIN
         $timeout($scope.fnz.render);
         } else {
         $scope.vm.categorie = $scope.fnz.categorie($rootScope.dt.marchi);
         //$scope.vm.loaded = true;
         }
         } else {
         if ($http.pendingRequests.length > 1) {
         $timeout(function () {
         $scope.fnz.render(ID);
         });
         } else {
         $scope.fnz.rivenditori(ID);
         //$scope.vm.loaded = true;
         }
         }
         */
    };

// ***************************** LOGIN / LOGOUT ***************************** //

    $scope.login.access = function () {
        if ($scope.login.user && $scope.login.psw) {
            $rootScope.saving = true;
            $http.post('php/login.php', {
                    'user': $scope.login.user,
                    'psw': $scope.login.psw,
                    'mpu': $cookies.get('MPU-I')
                }
            ).success(function (result) {
                console.log(result)
                if (!result) {
                    $scope.login.error = true;
                    $timeout(function () {
                        $scope.login.error = false;
                    }, 4000);
                } else if (result == -1) {
                    window.location = 'dashboard/index.php';
                } else {
                    var ID = parseInt(result[0]);
                    var riv = parseInt(result[1]);
                    $scope.vm.login = false;
                    $scope.data.agente = true;
                    $scope.data.nomeAgente = _.find($rootScope.dt.agenti, function (list) {
                        return list.i == ID
                    }).n;
                    cleanSession();
                    $cookies.put('MPU-A', ID);
                    $cookies.put('MPU-I', riv);
                    $cookies.remove('MPU-Q');
                    $scope.prv = {
                        i: 0,
                        nz: 1,
                        rg: 0,
                        pr: 0,
                        tm: 2,
                        a: 0, //sconto agente
                        list: [],
                        g: ID,
                        u: riv
                    };
                    //console.log($scope.prv)
                    var rivenditore = _.find($rootScope.dt.rivenditori, function (list) {
                        return list.i == riv
                    });
                    if (rivenditore.v != 0) {
                        $scope.vm.loc = $scope.fnz.replaceAll(rivenditore.n, ' ', '_');
                    } else {
                        var provincia = _.find($rootScope.dt.province, function (list) {
                            return list.i == rivenditore.p
                        });
                        $scope.vm.loc = $scope.fnz.replaceAll(provincia.n, ' ', '_');
                    }
                    $scope.fnz.rivenditori(riv);
                    $scope.vm.categorie = $scope.fnz.categorie($rootScope.dt.marchi);
                    $scope.vm.menu = false;
                    $location.url('/' + $scope.vm.loc + '/home');
                }
            });
        } else {
            $scope.login.error = true;
            $timeout(function () {
                $scope.login.error = false;
            }, 4000);
        }
    };
    $scope.login.exit = function () {
        $scope.vm.login = false;
        $scope.data.agente = false;
        $cookies.put('MPU-A', 0);
        cleanSession();
        if ($cookies.get('MPU-I') == 0 || $co / okies.get('MPU-I') == 91) {
            $scope.data.rivenditore = false;
            /*
             dataSvc.marchi().then(function (result) {
             $rootScope.dt.marchi = result.data;
             });
             */
            $scope.vm.categorie = $scope.fnz.categorie($rootScope.dt.marchi);
            $cookies.put('MPU-I', 0);
            $cookies.remove('MPU-Q');
            $scope.vm.loc = 'mpu';
            $location.url('/mpu/home');
        } else {
            $scope.fnz.rivenditori($cookies.get('MPU-I'));
            $scope.vm.categorie = $scope.fnz.categorie($rootScope.dt.marchi);
        }
        $scope.prv.g = 0;
        $scope.prv = {
            i: 0,
            nz: 1,
            rg: false,
            pr: false,
            tm: 2,
            a: 0, //sconto agente
            u: $cookies.get('MPU-I'),
            list: [],
            g: 0
        };
        $scope.vm.menu = false;
        $location.url('/' + $scope.vm.loc + '/home');
    };

// ***************************** FUNZIONI ***************************** //

    $scope.fnz.convert = function (ID, list, item) {
        var array = [];
        var element = '';
        if (typeof ID === "object") {
            for (var i = 0; i < ID.length; i++) {
                _.each($rootScope.dt[list], function (v) {
                    if (v.i == ID[i]) {
                        array.push(v[item])
                    }
                })
            }
            return array;
        } else {
            _.each($rootScope.dt[list], function (v) {
                if (v.i == ID) {
                    element = v[item];
                }
            });
            return element;
        }
    };
    $scope.fnz.convertData = function (ID, list, item) {
        var array = [];
        var element = '';
        if (typeof ID === "object") {
            for (var i = 0; i < ID.length; i++) {
                _.each($scope.data[list], function (v) {
                    if (v.i == ID[i]) {
                        array.push(v[item])
                    }
                })
            }
            return array;
        } else {
            _.each($scope.data[list], function (v) {
                if (v.i == ID) {
                    element = v[item];
                }
            });
            return element;
            /*
             var object = _.find($scope.data[list], function(l) { return l.i == ID});
             return object[item];
             */
        }
    };
    $scope.fnz.regArt = function (ID) {
        switch (ID) {
            case 8 :
                return 'nel';
                break;
            case 11 :
                return 'nelle';
                break;
            default :
                return 'in';
                break
        }
    };
    Number.prototype.formatMoney = function (c, d, t) {
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
    $scope.fnz.convertPrice = function (price) {
        return (price).formatMoney(2, ',', '.');
    };
    $scope.fnz.convertFinType = function (ID) {
        return (ID == 0) ? 'Finitura' : 'Rivestimento';
    };
    $scope.fnz.convertPriceType = function (ID) {
        switch (ID) {
            case 1 :
                return 'Miglior prezzo';
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
    $scope.fnz.resetLinea = function () {
        $scope.current.vtr = false;
        $scope.current.cmp = false;
        $scope.current.tbpr = false;
        $scope.current.art = false;
        $scope.current.listino = [];
        $scope.current.marchiTabelle = [];
        $scope.filtro.tbpr = false;
    };
    $scope.fnz.setCurCat = function (ID) {
        $scope.current.cat = ID;
        $scope.current.sett = false;
        $scope.current.lin = false;
        $scope.current.page = false;
        //$scope.fnz.resetFilter();
        $location.url('/' + $scope.vm.loc + '/categoria?c=' + ID);
    };

    $scope.fnz.creaLinea = function (ID) {
        $scope.vm.optionLinea = "TUTTE LE LINEE";
        $scope.fnz.resetLinea();
        $scope.current.lin = ID;
        if (!$scope.current.cat) $scope.current.cat = $scope.current.lin.g;
        if ($scope.current.lin.c) {
            $scope.show.sezioni = true;
            $scope.show.vetrina = true;
        } else {
            $scope.current.cmp = false;
            $scope.current.art = false;
            $scope.fnz.creaListino();
            $location.url('/' + $scope.vm.loc + '/listino?l=' + ID.i);
        }
    };

    $scope.fnz.showText = function (ID) {
        switch (ID) {
            case 1:
                $scope.show.txt.vetrina = !$scope.show.txt.vetrina;
                $scope.show.txt.listino = false;
                $scope.show.txt.composizioni = false;
                break;
            case 2:
                $scope.show.txt.listino = !$scope.show.txt.listino;
                $scope.show.txt.vetrina = false;
                $scope.show.txt.composizioni = false;
                break;
            case 3:
                $scope.show.txt.composizioni = !$scope.show.txt.composizioni;
                $scope.show.txt.listino = false;
                $scope.show.txt.vetrina = false;
                break;
        }
    };
    $scope.fnz.goToSezioni = function (ID) {
        switch (ID) {
            case 1:
                $scope.current.cmp = false;
                $scope.current.art = false;
                $scope.current.page = 1;
                $scope.fnz.creaVetrine();
                $location.url('/' + $scope.vm.loc + '/vetrina?l=' + $scope.current.lin.i);
                break;
            case 2:
                $scope.current.cmp = false;
                $scope.current.art = false;
                $scope.current.page = 2;
                $scope.fnz.creaListino();
                $location.url('/' + $scope.vm.loc + '/listino?l=' + $scope.current.lin.i);
                break;
        }
        $scope.fnz.scrollTop();
        $scope.show.sezioni = false;
        $scope.show.vetrina = false;
        $scope.show.composizioni = false;
        $scope.show.txt = {
            vetrina: false,
            listino: false,
            composizioni: false
        }
    };

    $scope.fnz.goToLinea = function (ID, prev) {
        if (prev) {
            $cookies.put('MPU-L', prev);
            $scope.vm.prevLinea = prev;
        } else {
            $cookies.remove('MPU-L');
            $scope.vm.prevLinea = false;
        }
        $scope.filtro.tbpr = false;
        $scope.current.lin = _.findWhere($rootScope.dt.linee, {i: parseInt(ID)});
        $scope.fnz.creaListino();
        $location.url('/' + $scope.vm.loc + '/listino?l=' + ID);
    };

    $scope.fnz.noSezioni = function () {
        $scope.show = {
            sezioni: false,
            vetrina: false,
            composizioni: false,
            listino: true,
            txt: {
                vetrina: false,
                listino: false,
                composizioni: false
            }
        }
    };

    $scope.fnz.creaComposizione = function (ID) {
        $scope.current.cmp = _.find($rootScope.dt.vetrine, function (list) {
            return list.i == ID
        });
        $scope.current.cmp.p = _.filter($rootScope.dt.vetrineProdotti, function (item) {
            return item.c == $scope.current.cmp.i
        });
        // $location.url('/' + $scope.vm.loc + '/composizione?&v=' + ID);
        $scope.fnz.scrollTop();
    };
    $scope.fnz.creaVetrine = function () {
        $scope.current.vetrine = [];
        _.each($rootScope.dt.vetrine, function (v) {
            if (v.l == $scope.current.lin.i && v.v == 1) {
                $scope.current.vetrine.push(v);
            }
        });
    };

    $scope.fnz.creaListino = function () {
        $scope.current.listino = _.filter($scope.dt.prodotti, function (item) {
            return item.l == $scope.current.lin.i;
        });
        var tbpr = _.uniq(_.map($scope.current.listino, function (item) {
            return item.t;
        }));
        $scope.current.marchiTabelle = [];
        _.each(tbpr, function (k) {
            _.each($scope.dt.marchiTabelle, function (v) {
                if (k == v.i) {
                    $scope.current.marchiTabelle.push(v);
                }
            })
        });
    };

    $scope.fnz.moreTbpr = function () {
        $scope.vm.tbprLimit++;
    };
    $scope.fnz.replaceAll = function (string, find, replace) {
        return string.replace(new RegExp(find, 'g'), replace);
    };

    $scope.fnz.scontistica = function (price, scontoMarchio, maggiorazioneListino, scontoLinea) {
        var scontistica = price + ((price * maggiorazioneListino) / 100);
        scontistica += (scontistica * scontoMarchio) / 100;
        scontistica += (scontistica * scontoLinea) / 100;
        return Math.ceil(scontistica);
        // return Math.ceil(price + ((price * scontoMarchio) / 100) + ((price * maggiorazioneListino) / 100) + ((price * scontoLinea) / 100));
    };
    $scope.fnz.checkInput = function (e, type) {
        if (e.keyCode == 27) {
            $scope.filtro[type + 'Value'] = '';
            $scope.filtro[type] = '';
        } else {
            var tempFilterText = '', filterTextTimeout;
            if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
            tempFilterText = $scope.filtro[type + 'Value'];
            filterTextTimeout = $timeout(function () {
                $scope.filtro[type] = tempFilterText;
            }, 150);
        }
    };
    $scope.fnz.scrollTop = function (pos) {
        if (typeof pos == 'number' || !pos) {
            var y = (pos) ? pos : 0;
            $("html, body").animate({scrollTop: y}, 300);
        } else {
            $timeout(function () {
                $("html, body").animate({scrollTop: $("#" + pos).offset().top}, 300);
            }, 200)
        }
        /*
         $('.ftscroller_y').css(
         {
         'transform' : 'translate3d(0px, 0px, 0px)',
         '-webkit-transition': 'all 400ms ease-out',
         '-moz-transition': 'all 400ms ease-out',
         '-ms-transition': 'all 400ms ease-out',
         '-o-transition': 'all 400ms ease-out'
         });
         */
    };
    $scope.fnz.requestInfo = function (type) {
        if ($scope.request.u) {
            $scope.request.u = false;
        } else {
            if (type) {
                switch (type) {
                    case 'linea':
                        $scope.request.t = 'Richiesta informazioni per la linea ' + $scope.current.lin.n;
                        break;
                    case 'composizione':
                        var cod = $scope.current.cmp.i;
                        $scope.request.t = 'Richiesta informazioni per composizione ' + $scope.fnz.convert($scope.current.lin.i, 'linee', 'n') + '_' + $scope.fnz.convert(cod, 'vetrine', 'c');
                        break;
                    case 'articolo':
                        $scope.request.t = 'Richiesta informazioni per l\'articolo ' + $scope.fnz.convert(parseInt($location.search().a), 'prodotti', 'c') + ' della linea ' + $scope.fnz.convert($scope.current.lin.i, 'linee', 'n');
                        break;
                }
            }
            if ($cookies.get('MPU-I') != 0) {
                $scope.request.u = $scope.fnz.convert($cookies.get('MPU-I'), 'rivenditori', 'n');
                $scope.request.r = $scope.fnz.convert($cookies.get('MPU-I'), 'rivenditori', 'e');
            } else {
                $scope.request.u = $rootScope.dt.rivenditori[0].n;
                $scope.request.r = $rootScope.dt.rivenditori[0].e;
            }
            $scope.fnz.scrollTop();
        }
        //console.log($scope.request)
    };
    $scope.fnz.acceptCookies = function () {
        $scope.vm.cookies = true;
        $cookies.put('MPU-K', 1);
    };
    $scope.fnz.pdfPath = function (type) {
        var markName = $scope.fnz.replaceAll($scope.fnz.convert($scope.current.lin.m, 'marchi', 'n'), ' ', '_');
        var lineName = $scope.fnz.replaceAll($scope.current.lin.n, ' ', '_');
        switch (type) {
            case 'c':
                return 'dashboard/archivio_dati/' + markName + '/' + lineName + '/' + lineName + '_catalogo.pdf';
                break;
            case 's':
                return 'dashboard/archivio_dati/' + markName + '/' + lineName + '/' + lineName + '_specifiche.pdf';
                break;
        }
    };

// ***************************** PREVENTIVO  ***************************** //

    $scope.fnz.addToPrv = function (item, cmp) {
        var v = (!cmp) ? 0 : cmp;
        var finCod = (item.selectedFin) ? item.selectedFin.c : item.fin[0].c;
        var tab = (item.selectedFin) ? item.selectedFin.i : item.fin[0].i;
        var abb = (item.selectedFin) ? item.selectedFin.u : item.fin[0].u;
        var prezzoScontato;
        if (!item.cmp) {
            var prezzo = _.find(item.z, function (list) {
                return list.a === abb;
            });
            var marchio = _.find($scope.dt.marchi, function (list) {
                return list.i == item.m
            });
            var linea = _.find($scope.dt.linee, function (list) {
                return list.i == item.l
            });
            prezzoScontato = $scope.fnz.scontistica(prezzo.z, marchio.s, marchio.b, linea.s);
        } else {
            prezzoScontato = item.raw;
        }

        $scope.fnz.scrollTop();
        $scope.selectedPrd = {
            c: item.cod + ' ' + finCod,
            z: prezzoScontato,
            i: item.i,
            v: v,
            a: tab,
            u: abb,
            q: item.q
        };

        var checkItem = _.find($scope.prv.list, function (list) {
            return list.c == $scope.selectedPrd.c
        });
        var indexItem = $scope.prv.list.indexOf(checkItem);
        if (!checkItem) {
            $scope.prv.list.push($scope.selectedPrd);
        } else {
            $scope.prv.list[indexItem].q += $scope.selectedPrd.q;
            $scope.prv.list[indexItem].v = ($scope.selectedPrd.v != 0) ? $scope.selectedPrd.v : checkItem.q;
        }
        $cookies.putObject('MPU-P', $scope.prv);
        $scope.vm.added = true;
        //snd.play();
        /*
         $timeout(function(){
         $scope.vm.added = false;
         }, 4000);
         */
        //console.log($scope.prv);
    };
    $scope.fnz.addCmpToPrv = function (items, cmp) {
        _.each(items, function (v) {
            $scope.fnz.addToPrv(v, cmp)
        })
    };
    $scope.fnz.removeFromPrv = function (item) {
        var checkItem = _.find($scope.prv.list, function (list) {
            return list.c == item
        });
        var indexItem = $scope.prv.list.indexOf(checkItem);
        $scope.prv.list.splice(indexItem, 1);
        $cookies.putObject('MPU-P', $scope.prv);
        $scope.$broadcast('prv.list');
    };
    $scope.fnz.confirmCleanPrv = function () {
        if ($scope.prv.list.length != 0) {
            $scope.vm.cleanPrv = true;
            $timeout(function () {
                $scope.vm.cleanPrv = false;
            }, 4000);
        }
    };
    $scope.fnz.cleanPrv = function () {
        $scope.prv.i = 0;
        $scope.prv.tm = 2;
        $scope.prv.a = 0;
        $scope.prv.list = [];

        if ($cookies.get('MPU-A') == 0) {
            $scope.prv.nz = 1;
            $scope.prv.rg = false;
            $scope.prv.pr = false;
        } else {
            $scope.prv.nz = 0;
            $scope.prv.rg = 0;
            $scope.prv.pr = 0;
        }
        $scope.vm.cleanPrv = false;
        $timeout(function () {
            //$location.url('/' + $scope.vm.loc + '/home');
            $location.url('/' + $scope.vm.loc + '/home');
        }, 2000)
    };
    $scope.fnz.savePrv = function (type) {
        $http.post('php/preventivo.php', {
                'ID': $scope.dataPrv.ID,
                'a': $scope.prv.a, //SCONTO AGENTE
                'i': $scope.prv.i, //ID
                'b': $scope.prv.b, //MINIMO
                'l': $scope.prv.l, //LIMITE
                'list': $scope.prv.list, //PRODOTTI
                'm': $scope.prv.m, //MONTAGGIO
                'k': $scope.prv.k, //MONTAGGIO TYPE
                'nz': $scope.prv.nz, //NAZIONE
                'rg': $scope.prv.rg, //REGIONE
                'pr': $scope.prv.pr, //PROVINCIA
                't': $scope.prv.t, //TRASPORTO
                'j': $scope.prv.j, //TRASPORTO TYPE
                'tm': $scope.prv.tm, //SCELTA T&M
                'z': $scope.prv.z, //PREZZO
                'u': $scope.prv.u, //MPU (0) o RIV(ID)
                'g': $scope.prv.g //NO AGENTE (0) o AGENTE (ID)
            }
        ).success(function (result) {
            console.log(result)
            if (type == 's') {
                $scope.vm.prvShareUrl = 'http://mobiliperufficio.com/print/' + $scope.vm.loc + '/preventivo/' + $scope.dataPrv.ID;
            }
            if (type == 'p') {
                $http.post('php/email.php', {
                        'cod': $scope.dataPrv.ID,
                        'type': 'print',
                        'RIV': $scope.dataPrv.rivID,
                        'loc': $scope.vm.loc
                    }
                ).success(function (result) {
                    //console.log(result)
                });
            }
            if (type == 'o') {
                $location.url('/' + $scope.vm.loc + '/form');
            }
        });
    };
    //console.log($scope.prv)
    $scope.fnz.saveOrder = function () {
        $scope.vm.sendingOrder = true;
        if ($scope.cliente.a && $scope.cliente.c && $scope.cliente.cv && $scope.cliente.py && $scope.cliente.e && $scope.cliente.n && $scope.cliente.p && $scope.cliente.t1) {
            $http.post('php/ordine.php?action=put', {
                    'ID': $cookies.get('MPU-Q'),
                    'cliente': $scope.cliente,
                    'loc': $scope.vm.loc
                }
            ).success(function (result) {
                //console.log(result);
            });
            $http.post('php/email.php', {
                    'ID': $cookies.get('MPU-Q'),
                    'cliente': $scope.cliente,
                    'RIV': $scope.dataPrv.rivID,
                    'loc': $scope.vm.loc,
                    'type': 'order'
                }
            ).success(function (result) {
                //console.log(result);
                $scope.vm.sendingOrder = false;
                $location.url('/' + $scope.vm.loc + '/ordine');
            });
        } else {
            $scope.vm.sendingOrder = false;
            $scope.vm.orderFailed = true;
            $timeout(function () {
                $scope.vm.orderFailed = false;
            }, 3000);
        }
    };
    $scope.fnz.searchPrv = function (cod) {
        $http.post('php/preventivo.php?p=' + cod, {}).success(function (result) {
            if (result.prv) {
                $scope.prv = result.prv;
                if ($cookies.get('MPU-A') == 0) {
                    $scope.prv.g = 0;
                }
                $cookies.put('MPU-I', result.prv.u);
                $cookies.putObject('MPU-P', result.prv);
                $cookies.put('MPU-Q', cod);

                if (result.prv.u != 0) {
                    var riv = _.find($rootScope.dt.rivenditori, function (list) {
                        return list.i == result.prv.u
                    });
                    if (riv.v != 0) {
                        $scope.vm.loc = riv.n;
                    } else {
                        var prvNome = $scope.fnz.convert(riv.p, 'province', 'n');
                        $scope.vm.loc = prvNome.split(' ').join('_');
                    }
                    $timeout(function () {
                        $scope.fnz.render(result.prv.u);
                    });
                    $location.url('/' + $scope.vm.loc + '/preventivo?q=' + cod);
                } else {
                    $timeout(function () {
                        $scope.fnz.render();
                    });
                    $cookies.put('MPU-A', 0);
                    $location.url('/mpu/preventivo?q=' + cod);
                }
                $scope.vm.prvSearch = false;
                $scope.vm.prvSearchID = '';
            } else {
                $scope.vm.prvSearchError = true;
                $timeout(function () {
                    $scope.vm.prvSearchError = false;
                }, 4000);

            }
        });
    };

    $scope.fnz.resetFilter = function () {
        $scope.filtro.consegna = false;
        $scope.filtro.linee = [];
        $scope.filtro.priceList = [];
        $scope.filtro.nomeLinea = '';
        $('.categorieCheck').removeAttr('checked');
    };

    var tempiConsegna = function (list) {
        return $scope.vm.consegna = _.sortBy(_.uniq(_.pluck(list, 'e')), function (list) {
            return list
        });
    };
    var fascePrezzi = function (list) {
        return $scope.vm.priceList = _.sortBy(_.uniq(_.pluck(list, 'z')), function (list) {
            return list
        });
    };
    var datiLinea = function (setName, l, s) {
        var datiLinea = l;
        datiLinea.z = s.z;
        datiLinea.q = s.q;
        var markName = $scope.fnz.convert(s.m, 'marchi', 'n');
        markName = $scope.fnz.replaceAll(markName, ' ', '_');
        var lineName = $scope.fnz.replaceAll(l.n, ' ', '_');
        setName = $scope.fnz.replaceAll(setName, ' ', '_');
        var fileName = lineName + '_' + setName + '.jpg';
        datiLinea.r = 'dashboard/archivio_dati/' + markName + '/' + lineName + '/Vetrina/' + fileName;
        $scope.current.settore.push(datiLinea);
    };
    $scope.fnz.creaSettore = function (ID, linea, tbpr) {
        $scope.current.sett = ID;
        var sett = _.find($scope.vm.settori, function (list) {
            return list.i == ID
        });
        $scope.current.cat = sett.g;
        var settore = _.filter($scope.vm.lineeSettori, function (list) {
            return list.h == ID && list.v == 1
        });
        var setName = _.find($scope.vm.settori, function (list) {
            return list.i == ID
        });
        $scope.current.settore = [];
        _.each(settore, function (s) {
            _.each($rootScope.dt.linee, function (l) {
                if (s.l == l.i) {
                    datiLinea(setName.n, l, s);
                }
            })
        });
        tempiConsegna($scope.current.settore);
        fascePrezzi($scope.current.settore);
        if (linea) $scope.fnz.creaLinea(linea, tbpr);
    };
    $scope.fnz.myLoop = function (i, tile) {
        $timeout(function () {
            angular.element(document.querySelector('#D' + i)).removeClass('SWD');
            if (i < tile) {
                $scope.fnz.myLoop(i, tile);
            }
        }, 300);
        return i++;
    };
    //console.log($scope.prv)
}]);

// ***************************** CATEGORIE ***************************** //

angular.module("mpu").controller("categoriaCtrl", ['$scope', '$rootScope', '$location', 'dataSvc', '$timeout', 'priceLinee', function ($scope, $rootScope, $location, dataSvc, $timeout, priceLinee) {
    $scope.filters = {
        show: 'settori'
    };
    $.getScript('js/blueimp-gallery.min.js');
    $.getScript('js/jquery.blueimp-gallery.min.js');

    $scope.fnz.loadMore = function () {
        $scope.vm.catLimit++;
    };

    $scope.fnz.toggleFilters = function (ID) {
        $scope.filters.show = ID;
    };
    $rootScope.dt.priceLinee = priceLinee;
    $scope.fnz.setCurCat(parseInt($location.search().c));
    $scope.vm.categorie = $scope.fnz.categorie($rootScope.dt.marchi);
    $scope.vm.lineeSettori = $scope.fnz.lineeSettori($rootScope.dt.marchi);
    $scope.vm.settori = $scope.fnz.settori();

    $scope.fnz.changeValue = function (value) {
        if (!$scope.filtro.consegna) {
            $scope.filtro.consegna = value;
        } else {
            $scope.filtro.consegna = false;
        }
    };
    $scope.fnz.toggleValue = function (ID, type) {
        if ($scope.filtro[type].indexOf(ID) == -1) {
            $scope.filtro[type].push(parseInt(ID));
        } else {
            $scope.filtro[type].splice($scope.filtro[type].indexOf(ID), 1);
        }
    };

    $scope.fnz.checkChecked = function (ID, type) {
        return _.contains($scope.filtro[type], ID);
    }
}]);

// ***************************** LINEE ***************************** //

angular.module("mpu").controller("lineaCtrl", ['$scope', '$rootScope', '$location', '_', 'dataSvc', 'priceLinee', '$window', '$timeout', '$http', 'lineeManager', function ($scope, $rootScope, $location, _, dataSvc, priceLinee, $window, $timeout, $http, lineeManager) {

    var tile = document.getElementsByClassName("SWD");
    var i = -1;
    $timeout(function () {
        $scope.fnz.myLoop(i, tile.length);
    });
    $.getScript('js/blueimp-gallery.min.js');
    $.getScript('js/jquery.blueimp-gallery.min.js');
    $scope.vm.lineeManager = lineeManager;

    var detectPage = function () {
        switch ($scope.fnz.findPage()) {
            case 'vetrina':
                $scope.current.page = 1;
                $scope.fnz.creaVetrine();
                break;
            case 'composizione':
                $scope.current.page = 1;
                $scope.fnz.creaVetrine();
                break;
            case 'listino':
                $scope.current.page = 2;
                $scope.fnz.creaListino();
                break;
            case 'articolo':
                $scope.current.page = 2;
                $scope.fnz.creaListino();
                break;
        }
    };

    if (!$scope.current.page) {
        if ($location.search().a) {
            $scope.current.art = _.findWhere($rootScope.dt.prodotti, {i: parseInt($location.search().a)});
            $scope.current.lin = _.findWhere($rootScope.dt.linee, {i: $scope.current.art.l});
        } else if ($location.search().v) {
            $scope.current.cmp = _.findWhere($rootScope.dt.vetrine, {i: parseInt($location.search().v)});
            $scope.current.cmp.p = _.filter($rootScope.dt.vetrineProdotti, function (item) {
                return item.c == $scope.current.cmp.i
            });
            $scope.current.lin = _.findWhere($rootScope.dt.linee, {i: $scope.current.cmp.l});
        } else {
            $scope.current.lin = _.findWhere($rootScope.dt.linee, {i: parseInt($location.search().l)});
        }
        detectPage();
    } else {
        switch ($scope.current.page) {
            case 1:
                $scope.fnz.creaVetrine();
                break;
            case 2:
                $scope.fnz.creaListino();
                break;
        }
    }

    if ($scope.fnz.findPage() == 'listino') {
        $scope.vm.listinoLoaded = true;
        $timeout(function () {
            $scope.vm.listinoLoaded = false;
        }, 1000);
    }
    $scope.fnz.setCurPage = function (ID) {
        $scope.nm.linea = false;
        switch (ID) {
            case 1:
                $location.url("/" + $scope.vm.loc + "/vetrina?l=" + $scope.current.lin.i);
                $scope.filtro.cmp = false;
                $scope.current.cmp = false;
                $scope.current.page = 1;
                break;
            case 2:
                $location.url("/" + $scope.vm.loc + "/listino?l=" + $scope.current.lin.i);
                $scope.filtro.tbpr = false;
                $scope.filtro.prd = '';
                $scope.filtro.prdValue = '';
                $scope.current.page = 2;
                break;

        }
    };

// ***************************** COMPOSIZIONI ***************************** //

    if ($location.search().v) {
        $scope.fnz.creaComposizione(parseInt($location.search().v));
    }
    ;

    $scope.fnz.changeCmp = function (ID) {
        if (ID) $location.url('/' + $scope.vm.loc + '/composizione?&v=' + ID.i);
    };

// ***************************** ARTICOLO ***************************** //

    $scope.fnz.changePrd = function () {
        $location.url('/' + $scope.vm.loc + '/listino?l=' + $scope.current.lin.i);
        $scope.nm.linea = false;
        $scope.fnz.scrollTop();
    };
}]);

// ***************************** PREVENTIVO ***************************** //

angular.module("mpu").controller("preventivoCtrl", ['$scope', '$rootScope', '$location', '_', '$cookies', 'tm', 'dataSvc', function ($scope, $rootScope, $location, _, $cookies, tm, dataSvc) {

    $scope.vm.tm = tm;
    $scope.vm.categorie = $scope.fnz.categorie($rootScope.dt.marchi);
    $scope.vm.lineeSettori = $scope.fnz.lineeSettori($rootScope.dt.marchi);
    $scope.vm.settori = $scope.fnz.settori();
    //console.log($scope.prv.list)

    $scope.fnz.numberRange = function () {
        if ($scope.prv.a > 0) {
            $scope.prv.a = 0;
        }
        if ($scope.prv.a < -100) {
            $scope.prv.a = -100;
        }
    };

    $scope.fnz.randomID = function (l) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < l; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    $scope.fnz.resetPrv = function () {
        $scope.prv.pr = ($cookies.get('MPU-A') != 0) ? 0 : false;
        $cookies.remove('MPU-Q');
        /*
         $scope.prv.l = false;   //limite
         $scope.prv.b = false;   //minino
         $scope.prv.t = false;   //trasporto
         $scope.prv.j = false;   //trasporto type
         $scope.prv.m = false;   //montaggio
         $scope.prv.k = false;   //montaggio type
         $scope.dataPrv = {};
         $scope.dataPrv.quantificare = false;
         $scope.dataPrv.minimo = false;
         $scope.dataPrv.totale = $scope.fnz.convertPrice($scope.prv.z);
         $cookies.put('MPU-P', $scope.prv);
         */
    };

    $scope.$watchCollection('prv', function (v, o) {
        if (v !== o) {
            if ($location.search().q) {
                $scope.dataPrv.ID = $location.search().q;
                $location.search('q', null);
            } else {
                $scope.dataPrv.ID = $scope.fnz.randomID(10);
            }
            $cookies.put('MPU-Q', $scope.dataPrv.ID);
            //console.log('watch', $scope.dataPrv.ID);
        }
        $scope.fnz.lookPrv(v.pr);
    });

    $scope.fnz.lookPrv = function (ID) { //ID = id provincia selezionata in offerta
        if (!ID && $cookies.get('MPU-I') != 0) {
            riv = angular.copy(_.find($rootScope.dt.rivenditori, function (list) {
                return list.i == $cookies.get('MPU-I')
            }));
            $scope.dataPrv.rivID = riv.i;
            $scope.dataPrv.rivNome = riv.n;
            $scope.dataPrv.rivTel = riv.h;
            $scope.dataPrv.rivenditore = (riv.v == 0);
            ID = riv.p;
            if ($cookies.get('MPU-A') != 0) {
                $scope.dataPrv.agente = _.find($rootScope.dt.agenti, function (list) {
                    return list.i == $cookies.get('MPU-A')
                });
            }
        } else {
            riv = _.find($rootScope.dt.rivenditori, function (list) {
                return list.p == ID
            });
            if (riv) {
                $scope.dataPrv.rivID = riv.i;
                $scope.dataPrv.rivNome = riv.n;
                $scope.dataPrv.rivTel = riv.h;
                $scope.dataPrv.rivenditore = true;
            } else {
                riv = _.find($rootScope.dt.province, function (list) {
                    return list.i == ID
                });
                $scope.dataPrv.rivID = 0;
                $scope.dataPrv.rivenditore = false;
            }
        }
        if (riv) {
            $scope.dataPrv.prNome = $scope.fnz.convert(ID, 'province', 'n');
            $scope.prv.z = 0;
            _.each($scope.prv.list, function (v) {
                // if(v.q === 0 || !v.q || isNaN(v.q)) v.q = 1;
                $scope.prv.z += v.z * v.q;
            });
            var prList = false;
            var riv;
            $scope.prv.l = riv.l;   //limite
            $scope.prv.b = riv.b;   //minino
            $cookies.putObject('MPU-P', $scope.prv);

            // if($scope.prv.a != 0) {
            $scope.dataPrv.sav = Math.ceil(($scope.prv.z * $scope.prv.a) / 100);
            $scope.dataPrv.sas = $scope.fnz.convertPrice($scope.dataPrv.sav);
            /*
             } else {
             $scope.dataPrv.sav = 0;
             $scope.dataPrv.ivaNumber = ($scope.prv.z * 22) / 100;
             $scope.dataPrv.iva = $scope.fnz.convertPrice($scope.dataPrv.ivaNumber) + ' €';
             }
             */


            if ($scope.prv.tm == 2 || $scope.prv.tm == 1) {
                switch (riv.j) {
                    case 1:
                        if (riv.t == 0) {
                            $scope.prv.t = 0;
                            $scope.dataPrv.trasporto = 'gratuito';
                        } else {
                            $scope.prv.t = riv.t;
                            $scope.dataPrv.trasporto = $scope.fnz.convertPrice($scope.prv.t) + ' €';
                        }
                        $scope.dataPrv.quantificare = false;
                        $scope.prv.j = 1;
                        break;
                    case 2:
                        $scope.prv.t = Math.ceil(($scope.prv.z * riv.t) / 100);
                        $scope.dataPrv.trasporto = $scope.fnz.convertPrice($scope.prv.t) + ' €';
                        $scope.dataPrv.quantificare = false;
                        $scope.prv.j = 2;
                        break;
                    case 3:
                        $scope.prv.t = 0;
                        $scope.dataPrv.trasporto = 'N/A**';
                        $scope.dataPrv.quantificare = true;
                        $scope.prv.b = 0;
                        $scope.prv.j = 3;
                        break;
                }
                if ($scope.prv.tm == 2) {
                    switch (riv.k) {
                        case 1:
                            if (riv.m == 0) {
                                $scope.prv.m = 0;
                                $scope.dataPrv.montaggio = 'gratuito';
                            } else {
                                $scope.prv.m = riv.m;
                                $scope.dataPrv.montaggio = $scope.fnz.convertPrice($scope.prv.m) + ' €';
                            }
                            $scope.prv.k = 1;
                            $scope.dataPrv.quantificare = false;
                            break;
                        case 2:
                            $scope.prv.m = Math.ceil(($scope.prv.z * riv.m) / 100);
                            $scope.dataPrv.montaggio = $scope.fnz.convertPrice($scope.prv.m) + ' €';
                            $scope.dataPrv.quantificare = false;
                            $scope.prv.k = 2;
                            break;
                        case 3:
                            $scope.prv.m = 0;
                            $scope.dataPrv.montaggio = 'N/A**';
                            $scope.dataPrv.quantificare = true;
                            $scope.prv.b = 0;
                            $scope.prv.k = 3;
                            break;
                    }
                } else {
                    $scope.prv.m = 0;
                    $scope.dataPrv.montaggio = 'non richiesto';
                    $scope.dataPrv.quantificare = false;
                }
            } else {
                $scope.prv.t = 0;
                $scope.dataPrv.trasporto = 'non richiesto';
                $scope.prv.m = 0;
                $scope.dataPrv.montaggio = 'non richiesto';
                $scope.dataPrv.quantificare = false;
            }
            if ($scope.prv.z < $scope.prv.l && !$scope.dataPrv.quantificare) {
                $scope.dataPrv.minimo = $scope.fnz.convertPrice($scope.prv.b);
                $scope.dataPrv.limite = $scope.fnz.convertPrice($scope.prv.l);
            } else {
                $scope.prv.b = 0;
                $scope.dataPrv.minimo = false;
                $scope.dataPrv.limite = false;
            }
            var complessivo = $scope.prv.z + $scope.prv.b + $scope.prv.t + $scope.prv.m + $scope.dataPrv.sav;
            $scope.dataPrv.ivaNumber = (complessivo * 22) / 100;
            $scope.dataPrv.iva = $scope.fnz.convertPrice($scope.dataPrv.ivaNumber) + ' €';
            $scope.dataPrv.complessivo = $scope.fnz.convertPrice($scope.prv.z + $scope.prv.b + $scope.prv.t + $scope.prv.m + $scope.dataPrv.sav + $scope.dataPrv.ivaNumber);
            //console.log($scope.prv.z, $scope.prv.b, $scope.prv.t, $scope.prv.m, $scope.dataPrv.sav, $scope.dataPrv.ivaNumber);
            //console.log($scope.prv.list);
        } else {
            $scope.prv.z = 0;
            _.each($scope.prv.list, function (v) {
                $scope.prv.z += v.z * v.q;
            });
            $scope.dataPrv.totale = $scope.fnz.convertPrice($scope.prv.z);
        }
    };

    $scope.$on('prv.list', function () {
        if (!$scope.dataPrv.ID) $scope.dataPrv.ID = $scope.fnz.randomID(10);
        //console.log($scope.prv.z)
        $scope.fnz.lookPrv($cookies.getObject('MPU-P').pr);
        $scope.dataPrv.totale = $scope.fnz.convertPrice($scope.prv.z);
    });
    if ($location.search().q) {
        $scope.fnz.lookPrv($cookies.getObject('MPU-P').pr);
    }

    /*
     if($cookies.get('MPU-P').pr && $scope.dataPrv == {} ) {
     $scope.fnz.lookPrv($cookies.get('MPU-P').pr);
     }
     */
    $scope.fnz.convertToPositive = function (v) {
        return Math.abs(v);
    };
}]);

// ***************************** FORM  ***************************** //

angular.module("mpu").controller("formCtrl", ['$scope', '$location', 'cliente', 'spedizione', 'pagamenti', function ($scope, $location, cliente, spedizione, pagamenti) {

    $scope.vm.validated = false;
    $scope.tipologia = cliente;
    $scope.spedizione = spedizione;
    $scope.pagamenti = pagamenti;

    var checkSoc = function () {
        return (
            alias.s == '' ||
            alias.v == '' ||
            alias.e == '' ||
            alias.a == '' ||
            alias.c == '' ||
            alias.p == '' ||
            alias.t1 == '' ||
            alias.n == ''
        )
    };
    var checkPriv = function () {
        return (
            alias.v == '' ||
            alias.e == '' ||
            alias.a == '' ||
            alias.c == '' ||
            alias.p == '' ||
            alias.t1 == ''
        )
    };
    var checkDel = function () {
        return (
            alias.dn == '' ||
            alias.de == '' ||
            alias.da == '' ||
            alias.dc == '' ||
            alias.dp == '' ||
            alias.dt1 == ''
        )
    };
    $scope.$watchCollection('cliente', function () {
        $scope.vm.validated = false;
        $scope.fnz.checkDatiCliente();
    });
    var alias = $scope.cliente;
    $scope.fnz.checkDatiCliente = function () {
        if (alias.t == 1 && alias.d == 1) {
            $scope.vm.validated = (!checkSoc() && alias.d == 1 && alias.py && alias.cv);
        }
        if (alias.t == 2 && alias.d == 1) {
            $scope.vm.validated = (!checkPriv() && alias.d == 1 && alias.py && alias.cv);
        }
        if (alias.t == 1 && alias.d == 0) {
            $scope.vm.validated = (!checkSoc() && !checkDel() && alias.py && alias.cv);
        }
        if (alias.t == 2 && alias.d == 0) {
            $scope.vm.validated = (!checkPriv() && !checkDel() && alias.py && alias.cv);
        }
    };
}]);


// ***************************** ORDINE  ***************************** //

angular.module("mpu").controller("ordineCtrl", ['$scope', '$location', '$http', '$cookies', '$rootScope', function ($scope, $location, $http, $cookies, $rootScope) {
    $scope.fnz.getOrder = function (ID) {
        if ($cookies.get('MPU-I') == 0) {
            var riv = _.find($rootScope.dt.rivenditori, function (list) {
                return list.p == $cookies.get('MPU-Q').pr
            });
            if (riv) {
                var rivID = riv.i;
            } else {
                rivID = 0;
            }
        } else {
            riv = angular.copy(_.find($rootScope.dt.rivenditori, function (list) {
                return list.i == $cookies.get('MPU-I')
            }));
            rivID = riv.i;
        }
        $http.post('php/ordine.php?action=get', {
                'ID': ID,
                'RIV': rivID
            }
        ).success(function (result) {
            //console.log(result);
            $scope.cliente = result.cliente;
            $scope.ordine.data = new Date(result.data * 1000);
            $scope.ordine.id = result.id;
        });
    };
    if ($location.search().q) {
        $scope.dataPrv.ID = $location.search().q;
        $cookies.put('MPU-Q', $location.search().q);
    } else {
        $scope.dataPrv.ID = $cookies.get('MPU-Q');
    }
    $scope.ordine = {};
    $scope.fnz.getOrder($scope.dataPrv.ID);
}]);

// ***************************** FAQ ***************************** //

angular.module("mpu").controller("faqCtrl", ['$scope', 'dataSvc', function ($scope, dataSvc) {
    dataSvc.faq().then(function (result) {
        $scope.vm.faq = result.data;
    });
    var faq = [];
    $scope.fnz.manageFaq = function (ID) {
        if (_.contains(faq, ID)) {
            var index = faq.indexOf(ID);
            faq.splice(index, 1);
        } else {
            faq.push(ID);
        }
    };
    $scope.fnz.checkFaq = function (ID) {
        return _.contains(faq, ID);
    };
}]);