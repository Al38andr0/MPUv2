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
        ],
        servizi: [
            {
                id: 1,
                label: 'Importo fisso'
            },
            {
                id: 2,
                label: 'Percentuale'
            },
            {
                id: 3,
                label: 'Da quantificare'
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
        load: function (entity, reload) {
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
        },
        show: (index, page) => (index >= (page - 1) * $rootScope.settings.itemsPerPage && index < page * $rootScope.settings.itemsPerPage),
        convert: (item, entity, id, name) => {
            if ($rootScope[entity])
                return _.find($rootScope[entity], function (num) {
                    return parseInt(num[id]) === parseInt(item);
                })[name];
        },
        parse: (string) => JSON.parse(string),
        checklist: {
            categorie: (entity, prefix, list) => {
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
            settori: (entity, prefix, list) => {
                let array = [];
                _.each($rootScope[entity], function (v) {
                    let id = parseInt(v[prefix + '_id']);
                    array.push(
                        {
                            id: id,
                            nome: v[prefix + '_nome'],
                            categoria: v[prefix + '_cat_id'],
                            checked: (list) ? list.indexOf(id) !== -1 : false
                        }
                    )
                });
                return array;
            }
        },
        replaceAll: (string, find, replace) => {
            return string.replace(new RegExp(find, 'g'), replace);
        },
        idToLabel: (id, list) => {
            return _.find(list, (num) => num.id === id).label;
        }
    };

    $rootScope.Model = function () {
        this.list = [];
        this.currentPage = 1;
    };


    $scope.vm = {};

    $rootScope.saving = false;
    $rootScope.changing = false;

    let setPage = function (location) {
        $scope.vm.currentSubLink = location.slice(1);
        $scope.vm.currentPage = 1;
        $scope.vm.itemsPerPage = 10;
    };

    $scope.vm.changeLink = function (link) {
        $location.path(link.link);
        setPage($location.path());
    };

    $scope.$on('$locationChangeSuccess', function () {
        setPage($location.path());
    });

    $scope.vm.links = dashboardPages;

}

angular.module("mpuDashboard")
    .controller("categorieCtrl", categorieCtrl)
    .controller("settoriCtrl", settoriCtrl)
    .controller("marchiCtrl", marchiCtrl)
    .controller("tabelleProdottiCtrl", tabelleProdottiCtrl)
    .controller("finitureCtrl", finitureCtrl)
    .controller("lineeCtrl", lineeCtrl)
    .controller("settoriLineeCtrl", settoriLineeCtrl)
    .controller("tabelleFinitureCtrl", tabelleFinitureCtrl)
    .controller("abbinamentiCtrl", abbinamentiCtrl)
    .controller("prodottiCtrl", prodottiCtrl)
    .controller("vetrineCtrl", vetrineCtrl)
    .controller("vetrineProdottiCtrl", vetrineProdottiCtrl)
    .controller("provinceCtrl", provinceCtrl)
    .controller("convenzioniCtrl", convenzioniCtrl)
    .controller("rivenditoriCtrl", rivenditoriCtrl);

categorieCtrl.$inject = ['$scope', '$rootScope'];
settoriCtrl.$inject = ['$scope', '$rootScope'];
marchiCtrl.$inject = ['$scope', '$rootScope'];
tabelleProdottiCtrl.$inject = ['$scope', '$rootScope'];
finitureCtrl.$inject = ['$scope', '$rootScope'];
lineeCtrl.$inject = ['$scope', '$rootScope'];
settoriLineeCtrl.$inject = ['$scope', '$rootScope'];
tabelleFinitureCtrl.$inject = ['$scope', '$rootScope'];
abbinamentiCtrl.$inject = ['$scope', '$rootScope'];
prodottiCtrl.$inject = ['$scope', '$rootScope'];
vetrineCtrl.$inject = ['$scope', '$rootScope'];
vetrineProdottiCtrl.$inject = ['$scope', '$rootScope'];
provinceCtrl.$inject = ['$scope', '$rootScope'];
convenzioniCtrl.$inject = ['$scope', '$rootScope'];
rivenditoriCtrl.$inject = ['$scope', '$rootScope'];

function categorieCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.categoria = {
        show: 1,
        posizione: 0,
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

    $scope.$on('updateTable', () => $rootScope.settings.load('categorie', true));

    $rootScope.settings.load('categorie');
}

function settoriCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.settore = {
        show: 1,
        posizione: 0,
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

    $scope.$on('updateTable', () => $rootScope.settings.load('settori', true));

    $rootScope.settings.load('settori');
    $rootScope.settings.load('categorie');
}

function marchiCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.marchio = {
        show: 1,
        categorie: ($rootScope.categorie) ? $rootScope.settings.checklist.categorie('categorie', 'cat') : [],
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
        $scope.entity.marchio.categorie = $rootScope.settings.checklist.categorie('categorie', 'cat', categorie);
    };

    $scope.$on('updateTable', () => $rootScope.settings.load('marchi', true));

    $rootScope.settings.load('categorie');
    $rootScope.settings.load('marchi');

    $rootScope.$on('categorie', () => {
        $scope.entity.marchio.categorie = $rootScope.settings.checklist.categorie('categorie', 'cat')
    });
}

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

    $scope.$on('updateTable', () => $rootScope.settings.load('tabelle_prodotti', true));

    $rootScope.settings.load('marchi');
    $rootScope.settings.load('tabelle_prodotti');
}

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

    $scope.$on('updateTable', () => $rootScope.settings.load('finiture', true));

    $rootScope.settings.load('marchi');
    $rootScope.settings.load('finiture');
}

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

    $scope.$on('updateTable', () => $rootScope.settings.load('linee', true));

    $rootScope.settings.load('marchi');
    $rootScope.settings.load('settori');
    $rootScope.settings.load('categorie');
    $rootScope.settings.load('linee');
}

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

    $scope.$on('updateTable', () => $rootScope.settings.load('settori_linee', true));

    $rootScope.settings.load('marchi');
    $rootScope.settings.load('linee');
    $rootScope.settings.load('settori');
    $rootScope.settings.load('settori_linee');
}

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

    $scope.$on('updateTable', () => $rootScope.settings.load('tabelle_finiture', true));

    $rootScope.settings.load('marchi');
    $rootScope.settings.load('linee');
    $rootScope.settings.load('tabelle_finiture');
}

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

    $scope.$on('updateTable', () => $rootScope.settings.load('abbinamenti', true));

    $rootScope.settings.load('marchi');
    $rootScope.settings.load('linee');
    $rootScope.settings.load('tabelle_finiture');
    $rootScope.settings.load('finiture');
    $rootScope.settings.load('abbinamenti');
}

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
            immagine: '../dashboard/archivio_dati/' + file.marchio + '/' + file.linea + '/Prodotti/' + immagine
        };
    };

    $scope.$on('updateTable', () => $rootScope.settings.load('prodotti', true));

    $rootScope.settings.load('marchi');
    $rootScope.settings.load('linee');
    $rootScope.settings.load('finiture');
    $rootScope.settings.load('abbinamenti');
    $rootScope.settings.load('tabelle_finiture');
    $rootScope.settings.load('tabelle_prodotti');
    $rootScope.settings.load('prodotti');
}

function vetrineCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.vetrina = {
        show: 1,
        posizione: 0,
        categoria: 28,
        settori: []
    };

    $scope.selectItem = function (entity) {
        let marchio = entity['cmp_mark_id'],
            linea = entity['cmp_line_id'],
            nome = entity['cmp_nome'],
            file = {
                marchio: $rootScope.settings.replaceAll($rootScope.settings.convert(marchio, 'marchi', 'mark_id', 'mark_nome'), ' ', '_'),
                linea: $rootScope.settings.replaceAll($rootScope.settings.convert(linea, 'linee', 'line_id', 'line_nome'), ' ', '_')
            },
            immagine = file.linea + '_' + nome + '.jpg';

        $scope.entity.vetrina = {
            id: entity['cmp_id'],
            nome: nome,
            marchio: marchio,
            categoria: entity['cmp_cat_id'],
            linea: linea,
            show: entity['cmp_show'],
            posizione: entity['cmp_pos'],
            titolo: entity['cmp_title'],
            note: entity['cmp_note'],
            immagine: '../dashboard/archivio_dati/' + file.marchio + '/' + file.linea + '/Vetrina/' + immagine
        };

        let settori = entity['cmp_settore'];
        $scope.entity.vetrina.settori = $rootScope.settings.checklist.settori('settori', 'set', settori);
    };

    $scope.$on('updateTable', () => $rootScope.settings.load('vetrine', true));

    $rootScope.settings.load('categorie');
    $rootScope.settings.load('settori');
    $rootScope.settings.load('marchi');
    $rootScope.settings.load('linee');
    $rootScope.settings.load('vetrine');

    $rootScope.$on('vetrine', () => {
        $scope.entity.vetrina.settori = $rootScope.settings.checklist.settori('settori', 'set')
    });
}

function vetrineProdottiCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.vetrina_prodotto = {
        posizione: 0,
        tabella: false,
        finitura: false,
        quantita: 1,
        articolo: {
            id: false,
            marchio: false,
            linea: false,
        },
        composizione: {
            id: false,
            marchio: false,
            linea: false,
        }
    };

    $scope.selectItem = function (entity) {
        $scope.entity.vetrina_prodotto = {
            id: entity['cmpr_id'],
            posizione: entity['cmpr_pos'],
            tabella: entity['cmpr_tab'],
            finitura: entity['cmpr_cod'],
            quantita: entity['cmpr_qnt'],
            articolo: {
                id: entity['cmpr_prd'],
                marchio: entity['cmpr_mark_id'],
                linea: entity['cmpr_line_id'],
            },
            composizione: {
                id: entity['cmpr_comp'],
                marchio: entity['cmpr_mark_cmp_id'],
                linea: entity['cmpr_line_cmp_id'],
            }
        };
    };

    $scope.$on('updateTable', () => $rootScope.settings.load('vetrine_prodotti', true));

    $rootScope.settings.load('marchi');
    $rootScope.settings.load('linee');
    $rootScope.settings.load('tabelle_finiture');
    $rootScope.settings.load('abbinamenti');
    $rootScope.settings.load('prodotti');
    $rootScope.settings.load('vetrine');
    $rootScope.settings.load('vetrine_prodotti');
}

function provinceCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.provincia = {
        regione: false,
        nazione: 1,
        trasporto: {
            tipologia: 1,
            importo: 0
        },
        montaggio: {
            tipologia: 1,
            importo: 0
        },
        minimo: {
            limite: 0,
            importo: 0,
        }
    };

    $scope.selectItem = function (entity) {
        $scope.entity.provincia = {
            id: entity['provincia_id'],
            regione: entity['regione_id'],
            nazione: entity['nazione_id'],
            provincia: entity['provincia'],
            sigla: entity['sigla'],
            trasporto: {
                tipologia: entity['trasporto_type'],
                importo: entity['trasporto'],
            },
            montaggio: {
                tipologia: entity['montaggio_type'],
                importo: entity['montaggio'],
            },
            minimo: {
                limite: entity['limite'],
                importo: entity['minimo'],
            }
        };
    };

    $scope.$on('updateTable', () => $rootScope.settings.load('province', true));

    $rootScope.settings.load('nazioni');
    $rootScope.settings.load('regioni');
    $rootScope.settings.load('province');
}

function convenzioniCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.convenzione = {};

    $scope.selectItem = function (entity) {
        $scope.entity.convenzione = {
            id: entity['cnv_id'],
            nome: entity['cnv_nome'],
            email: entity['cnv_email'],
        };
    };

    $scope.$on('updateTable', () => $rootScope.settings.load('convenzioni', true));

    $rootScope.settings.load('convenzioni');
}

function rivenditoriCtrl($scope, $rootScope) {
    $scope.entity = new $rootScope.Model();
    $scope.entity.rivenditore = {
        nazione: 1,
        regione: false,
        provincia: false,
        convenzione: 0,
        website: "",
        telefono: "",
        fax: "",
        mobile: "",
        notes: "",
        trasporto: {
            tipologia: 1,
            importo: 0
        },
        montaggio: {
            tipologia: 1,
            importo: 0
        },
        minimo: {
            limite: 0,
            importo: 0
        },
        marchi: [],
        immagine: false
    };

    $scope.selectItem = function (entity) {
        let id = entity['riv_id'];

        $scope.entity.rivenditore = {
            id: id,
            nome: entity['riv_nome'],
            nazione: entity['riv_naz'],
            regione: entity['riv_reg'],
            provincia: entity['riv_prov'],
            convenzione: entity['riv_conv'],
            referente: entity['riv_rif'],
            sede: entity['riv_sede'],
            telefono: entity['riv_tel'],
            fax: entity['riv_fax'],
            mobile: entity['riv_cell'],
            website: entity['riv_web'],
            email: entity['riv_email'],
            password: entity['riv_psw'],
            note: entity['riv_notes'],
            trasporto: {
                tipologia: entity['riv_trasporto_type'],
                importo: entity['riv_trasporto']
            },
            montaggio: {
                tipologia: entity['riv_montaggio_type'],
                importo: entity['riv_montaggio']
            },
            minimo: {
                limite: entity['riv_limite'],
                importo: entity['riv_minimo']
            },
            marchi: angular.copy(entity['riv_mark']),
            immagine: '../dashboard/archivio_dati/Rivenditori/' + id + '.jpg'
        };
    };

    $scope.$on('updateTable', () => $rootScope.settings.load('rivenditori', true));

    $rootScope.settings.load('convenzioni', true);
    $rootScope.settings.load('province');
    $rootScope.settings.load('regioni');
    $rootScope.settings.load('nazioni');
    $rootScope.settings.load('marchi');
    $rootScope.settings.load('rivenditori');
}

/*
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
}]);*/
