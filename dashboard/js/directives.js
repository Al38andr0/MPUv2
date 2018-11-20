angular.module("mpuDashboard").directive("fileRead", fileRead);

function fileRead() {
    return {
        scope: {
            fileRead: "="
        },
        link: function (scope, element) {
            element.bind("change", function (changeEvent) {
                let reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileRead = loadEvent.target['result'];
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}

angular.module("mpuDashboard")
    .directive('categorie', categorie)
    .directive('settori', settori)
    .directive('marchi', marchi)
    .directive('tabelleProdotti', tabelleProdotti)
    .directive('finiture', finiture)
    .directive('linee', linee)
    .directive('settoriLinee', settoriLinee)
    .directive('tabelleFiniture', tabelleFiniture)
    .directive('abbinamenti', abbinamenti)
    .directive('prodotti', prodotti)
    .directive('vetrine', vetrine)
    .directive('vetrineProdotti', vetrineProdotti)
    .directive('province', province)
    .directive('convenzioni', convenzioni)
    .directive('rivenditori', rivenditori);

categorie.$inject = ['$rootScope'];
settori.$inject = ['$rootScope'];
marchi.$inject = ['$rootScope'];
tabelleProdotti.$inject = ['$rootScope'];
finiture.$inject = ['$rootScope'];
linee.$inject = ['$rootScope'];
settoriLinee.$inject = ['$rootScope'];
tabelleFiniture.$inject = ['$rootScope'];
abbinamenti.$inject = ['$rootScope'];
prodotti.$inject = ['$rootScope'];
vetrine.$inject = ['$rootScope'];
vetrineProdotti.$inject = ['$rootScope'];
province.$inject = ['$rootScope'];
convenzioni.$inject = ['$rootScope'];
rivenditori.$inject = ['$rootScope'];

function categorie($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/categorie.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);
            scope.confirm = false;

            scope.buildBody = () => {
                return {
                    nome: scope.entity.nome,
                    pos: scope.entity.posizione,
                    show: scope.entity.show,
                    image: scope.entity.immagine,
                    text: scope.entity.descrizione
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.nome ||
                    !scope.entity.immagine ||
                    !scope.entity.descrizione ||
                    !scope.entity.posizione
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'categorie');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['cat_nome'] === entity.nome;
                    return (entity.id) ? main && num['fin_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.reset = () => {
                    scope.actions.cleanInputFile();
                    scope.entity = {
                        show: 1,
                        posizione: 0,
                        immagine: false
                    };
                };
            }
        }
    }
}

function settori($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/settori.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);
            scope.confirm = false;

            scope.buildBody = () => {
                return {
                    nome: scope.entity.nome,
                    cat: scope.entity.categoria,
                    pos: scope.entity.posizione,
                    show: scope.entity.show,
                    home: scope.entity.homepage,
                    image: scope.entity.immagine,
                    text: scope.entity.descrizione
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.nome ||
                    !scope.entity.immagine ||
                    !scope.entity.descrizione ||
                    !scope.entity.categoria ||
                    !scope.entity.posizione
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'settori');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['set_nome'] === entity.nome && num['set_cat_id'] === entity.categoria;
                    return (entity.id) ? main && num['fin_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {
                    show: 1,
                    posizione: 0,
                    homepage: 0,
                    categoria: false,
                    immagine: false
                };
            };
        }
    }
}

function marchi($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/marchi.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);
            scope.confirm = false;

            scope.buildBody = () => {
                let array = _.filter(scope.entity.categorie, function (num) {
                    return num.checked;
                });
                return {
                    nome: scope.entity.nome,
                    show: scope.entity.show,
                    cat_array: _.pluck(array, 'id'),
                    disc: scope.entity.sconto,
                    list: scope.entity.listino
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.nome ||
                    scope.entity.categorie.length === 0
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'marchi');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['mark_nome'] === entity.nome;
                    return (entity.id) ? main && num['fin_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.entity = {
                    show: 1,
                    categorie: $rootScope.settings.checklist.categorie('categorie', 'cat'),
                    listino: 0,
                    sconto: 0
                };
            };
        }
    }
}

function tabelleProdotti($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/tabelle_prodotti.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);
            scope.confirm = false;

            scope.buildBody = () => {
                return {
                    nome: scope.entity.nome,
                    pos: scope.entity.posizione,
                    mark: scope.entity.marchio
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.nome ||
                    !scope.entity.marchio ||
                    !scope.entity.posizione
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'tabelle_prodotti');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['tbpr_nome'] === entity.nome && num['tbpr_mark_id'] === entity.marchio;
                    return (entity.id) ? main && num['fin_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.entity = {
                    posizione: 0,
                    marchio: false
                };
            };
        }
    }
}

function finiture($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/finiture.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.buildBody = () => {
                return {
                    nome: scope.entity.nome,
                    cod: scope.entity.codice,
                    mark: scope.entity.marchio,
                    show: scope.entity.show,
                    type: scope.entity.tipo,
                    image: scope.entity.immagine
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.nome ||
                    !scope.entity.marchio ||
                    !scope.entity.codice ||
                    !scope.entity.immagine
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'finiture');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['fin_cod'] === entity.codice && num['fin_nome'] === entity.nome && num['fin_mark_id'] === entity.marchio;
                    return (entity.id) ? main && num['fin_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {
                    show: 1,
                    tipo: 0,
                    marchio: false,
                    immagine: false
                };
            };
        }
    }
}

function linee($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/linee.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.buildBody = () => {
                return {
                    nome: scope.entity.nome,
                    mark: scope.entity.marchio,
                    cat: scope.entity.categoria,
                    show: scope.entity.show,
                    vtr: scope.entity.vetrina,
                    time: scope.entity.consegna,
                    war: scope.entity.garanzia,
                    disc: scope.entity.sconto,
                    pos: scope.entity.posizione,
                    link: scope.entity.abbinamenti,
                    ctl: scope.entity.catalogo,
                    spc: scope.entity.specifiche
                }
            };

            let checkArray = () => _.filter(scope.entity.abbinamenti, (num) => !num.categoria || !num.settore || !num.linea).length;

            scope.updateCheck = function () {
                return (
                    !scope.entity.nome ||
                    !scope.entity.marchio ||
                    !scope.entity.categoria ||
                    !scope.entity.posizione ||
                    checkArray() > 0
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'linee');
            scope.actions.abbinamenti = {
                add: function (abbinamenti) {
                    abbinamenti.push(
                        {
                            categoria: false,
                            settore: false,
                            linea: false
                        }
                    )
                },
                reset: function (abbinamenti) {
                    abbinamenti.length = 0;
                },
                remove: function (abbinamenti, index) {
                    abbinamenti.splice(index, 1);
                }
            };
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['line_nome'] === entity.nome && num['line_mark_id'] === entity.marchio;
                    return (entity.id) ? main && num['line_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {
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
            };
        }
    }
}

function settoriLinee($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/settori_linee.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.buildBody = () => {
                return {
                    mark: scope.entity.marchio,
                    line: scope.entity.linea,
                    set: scope.entity.settore,
                    show: scope.entity.show,
                    price: scope.entity.prezzo,
                    image: scope.entity.immagine
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.marchio ||
                    !scope.entity.linea ||
                    !scope.entity.settore ||
                    !scope.entity.immagine
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'settori_linee');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['stln_set_id'] === entity.settore && num['stln_mark_id'] === entity.marchio && num['stln_line_id'] === entity.linea;
                    return (entity.id) ? main && num['stln_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {
                    show: 1,
                    prezzo: 3,
                    marchio: false,
                    linea: false,
                    settore: false,
                    immagine: false
                };
            };
        }
    }
}

function tabelleFiniture($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/tabelle_finiture.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.buildBody = () => {
                return {
                    nome: scope.entity.nome,
                    line: scope.entity.linea,
                    mark: scope.entity.marchio
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.nome ||
                    !scope.entity.marchio ||
                    !scope.entity.linea
                );
            };
            scope.actions = new $rootScope.Actions(scope, 'tabelle_finiture');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['tab_nome'] === entity.nome && num['tab_mark_id'] === entity.marchio && num['tab_line_id'] === entity.linea;
                    return (entity.id) ? main && num['tab_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.entity = {
                    linea: false,
                    marchio: false
                };
            };
        }
    }
}

function abbinamenti($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/abbinamenti.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.buildBody = () => {
                return {
                    cod: scope.entity.codice,
                    mark: scope.entity.marchio,
                    line: scope.entity.linea,
                    tab: scope.entity.tabella,
                    abb_array: scope.entity.abbinamenti
                }
            };

            let checkArray = () => _.filter(scope.entity.abbinamenti, (num) => !num.i || !num.n).length;

            scope.updateCheck = function () {
                return (
                    !scope.entity.codice ||
                    !scope.entity.marchio ||
                    !scope.entity.linea ||
                    !scope.entity.tabella ||
                    scope.entity.abbinamenti.length === 0 ||
                    checkArray() > 0
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'abbinamenti');
            scope.actions.abbinamenti = {
                add: function (abbinamenti) {
                    abbinamenti.push(
                        {
                            i: false,
                            n: ""
                        }
                    )
                },
                remove: function (abbinamenti, index) {
                    abbinamenti.splice(index, 1);
                }
            };
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['abb_cod'] === entity.codice && num['abb_mark_id'] === entity.marchio && num['abb_line_id'] === entity.linea && num['abb_tab'] === entity.tabella;
                    return (entity.id) ? main && num['abb_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {
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
            };
        }
    }
}

function prodotti($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/prodotti.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.buildBody = () => {
                return {
                    cod: scope.entity.codice,
                    title: scope.entity.titolo,
                    dim: scope.entity.dimensioni,
                    note: scope.entity.note,
                    tbpr: scope.entity.tabella,
                    mark: scope.entity.marchio,
                    line: scope.entity.linea,
                    prices: scope.entity.prezzi,
                    pos: scope.entity.posizione,
                    lnfn: scope.entity.finitura_linea,
                    abb: scope.entity.finitura_unica,
                    fin: scope.entity.finitura_tipo,
                    show: scope.entity.show,
                    image: scope.entity.immagine
                }
            };

            let checkArray = () => _.filter(scope.entity.prezzi, (num) => !num.z || !num.a).length;

            scope.updateCheck = function () {
                return (
                    !scope.entity.codice ||
                    !scope.entity.titolo ||
                    !scope.entity.tabella ||
                    !scope.entity.marchio ||
                    !scope.entity.linea ||
                    !scope.entity.immagine ||
                    checkArray() > 0
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'prodotti');
            scope.actions.prezzi = {
                add: function (prezzi) {
                    prezzi.push(
                        {
                            z: 0,
                            a: false
                        }
                    )
                },
                remove: function (prezzi, index) {
                    prezzi.splice(index, 1);
                }
            };
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['prd_cod'] === entity.codice && num['prd_mark_id'] === entity.marchio && num['prd_line_id'] === entity.linea;
                    return (entity.id) ? main && num['prd_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {
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
            };
        }
    }
}

function vetrine($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/vetrine.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.buildBody = () => {
                let array = _.filter(scope.entity.settori, function (num) {
                    return num.checked;
                });
                return {
                    cod: scope.entity.nome,
                    mark: scope.entity.marchio,
                    line: scope.entity.linea,
                    cat: scope.entity.categoria,
                    show: scope.entity.show,
                    pos: scope.entity.posizione,
                    title: scope.entity.titolo,
                    note: scope.entity.note,
                    image: scope.entity.immagine,
                    settore: _.pluck(array, 'id')
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.nome ||
                    !scope.entity.titolo ||
                    !scope.entity.marchio ||
                    !scope.entity.linea ||
                    !scope.entity.categoria ||
                    !scope.entity.posizione ||
                    !scope.entity.immagine ||
                    scope.entity.settori.length === 0
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'vetrine');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['cmp_nome'] === entity.nome && num['cmp_mark_id'] === entity.marchio && num['cmp_line_id'] === entity.linea;
                    return (entity.id) ? main && num['cmp_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {
                    show: 1,
                    posizione: 0,
                    categoria: 28,
                    settori: $rootScope.settings.checklist.settori('settori', 'set'),
                };
            };
        }
    }
}

function vetrineProdotti($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/vetrine_prodotti.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.buildBody = () => {
                return {
                    pos: scope.entity.posizione,
                    tab: scope.entity.tabella,
                    fin: scope.entity.finitura,
                    qnt: scope.entity.quantita,
                    prd: scope.entity.articolo.id,
                    pmark: scope.entity.articolo.marchio,
                    pline: scope.entity.articolo.linea,
                    comp: scope.entity.composizione.id,
                    cmark: scope.entity.composizione.marchio,
                    cline: scope.entity.composizione.linea,
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.posizione ||
                    !scope.entity.tabella ||
                    !scope.entity.finitura ||
                    !scope.entity.quantita ||
                    !scope.entity.articolo.id ||
                    !scope.entity.articolo.marchio ||
                    !scope.entity.articolo.linea ||
                    !scope.entity.composizione.id ||
                    !scope.entity.composizione.marchio ||
                    !scope.entity.composizione.linea
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'vetrine_prodotti');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['cmpr_comp'] === entity.composizione.id && num['cmpr_prd'] === entity.articolo.id && num['cmpr_cod'] === entity.finitura && num['cmpr_tab'] === entity.tabella;
                    return (entity.id) ? main && num['cmpr_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {
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
            };
        }
    }
}

function province($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/province.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.buildBody = () => {
                return {
                    regione: scope.entity.regione,
                    nazione: scope.entity.nazione,
                    nome: scope.entity.provincia,
                    sigla: scope.entity.sigla,
                    trasporto_type: scope.entity.trasporto.tipologia,
                    trasporto: scope.entity.trasporto.importo,
                    montaggio_type: scope.entity.montaggio.tipologia,
                    montaggio: scope.entity.montaggio.importo,
                    limite: scope.entity.minimo.limite,
                    minimo: scope.entity.minimo.importo,
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.regione ||
                    !scope.entity.provincia ||
                    !scope.entity.sigla
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'province');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['regione_id'] === entity.regione && num['provincia'] === entity.provincia;
                    return (entity.id) ? main && num['provincia_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {
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
            };
        }
    }
}

function convenzioni($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/convenzioni.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.buildBody = () => {
                return {
                    nome: scope.entity.nome,
                    email: scope.entity.email
                }
            };

            scope.updateCheck = function () {
                return (
                    !scope.entity.nome ||
                    !scope.entity.email
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'convenzioni');
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['cnv_nome'] === entity.nome && num['cnv_email'] === entity.email;
                    return (entity.id) ? main && num['provincia_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {};
            };
        }
    }
}

function rivenditori($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/rivenditori.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);

            scope.extraOption = {
                convenzioni: function () {
                    if ($rootScope.convenzioni) {
                        let convenzioni = angular.copy($rootScope.convenzioni);
                        convenzioni.unshift({
                            cnv_id: 0,
                            cnv_nome: "Senza convenzione"
                        });

                        return convenzioni;
                    }
                }
            };
            $rootScope.$on('convenzioni', () => {
                scope.convenzioni = scope.extraOption.convenzioni();
            });

            scope.buildBody = () => {
                return {
                    nome: scope.entity.nome,
                    naz: scope.entity.nazione,
                    reg: (scope.entity.convenzione) ? 0 : scope.entity.regione,
                    prov: (scope.entity.convenzione) ? 0 : scope.entity.provincia,
                    conv: scope.entity.convenzione,
                    rif: scope.entity.referente,
                    sede: scope.entity.sede,
                    tel: scope.entity.telefono,
                    fax: scope.entity.fax,
                    cell: scope.entity.mobile,
                    web: scope.entity.website,
                    email: scope.entity.email,
                    psw: scope.entity.password,
                    notes: scope.entity.note,
                    trasporto_type: scope.entity.trasporto.tipologia,
                    trasporto: scope.entity.trasporto.importo,
                    montaggio_type: scope.entity.montaggio.tipologia,
                    montaggio: scope.entity.montaggio.importo,
                    limite: scope.entity.minimo.limite,
                    minimo: scope.entity.minimo.importo,
                    mark: JSON.parse(angular.toJson(angular.copy(scope.entity.marchi))),
                    image: scope.entity.immagine
                }
            };

            let checkArray = () => _.filter(scope.entity.marchi, (num) => !num.i || (!num.s && !num.d && num.v)).length;

            scope.updateCheck = function () {
                return (
                    !scope.entity.nome ||
                    !scope.entity.referente ||
                    !scope.entity.sede ||
                    !scope.entity.immagine ||
                    checkArray() > 0
                );
            };

            scope.actions = new $rootScope.Actions(scope, 'rivenditori');
            scope.actions.marchi = {
                add: function (marchi) {
                    marchi.push(
                        {
                            i: false,
                            s: 0,
                            d: 0,
                            v: 1
                        }
                    )
                },
                reset: function (abbinamenti) {
                    abbinamenti.length = 0;
                },
                remove: function (marchi, index) {
                    marchi.splice(index, 1);
                }
            };
            scope.actions.checkItem = function (entity, list, action) {
                let result;
                result = _.find(list, function (num) {
                    let main = num['riv_nome'] === entity.nome && num['riv_email'] === entity.email && num['riv_prov'] === entity.provincia;
                    return (entity.id) ? main && num['provincia_id'] !== entity.id : main;
                });
                (!result) ? scope.actions[action]() : scope.actions.checked();
            };
            scope.actions.reset = () => {
                scope.actions.cleanInputFile();
                scope.entity = {
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
            };
        }
    }
}


/*
angular.module("mpuDashboard").directive('agenti', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/agenti.html',
        scope: {
            agenteOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {
            $scope.$watch('agenteOriginal', function (newVal) {
                $scope.agente = angular.copy(newVal.agente);
            });
            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (!$scope.agente.n || !$scope.agente.e || !$scope.agente.p || !$scope.agente.r || !$scope.agente.t);
            };

            $scope.newItem = function () {
                $rootScope.saving = false;
                $scope.agenteOriginal.selected = false;
                $scope.vm.nuovoAgente = {
                    i: $scope.vm.nuovoAgente.i + 1,
                    r: false
                };
            };

            $scope.convert = function (ID, list, item) {
                var array = [];
                var element = '';
                if (typeof ID === "object") {
                    for (var i = 0; i < ID.length; i++) {
                        _.each($scope.vm[list], function (v) {
                            if (v.i == ID[i]) {
                                array.push(v[item])
                            }
                        })
                    }
                    return array;
                } else {
                    _.each($scope.vm[list], function (v) {
                        if (v.i == ID) {
                            element = v[item];
                        }
                    });
                    return element;
                }
            };


            $scope.action = function (type) {
                if (type == 'U') {
                    $rootScope.saving = true;
                    $http.post('php/agenti.php?type=update', {
                            'id': $scope.agente.i,
                            'nome': $scope.agente.n,
                            'email': $scope.agente.e,
                            'password': $scope.agente.p,
                            'tel': $scope.agente.t,
                            'riv': $scope.agente.r
                        }
                    ).success(function (data) {
                        $scope.vm.saveAgentiData();
                        _.each($scope.vm.agenti, function (v) {
                            if (v.i == $scope.agente.i) {
                                v.n = $scope.agente.n;
                                v.e = $scope.agente.e;
                                v.p = $scope.agente.p;
                                v.t = $scope.agente.t;
                                v.r = $scope.agente.r;
                                $scope.agente = angular.copy(v);
                            }
                        });
                        console.log('Risposta dalla pagina PHP', data);
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/agenti.php?type=delete', {
                            'id': $scope.agente.i,
                            'nome': $scope.agente.n,
                            'email': $scope.agente.e,
                            'password': $scope.agente.p,
                            'tel': $scope.agente.t,
                            'riv': $scope.agente.r
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.agenti = _.filter($scope.vm.agenti, function (list) {
                            return list.i != $scope.agente.i;
                        });
                        $scope.vm.saveAgentiData();
                        $scope.newItem();
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});*/
