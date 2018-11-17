angular.module("mpuDashboard").controller("mainCtrl", mainCtrl);
mainCtrl.$inject = ['$scope', '$rootScope', '$location', '_', '$cookies', 'dataSvc', '$timeout', 'dashboardPages', '$http'];

function mainCtrl($scope, $rootScope, $location, _, $cookies, dataSvc, $timeout, dashboardPages, $http) {
    $rootScope.options = {
        show: [
            {
                id: 1,
                label: 'Online'
            },
            {
                id: 0,
                label: 'Offline'
            }
        ],
        multiple: [
            {
                id: 1,
                label: 'Singola'
            },
            {
                id: 0,
                label: 'Multiple'
            }
        ],
        finitura: [
            {
                id: 1,
                label: 'Rivestimento'
            },
            {
                id: 0,
                label: 'Finitura'
            }
        ],
        homepage: [
            {
                id: 1,
                label: 'Visibile'
            },
            {
                id: 0,
                label: 'Non visibile'
            }
        ],
        vetrina: [
            {
                id: 1,
                label: 'Attivata'
            },
            {
                id: 0,
                label: 'Disattivata'
            }
        ],
        prezzo: [
            {
                id: 1,
                label: 'Bassa'
            },
            {
                id: 2,
                label: 'Media/Bassa'
            },
            {
                id: 3,
                label: 'Media'
            },
            {
                id: 4,
                label: 'Media/Alta'
            },
            {
                id: 5,
                label: 'Alta'
            }
        ]
    };

    $rootScope.Actions = function (scope, entity) {
        this.success = function (data) {
            console.log('SUCCESS: ', data);
            scope.$emit('updateTable');
            if (data.data !== 'Updated')
                scope.actions.reset();
            $rootScope.saving = false;
            scope.confirm = false;
        };
        this.fail = function (error) {
            console.log('FAIL: ', error);
            $rootScope.saving = false;
        };
        this.confirm = () => {
            scope.confirm = true;
            $timeout(() => scope.confirm = false, 4E3);
        };
        this.checked = () => {
            scope.checked = true;
            $timeout(() => scope.checked = false, 4E3);
        };
        this.create = function () {
            $rootScope.saving = true;
            let body = scope.buildBody();
            $http.post('php/' + entity + '.php?type=new', JSON.stringify(body)).then(this.success, this.fail);
        };
        this.update = function () {
            $rootScope.saving = true;
            let body = scope.buildBody();
            body.id = scope.entity.id;
            $http.post('php/' + entity + '.php?type=update', JSON.stringify(body)).then(this.success, this.fail);
        };
        this.erase = function () {
            $rootScope.saving = true;
            let body = scope.buildBody();
            body.id = scope.entity.id;
            $http.post('php/' + entity + '.php?type=delete', JSON.stringify(body)).then(this.success, this.fail);
        };
        this.cleanInputFile = function () {
            angular.forEach(
                angular.element("input[type='file']"),
                function (inputElem) {
                    angular.element(inputElem).val(null);
                });
        }
    };

    $rootScope.settings = {
        itemsPerPage: 5,
        query: {},
        tooltip: 'top',
        show: (index, page) => (index >= (page - 1) * $rootScope.settings.itemsPerPage && index < page * $rootScope.settings.itemsPerPage),
        convert: (item, entity, id, name) => {
            if ($rootScope[entity])
                return _.find($rootScope[entity], function (num) {
                    return parseInt(num[id]) === parseInt(item);
                })[name];
        },
        parse: (string) => JSON.parse(string),
        generateObject: (entity, prefix, list) => {
            let array = [];
            _.each($rootScope[entity], function (v) {
                let id = parseInt(v[prefix + '_id']);
                array.push(
                    {
                        id: id,
                        nome: v[prefix + '_nome'],
                        checked: (list) ? list.indexOf(id) !== -1 : false
                    }
                )
            });
            return array;
        },
        replaceAll: (string, find, replace) => {
            return string.replace(new RegExp(find, 'g'), replace);
        },
        idToLabel: (id, list) => {
            return _.find(list, (num) => num.id === id).label;
        }
    };

    /*
        $rootScope.checkboxes = {
            check: (id, list) => (list.indexOf(id) !== -1),
            toggle: (id, list) => {
                let index = list.indexOf(parseInt(id));
                (index > -1) ? list.splice(index, 1) : list.push(parseInt(id));
            }
        };
    */

    $rootScope.load = function (entity, reload) {
        if (!reload && $rootScope[entity])
            return $rootScope[entity];

        $http.get('php/' + entity + '.php?type=get').then(
            function (data) {
                console.log('GET SUCCESS ' + entity + ': ', data.data);
                $rootScope[entity] = data.data;
                $rootScope.$broadcast(entity);
            },
            function (error) {
                console.log('GET FAILS: ', error);
            }
        )
    };

    $rootScope.Model = function () {
        this.list = [];
        this.currentPage = 1;
    };


    $scope.vm = {
        currentPage: 1,
        itemsPerPage: 10,
        maxSize: 10,
        dummy: {
            image: false
        },
        nuovoProdotto: {
            m: false,
            l: false,
            t: false,
            a: '',
            y: 1,
            f: 0,
            z: [{z: '', a: ''}]
        },
        nuovoProdottoSettore: {
            m: false,
            l: false,
            c: false,
            h: []
        },
        nuovaVetrina: {
            m: false,
            l: false,
            v: 1,
            y: 1
            // h : []
        },
        nuovoVetrinaProdotto: {
            c: false,
            p: false,
            m: false,
            k: false,
            l: false,
            j: false,
            u: false,
            f: false,
            y: 1,
            q: 1
        },
        nuovaEsposizione: {
            m: false,
            l: false,
            t: false,
            y: 1
        },
        nuovoEsposizioneProdotto: {
            c: false,
            p: false,
            m: false,
            k: false,
            l: false,
            j: false,
            u: false,
            f: false,
            y: 1,
            q: 1
        },
        nuovoEsposizioneSettore: {
            m: false,
            l: false,
            c: false,
            v: 0,
            h: []
        },
        nuovoComposto: {
            m: false,
            l: false,
            y: 1
        },
        nuovoCompostoProdotto: {
            c: false,
            p: false,
            m: false,
            k: false,
            l: false,
            j: false,
            u: false,
            f: false,
            y: 1,
            q: 1
        },
        nuovoCompostoSettore: {
            m: false,
            l: false,
            c: false,
            v: 0,
            h: []
        },
        nuovaNazione: {
            v: 1
        },
        nuovaRegione: {
            z: false
        },
        nuovaProvincia: {
            z: false,
            r: false,
            b: 0,
            l: 0,
            t: 0,
            j: 1,
            m: 0,
            k: 1
        },
        nuovaConvenzione: {},
        nuovoAgente: {
            r: false
        },
        nuovoRivenditore: {
            z: false,
            r: false,
            p: false,
            b: 0,
            l: 0,
            t: 0,
            j: 1,
            m: 0,
            k: 1,
            v: false,
            c: '',
            h: '',
            f: '',
            a: ''
            //o : "0, 0"
        }
    };

    $scope.filtro = {
        show: '',
        categoria: {
            i: false
        },
        settore: '',
        marchio: {
            i: false,
            n: ''
        },
        tbpr: {
            i: false,
            n: ''
        },
        finitura: {
            i: false,
            n: '',
            c: ''
        },
        linea: {
            i: false,
            n: ''
        },
        newLinea: {
            i: false,
            n: ''
        },
        finituraTabella: {
            i: false,
            n: ''
        },
        abbinamento: {
            i: false,
            c: ''
        },
        lineaSettore: {
            i: false,
            n: '',
            c: ''
        },
        prodotto: {
            c: ''
        },
        prodottoSettore: {
            n: ''
        },
        vetrina: {
            c: ''
        },
        vetrinaProdotto: {
            c: '',
            p: ''
        },
        esposizione: {
            c: ''
        },
        esposizioneProdotto: {
            e: '',
            p: ''
        },
        esposizioneSettore: {
            c: ''
        },
        composto: {
            c: ''
        },
        compostoProdotto: {
            c: '',
            p: ''
        },
        compostoSettore: {
            c: ''
        },
        nazione: {
            i: ''
        },
        regione: {
            n: '',
            i: ''
        },
        provincia: {
            n: ''
        },
        convenzione: {
            n: ''
        },
        rivenditore: {
            n: ''
        },
        agente: {
            r: ''
        }
    };

    $scope.$watch('filtro.marchio.i', function () {
        $scope.filtro.linea.n = '';
        $scope.filtro.linea.i = false;
    });

    $scope.errore = {
        marchio: false,
        tbpr: false,
        finitura: false,
        linea: false,
        finituraTabella: false,
        abbinamento: false,
        lineaSettore: false,
        prodotto: false,
        prodottoSettore: false,
        vetrina: false,
        vetrinaProdotto: false,
        esposizione: false,
        esposizioneProdotto: false,
        composto: false,
        compostoProdotto: false,
        regione: false,
        provincia: false,
        rivenditore: false,
        agente: false
    };

    $rootScope.saving = false;
    $rootScope.changing = false;

    let setPage = function (location) {
        $scope.vm.currentSubLink = location.slice(1);
        $scope.vm.currentPage = 1;
        $scope.vm.itemsPerPage = 10;
        $scope.filtro.show = '';
    };

    $scope.vm.changeLink = function (link) {
        $location.path(link.link);
        setPage($location.path());
    };

    $scope.$on('$locationChangeSuccess', function () {
        setPage($location.path());
    });

    dataSvc.prodotti().then(function (result) {
        $scope.vm.prodotti = result.data;
        $scope.vm.nuovoProdotto.i = _.max($scope.vm.prodotti, function (list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.prodottiSettori().then(function (result) {
        $scope.vm.prodottiSettori = result.data;
        $scope.vm.nuovoProdottoSettore.i = _.max($scope.vm.prodottiSettori, function (list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.vetrine().then(function (result) {
        $scope.vm.vetrine = result.data;
        $scope.vm.nuovaVetrina.i = _.max($scope.vm.vetrine, function (list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.vetrineProdotti().then(function (result) {
        $scope.vm.vetrineProdotti = result.data;
        $scope.vm.nuovoVetrinaProdotto.i = _.max($scope.vm.vetrineProdotti, function (list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.esposizioni().then(function (result) {
        $scope.vm.esposizioni = result.data;
        $scope.vm.nuovaEsposizione.i = _.max($scope.vm.esposizioni, function (list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.esposizioniProdotti().then(function (result) {
        $scope.vm.esposizioniProdotti = result.data;
        $scope.vm.nuovoEsposizioneProdotto.i = _.max($scope.vm.esposizioniProdotti, function (list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.esposizioniSettori().then(function (result) {
        $scope.vm.esposizioniSettori = result.data;
        $scope.vm.nuovoEsposizioneSettore.i = _.max($scope.vm.esposizioniSettori, function (list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.composti().then(function (result) {
        $scope.vm.composti = result.data;
        $scope.vm.nuovoComposto.i = _.max($scope.vm.composti, function (list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.compostiProdotti().then(function (result) {
        $scope.vm.compostiProdotti = result.data;
        $scope.vm.nuovoCompostoProdotto.i = _.max($scope.vm.compostiProdotti, function (list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.compostiSettori().then(function (result) {
        $scope.vm.compostiSettori = result.data;
        $scope.vm.nuovoCompostoSettore.i = _.max($scope.vm.compostiSettori, function (list) {
            return list.i;
        }).i + 1;
    });

    dataSvc.nazioni().then(function (result) {
        $scope.vm.nazioni = result.data;
        if ($scope.vm.nazioni.length === 0) {
            $scope.vm.nuovaNazione.i = 1;
        } else {
            $scope.vm.nuovaNazione.i = _.max($scope.vm.nazioni, function (list) {
                return list.i;
            }).i + 1;
        }
    });

    dataSvc.regioni().then(function (result) {
        $scope.vm.regioni = result.data;
        if ($scope.vm.regioni.length === 0) {
            $scope.vm.nuovaRegione.i = 1;
        } else {
            $scope.vm.nuovaRegione.i = _.max($scope.vm.regioni, function (list) {
                return list.i;
            }).i + 1;
        }
    });

    dataSvc.province().then(function (result) {
        $scope.vm.province = result.data;
        if ($scope.vm.province.length === 0) {
            $scope.vm.nuovaProvincia.i = 1;
        } else {
            $scope.vm.nuovaProvincia.i = _.max($scope.vm.province, function (list) {
                return list.i;
            }).i + 1;
        }
    });

    dataSvc.convenzioni().then(function (result) {
        $scope.vm.convenzioni = result.data;
        if ($scope.vm.convenzioni.length === 0) {
            $scope.vm.nuovaConvenzione.i = 1;
        } else {
            $scope.vm.nuovaConvenzione.i = _.max($scope.vm.convenzioni, function (list) {
                return list.i;
            }).i + 1;
        }
    });

    dataSvc.agenti().then(function (result) {
        $scope.vm.agenti = (result.data) ? result.data : [];
        if ($scope.vm.agenti.length === 0) {
            $scope.vm.nuovoAgente.i = 1;
        } else {
            $scope.vm.nuovoAgente.i = _.max($scope.vm.agenti, function (list) {
                return list.i;
            }).i + 1;
        }
    });

    dataSvc.rivenditori().then(function (result) {
        $scope.vm.rivenditori = result.data;
        $scope.vm.nuovoRivenditore.i = _.max($scope.vm.rivenditori, function (list) {
            return list.i;
        }).i + 1;
    });

    $scope.sorting = function (type) {
        if ($scope.vm.sorting === type) {
            $scope.vm.sorting = '-' + type
        } else {
            $scope.vm.sorting = type
        }
    };

    $scope.convert = function (ID, list, item) {
        let array = [];
        let element = '';
        if (typeof ID === "object") {
            for (let i = 0; i < ID.length; i++) {
                _.each($scope.vm[list], function (v) {
                    if (v.i === ID[i]) {
                        array.push(v[item])
                    }
                })
            }
            return array;
        } else {
            _.each($scope.vm[list], function (v) {
                if (v.i === ID) {
                    element = v[item];
                }
            });
            return element;
        }
    };

    Number.prototype.formatMoney = function (pc, pd, pt) {
        let n = this,
            c = isNaN(pc = Math.abs(pc)) ? 2 : pc,
            d = pd === undefined ? "." : pd,
            t = pt === undefined ? "," : pt,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = i.length > 3 ? i.length % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    $scope.convertPrice = function (price) {
        return (price).formatMoney(2, ',', '.');
    };

    $scope.convertFinType = function (ID) {
        return (ID === 0) ? 'Finitura' : 'Rivestimento';
    };

    $scope.convertPriceType = function (ID) {
        switch (ID) {
            case 1 :
                return 'Best price';
            case 2 :
                return 'Economico';
            case 3 :
                return 'Design';
            case 4 :
                return 'Alto design';
            case 5 :
                return 'Luxury';
        }
    };

    $scope.vm.links = dashboardPages;

}

angular.module("mpuDashboard").controller("categorieCtrl", categorieCtrl);
categorieCtrl.$inject = ['$scope', '$rootScope'];

function categorieCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.categoria = {
        show: 1,
        immagine: false
    };

    $scope.selectItem = function (entity) {
        $scope.entity.categoria = {
            id: entity['cat_id'],
            nome: entity['cat_nome'],
            posizione: entity['cat_pos'],
            show: entity['cat_show'],
            immagine: "/dashboard/archivio_dati/Categorie/" + entity['cat_id'] + ".jpg",
            descrizione: entity['cat_txt']
        };
    };

    $scope.$on('updateTable', () => $rootScope.load('categorie', true));

    $rootScope.load('categorie');
}

angular.module("mpuDashboard").controller("settoriCtrl", settoriCtrl);
settoriCtrl.$inject = ['$scope', '$rootScope'];

function settoriCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.settore = {
        show: 1,
        homepage: 0,
        categoria: false,
        immagine: false
    };

    $scope.selectItem = function (entity) {
        $scope.entity.settore = {
            id: entity['set_id'],
            nome: entity['set_nome'],
            categoria: entity['set_cat_id'],
            posizione: entity['set_pos'],
            show: entity['set_show'],
            homepage: entity['set_home'],
            immagine: "/dashboard/archivio_dati/Settori/" + entity['set_id'] + ".jpg",
            descrizione: entity['set_txt']
        };
    };

    $scope.$on('updateTable', () => $rootScope.load('settori', true));

    $rootScope.load('settori');
    $rootScope.load('categorie');
}

angular.module("mpuDashboard").controller("marchiCtrl", marchiCtrl);
marchiCtrl.$inject = ['$scope', '$rootScope'];

function marchiCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.marchio = {
        show: 1,
        categorie: ($rootScope.categorie) ? $rootScope.settings.generateObject('categorie', 'cat') : [],
        listino: 0,
        sconto: 0
    };

    $scope.selectItem = function (entity) {
        $scope.entity.marchio = {
            id: entity['mark_id'],
            nome: entity['mark_nome'],
            show: entity['mark_show'],
            listino: entity['mark_list'],
            sconto: entity['mark_disc']
        };

        let categorie = entity['mark_cat_array'];
        $scope.entity.marchio.categorie = $rootScope.settings.generateObject('categorie', 'cat', categorie);
    };

    $scope.$on('updateTable', () => $rootScope.load('marchi', true));

    $rootScope.load('categorie');
    $rootScope.load('marchi');

    $rootScope.$on('categorie', () => {
        $scope.entity.marchio.categorie = $rootScope.settings.generateObject('categorie', 'cat')
    });
}

angular.module("mpuDashboard").controller("tabelleProdottiCtrl", tabelleProdottiCtrl);
tabelleProdottiCtrl.$inject = ['$scope', '$rootScope'];

function tabelleProdottiCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.tabella_prodotti = {
        posizione: 0,
        marchio: false
    };

    $scope.selectItem = function (entity) {
        $scope.entity.tabella_prodotti = {
            id: entity['tbpr_id'],
            nome: entity['tbpr_nome'],
            posizione: entity['tbpr_pos'],
            marchio: entity['tbpr_mark_id']
        };
    };

    $scope.$on('updateTable', () => $rootScope.load('tabelle_prodotti', true));

    $rootScope.load('marchi');
    $rootScope.load('tabelle_prodotti');
}

angular.module("mpuDashboard").controller("finitureCtrl", finitureCtrl);
finitureCtrl.$inject = ['$scope', '$rootScope'];

function finitureCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.finitura = {
        show: 1,
        tipo: 0,
        marchio: false,
        immagine: false
    };

    $scope.selectItem = function (entity) {

        let nome = entity['fin_nome'],
            codice = entity['fin_cod'],
            marchio = entity['fin_mark_id'],
            file = {
                name: $rootScope.settings.replaceAll(nome, ' ', '_'),
                codice: $rootScope.settings.replaceAll(codice, ' ', '_'),
                marchio: $rootScope.settings.replaceAll($rootScope.settings.convert(marchio, 'marchi', 'mark_id', 'mark_nome'), ' ', '_')
            },
            immagine = file.name + '_' + file.codice + '.jpg';

        $scope.entity.finitura = {
            id: entity['fin_id'],
            nome: nome,
            codice: codice,
            marchio: marchio,
            show: entity['fin_show'],
            tipo: entity['fin_type_id'],
            immagine: '../dashboard/archivio_dati/' + file.marchio + '/Finiture/' + immagine,
        };
    };

    $scope.$on('updateTable', () => $rootScope.load('finiture', true));

    $rootScope.load('marchi');
    $rootScope.load('finiture');
}

angular.module("mpuDashboard").controller("lineeCtrl", lineeCtrl);
lineeCtrl.$inject = ['$scope', '$rootScope'];

function lineeCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.linea = {
        show: 1,
        vetrina: 0,
        posizione: 0,
        consegna: 25,
        garanzia: 2,
        sconto: 0,
        marchio: false,
        categoria: false,
        catalogo: "",
        specifiche: "",
        abbinamenti: []
    };

    $scope.selectItem = function (entity) {

        $scope.entity.linea = {
            id: entity['line_id'],
            nome: entity['line_nome'],
            marchio: entity['line_mark_id'],
            categoria: entity['line_cat'],
            show: entity['line_show'],
            posizione: entity['line_pos'],
            consegna: entity['line_time'],
            vetrina: entity['line_vtr'],
            garanzia: entity['line_war'],
            sconto: entity['line_disc'],
            catalogo: entity['line_pdf_file'],
            specifiche: entity['line_spec_file'],
            abbinamenti: entity['line_link']
        };
    };

    $scope.$on('updateTable', () => $rootScope.load('linee', true));

    $rootScope.load('marchi');
    $rootScope.load('settori');
    $rootScope.load('categorie');
    $rootScope.load('linee');
}

angular.module("mpuDashboard").controller("settoriLineeCtrl", settoriLineeCtrl);
settoriLineeCtrl.$inject = ['$scope', '$rootScope'];

function settoriLineeCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.settore_linea = {
        show: 1,
        prezzo: 3,
        marchio: false,
        linea: false,
        settore: false,
        immagine: false
    };

    $scope.selectItem = function (entity) {
        let marchio = entity['stln_mark_id'],
            linea = entity['stln_line_id'],
            settore = entity['stln_set_id'],
            file = {
                marchio: $rootScope.settings.replaceAll($rootScope.settings.convert(marchio, 'marchi', 'mark_id', 'mark_nome'), ' ', '_'),
                linea: $rootScope.settings.replaceAll($rootScope.settings.convert(linea, 'linee', 'line_id', 'line_nome'), ' ', '_'),
                settore: $rootScope.settings.replaceAll($rootScope.settings.convert(settore, 'settori', 'set_id', 'set_nome'), ' ', '_')
            },
            immagine = file.linea + '_' + file.settore + '.jpg';

        $scope.entity.settore_linea = {
            id: entity['stln_id'],
            marchio: marchio,
            linea: linea,
            settore: settore,
            show: entity['stln_show'],
            prezzo: entity['stln_price'],
            immagine: '../dashboard/archivio_dati/' + file.marchio + '/' + file.linea + '/Vetrina/' + immagine,
        };
    };

    $scope.$on('updateTable', () => $rootScope.load('settori_linee', true));

    $rootScope.load('marchi');
    $rootScope.load('linee');
    $rootScope.load('settori');
    $rootScope.load('settori_linee');
}

angular.module("mpuDashboard").controller("tabelleFinitureCtrl", tabelleFinitureCtrl);
tabelleFinitureCtrl.$inject = ['$scope', '$rootScope'];

function tabelleFinitureCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.tabella_finitura = {
        linea: false,
        marchio: false
    };

    $scope.selectItem = function (entity) {
        $scope.entity.tabella_finitura = {
            id: entity['tab_id'],
            nome: entity['tab_nome'],
            linea: entity['tab_line_id'],
            marchio: entity['tab_mark_id']
        };
    };

    $scope.$on('updateTable', () => $rootScope.load('tabelle_finiture', true));

    $rootScope.load('marchi');
    $rootScope.load('linee');
    $rootScope.load('tabelle_finiture');
}

angular.module("mpuDashboard").controller("abbinamentiCtrl", abbinamentiCtrl);
abbinamentiCtrl.$inject = ['$scope', '$rootScope'];

function abbinamentiCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.abbinamento = {
        marchio: false,
        linea: false,
        tabella: false,
        abbinamenti: [
            {
                i: false,
                n: ""
            }
        ]
    };

    $scope.selectItem = function (entity) {

        $scope.entity.abbinamento = {
            id: entity['abb_id'],
            codice: entity['abb_cod'],
            marchio: entity['abb_mark_id'],
            linea: entity['abb_line_id'],
            tabella: entity['abb_tab'],
            abbinamenti: angular.copy(entity['abb_array'])
        };
    };

    $scope.$on('updateTable', () => $rootScope.load('abbinamenti', true));

    $rootScope.load('marchi');
    $rootScope.load('linee');
    $rootScope.load('tabelle_finiture');
    $rootScope.load('finiture');
    $rootScope.load('abbinamenti');
}

angular.module("mpuDashboard").controller("prodottiCtrl", prodottiCtrl);
prodottiCtrl.$inject = ['$scope', '$rootScope'];

function prodottiCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.prodotto = {
        posizione: 0,
        prezzi: [
            {
                z: 0,
                a: false
            }
        ],
        marchio: false,
        linea: false,
        finitura_linea: false,
        tabella: false,
        finitura_tipo: 0,
        finitura_unica: 0,
        immagine: false
    };

    $scope.selectItem = function (entity) {
        let marchio = entity['prd_mark_id'],
            linea = entity['prd_line_id'],
            codice = entity['prd_cod'],
            file = {
                marchio: $rootScope.settings.replaceAll($rootScope.settings.convert(marchio, 'marchi', 'mark_id', 'mark_nome'), ' ', '_'),
                linea: $rootScope.settings.replaceAll($rootScope.settings.convert(linea, 'linee', 'line_id', 'line_nome'), ' ', '_')
            },
            immagine = codice + '.jpg';

        $scope.entity.prodotto = {
            id: entity['prd_id'],
            codice: codice,
            titolo: entity['prd_title'],
            dimensioni: entity['prd_dim'],
            note: entity['prd_note'],
            tabella: entity['prd_tbpr'],
            marchio: marchio,
            linea: linea,
            prezzi: angular.copy(entity['prd_price_array']),
            posizione: entity['prd_pos'],
            finitura_linea: entity['prd_lnfn_id'],
            finitura_unica: entity['prd_abb'],
            finitura_tipo: entity['prd_fin'],
            show: entity['prd_show'],
            immagine: '../dashboard/archivio_dati/' + file.marchio + '/' + file.linea + '/Prodotti/' + immagine,
        };
    };

    $scope.$on('updateTable', () => $rootScope.load('prodotti', true));

    $rootScope.load('marchi');
    $rootScope.load('linee');
    $rootScope.load('finiture');
    $rootScope.load('abbinamenti');
    $rootScope.load('tabelle_finiture');
    $rootScope.load('tabelle_prodotti');
    $rootScope.load('prodotti');
}

angular.module("mpuDashboard").controller("prodottiSettoriCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.prodottoSettore = {
        selected: false
    };

    $scope.vm.sorting = 'n';

    $scope.$watch('vm.nuovoProdottoSettore.m', function () {
        $scope.vm.nuovoProdottoSettore.l = false;
        $scope.vm.nuovoProdottoSettore.w = false;
        $scope.vm.nuovoProdottoSettore.c = false;
    });

    $scope.$watch('vm.nuovoProdottoSettore.l', function (newVal) {
        $scope.vm.nuovoProdottoSettore.c = false;
    });

    $scope.$watch('vm.nuovoProdottoSettore.w', function (newVal) {
        $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l: newVal});
        _.each($scope.settoriAvailable, function (v) {
            v.n = _.findWhere($scope.vm.settori, {i: v.h}).n;
        });

        $scope.prodottiAvailable = [{c: ' Tutti', i: -1}];
        let prodottiPerLinea = _.where($scope.vm.prodotti, {l: $scope.vm.nuovoProdottoSettore.l});
        _.each(prodottiPerLinea, function (v) {
            if (!_.find($scope.vm.prodottiSettori, function (list) {
                return (list.c === v.i && newVal === v.l)
            }))
                $scope.prodottiAvailable.push(v);
        });
    });

    $scope.$watch('vm.nuovoProdottoSettore.c', function (newVal) {
        if (newVal && newVal !== -1) {
            let prdList = _.find($scope.vm.prodotti, function (list) {
                return list.i === newVal
            });
            $scope.vm.nuovoProdottoSettore.n = prdList.c;
        }
    });

    $scope.toggleSet = function (ID) {
        if ($scope.vm.nuovoProdottoSettore.h.indexOf(ID) === -1) {
            $scope.vm.nuovoProdottoSettore.h.push(parseInt(ID));
        } else {
            $scope.vm.nuovoProdottoSettore.h.splice($scope.vm.nuovoProdottoSettore.h.indexOf(ID), 1);
        }
    };

    $scope.selectProdottoSettore = function (result) {
        $scope.prodottoSettore = {};
        $scope.prodottoSettore.selected = true;
        $scope.prodottoSettore.prodottoSettore = result;
    };

    $scope.vm.saveProdottoSettoreData = function () {
        $rootScope.saving = true;
        $http.post('php/prodottiSettori.php?type=save', $scope.vm.prodottiSettori).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/prodottiSettori.php?type=db').success(function () {
            $rootScope.saving = false;
            dataSvc.prodottiSettori().then(function (result) {
                $scope.vm.prodottiSettori = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            $scope.filtro.prodottoSettore.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function (e) {
        if (e.key === 27)
            $scope.input = '';
    };

    $scope.newProdottoSettore = function (newID) {
        $rootScope.saving = false;
        $scope.errore.prodottoSettore = false;
        $scope.vm.nuovoProdottoSettore = {
            m: false,
            l: false,
            c: false,
            h: []
        };
        $scope.vm.nuovoProdottoSettore.i = (!newID) ? $scope.vm.nuovoProdottoSettore.i + 1 : parseInt(newID) + 1;
        console.log($scope.vm.nuovoProdottoSettore.i)
    };

    $scope.updateCheck = function () {
        return (!$scope.vm.nuovoProdottoSettore.m || !$scope.vm.nuovoProdottoSettore.l || !$scope.vm.nuovoProdottoSettore.w || !$scope.vm.nuovoProdottoSettore.c);
    };

    function checkSetArray() {
        return $scope.vm.nuovoProdottoSettore.h.length;
    }

    $scope.action = function (type) {
        if (type === 'N') {
            if (checkSetArray() !== 0) {
                $rootScope.saving = true;
                $http.post('php/prodottiSettori.php?type=new', {
                        'id': $scope.vm.nuovoProdottoSettore.i,
                        'mark': $scope.vm.nuovoProdottoSettore.m,
                        'line': $scope.vm.nuovoProdottoSettore.l,
                        'nwln': $scope.vm.nuovoProdottoSettore.w,
                        'array': $scope.vm.nuovoProdottoSettore.h,
                        'cod': $scope.vm.nuovoProdottoSettore.c
                    }
                ).success(function (result) {
                    console.log('Risposta dalla pagina PHP', result);
                    if ($scope.vm.nuovoProdottoSettore.c !== -1) {
                        $scope.vm.prodottiSettori.push($scope.vm.nuovoProdottoSettore);
                        $scope.vm.saveProdottoSettoreData();
                    } else {
                        $scope.saveDataDB();
                    }
                    $scope.newProdottoSettore(result);
                }).error(function (data, status) {
                    console.log(status);
                });
            } else {
                $scope.errore.prodottoSettore = true;
            }
        }
    };
}]);

angular.module("mpuDashboard").controller("vetrineCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.vetrina = {
        selected: false
    };

    $scope.generateSettoriInLinea = function (id) {
        if (id) {
            let array = [];
            let settori = _.find($scope.vm.linee, function (num) {
                return num.i === id
            }).q;
            _.each(settori, function (v) {
                let settore = _.find($scope.vm.settori, function (num) {
                    return num.i === v;
                }).n;
                array.push({i: v, n: settore});
            });
            return array;
        }
    };

    $scope.settoriInLinea = false;

    $scope.selectVetrina = function (result) {
        $scope.vetrina = {};
        $scope.vetrina.selected = true;
        $scope.vetrina.vetrina = result;
    };

    $scope.vm.sorting = 'c';

    $scope.toggleSet = function (ID) {
        if ($scope.vm.nuovaVetrina.s.indexOf(ID) === -1) {
            $scope.vm.nuovaVetrina.s.push(parseInt(ID));
        } else {
            $scope.vm.nuovaVetrina.s.splice($scope.vm.nuovaVetrina.s.indexOf(ID), 1);
        }
    };

    $scope.$watch('vm.nuovaVetrina.m', function () {
        $scope.vm.nuovaVetrina.l = false;
        $scope.vm.nuovaVetrina.h = [];
    });

    $scope.$watch('vm.nuovaVetrina.l', function (n, o) {
        $scope.vm.nuovaVetrina.h = [];
        $scope.settoriInLinea = $scope.generateSettoriInLinea(n);
    });

    $scope.vm.saveVetrinaData = function () {
        $rootScope.saving = true;
        $http.post('php/vetrine.php?type=save', $scope.vm.vetrine).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/vetrine.php?type=db').success(function () {
            $rootScope.saving = false;
            dataSvc.vetrine().then(function (result) {
                $scope.vm.vetrine = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            $scope.filtro.vetrina.c = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function (e) {
        if (e.key === 27) $scope.input = '';
    };

    $scope.updateCheck = function () {
        return (
            !$scope.vm.nuovaVetrina.c ||
            !$scope.vm.nuovaVetrina.n ||
            !$scope.vm.nuovaVetrina.m ||
            !$scope.vm.nuovaVetrina.l ||
            !$scope.vm.nuovaVetrina.r ||
            !$scope.vm.nuovaVetrina.s ||
            isNaN($scope.vm.nuovaVetrina.y)
        );
    };

    let checkVetrina = function () {
        return _.findWhere($scope.vm.vetrine, {c: $scope.vm.nuovaVetrina.c, l: $scope.vm.nuovaVetrina.l});
    };

    /*
        function checkSetArray() {
            return $scope.vm.nuovaVetrina.h.length;
        }
    */

    $scope.newVetrina = function () {
        $rootScope.saving = false;
        $scope.errore.vetrina = false;
        $scope.vm.nuovaVetrina = {
            i: $scope.vm.nuovaVetrina.i + 1,
            m: false,
            l: false,
            s: false,
            y: 1,
            v: 1
            // h : []
        };
    };

    $scope.action = function (type) {
        if (type === 'N') {
            if (!checkVetrina()) {
                $rootScope.saving = true;
                $http.post('php/vetrine.php?type=new', {
                        'id': $scope.vm.nuovaVetrina.i,
                        'mark': $scope.vm.nuovaVetrina.m,
                        'line': $scope.vm.nuovaVetrina.l,
                        'cod': $scope.vm.nuovaVetrina.c,
                        'title': $scope.vm.nuovaVetrina.n,
                        'pos': $scope.vm.nuovaVetrina.y,
                        'show': $scope.vm.nuovaVetrina.v,
                        'note': $scope.vm.nuovaVetrina.o,
                        'settore': $scope.vm.nuovaVetrina.s,
                        // 'array'      :   $scope.vm.nuovaVetrina.h,
                        'image': $scope.vm.nuovaVetrina.r
                    }
                ).success(function (result) {
                    console.log('Risposta dalla pagina PHP', result);
                    delete $scope.vm.nuovaVetrina.r;
                    $scope.vm.vetrine.push($scope.vm.nuovaVetrina);
                    $scope.vm.saveVetrinaData();
                    $scope.newVetrina()
                }).error(function (data, status) {
                    console.log(status);
                });
            } else {
                $scope.errore.vetrina = true;
            }
        }
    };
}]);

angular.module("mpuDashboard").controller("vetrineProdottiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.vetrinaProdotto = {
        selected: false
    };

    $scope.vm.sorting = ['y', 'j', 'c'];

    $scope.$watch('vm.nuovoVetrinaProdotto.k', function (newVal) {
        $scope.vm.nuovoVetrinaProdotto.m = newVal;
        $scope.vm.nuovoVetrinaProdotto.j = false;
    });

    $scope.$watch('vm.nuovoVetrinaProdotto.j', function (newVal) {
        $scope.vm.nuovoVetrinaProdotto.l = newVal;
        $scope.vm.nuovoVetrinaProdotto.c = false;
    });

    $scope.$watch('vm.nuovoVetrinaProdotto.m', function () {
        $scope.vm.nuovoVetrinaProdotto.l = false;
    });

    $scope.$watch('vm.nuovoVetrinaProdotto.l', function () {
        $scope.vm.nuovoVetrinaProdotto.p = false;
    });

    $scope.$watch('vm.nuovoVetrinaProdotto.p', function (newVal) {
        if (newVal) {
            let prodotto = _.findWhere($scope.vm.prodotti, {i: newVal});
            let idsList = _.pluck(prodotto.z, 'a');
            $scope.tabsAvailable = [];
            for (let i = 0; i < idsList.length; i++) {
                let tab = _.findWhere($scope.vm.finitureTabelle, {i: idsList[i]});
                $scope.tabsAvailable.push({'i': idsList[i], 'n': tab.n});
            }
            return $scope.tabsAvailable;
        } else {
            $scope.vm.nuovoVetrinaProdotto.u = false;
        }
    });

    $scope.$watch('vm.nuovoVetrinaProdotto.u', function (newVal) {
        if (newVal) {
            $scope.finsAvailable = _.where($scope.vm.abbinamenti, {u: newVal});
            return $scope.finsAvailable;
        } else {
            $scope.vm.nuovoVetrinaProdotto.f = false;
        }
    });

    $scope.selectVetrinaProdotto = function (result) {
        $scope.vetrinaProdotto = {};
        $scope.vetrinaProdotto.selected = true;
        $scope.vetrinaProdotto.vetrinaProdotto = result;
    };

    $scope.vm.saveVetrineProdottiData = function () {
        $rootScope.saving = true;
        $http.post('php/vetrineProdotti.php?type=save', $scope.vm.vetrineProdotti).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/vetrineProdotti.php?type=db').success(function () {
            $rootScope.saving = false;
            dataSvc.vetrineProdotti().then(function (result) {
                $scope.vm.vetrineProdotti = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            if (tempFilterText || tempFilterText !== '') {
                let espIDS = [];
                _.each($scope.vm.vetrine, function (v) {
                    if (v.c === tempFilterText) espIDS.push(v.i);
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
        filterTextTimeout = $timeout(function () {
            if (tempFilterText) tempFilterText = tempFilterText.toUpperCase();
            if (tempFilterText !== '') {
                let prodotto = _.findWhere($scope.vm.prodotti, {c: tempFilterText});
                if (prodotto) $scope.filtro.vetrinaProdotto.p = prodotto.i;
            } else {
                $scope.filtro.vetrinaProdotto.p = false;
            }
        }, 250);
    });

    $scope.eraseInput = function (e, type) {
        if (e.key === 27)
            (!type) ? $scope.input = '' : $scope.inputCod = '';
    };

    $scope.newVetrinaProdotto = function () {
        $rootScope.saving = false;
        $scope.errore.vetrinaProdotto = false;
        $scope.vm.nuovoVetrinaProdotto = {
            i: $scope.vm.nuovoVetrinaProdotto.i + 1,
            c: false,
            p: false,
            m: false,
            k: false,
            l: false,
            j: false,
            u: false,
            f: false,
            y: 1,
            q: 1
        };
    };

    $scope.updateCheck = function () {
        return (
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

    $scope.action = function (type) {
        if (type === 'N') {
            $rootScope.saving = true;
            $http.post('php/vetrineProdotti.php?type=new', {
                    'id': $scope.vm.nuovoVetrinaProdotto.i,
                    'comp': $scope.vm.nuovoVetrinaProdotto.c,
                    'prd': $scope.vm.nuovoVetrinaProdotto.p,
                    'pline': $scope.vm.nuovoVetrinaProdotto.l,
                    'cline': $scope.vm.nuovoVetrinaProdotto.j,
                    'pmark': $scope.vm.nuovoVetrinaProdotto.m,
                    'cmark': $scope.vm.nuovoVetrinaProdotto.k,
                    'fin': $scope.vm.nuovoVetrinaProdotto.f,
                    'tab': $scope.vm.nuovoVetrinaProdotto.u,
                    'pos': $scope.vm.nuovoVetrinaProdotto.y,
                    'qnt': $scope.vm.nuovoVetrinaProdotto.q
                }
            ).success(function (result) {
                //console.log('Risposta dalla pagina PHP', result);
                $scope.vm.vetrineProdotti.push($scope.vm.nuovoVetrinaProdotto);
                $scope.vm.saveVetrineProdottiData();
                $scope.newVetrinaProdotto();
            }).error(function (data, status) {
                console.log(status);
            });
        }
    };
}]);

angular.module("mpuDashboard").controller("nazioniCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', function ($scope, $rootScope, _, dataSvc, $http) {

    $scope.vm.saveNazioniData = function () {
        $rootScope.saving = true;
        $http.post('php/nazioni.php?type=save', $scope.vm.nazioni).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/nazioni.php?type=db', $scope.vm.nazioni).success(function () {
            $rootScope.saving = false;
            dataSvc.nazioni().then(function (result) {
                $scope.vm.nazioni = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.updateCheck = function () {
        return (!$scope.vm.nuovaNazione.n || !$scope.vm.nuovaNazione.x);
    };

    $scope.action = function (type) {
        if (type === 'N') {
            $rootScope.saving = true;
            $http.post('php/nazioni.php?type=new', {
                    'id': $scope.vm.nuovaNazione.i,
                    'nome': $scope.vm.nuovaNazione.n,
                    'show': $scope.vm.nuovaNazione.v,
                    'prx': $scope.vm.nuovaNazione.x
                }
            ).success(function (result) {
                //console.log(result);
                $scope.vm.nazioni.push($scope.vm.nuovaNazione);
                $scope.vm.nuovaNazione = {
                    v: 1,
                    i: $scope.vm.nuovaNazione.i + 1
                };
                $scope.vm.saveNazioniData();
                $rootScope.saving = false;
            }).error(function (data, status) {
                console.log(status);
            });
        }
    };
}]);

angular.module("mpuDashboard").controller("regioniCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.vm.sorting = 'n';

    $scope.regione = {
        selected: false
    };

    $scope.selectRegione = function (result) {
        $scope.regione = {};
        $scope.regione.selected = true;
        $scope.regione.regione = result;
    };

    $scope.vm.saveRegioniData = function () {
        $rootScope.saving = true;
        $http.post('php/regioni.php?type=save', $scope.vm.regioni).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/regioni.php?type=db', $scope.vm.regioni).success(function () {
            $rootScope.saving = false;
            dataSvc.regioni().then(function (result) {
                $scope.vm.regioni = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.updateCheck = function () {
        return (!$scope.vm.nuovaRegione.n || !$scope.vm.nuovaRegione.z);
    };

    let checkExist = function () {
        return _.findWhere($scope.vm.regioni, {n: $scope.vm.nuovaRegione.n, z: $scope.vm.nuovaRegione.z});
    };

    $scope.newItem = function () {
        $rootScope.saving = false;
        $scope.regione.selected = false;
        $scope.errore.regione = false;
        $scope.vm.nuovaRegione = {
            i: $scope.vm.nuovaRegione.i + 1,
            z: false
        }
    };

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            $scope.filtro.regione.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function (e) {
        if (e.key === 27) $scope.input = '';
    };

    $scope.action = function (type) {
        if (type === 'N') {
            if (!checkExist()) {
                $rootScope.saving = true;
                $http.post('php/regioni.php?type=new', {
                        'id': $scope.vm.nuovaRegione.i,
                        'nome': $scope.vm.nuovaRegione.n,
                        'nazione': $scope.vm.nuovaRegione.z
                    }
                ).success(function (result) {
                    //console.log('Risposta dalla pagina PHP', result);
                    $scope.vm.regioni.push($scope.vm.nuovaRegione);
                    $scope.newItem();
                    $scope.vm.saveRegioniData();
                }).error(function (data, status) {
                    console.log(status);
                });
            } else {
                $scope.errore.regione = true;
            }
        }
    };
}]);

angular.module("mpuDashboard").controller("provinceCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', 'priceManager', function ($scope, $rootScope, _, dataSvc, $http, $timeout, priceManager) {

    $scope.vm.sorting = ['z', 'r', 'n'];

    $scope.provincia = {
        selected: false
    };

    $scope.vm.priceManager = priceManager;

    $scope.$watch('filtro.nazione.i', function (newVal) {
        $scope.filtro.regione.i = false;
    });

    $scope.selectItem = function (result) {
        $scope.provincia = {};
        $scope.provincia.selected = true;
        $scope.provincia.provincia = result;
    };

    $scope.vm.saveProvinceData = function () {
        $rootScope.saving = true;
        $http.post('php/province.php?type=save', $scope.vm.province).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/province.php?type=db', $scope.vm.province).success(function () {
            $rootScope.saving = false;
            dataSvc.province().then(function (result) {
                $scope.vm.province = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.updateCheck = function () {
        return (!$scope.vm.nuovaProvincia.n || !$scope.vm.nuovaProvincia.z);
    };

    let checkExist = function () {
        return _.findWhere($scope.vm.province, {
            n: $scope.vm.nuovaProvincia.n,
            c: $scope.vm.nuovaProvincia.c,
            z: $scope.vm.nuovaProvincia.z,
            r: $scope.vm.nuovaProvincia.r
        });
    };

    $scope.newItem = function () {
        $rootScope.saving = false;
        $scope.provincia.selected = false;
        $scope.errore.provincia = false;
        $scope.vm.nuovaProvincia = {
            i: $scope.vm.nuovaProvincia.i + 1,
            z: false,
            r: false,
            b: 0,
            l: 0,
            t: 0,
            j: 1,
            m: 0,
            k: 1
        }
    };

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            $scope.filtro.provincia.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function (e) {
        if (e.key === 27) $scope.input = '';
    };

    $scope.action = function (type) {
        if (type === 'N') {
            if (!checkExist()) {
                $rootScope.saving = true;
                $http.post('php/province.php?type=new', {
                        'id': $scope.vm.nuovaProvincia.i,
                        'nome': $scope.vm.nuovaProvincia.n,
                        'sigla': $scope.vm.nuovaProvincia.c,
                        'nazione': $scope.vm.nuovaProvincia.z,
                        'regione': $scope.vm.nuovaProvincia.r,
                        'trasporto': $scope.vm.nuovaProvincia.t,
                        'trasporto_type': $scope.vm.nuovaProvincia.j,
                        'montaggio': $scope.vm.nuovaProvincia.m,
                        'montaggio_type': $scope.vm.nuovaProvincia.k,
                        'limite': $scope.vm.nuovaProvincia.l,
                        'minimo': $scope.vm.nuovaProvincia.b
                    }
                ).success(function (result) {
                    console.log('Risposta dalla pagina PHP', result);
                    $scope.vm.province.push($scope.vm.nuovaProvincia);
                    $scope.newItem();
                    $scope.vm.saveProvinceData();
                }).error(function (data, status) {
                    console.log(status);
                });
            } else {
                $scope.errore.provincia = true;
            }
        }
    };
}]);

angular.module("mpuDashboard").controller("convenzioniCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', function ($scope, $rootScope, _, dataSvc, $http) {

    $scope.vm.saveConvenzioniData = function () {
        $rootScope.saving = true;
        $http.post('php/convenzioni.php?type=save', $scope.vm.convenzioni).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/convenzioni.php?type=db', $scope.vm.convenzioni).success(function () {
            $rootScope.saving = false;
            dataSvc.convenzioni().then(function (result) {
                $scope.vm.convenzioni = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.updateCheck = function () {
        return (!$scope.vm.nuovaConvenzione.n);
    };

    $scope.action = function (type) {
        if (type === 'N') {
            $rootScope.saving = true;
            $http.post('php/convenzioni.php?type=new', {
                    'id': $scope.vm.nuovaConvenzione.i,
                    'nome': $scope.vm.nuovaConvenzione.n,
                    'email': $scope.vm.nuovaConvenzione.e
                }
            ).success(function (result) {
                //console.log(result);
                $scope.vm.convenzioni.push($scope.vm.nuovaConvenzione);
                $scope.vm.nuovaConvenzione = {
                    i: $scope.vm.nuovaConvenzione.i + 1
                };
                $scope.vm.saveConvenzioniData();
                $rootScope.saving = false;
            }).error(function (data, status) {
                console.log(status);
            });
        }
    };
}]);

angular.module("mpuDashboard").controller("agentiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.vm.sorting = 'n';

    $scope.agente = {
        selected: false
    };

    $scope.selectItem = function (result) {
        $scope.agente = {};
        $scope.agente.selected = true;
        $scope.agente.agente = result;
    };

    $scope.vm.saveAgentiData = function () {
        $rootScope.saving = true;
        $http.post('php/agenti.php?type=save', $scope.vm.agenti).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/agenti.php?type=db', $scope.vm.agenti).success(function () {
            $rootScope.saving = false;
            dataSvc.agenti().then(function (result) {
                $scope.vm.agenti = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            $scope.filtro.agente.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function (e) {
        if (e.key === 27) $scope.input = '';
    };

    $scope.updateCheck = function () {
        return (!$scope.vm.nuovoAgente.n || !$scope.vm.nuovoAgente.e || !$scope.vm.nuovoAgente.p || !$scope.vm.nuovoAgente.r || !$scope.vm.nuovoAgente.t);
    };

    $scope.newItem = function () {
        $rootScope.saving = false;
        $scope.vm.nuovoAgente = {
            i: $scope.vm.nuovoAgente.i + 1,
            r: false
        };
    };

    $scope.action = function (type) {
        if (type === 'N') {
            $rootScope.saving = true;
            $http.post('php/agenti.php?type=new', {
                    'id': $scope.vm.nuovoAgente.i,
                    'nome': $scope.vm.nuovoAgente.n,
                    'email': $scope.vm.nuovoAgente.e,
                    'password': $scope.vm.nuovoAgente.p,
                    'tel': $scope.vm.nuovoAgente.t,
                    'riv': $scope.vm.nuovoAgente.r
                }
            ).success(function (result) {
                //console.log(result);
                $scope.vm.agenti.push($scope.vm.nuovoAgente);
                $scope.vm.saveAgentiData();
                $scope.newItem()
                $rootScope.saving = false;
            }).error(function (data, status) {
                console.log(status);
            });
        }
    };
}]);

angular.module("mpuDashboard").controller("rivenditoriCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', 'priceManager', function ($scope, $rootScope, _, dataSvc, $http, $timeout, priceManager) {

    $scope.rivenditore = {
        selected: false
    };

    $scope.vm.priceManager = priceManager;

    $scope.vm.sorting = ['n'];

    $scope.switchType = function () {
        return ($scope.vm.nuovoRivenditore.p === 0) ? 'rivenditore' : 'rivestimento';
    };

    $scope.selectItem = function (result) {
        $scope.rivenditore = {};
        $scope.rivenditore.selected = true;
        $scope.rivenditore.rivenditore = result;
    };

    $scope.vm.saveRivenditoreData = function () {
        $rootScope.saving = true;
        $http.post('php/rivenditori.php?type=save', $scope.vm.rivenditori).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/rivenditori.php?type=db').success(function () {
            $rootScope.saving = false;
            dataSvc.rivenditori().then(function (result) {
                $scope.vm.rivenditori = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.openMarchi = function () {
        $scope.vm.mv = !$scope.vm.mv;
    };

    let markManager = function () {
        $scope.vm.mv = false;
        $scope.vm.nuovoRivenditore.y = angular.copy($scope.vm.marchi);
        _.each($scope.vm.nuovoRivenditore.y, function (v) {
            v.s = 0;
            v.d = 0;
            delete v.n;
            delete v.b;
            delete v.g;
        });
        return $scope.vm.nuovoRivenditore.y;
    };

    markManager();

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            $scope.filtro.rivenditore.n = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function (e) {
        if (e.key === 27) $scope.input = '';
    };

    $scope.$watch('vm.nuovoRivenditore.v', function (newVal) {
        if (newVal) {
            $scope.vm.nuovoRivenditore.z = false;
            $scope.vm.nuovoRivenditore.r = false;
            $scope.vm.nuovoRivenditore.p = false;
        }
    });

    $scope.updateCheck = function () {
        return (
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


    let checkItem = function () {
        if ($scope.vm.nuovoRivenditore.p) {
            return _.findWhere($scope.vm.rivenditori, {p: $scope.vm.nuovoRivenditore.p});
        } else {
            return false;
        }
    };

    $scope.newItem = function () {
        $rootScope.saving = false;
        $scope.errore.rivenditore = false;
        $scope.vm.nuovoRivenditore = {
            i: $scope.vm.nuovoRivenditore.i + 1,
            z: false,
            r: false,
            p: false,
            b: 0,
            l: 0,
            t: 0,
            j: 1,
            m: 0,
            k: 1,
            v: false,
            c: '',
            h: '',
            f: '',
            a: ''
            //o : "0, 0"
        };
        markManager();
    };

    let showInfo = [];
    $scope.showInfoFnc = function (index, action) {
        if (action === 'add') {
            showInfo.push(index);
        } else {
            let position = showInfo.indexOf(index);
            showInfo.splice(position, 1);
        }
    };

    $scope.checkShowInfo = function (index) {
        return showInfo.indexOf(index)
    };

    $scope.action = function (type) {
        if (type === 'N') {
            if (!checkItem()) {
                $rootScope.saving = true;
                $http.post('php/rivenditori.php?type=new', {
                        'id': $scope.vm.nuovoRivenditore.i,
                        'nome': $scope.vm.nuovoRivenditore.n,
                        'naz': $scope.vm.nuovoRivenditore.z,
                        'reg': $scope.vm.nuovoRivenditore.r,
                        'prov': $scope.vm.nuovoRivenditore.p,
                        'conv': $scope.vm.nuovoRivenditore.v,
                        'rif': $scope.vm.nuovoRivenditore.x,
                        'sede': $scope.vm.nuovoRivenditore.s,
                        'tel': $scope.vm.nuovoRivenditore.h,
                        'fax': $scope.vm.nuovoRivenditore.f,
                        'cell': $scope.vm.nuovoRivenditore.c,
                        'web': $scope.vm.nuovoRivenditore.q,
                        'email': $scope.vm.nuovoRivenditore.e,
                        'psw': $scope.vm.nuovoRivenditore.w,
                        'limite': $scope.vm.nuovoRivenditore.l,
                        'minimo': $scope.vm.nuovoRivenditore.b,
                        'trasporto': $scope.vm.nuovoRivenditore.t,
                        'trasporto_type': $scope.vm.nuovoRivenditore.j,
                        'montaggio': $scope.vm.nuovoRivenditore.m,
                        'montaggio_type': $scope.vm.nuovoRivenditore.k,
                        'mark': $scope.vm.nuovoRivenditore.y,
                        'notes': $scope.vm.nuovoRivenditore.a,
                        //'coords'        :   $scope.vm.nuovoRivenditore.o,
                        'image': $scope.vm.nuovoRivenditore.g
                    }
                ).success(function (result) {
                    console.log('Risposta dalla pagina PHP', result);
                    delete $scope.vm.nuovoRivenditore.g;
                    $scope.vm.rivenditori.push($scope.vm.nuovoRivenditore);
                    $scope.vm.saveRivenditoreData();
                    $scope.newItem()
                }).error(function (data, status) {
                    console.log(status);
                });
            } else {
                $scope.errore.rivenditore = true;
            }
        }
    };
}]);

angular.module("mpuDashboard").controller("esposizioniCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.esposizione = {
        selected: false
    };

    $scope.selectItem = function (result) {
        $scope.esposizione = {};
        $scope.esposizione.selected = true;
        $scope.esposizione.esposizione = result;
    };

    $scope.vm.sorting = ['l', 'c', 'f'];

    $scope.$watch('vm.nuovaEsposizione.l', function (newVal) {
        $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l: newVal});
        _.each($scope.settoriAvailable, function (v) {
            v.n = _.findWhere($scope.vm.settori, {i: v.h}).n;
        });
    });

    $scope.$watch('vm.nuovaEsposizione.m', function () {
        $scope.vm.nuovaEsposizione.l = false;
        $scope.vm.nuovaEsposizione.t = false;
    });

    $scope.$watch('vm.nuovaEsposizione.l', function () {
        $scope.vm.nuovaEsposizione.t = false;
    });

    $scope.vm.saveEsposizioneData = function () {
        $rootScope.saving = true;
        $http.post('php/esposizioni.php?type=save', $scope.vm.esposizioni).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/esposizioni.php?type=db').success(function () {
            $rootScope.saving = false;
            dataSvc.esposizioni().then(function (result) {
                $scope.vm.esposizioni = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            $scope.filtro.esposizione.c = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function (e) {
        if (e.key === 27) $scope.input = '';
    };

    $scope.updateCheck = function () {
        return (
            !$scope.vm.nuovaEsposizione.c ||
            !$scope.vm.nuovaEsposizione.f ||
            !$scope.vm.nuovaEsposizione.m ||
            !$scope.vm.nuovaEsposizione.l ||
            !$scope.vm.nuovaEsposizione.t ||
            !$scope.vm.nuovaEsposizione.r ||
            isNaN($scope.vm.nuovaEsposizione.y)
        );
    };

    let checkItem = function () {
        return _.findWhere($scope.vm.esposizioni, {
            c: $scope.vm.nuovaEsposizione.c,
            f: $scope.vm.nuovaEsposizione.f,
            l: $scope.vm.nuovaEsposizione.l
        });
    };

    $scope.newItem = function () {
        $rootScope.saving = false;
        $scope.errore.esposizione = false;
        $scope.vm.nuovaEsposizione = {
            i: $scope.vm.nuovaEsposizione.i + 1,
            m: false,
            l: false,
            t: false,
            y: 1
        };
    };

    $scope.action = function (type) {
        if (type === 'N') {
            if (!checkItem()) {
                $rootScope.saving = true;
                $http.post('php/esposizioni.php?type=new', {
                        'id': $scope.vm.nuovaEsposizione.i,
                        'mark': $scope.vm.nuovaEsposizione.m,
                        'line': $scope.vm.nuovaEsposizione.l,
                        'tbpr': $scope.vm.nuovaEsposizione.t,
                        'cod': $scope.vm.nuovaEsposizione.c,
                        'fin': $scope.vm.nuovaEsposizione.f,
                        'dim': $scope.vm.nuovaEsposizione.d,
                        'pos': $scope.vm.nuovaEsposizione.y,
                        'nome': $scope.vm.nuovaEsposizione.n,
                        'image': $scope.vm.nuovaEsposizione.r
                    }
                ).success(function (result) {
                    //console.log('Risposta dalla pagina PHP', result);
                    delete $scope.vm.nuovaEsposizione.r;
                    $scope.vm.esposizioni.push($scope.vm.nuovaEsposizione);
                    $scope.vm.saveEsposizioneData();
                    $scope.newItem()
                }).error(function (data, status) {
                    console.log(status);
                });
            } else {
                $scope.errore.esposizione = true;
            }
        }
    };
}]);

angular.module("mpuDashboard").controller("compostiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.composto = {
        selected: false
    };

    $scope.selectItem = function (result) {
        $scope.composto = {};
        $scope.composto.selected = true;
        $scope.composto.composto = result;
    };

    $scope.vm.sorting = ['l', 'c', 'f'];

    $scope.$watch('vm.nuovoComposto.m', function () {
        $scope.vm.nuovoComposto.l = false;
    });

    $scope.vm.saveCompostoData = function () {
        $rootScope.saving = true;
        $http.post('php/composti.php?type=save', $scope.vm.composti).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/composti.php?type=db').success(function () {
            $rootScope.saving = false;
            dataSvc.composti().then(function (result) {
                $scope.vm.composti = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            $scope.filtro.composto.c = tempFilterText;
        }, 250);
    });

    $scope.eraseInput = function (e) {
        if (e.key === 27) $scope.input = '';
    };

    $scope.updateCheck = function () {
        return (
            !$scope.vm.nuovoComposto.c ||
            !$scope.vm.nuovoComposto.f ||
            !$scope.vm.nuovoComposto.m ||
            !$scope.vm.nuovoComposto.l ||
            !$scope.vm.nuovoComposto.n ||
            !$scope.vm.nuovoComposto.r ||
            isNaN($scope.vm.nuovoComposto.y)
        );
    };

    let checkItem = function () {
        return _.findWhere($scope.vm.composti, {
            c: $scope.vm.nuovoComposto.c,
            f: $scope.vm.nuovoComposto.f,
            l: $scope.vm.nuovoComposto.l
        });
    };

    $scope.newItem = function () {
        $rootScope.saving = false;
        $scope.errore.composto = false;
        $scope.vm.nuovoComposto = {
            i: $scope.vm.nuovoComposto.i + 1,
            m: false,
            l: false,
            y: 1
        };
    };

    $scope.action = function (type) {
        if (type === 'N') {
            if (!checkItem()) {
                $rootScope.saving = true;
                $http.post('php/composti.php?type=new', {
                        'id': $scope.vm.nuovoComposto.i,
                        'mark': $scope.vm.nuovoComposto.m,
                        'line': $scope.vm.nuovoComposto.l,
                        'cod': $scope.vm.nuovoComposto.c,
                        'fin': $scope.vm.nuovoComposto.f,
                        'pos': $scope.vm.nuovoComposto.y,
                        'nome': $scope.vm.nuovoComposto.n,
                        'image': $scope.vm.nuovoComposto.r
                    }
                ).success(function (result) {
                    console.log('Risposta dalla pagina PHP', result);
                    delete $scope.vm.nuovoComposto.r;
                    $scope.vm.composti.push($scope.vm.nuovoComposto);
                    $scope.vm.saveCompostoData();
                    $scope.newItem()
                }).error(function (data, status) {
                    console.log(status);
                });
            } else {
                $scope.errore.composto = true;
            }
        }
    };
}]);

angular.module("mpuDashboard").controller("esposizioniProdottiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.esposizioneProdotto = {
        selected: false
    };

    $scope.vm.sorting = ['j', 'e', 'c'];

    $scope.$watch('vm.nuovoEsposizioneProdotto.k', function (newVal) {
        $scope.vm.nuovoEsposizioneProdotto.m = newVal;
        $scope.vm.nuovoEsposizioneProdotto.j = false;
    });

    $scope.$watch('vm.nuovoEsposizioneProdotto.j', function (newVal) {
        $scope.vm.nuovoEsposizioneProdotto.l = newVal;
        $scope.vm.nuovoEsposizioneProdotto.c = false;
    });

    $scope.$watch('vm.nuovoEsposizioneProdotto.m', function () {
        $scope.vm.nuovoEsposizioneProdotto.l = false;
    });

    $scope.$watch('vm.nuovoEsposizioneProdotto.l', function () {
        $scope.vm.nuovoEsposizioneProdotto.p = false;
    });

    $scope.$watch('vm.nuovoEsposizioneProdotto.p', function (newVal) {
        if (newVal) {
            let prodotto = _.findWhere($scope.vm.prodotti, {i: newVal});
            let idsList = _.pluck(prodotto.z, 'a');
            $scope.tabsAvailable = [];
            for (let i = 0; i < idsList.length; i++) {
                let tab = _.findWhere($scope.vm.finitureTabelle, {i: idsList[i]});
                $scope.tabsAvailable.push({'i': idsList[i], 'n': tab.n});
            }
            return $scope.tabsAvailable;
        } else {
            $scope.vm.nuovoEsposizioneProdotto.u = false;
        }
    });

    $scope.$watch('vm.nuovoEsposizioneProdotto.u', function (newVal) {
        if (newVal) {
            $scope.finsAvailable = _.where($scope.vm.abbinamenti, {u: newVal});
            return $scope.finsAvailable;
        } else {
            $scope.vm.nuovoEsposizioneProdotto.f = false;
        }
    });

    $scope.selectItem = function (result) {
        $scope.esposizioneProdotto = {};
        $scope.esposizioneProdotto.selected = true;
        $scope.esposizioneProdotto.esposizioneProdotto = result;
    };

    $scope.vm.saveEsposizioniProdottiData = function () {
        $rootScope.saving = true;
        $http.post('php/esposizioniSettori.php?type=save', $scope.vm.esposizioniSettori).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/esposizioniSettori.php?type=db').success(function () {
            $rootScope.saving = false;
            dataSvc.esposizioniSettori().then(function (result) {
                $scope.vm.esposizioniSettori = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            if (tempFilterText || tempFilterText !== '') {
                let espIDS = [];
                _.each($scope.vm.esposizioni, function (v) {
                    if (v.c === tempFilterText) espIDS.push(v.i);
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
        filterTextTimeout = $timeout(function () {
            if (tempFilterText) tempFilterText = tempFilterText.toUpperCase();
            if (tempFilterText !== '') {
                let prodotto = _.findWhere($scope.vm.prodotti, {c: tempFilterText});
                if (prodotto) $scope.filtro.esposizioneProdotto.p = prodotto.i;
            } else {
                $scope.filtro.esposizioneProdotto.p = false;
            }
        }, 250);
    });

    $scope.eraseInput = function (e, type) {
        if (e.key === 27)
            (!type) ? $scope.input = '' : $scope.inputCod = '';
    };

    $scope.newItem = function () {
        $rootScope.saving = false;
        $scope.errore.esposizioneProdotto = false;
        $scope.vm.nuovoEsposizioneProdotto = {
            i: $scope.vm.nuovoEsposizioneProdotto.i + 1,
            c: false,
            p: false,
            m: false,
            k: false,
            l: false,
            j: false,
            u: false,
            f: false,
            y: 1,
            q: 1
        };
    };

    $scope.updateCheck = function () {
        return (
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

    $scope.action = function (type) {
        if (type === 'N') {
            $rootScope.saving = true;
            $http.post('php/esposizioniSettori.php?type=new', {
                    'id': $scope.vm.nuovoEsposizioneProdotto.i,
                    'comp': $scope.vm.nuovoEsposizioneProdotto.c,
                    'prd': $scope.vm.nuovoEsposizioneProdotto.p,
                    'pline': $scope.vm.nuovoEsposizioneProdotto.l,
                    'cline': $scope.vm.nuovoEsposizioneProdotto.j,
                    'pmark': $scope.vm.nuovoEsposizioneProdotto.m,
                    'cmark': $scope.vm.nuovoEsposizioneProdotto.k,
                    'fin': $scope.vm.nuovoEsposizioneProdotto.f,
                    'tab': $scope.vm.nuovoEsposizioneProdotto.u,
                    'pos': $scope.vm.nuovoEsposizioneProdotto.y,
                    'qnt': $scope.vm.nuovoEsposizioneProdotto.q
                }
            ).success(function (result) {
                console.log('Risposta dalla pagina PHP', result);
                $scope.vm.esposizioniSettori.push($scope.vm.nuovoEsposizioneProdotto);
                $scope.vm.saveEsposizioniProdottiData();
                $scope.newItem();
            }).error(function (data, status) {
                console.log(status);
            });
        }
    };
}]);

angular.module("mpuDashboard").controller("compostiProdottiCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.compostoProdotto = {
        selected: false
    };

    $scope.vm.sorting = ['j', 'e', 'c', 'y'];

    $scope.$watch('vm.nuovoCompostoProdotto.k', function (newVal) {
        $scope.vm.nuovoCompostoProdotto.m = newVal;
        $scope.vm.nuovoCompostoProdotto.j = false;
    });

    $scope.$watch('vm.nuovoCompostoProdotto.j', function (newVal) {
        $scope.vm.nuovoCompostoProdotto.l = newVal;
        $scope.vm.nuovoCompostoProdotto.c = false;
    });

    $scope.$watch('vm.nuovoCompostoProdotto.m', function () {
        $scope.vm.nuovoCompostoProdotto.l = false;
    });

    $scope.$watch('vm.nuovoCompostoProdotto.l', function () {
        $scope.vm.nuovoCompostoProdotto.p = false;
    });

    $scope.$watch('vm.nuovoCompostoProdotto.p', function (newVal) {
        if (newVal) {
            let prodotto = _.findWhere($scope.vm.prodotti, {i: newVal});
            let idsList = _.pluck(prodotto.z, 'a');
            $scope.tabsAvailable = [];
            for (let i = 0; i < idsList.length; i++) {
                let tab = _.findWhere($scope.vm.finitureTabelle, {i: idsList[i]});
                $scope.tabsAvailable.push({'i': idsList[i], 'n': tab.n});
            }
            return $scope.tabsAvailable;
        } else {
            $scope.vm.nuovoCompostoProdotto.u = false;
        }
    });

    $scope.$watch('vm.nuovoCompostoProdotto.u', function (newVal) {
        if (newVal) {
            $scope.finsAvailable = _.where($scope.vm.abbinamenti, {u: newVal});
            return $scope.finsAvailable;
        } else {
            $scope.vm.nuovoCompostoProdotto.f = false;
        }
    });

    $scope.selectItem = function (result) {
        $scope.compostoProdotto = {};
        $scope.compostoProdotto.selected = true;
        $scope.compostoProdotto.compostoProdotto = result;
    };

    $scope.vm.saveCompostoProdottiData = function () {
        $rootScope.saving = true;
        $http.post('php/compostiProdotti.php?type=save', $scope.vm.compostiProdotti).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/compostiProdotti.php?type=db').success(function () {
            $rootScope.saving = false;
            dataSvc.compostiProdotti().then(function (result) {
                $scope.vm.compostiProdotti = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            if (tempFilterText || tempFilterText !== '') {
                let espIDS = [];
                _.each($scope.vm.composti, function (v) {
                    if (v.c === tempFilterText) espIDS.push(v.i);
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
        filterTextTimeout = $timeout(function () {
            if (tempFilterText) tempFilterText = tempFilterText.toUpperCase();
            if (tempFilterText !== '') {
                let prodotto = _.findWhere($scope.vm.prodotti, {c: tempFilterText});
                if (prodotto) $scope.filtro.compostoProdotto.p = prodotto.i;
            } else {
                $scope.filtro.compostoProdotto.p = false;
            }
        }, 250);
    });

    $scope.eraseInput = function (e, type) {
        if (e.key === 27)
            (!type) ? $scope.input = '' : $scope.inputCod = '';
    };

    $scope.newItem = function () {
        $rootScope.saving = false;
        $scope.errore.compostoProdotto = false;
        $scope.vm.nuovoCompostoProdotto = {
            i: $scope.vm.nuovoCompostoProdotto.i + 1,
            c: false,
            p: false,
            m: false,
            k: false,
            l: false,
            j: false,
            u: false,
            f: false,
            y: 1,
            q: 1
        };
    };

    $scope.updateCheck = function () {
        return (
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

    $scope.action = function (type) {
        if (type === 'N') {
            $rootScope.saving = true;
            $http.post('php/compostiProdotti.php?type=new', {
                    'id': $scope.vm.nuovoCompostoProdotto.i,
                    'comp': $scope.vm.nuovoCompostoProdotto.c,
                    'prd': $scope.vm.nuovoCompostoProdotto.p,
                    'pline': $scope.vm.nuovoCompostoProdotto.l,
                    'cline': $scope.vm.nuovoCompostoProdotto.j,
                    'pmark': $scope.vm.nuovoCompostoProdotto.m,
                    'cmark': $scope.vm.nuovoCompostoProdotto.k,
                    'fin': $scope.vm.nuovoCompostoProdotto.f,
                    'tab': $scope.vm.nuovoCompostoProdotto.u,
                    'pos': $scope.vm.nuovoCompostoProdotto.y,
                    'qnt': $scope.vm.nuovoCompostoProdotto.q
                }
            ).success(function (result) {
                console.log('Risposta dalla pagina PHP', result);
                $scope.vm.compostiProdotti.push($scope.vm.nuovoCompostoProdotto);
                $scope.vm.saveCompostoProdottiData();
                $scope.newItem();
            }).error(function (data, status) {
                console.log(status);
            });
        }
    };
}]);

angular.module("mpuDashboard").controller("esposizioniSettoriCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.esposizioneSettore = {
        selected: false
    };

    $scope.vm.sorting = '-i';

    $scope.$watch('vm.nuovoEsposizioneSettore.m', function () {
        $scope.vm.nuovoEsposizioneSettore.l = false;
        $scope.vm.nuovoEsposizioneSettore.w = false;
        $scope.vm.nuovoEsposizioneSettore.c = false;
    });

    $scope.$watch('vm.nuovoEsposizioneSettore.l', function (newVal) {
        $scope.vm.nuovoEsposizioneSettore.c = false;
    });

    $scope.$watch('vm.nuovoEsposizioneSettore.w', function (newVal) {
        $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l: newVal});
        _.each($scope.settoriAvailable, function (v) {
            v.n = _.findWhere($scope.vm.settori, {i: v.h}).n;
        });

        $scope.esposizioniAvailable = [{c: ' Tutti', i: -1}];
        let esposizioniPerLinea = _.where($scope.vm.esposizioni, {l: $scope.vm.nuovoEsposizioneSettore.l});
        _.each(esposizioniPerLinea, function (v) {
            if (!_.find($scope.vm.esposizioniSettori, function (list) {
                return (list.c === v.i && newVal === v.l)
            }))
                $scope.esposizioniAvailable.push(v);
        });
    });

    $scope.$watch('vm.nuovoEsposizioneSettore.c', function (newVal) {
        if (newVal && newVal !== -1) {
            let prdList = _.find($scope.vm.prodotti, function (list) {
                return list.i === newVal
            });
            $scope.vm.nuovoEsposizioneSettore.n = prdList.c;
        }
    });

    $scope.toggleSet = function (ID) {
        if ($scope.vm.nuovoEsposizioneSettore.h.indexOf(ID) === -1) {
            $scope.vm.nuovoEsposizioneSettore.h.push(parseInt(ID));
        } else {
            $scope.vm.nuovoEsposizioneSettore.h.splice($scope.vm.nuovoEsposizioneSettore.h.indexOf(ID), 1);
        }
    };

    $scope.selectItem = function (result) {
        $scope.esposizioneSettore = {};
        $scope.esposizioneSettore.selected = true;
        $scope.esposizioneSettore.esposizioneSettore = result;
    };

    $scope.vm.saveEsposizioneSettoreData = function () {
        $rootScope.saving = true;
        $http.post('php/esposizioniSettori.php?type=save', $scope.vm.esposizioniSettori).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/esposizioniSettori.php?type=db').success(function () {
            $rootScope.saving = false;
            dataSvc.esposizioniSettori().then(function (result) {
                $scope.vm.esposizioniSettori = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            if (tempFilterText || tempFilterText !== '') {
                let espIDS = [];
                _.each($scope.vm.esposizioni, function (v) {
                    if (v.c === tempFilterText) espIDS.push(v.i);
                });
                $scope.filtro.esposizioneSettore.c = espIDS;
            } else {
                $scope.filtro.esposizioneSettore.c = false;
            }
        }, 250);
    });

    $scope.eraseInput = function (e) {
        if (e.key === 27)
            $scope.input = '';
    };

    $scope.newItem = function () {
        $rootScope.saving = false;
        $scope.errore.esposizioneSettore = false;
        $scope.vm.nuovoEsposizioneSettore = {
            i: $scope.vm.nuovoEsposizioneSettore.i + 1,
            m: false,
            l: false,
            c: false,
            v: 0,
            h: []
        };
    };

    $scope.updateCheck = function () {
        return (!$scope.vm.nuovoEsposizioneSettore.m || !$scope.vm.nuovoEsposizioneSettore.l || !$scope.vm.nuovoEsposizioneSettore.w || !$scope.vm.nuovoEsposizioneSettore.c);
    };

    function checkSetArray() {
        return $scope.vm.nuovoEsposizioneSettore.h.length;
    }

    $scope.action = function (type) {
        if (type === 'N') {
            if (checkSetArray() !== 0) {
                $rootScope.saving = true;
                $http.post('php/esposizioniSettori.php?type=new', {
                        'id': $scope.vm.nuovoEsposizioneSettore.i,
                        'mark': $scope.vm.nuovoEsposizioneSettore.m,
                        'line': $scope.vm.nuovoEsposizioneSettore.l,
                        'nwln': $scope.vm.nuovoEsposizioneSettore.w,
                        'array': $scope.vm.nuovoEsposizioneSettore.h,
                        'cod': $scope.vm.nuovoEsposizioneSettore.c,
                        'view': $scope.vm.nuovoEsposizioneSettore.v
                    }
                ).success(function (result) {
                    console.log('Risposta dalla pagina PHP', result);
                    if ($scope.vm.nuovoEsposizioneSettore.c !== -1) {
                        $scope.vm.esposizioniSettori.push($scope.vm.nuovoEsposizioneSettore);
                        $scope.vm.saveEsposizioneSettoreData();
                    } else {
                        $scope.saveDataDB();
                    }
                    $scope.newItem();
                }).error(function (data, status) {
                    console.log(status);
                });
            } else {
                $scope.errore.esposizioneSettore = true;
            }
        }
    };
}]);

angular.module("mpuDashboard").controller("compostiSettoriCtrl", ['$scope', '$rootScope', '_', 'dataSvc', '$http', '$timeout', function ($scope, $rootScope, _, dataSvc, $http, $timeout) {

    $scope.compostoSettore = {
        selected: false
    };

    $scope.vm.sorting = '-i';

    $scope.$watch('vm.nuovoCompostoSettore.m', function () {
        $scope.vm.nuovoCompostoSettore.l = false;
        $scope.vm.nuovoCompostoSettore.w = false;
        $scope.vm.nuovoCompostoSettore.c = false;
    });

    $scope.$watch('vm.nuovoCompostoSettore.l', function (newVal) {
        $scope.vm.nuovoCompostoSettore.c = false;
    });

    $scope.$watch('vm.nuovoCompostoSettore.w', function (newVal) {
        $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l: newVal});
        _.each($scope.settoriAvailable, function (v) {
            v.n = _.findWhere($scope.vm.settori, {i: v.h}).n;
        });

        $scope.compostoAvailable = [{c: ' Tutti', i: -1}];
        let esposizioniPerLinea = _.where($scope.vm.composti, {l: $scope.vm.nuovoCompostoSettore.l});
        _.each(esposizioniPerLinea, function (v) {
            if (!_.find($scope.vm.compostiSettori, function (list) {
                return (list.c === v.i && newVal === v.l)
            }))
                $scope.compostoAvailable.push(v);
        });
    });

    $scope.$watch('vm.nuovoCompostoSettore.c', function (newVal) {
        if (newVal && newVal !== -1) {
            let prdList = _.find($scope.vm.prodotti, function (list) {
                return list.i === newVal
            });
            $scope.vm.nuovoCompostoSettore.n = prdList.c;
        }
    });

    $scope.toggleSet = function (ID) {
        if ($scope.vm.nuovoCompostoSettore.h.indexOf(ID) === -1) {
            $scope.vm.nuovoCompostoSettore.h.push(parseInt(ID));
        } else {
            $scope.vm.nuovoCompostoSettore.h.splice($scope.vm.nuovoCompostoSettore.h.indexOf(ID), 1);
        }
    };

    $scope.selectItem = function (result) {
        $scope.compostoSettore = {};
        $scope.compostoSettore.selected = true;
        $scope.compostoSettore.compostoSettore = result;
    };

    $scope.vm.saveCompostoSettoreData = function () {
        $rootScope.saving = true;
        $http.post('php/compostiSettori.php?type=save', $scope.vm.compostiSettori).success(function () {
            $rootScope.saving = false;
        }).error(function (data, status) {
            console.log(status);
        });
    };

    $scope.saveDataDB = function () {
        $rootScope.saving = true;
        $http.post('php/compostiSettori.php?type=db').success(function () {
            $rootScope.saving = false;
            dataSvc.compostiSettori().then(function (result) {
                $scope.vm.compostiSettori = result.data;
            });
        }).error(function (data, status) {
            console.log(status);
        });
    };
    $scope.saveDataDB();

    let tempFilterText = '', filterTextTimeout;
    $scope.$watch('input', function (val) {
        if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
        tempFilterText = val;
        filterTextTimeout = $timeout(function () {
            if (tempFilterText || tempFilterText !== '') {
                let espIDS = [];
                _.each($scope.vm.composti, function (v) {
                    if (v.c === tempFilterText) espIDS.push(v.i);
                });
                $scope.filtro.compostoSettore.c = espIDS;
            } else {
                $scope.filtro.compostoSettore.c = false;
            }
        }, 250);
    });

    $scope.eraseInput = function (e) {
        if (e.key === 27)
            $scope.input = '';
    };

    $scope.newItem = function () {
        $rootScope.saving = false;
        $scope.errore.compostoSettore = false;
        $scope.vm.nuovoCompostoSettore = {
            i: $scope.vm.nuovoCompostoSettore.i + 1,
            m: false,
            l: false,
            c: false,
            v: 0,
            h: []
        };
    };

    $scope.updateCheck = function () {
        return (!$scope.vm.nuovoCompostoSettore.m || !$scope.vm.nuovoCompostoSettore.l || !$scope.vm.nuovoCompostoSettore.w || !$scope.vm.nuovoCompostoSettore.c);
    };

    function checkSetArray() {
        return $scope.vm.nuovoCompostoSettore.h.length;
    }

    $scope.action = function (type) {
        if (type === 'N') {
            if (checkSetArray() !== 0) {
                $rootScope.saving = true;
                $http.post('php/compostiSettori.php?type=new', {
                        'id': $scope.vm.nuovoCompostoSettore.i,
                        'mark': $scope.vm.nuovoCompostoSettore.m,
                        'line': $scope.vm.nuovoCompostoSettore.l,
                        'nwln': $scope.vm.nuovoCompostoSettore.w,
                        'array': $scope.vm.nuovoCompostoSettore.h,
                        'cod': $scope.vm.nuovoCompostoSettore.c,
                        'view': $scope.vm.nuovoCompostoSettore.v
                    }
                ).success(function (result) {
                    console.log('Risposta dalla pagina PHP', result);
                    if ($scope.vm.nuovoCompostoSettore.c !== -1) {
                        $scope.vm.compostiSettori.push($scope.vm.nuovoCompostoSettore);
                        $scope.vm.saveCompostoSettoreData();
                    } else {
                        $scope.saveDataDB();
                    }
                    $scope.newItem();
                }).error(function (data, status) {
                    console.log(status);
                });
            } else {
                $scope.errore.compostoSettore = true;
            }
        }
    };
}]);
