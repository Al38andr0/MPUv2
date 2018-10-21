(function () {
    'use strict';

    angular.module('mpu')
        .service('settoriSrv', settoriSrv);

    settoriSrv.$inject = ['$http', '$rootScope', 'API', '_'];

    function settoriSrv($http, $rootScope, API, _) {
        let reference = 'settori',
            url = API + reference + '.php';

        let mixin = new window.Mixin();

        let info = function () {
            return [
                {
                    nome: 'Homepage',
                    url: "home",
                    target: '_self'
                },
                {
                    nome: 'Chi siamo',
                    url: "chi_siamo",
                    target: '_self',
                    restrict: 'mpu'
                },
                {
                    nome: 'Contatti',
                    url: "contatti",
                    target: '_self',
                    restrict: 'mpu'
                },
                {
                    nome: 'Condizioni',
                    url: "condizioni",
                    target: '_self',
                    restrict: 'all'
                },
                {
                    nome: 'Progettazione',
                    url: "progettazine",
                    target: '_self',
                    restrict: 'mpu'
                },
                {
                    nome: 'Adamantx',
                    url: "adamantx",
                    target: '_self',
                    restrict: 'all'
                },
                {
                    nome: 'F.A.Q.',
                    url: "faq",
                    target: '_self',
                    restrict: 'all'
                },
                {
                    nome: 'Privacy & Cookies',
                    url: "privacy_e_cookies",
                    target: '_self',
                    restrict: 'all'
                },
                {
                    nome: 'Facebook page',
                    url: "https://www.facebook.com/mobiliperufficiocom-814011128625554/?ref=hl",
                    target: '_blank',
                    restrict: 'mpu'
                },
                {
                    nome: 'Google+ page',
                    url: "https://plus.google.com/105034652436636507879",
                    target: '_blank',
                    restrict: 'mpu'
                }
            ];
        };

        let _createTitle = function (type, nome) {
            switch (type) {
                case 'categoria':
                    switch (nome) {
                        case 'mobili per ufficio':
                            return 'Arredi';
                        case 'sedute per ufficio':
                            return 'Sedute';
                        case 'pareti divisorie':
                            return 'Pareti';
                        case 'accessori per ufficio':
                            return 'Accessori';
                        case 'art & design':
                            return 'Art & Design';
                    }
                    break;
                case 'settore':
                    if (nome.indexOf('arredi') !== -1)
                        return nome.replace('arredi', 'ambienti');
                    else
                        return nome;
            }

        };

        let extractCategorie = function (data, current) {
            let currentCategorie = [],
                categorie = [],
                currentSettori = [],
                linee = [];
            _.each(current, function (v) {
                currentCategorie.push(v.categoria);
                currentSettori.push(v.settori);
            });
            _.each(current, function (v) {
                linee.push(v.linee);
            });
            linee = _.flatten(linee);
            currentCategorie = _.uniq(_.flatten(currentCategorie));
            currentSettori = _.uniq(_.flatten(currentSettori));
            _.each(currentCategorie, function (v) {
                let existingCategoria = _.find(data, function (num) {
                    return num.id === v;
                });
                let categoria = {
                    nome: existingCategoria.nome,
                    url: mixin.generateUrl(existingCategoria.nome),
                    titolo: _createTitle('categoria', existingCategoria.nome),
                    id: existingCategoria.id,
                    posizione: existingCategoria.posizione,
                    settori: []
                };
                _.each(existingCategoria.settori, function (s) {
                    s.linee = _.filter(linee, function (num) {
                        return _.contains(num.settore, s.id)
                    });
                    if (_.contains(currentSettori, s.id))
                        categoria.settori.push(s);
                });
                categorie.push(categoria);
            });
            return _.sortBy(categorie, 'posizione');
        };

        let getAll = function (success, fail) {
            $http.get(url, {params: {action: 'getAll'}, cache: true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL ' + reference + ': SUCCESS', data);
                        if (success) {
                            let categorie = {
                                    list: []
                                },
                                indices = [];

                            _.each(data.data, function (v) {
                                if (!_.contains(indices, v['cat_id'])) {
                                    indices.push(v['cat_id']);
                                    categorie.list.push({
                                        nome: v['cat_nome'],
                                        url: mixin.generateUrl(v['cat_nome']),
                                        title: _createTitle('settore', v['set_nome']),
                                        id: parseInt(v['cat_id']),
                                        posizione: parseInt(v['cat_pos']),
                                        settori: []
                                    })
                                }
                                let index = indices.indexOf(v['cat_id']);
                                categorie.list[index].settori.push({
                                    nome: v['set_nome'],
                                    url: mixin.generateUrl(v['set_nome']),
                                    title: _createTitle('settore', v['set_nome']),
                                    id: parseInt(v['set_id'])
                                })
                            });
                            return success(categorie);
                        }
                    },
                    function (error) {
                        if ($rootScope.debugConsole)
                            console.log('GET ALL ' + reference + ': FAIL', error);
                        if (fail)
                            return fail();
                    }
                )
        };

        let getDescription = function (id, success, fail) {
            $http.get(url, {params: {action: 'getDescription', param: id}, cache: true})
                .then(
                    function (data) {
                        if ($rootScope.debugConsole)
                            console.log('GET DESCRIPTION SUCCESS', data);
                        if (success)
                            return success(data.data[0]['set_txt']);
                    },
                    function (error) {
                        if ($rootScope.debugConsole)
                            console.log('GET DESCRIPTION', error);
                        if (fail)
                            return fail(error);
                    }
                )
        };

        let addLinee = function (settori, marchi) {
            _.each(settori, function (s) {
                let array = [];
                _.each(angular.copy(marchi), function (v) {
                    let linee = _.filter(v.linee, function (num) {
                        return _.contains(num.settori, s.id)
                    });
                    array.push(linee);
                });

                s.linee = _.sortBy(_.flatten(array), function (num) {
                    return num.position;
                });
            });
        };

        let extractSettori = function (categorie) {
            let settori = [];
            _.each(categorie, function (v) {
                settori.push(v.settori)
            });
            return _.flatten(settori);
        };

        let getNameFromId = function (list, id) {
            return _.find(list, function (num) {
                return num.id === id;
            }).nome
        };

        return {
            getAll: getAll,
            getDescription: getDescription,
            info: info,
            extractCategorie: extractCategorie,
            extractSettori: extractSettori,
            getNameFromId: getNameFromId,
            addLinee: addLinee
        }
    }
})();