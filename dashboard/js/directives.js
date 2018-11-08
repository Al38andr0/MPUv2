function actions(scope, entity) {
    this.success = function (data) {
        console.log('Risposta dalla pagina PHP', data);
        scope.$emit('updateTable');
        scope.actions.reset();
        $rootScope.saving = false;
    };
    this.fail = function (error) {
        console.log(error);
        $rootScope.saving = false;
    };
    this.confirm = function () {
        scope.confirm = true;
        $timeout(() => scope.confirm = false, 4E3);
    };
    this.create = function () {
        $rootScope.saving = true;
        let body = scope.buildBody();
        $http.post('php/' + entity + '.php?type=new', JSON.stringify(body)).then(scope.actions.success, scope.actions.fail);
    };
    this.update = function () {
        $rootScope.saving = true;
        let body = scope.buildBody();
        body.id = scope.entity.id;
        $http.post('php/' + entity + 'categorie.php?type=update', JSON.stringify(body)).then(scope.actions.success, scope.actions.fail);
    };
    this.erase = function () {
        $rootScope.saving = true;
        let body = scope.buildBody();
        body.id = scope.entity.id;
        $http.post('php/' + entity + 'categorie.php?type=delete', JSON.stringify(body)).then(scope.actions.success, scope.actions.fail);
    };
};

angular.module("mpuDashboard").directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

angular.module("mpuDashboard").directive('categorie', categorie);
categorie.$inject = ['$rootScope'];

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
            scope.actions.reset = () => {
                scope.entity = {
                    show: 1,
                    immagine: false
                };
            };
        }
    }
}

angular.module("mpuDashboard").directive('settori', settori);
settori.$inject = ['$rootScope'];

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
            scope.actions.reset = () => {
                scope.entity = {
                    show: 1,
                    homepage: 0,
                    categoria: false,
                    immagine: false
                };
            };
        }
    }
}

angular.module("mpuDashboard").directive('marchi', marchi);
marchi.$inject = ['$rootScope'];

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
            scope.actions.reset = () => {
                scope.entity = {
                    show: 1,
                    categorie: $rootScope.settings.generateObject('categorie', 'cat'),
                    listino: 0,
                    sconto: 0
                };
            };
        }
    }
}

angular.module("mpuDashboard").directive('tabelleProdotti', tabelleProdotti);
tabelleProdotti.$inject = ['$rootScope'];

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
            scope.actions.reset = () => {
                scope.entity = {
                    posizione: 0,
                    marchio: false
                };
            };
        }
    }
}

angular.module("mpuDashboard").directive('finiture', finiture);
finiture.$inject = ['$rootScope'];

function finiture($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'template/finiture.html',
        scope: {
            entity: "="
        },
        link: function (scope) {
            scope.entity = angular.copy(scope.entity);
            scope.confirm = false;

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
            scope.actions.reset = () => {
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

angular.module("mpuDashboard").directive('linee', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/linee.html',
        scope: {
            lineaOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {

            $scope.errore = {
                linea: false
            };

            function convertMark(IDS) {
                _.each($scope.vm.marchi, function (v) {
                    if (v.i == IDS) {
                        markByName = v.n;
                    }
                });
                return markByName;
            }

            function replaceAll(string, find, replace) {
                return string.replace(new RegExp(find, 'g'), replace);
            }

            $scope.$watch('lineaOriginal', function (newVal) {
                $scope.linea = angular.copy(newVal.linea);

                var markName = convertMark($scope.linea.m);
                markName = replaceAll(markName, ' ', '_');
                lineaName = replaceAll($scope.linea.n, ' ', '_');
                var fileNameS = $scope.linea.n.replace(" ", "_") + '_specifiche.pdf';
                var fileNameC = $scope.linea.n.replace(" ", "_") + '_catalogo.pdf';
                var fileNameI = $scope.linea.n.replace(" ", "_") + '.jpg';
                $scope.linea.ctlPath = '../dashboard/archivio_dati/' + markName + '/' + lineaName + '/' + fileNameC;
                $scope.linea.jPath = '../dashboard/archivio_dati/' + markName + '/' + lineaName + '/' + fileNameS;
                $scope.linea.r = '../dashboard/archivio_dati/' + markName + '/' + lineaName + '/' + fileNameI;

            });

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (!$scope.linea.n || isNaN($scope.linea.e) || isNaN($scope.linea.w) || isNaN($scope.linea.s) || !$scope.linea.m);
            };

            $scope.deleteCheck = function () {
                return ($scope.linea.n !== $scope.lineaOriginal.linea.n || $scope.linea.m !== $scope.lineaOriginal.linea.m);
            };

            var checkLinea = function () {
                if ($scope.linea.n != $scope.lineaOriginal.linea.n || $scope.linea.m != $scope.lineaOriginal.linea.m) {
                    return _.findWhere($scope.vm.linee, {n: $scope.linea.n, m: $scope.linea.m});
                } else {
                    return false;
                }
            };

            $scope.addLink = function () {
                $scope.linea.a.push(false);
            };

            $scope.removeLink = function (index) {
                if ($scope.linea.a.length == 1) {
                    $scope.linea.a = [false];
                } else {
                    $scope.linea.a.splice(index, 1);
                }
            };

            $scope.selectedCat = function (ID) {
                return ($scope.linea.q.indexOf(ID) != -1);
            };

            $scope.toggleSet = function (ID) {
                if ($scope.linea.q.indexOf(ID) == -1) {
                    $scope.linea.q.push(parseInt(ID));
                } else {
                    $scope.linea.q.splice($scope.linea.q.indexOf(ID), 1);
                }
            };

            $scope.newLinea = function () {
                $rootScope.saving = false;
                $scope.errore.linea = false;
                $scope.lineaOriginal.selected = false;
                $scope.vm.nuovaLinea = {
                    i: $scope.vm.nuovaLinea.i + 1,
                    q: [],
                    a: [false],
                    v: 1,
                    z: 2,
                    b: 0,
                    y: 100,
                    c: 0,
                    s: 0,
                    e: 25,
                    w: 2,
                    r: false,
                    k: false,
                    j: false
                };
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (!checkLinea()) {
                        $rootScope.saving = true;
                        $http.post('php/linee.php?type=update', {
                                'id': $scope.linea.i,
                                'nome': $scope.linea.n,
                                'mark': $scope.linea.m,
                                'disc': $scope.linea.s,
                                'time': $scope.linea.e,
                                'war': $scope.linea.w,
                                'ctl': $scope.linea.k,
                                'spc': $scope.linea.j,
                                'image': $scope.linea.r,
                                'show': $scope.linea.v,
                                'price': $scope.linea.z,
                                'cat': $scope.linea.g,
                                'set': $scope.linea.q,
                                'link': $scope.linea.a,
                                'vtr': $scope.linea.c,
                                'pos': $scope.linea.y,
                                'sourceNome': $scope.lineaOriginal.linea.n,
                                'sourceMark': $scope.lineaOriginal.linea.m,
                                'sourceCtl': $scope.lineaOriginal.linea.k,
                                'sourceSpc': $scope.lineaOriginal.linea.j
                            }
                        ).success(function (data) {
                            $scope.errore.linea = false;
                            $scope.vm.saveLineaData();
                            console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.linee, function (v) {
                                if (v.i == $scope.linea.i) {
                                    v.n = $scope.linea.n;
                                    v.m = $scope.linea.m;
                                    v.e = $scope.linea.e;
                                    v.w = $scope.linea.w;
                                    v.j = $scope.linea.j;
                                    v.k = $scope.linea.k;
                                    v.s = $scope.linea.s;
                                    v.r = $scope.linea.r;
                                    v.v = $scope.linea.v;
                                    v.z = $scope.linea.z;
                                    v.g = $scope.linea.g;
                                    v.y = $scope.linea.y;
                                    v.a = $scope.linea.a;
                                    v.c = $scope.linea.c;
                                    $scope.linea = angular.copy(v);
                                }
                                return $scope.vm.linee;
                            });
                            $rootScope.saving = false;
                            $scope.errore.linea = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.linea = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/linee.php?type=delete', {
                            'id': $scope.linea.i,
                            'nome': $scope.linea.n,
                            'mark': $scope.linea.m,
                            'disc': $scope.linea.s,
                            'time': $scope.linea.e,
                            'war': $scope.linea.w,
                            'ctl': $scope.linea.k,
                            'spc': $scope.linea.j,
                            'image': $scope.linea.r,
                            'show': $scope.linea.v,
                            'price': $scope.linea.z,
                            'cat': $scope.linea.g,
                            'set': $scope.linea.q,
                            'link': $scope.linea.a,
                            'vtr': $scope.linea.c,
                            'pos': $scope.linea.y
                        }
                    ).success(function (data) {
                        console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.linee = _.filter($scope.vm.linee, function (list) {
                            return list.i != $scope.linea.i;
                        });
                        $scope.vm.saveLineaData();
                        $scope.newLinea();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('finitureTabelle', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/finitureTabelle.html',
        scope: {
            finituraTabellaOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {
            $scope.$watch('finituraTabellaOriginal', function (newVal) {
                $scope.finituraTabella = angular.copy(newVal.finituraTabella);
            });

            $scope.errore = {
                finituraTabella: false
            };

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (!$scope.finituraTabella.n || !$scope.finituraTabella.m || !$scope.finituraTabella.l);
            };

            $scope.copyCheck = function () {
                return (!$scope.finituraTabella.n || !$scope.finituraTabella.m || !$scope.finituraTabella.l || ($scope.finituraTabella.n === $scope.finituraTabellaOriginal.finituraTabella.n && $scope.finituraTabella.m === $scope.finituraTabellaOriginal.finituraTabella.m && $scope.finituraTabella.l === $scope.finituraTabellaOriginal.finituraTabella.l));
            };

            $scope.newFinituraTabella = function () {
                $rootScope.saving = false;
                $scope.errore.finituraTabella = false;
                $scope.finituraTabellaOriginal.selected = false;
                $scope.vm.nuovaFinituraTabella = {
                    i: $scope.vm.nuovaFinituraTabella.i + 1,
                    m: false,
                    l: false
                }
            };

            var checkUpdate = function () {
                if ($scope.finituraTabella.n != $scope.finituraTabellaOriginal.finituraTabella.n || $scope.finituraTabella.m != $scope.finituraTabellaOriginal.finituraTabella.m || $scope.finituraTabella.l != $scope.finituraTabellaOriginal.finituraTabella.l) {
                    return _.findWhere($scope.vm.finitureTabelle, {
                        n: $scope.finituraTabella.n,
                        m: $scope.finituraTabella.m,
                        l: $scope.finituraTabella.l
                    });
                } else {
                    return false;
                }
            };

            var checkCopy = function () {
                return _.findWhere($scope.vm.finitureTabelle, {
                    n: $scope.finituraTabella.n,
                    m: $scope.finituraTabella.m,
                    l: $scope.finituraTabella.l
                });
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (!checkUpdate()) {
                        $rootScope.saving = true;
                        $http.post('php/finitureTabelle.php?type=update', {
                                'id': $scope.finituraTabella.i,
                                'nome': $scope.finituraTabella.n,
                                'line': $scope.finituraTabella.l,
                                'mark': $scope.finituraTabella.m
                            }
                        ).success(function (data) {
                            $scope.vm.saveFinitureTabelleData();
                            //console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.finitureTabelle, function (v) {
                                if (v.i == $scope.finituraTabella.i) {
                                    v.n = $scope.finituraTabella.n;
                                    v.m = $scope.finituraTabella.m;
                                    v.l = $scope.finituraTabella.l;
                                    $scope.finituraTabella = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                            $scope.errore.finituraTabella = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.finituraTabella = true;
                    }
                }
                if (type == 'C') {
                    if (!checkCopy()) {
                        $rootScope.saving = true;
                        $http.post('php/finitureTabelle.php?type=new', {
                                'id': $scope.vm.nuovaFinituraTabella.i,
                                'nome': $scope.finituraTabella.n,
                                'line': $scope.finituraTabella.l,
                                'mark': $scope.finituraTabella.m
                            }
                        ).success(function (data) {
                            //console.log('Risposta dalla pagina PHP', data);
                            $scope.vm.copiedFinituraTabella = {
                                i: $scope.vm.nuovaFinituraTabella.i,
                                n: $scope.finituraTabella.n,
                                l: $scope.finituraTabella.l,
                                m: $scope.finituraTabella.m
                            };
                            $scope.vm.finitureTabelle.push($scope.vm.copiedFinituraTabella);
                            $scope.vm.nuovaFinituraTabella = {
                                i: $scope.vm.nuovaFinituraTabella.i + 1
                            };
                            $scope.vm.saveFinitureTabelleData();
                            $rootScope.saving = false;
                            $scope.errore.finituraTabella = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.finituraTabella = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/finitureTabelle.php?type=delete', {
                            'id': $scope.finituraTabella.i,
                            'nome': $scope.finituraTabella.n,
                            'line': $scope.finituraTabella.l,
                            'mark': $scope.finituraTabella.m
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.finitureTabelle = _.filter($scope.vm.finitureTabelle, function (list) {
                            return list.i != $scope.finituraTabella.i;
                        });
                        $scope.vm.saveFinitureTabelleData();
                        $scope.newFinituraTabella();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('abbinamenti', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/abbinamenti.html',
        scope: {
            abbinamentoOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {
            $scope.$watch('abbinamentoOriginal', function (newVal) {
                $scope.abbinamento = angular.copy(newVal.abbinamento);
            });

            $scope.errore = {
                abbinamento: false
            };

            $scope.addAbbinamento = function () {
                $scope.abbinamento.f.push({i: false, n: ''});
            };

            $scope.removeAbbinamento = function (index) {
                $scope.abbinamento.f.splice(index, 1);
            };

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (!$scope.abbinamento.c || !$scope.abbinamento.u);
            };

            $scope.copyCheck = function () {
                return (!$scope.abbinamento.c || !$scope.abbinamento.m || !$scope.abbinamento.l || ($scope.abbinamento.c === $scope.abbinamentoOriginal.abbinamento.c && $scope.abbinamento.m === $scope.abbinamentoOriginal.abbinamento.m && $scope.abbinamento.l === $scope.abbinamentoOriginal.abbinamento.l));
            };

            $scope.newAbbinamento = function () {
                $rootScope.saving = false;
                $scope.errore.abbinamento = false;
                $scope.abbinamentoOriginal.selected = false;
                $scope.vm.nuovoAbbinamento = {
                    i: $scope.vm.nuovoAbbinamento.i + 1,
                    m: false,
                    l: false,
                    u: false,
                    f: [{i: false, n: ''}]
                };
            };

            function checkUpdate() {
                if ($scope.abbinamento.c != $scope.abbinamentoOriginal.abbinamento.c || $scope.abbinamento.m != $scope.abbinamentoOriginal.abbinamento.m || $scope.abbinamento.l != $scope.abbinamentoOriginal.abbinamento.l) {
                    return _.findWhere($scope.vm.abbinamenti, {
                        n: $scope.abbinamento.c,
                        m: $scope.abbinamento.m,
                        l: $scope.abbinamento.l
                    });
                } else {
                    return false;
                }
            }

            function checkCopy() {
                return _.findWhere($scope.vm.abbinamenti, {
                    c: $scope.abbinamento.c,
                    m: $scope.abbinamento.m,
                    l: $scope.abbinamento.l,
                    u: $scope.abbinamento.u
                });
            }

            function checkFinArray() {
                var emptyArray = _.filter($scope.abbinamento.f, function (list) {
                    return !list.i || !list.n
                });
                return emptyArray.length;
            }

            $scope.action = function (type) {
                if (type == 'U') {
                    if (!checkUpdate() && checkFinArray() === 0) {
                        $rootScope.saving = true;
                        $http.post('php/abbinamenti.php?type=update', {
                                'id': $scope.abbinamento.i,
                                'cod': $scope.abbinamento.c,
                                'line': $scope.abbinamento.l,
                                'mark': $scope.abbinamento.m,
                                'abb_array': $scope.abbinamento.f,
                                'tab': $scope.abbinamento.u
                            }
                        ).success(function (data) {
                            $scope.vm.saveAbbinamentiData();
                            //console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.abbinamenti, function (v) {
                                if (v.i == $scope.abbinamento.i) {
                                    v.c = $scope.abbinamento.c;
                                    v.l = $scope.abbinamento.l;
                                    v.m = $scope.abbinamento.m;
                                    v.f = $scope.abbinamento.f;
                                    v.u = $scope.abbinamento.u;
                                    $scope.abbinamento = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                            $scope.errore.abbinamento = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.abbinamento = true;
                    }
                }
                if (type == 'C') {
                    if (!checkCopy()) {
                        $rootScope.saving = true;
                        $http.post('php/abbinamenti.php?type=new', {
                                'id': $scope.vm.nuovoAbbinamento.i,
                                'cod': $scope.abbinamento.c,
                                'line': $scope.abbinamento.l,
                                'mark': $scope.abbinamento.m,
                                'abb_array': $scope.abbinamento.f,
                                'tab': $scope.abbinamento.u
                            }
                        ).success(function (data) {
                            //console.log('Risposta dalla pagina PHP', data);
                            var copiedAbbinamento = {
                                i: $scope.vm.nuovoAbbinamento.i,
                                c: $scope.abbinamento.c,
                                l: $scope.abbinamento.l,
                                m: $scope.abbinamento.m,
                                f: $scope.abbinamento.f,
                                u: $scope.abbinamento.u

                            };
                            $scope.vm.copiedAbbinamento = angular.copy(copiedAbbinamento);
                            $scope.vm.abbinamenti.push($scope.vm.copiedAbbinamento);
                            $scope.vm.nuovoAbbinamento = {
                                i: $scope.vm.nuovoAbbinamento.i + 1
                            };
                            $scope.vm.saveAbbinamentiData();
                            $rootScope.saving = false;
                            $scope.errore.abbinamento = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.abbinamento = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/abbinamenti.php?type=delete', {
                            'id': $scope.abbinamento.i,
                            'cod': $scope.abbinamento.c,
                            'line': $scope.abbinamento.l,
                            'mark': $scope.abbinamento.m,
                            'abb_array': $scope.abbinamento.f,
                            'tab': $scope.abbinamento.u
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.abbinamenti = _.filter($scope.vm.abbinamenti, function (list) {
                            return list.i != $scope.abbinamento.i;
                        });
                        $scope.vm.saveAbbinamentiData();
                        $scope.newAbbinamento();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('lineeSettori', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/lineeSettori.html',
        scope: {
            lineaSettoreOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {

            $scope.errore = {
                lineaSettore: false
            };

            $scope.priceName = [
                {
                    n: 'basso',
                    i: 1
                },
                {
                    n: 'medio/basso',
                    i: 2
                },
                {
                    n: 'medio',
                    i: 3
                },
                {
                    n: 'medio/alto',
                    i: 4
                },
                {
                    n: 'alto',
                    i: 5
                }
            ];

            function convertMark(IDS) {
                _.each($scope.vm.marchi, function (v) {
                    if (v.i == IDS) {
                        markByName = v.n;
                    }
                });
                return markByName;
            }

            function convertLine(IDS) {
                _.each($scope.vm.linee, function (v) {
                    if (v.i == IDS) {
                        lineByName = v.n;
                    }
                });
                return lineByName;
            }

            function convertSet(IDS) {
                _.each($scope.vm.settori, function (v) {
                    if (v.i == IDS) {
                        setByName = v.n;
                    }
                });
                return setByName;
            }

            function replaceAll(string, find, replace) {
                return string.replace(new RegExp(find, 'g'), replace);
            }

            $scope.$watch('lineaSettoreOriginal', function (newVal) {
                $scope.lineaSettore = angular.copy(newVal.lineaSettore);

                var markName = convertMark($scope.lineaSettore.m);
                var lineName = convertLine($scope.lineaSettore.l);
                var setName = convertSet($scope.lineaSettore.h);
                markName = replaceAll(markName, ' ', '_');
                lineName = replaceAll(lineName, ' ', '_');
                setName = replaceAll(setName, ' ', '_');
                var fileName = lineName + '_' + setName + '.jpg';
                $scope.lineaSettore.r = '../dashboard/archivio_dati/' + markName + '/' + lineName + '/Vetrina/' + fileName;
            });

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.toggleSet = function (ID) {
                if ($scope.lineaSettore.q.indexOf(ID) == -1) {
                    $scope.lineaSettore.q.push(parseInt(ID));
                } else {
                    $scope.lineaSettore.q.splice($scope.lineaSettore.q.indexOf(ID), 1);
                }
            };

            $scope.checkList = function (ID) {
                return ($scope.lineaSettore.q.indexOf(ID) != -1);
            };

            var checkList = function () {
                return ($scope.lineaSettore.q.length);
            };

            $scope.updateCheck = function () {
                return (!$scope.lineaSettore.m || !$scope.lineaSettore.l || !$scope.lineaSettore.h);
            };

            $scope.deleteCheck = function () {
                return ($scope.lineaSettore.m !== $scope.lineaSettoreOriginal.lineaSettore.m || $scope.lineaSettore.l !== $scope.lineaSettoreOriginal.lineaSettore.l || $scope.lineaSettore.h !== $scope.lineaSettoreOriginal.lineaSettore.h);
            };

            var checkLineaSettore = function () {
                if ($scope.lineaSettore.m != $scope.lineaSettoreOriginal.lineaSettore.m || $scope.lineaSettore.l != $scope.lineaSettoreOriginal.lineaSettore.l || $scope.lineaSettore.h != $scope.lineaSettoreOriginal.lineaSettore.h) {
                    return _.findWhere($scope.vm.lineeSettori, {
                        m: $scope.lineaSettore.m,
                        l: $scope.lineaSettore.l,
                        h: $scope.lineaSettore.h
                    });
                } else {
                    return false;
                }
            };

            $scope.newItem = function () {
                $rootScope.saving = false;
                $scope.lineaSettoreOriginal.selected = false;
                $scope.vm.nuovaLineaSettore = {
                    i: $scope.vm.nuovaLineaSettore.i + 1,
                    v: 1,
                    p: 0,
                    z: 1,
                    q: [],
                    m: false,
                    r: false
                };
                $scope.errore.lineaSettore = false;
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (!checkLineaSettore() && checkList() != 0) {
                        $rootScope.saving = true;
                        $http.post('php/lineeSettori.php?type=update', {
                                'id': $scope.lineaSettore.i,
                                'mark': $scope.lineaSettore.m,
                                'line': $scope.lineaSettore.l,
                                'set': $scope.lineaSettore.h,
                                'show': $scope.lineaSettore.v,
                                'price': $scope.lineaSettore.z,
                                'man': $scope.lineaSettore.q,
                                'image': $scope.lineaSettore.r,
                                'sourceMark': $scope.lineaSettoreOriginal.lineaSettore.m,
                                'sourceLine': $scope.lineaSettoreOriginal.lineaSettore.l,
                                'sourceSet': $scope.lineaSettoreOriginal.lineaSettore.h
                            }
                        ).success(function (data) {
                            $scope.errore.lineaSettore = false;
                            $scope.vm.saveLineaSettoreData();
                            console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.lineeSettori, function (v) {
                                if (v.i == $scope.lineaSettore.i) {
                                    v.m = $scope.lineaSettore.m;
                                    v.l = $scope.lineaSettore.l;
                                    v.h = $scope.lineaSettore.h;
                                    v.r = $scope.lineaSettore.r;
                                    v.z = $scope.lineaSettore.z;
                                    v.q = $scope.lineaSettore.q;
                                    v.v = $scope.lineaSettore.v;
                                    $scope.lineaSettore = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.lineaSettore = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/lineeSettori.php?type=delete', {
                            'id': $scope.lineaSettore.i,
                            'mark': $scope.lineaSettore.m,
                            'line': $scope.lineaSettore.l,
                            'set': $scope.lineaSettore.h,
                            'show': $scope.lineaSettore.v,
                            'price': $scope.lineaSettore.z,
                            'man': $scope.lineaSettore.q,
                            'image': $scope.lineaSettore.r
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.lineeSettori = _.filter($scope.vm.lineeSettori, function (list) {
                            return list.i != $scope.lineaSettore.i;
                        });
                        $scope.vm.saveLineaSettoreData();
                        $scope.newItem();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('prodotti', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/prodotti.html',
        scope: {
            prodottoOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {

            $scope.errore = {
                prodotto: false
            };

            $scope.addProdotto = function () {
                $scope.prodotto.z.push({z: '', a: ''});
            };

            $scope.removeProdotto = function (index) {
                $scope.prodotto.z.splice(index, 1);
            };

            function convertMark(IDS) {
                _.each($scope.vm.marchi, function (v) {
                    if (v.i == IDS) {
                        markByName = v.n;
                    }
                });
                return markByName;
            }

            function convertLine(IDS) {
                _.each($scope.vm.linee, function (v) {
                    if (v.i == IDS) {
                        lineByName = v.n;
                    }
                });
                return lineByName;
            }

            function replaceAll(string, find, replace) {
                return string.replace(new RegExp(find, 'g'), replace);
            }

            $scope.$watch('prodottoOriginal', function (newVal) {
                $scope.prodotto = angular.copy(newVal.prodotto);

                var markName = convertMark($scope.prodotto.m);
                var lineName = convertLine($scope.prodotto.l);
                markName = replaceAll(markName, ' ', '_');
                lineName = replaceAll(lineName, ' ', '_');
                var fileName = $scope.prodotto.c + '.jpg';
                $scope.prodotto.r = '../dashboard/archivio_dati/' + markName + '/' + lineName + '/Prodotti/' + fileName;
            });

            $scope.confirm = false;
            $scope.confirmAll = false;
            $scope.askConfirm = function (type) {
                if (!type) {
                    $scope.confirm = true;
                    $timeout(function () {
                        $scope.confirm = false;
                    }, 4000);
                } else {
                    $scope.confirmAll = true;
                    $timeout(function () {
                        $scope.confirmAll = false;
                    }, 4000);
                }
            };

            $scope.updateCheck = function () {
                return (
                    !$scope.prodotto.c ||
                    !$scope.prodotto.n ||
                    !$scope.prodotto.m ||
                    !$scope.prodotto.l ||
                    !$scope.prodotto.x ||
                    !$scope.prodotto.t ||
                    !$scope.prodotto.r
                );
            };

            $scope.deleteCheck = function () {
                return (
                    $scope.prodotto.c !== $scope.prodottoOriginal.prodotto.c ||
                    $scope.prodotto.m !== $scope.prodottoOriginal.prodotto.m ||
                    $scope.prodotto.l !== $scope.prodottoOriginal.prodotto.l
                );
            };

            $scope.copyCheck = function () {
                return (
                    !$scope.prodotto.c ||
                    !$scope.prodotto.m ||
                    !$scope.prodotto.l ||
                    $scope.prodotto.c === $scope.prodottoOriginal.prodotto.c);
            };

            var checkProdotto = function () {
                if ($scope.prodotto.c != $scope.prodottoOriginal.prodotto.c || $scope.prodotto.l != $scope.prodottoOriginal.prodotto.l) {
                    return _.findWhere($scope.vm.prodotti, {c: $scope.prodotto.c, l: $scope.prodotto.l});
                } else {
                    return false;
                }
            };

            var checkCopy = function () {
                return _.findWhere($scope.vm.prodotti, {
                    c: $scope.prodotto.c,
                    m: $scope.prodotto.m,
                    l: $scope.prodotto.l
                });
            };

            var checkPricesArray = function () {
                var emptyArray = _.filter($scope.prodotto.z, function (list) {
                    return isNaN(list.z) || !list.z || !list.a
                });
                return emptyArray.length;
            };

            $scope.newProdotto = function () {
                $rootScope.saving = false;
                $scope.errore.prodotto = false;
                $scope.prodottoOriginal.selected = false;
                $scope.vm.nuovoProdotto = {
                    i: $scope.vm.nuovoProdotto.i + 1,
                    m: false,
                    l: false,
                    t: false,
                    a: '',
                    y: 1,
                    f: 0,
                    z: [{z: '', a: ''}]
                };
            };

            $scope.action = function (type) {
                if (type === 'U') {
                    if (!checkProdotto() && checkPricesArray() === 0) {
                        $rootScope.saving = true;
                        $http.post('php/prodotti.php?type=update', {
                                'id': $scope.prodotto.i,
                                'mark': $scope.prodotto.m,
                                'line': $scope.prodotto.l,
                                'cod': $scope.prodotto.c,
                                'title': $scope.prodotto.n,
                                'tbpr': $scope.prodotto.t,
                                'dim': $scope.prodotto.d,
                                'pos': $scope.prodotto.y,
                                'lnfn': $scope.prodotto.x,
                                'note': $scope.prodotto.o,
                                'abb': $scope.prodotto.a,
                                'fin': $scope.prodotto.f,
                                'prices': $scope.prodotto.z,
                                'image': $scope.prodotto.r,
                                'sourceCod': $scope.prodottoOriginal.prodotto.c,
                                'sourceMark': $scope.prodottoOriginal.prodotto.m,
                                'sourceLine': $scope.prodottoOriginal.prodotto.l
                            }
                        ).success(function (data) {
                            $scope.errore.prodotto = false;
                            $scope.vm.saveProdottoData();
                            console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.prodotti, function (v) {
                                if (v.i == $scope.prodotto.i) {
                                    v.m = $scope.prodotto.m;
                                    v.l = $scope.prodotto.l;
                                    v.c = $scope.prodotto.c;
                                    v.n = $scope.prodotto.n;
                                    v.t = $scope.prodotto.t;
                                    v.d = $scope.prodotto.d;
                                    v.y = $scope.prodotto.y;
                                    v.x = $scope.prodotto.x;
                                    v.o = $scope.prodotto.o;
                                    v.a = $scope.prodotto.a;
                                    v.f = $scope.prodotto.f;
                                    v.z = $scope.prodotto.z;
                                    v.r = $scope.prodotto.r;
                                    $scope.prodotto = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                            $scope.errore.prodotto = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.prodotto = true;
                    }
                }
                if (type === 'C') {
                    if (!checkCopy() && checkPricesArray() === 0) {
                        $rootScope.saving = true;
                        $http.post('php/prodotti.php?type=new', {
                                'id': $scope.vm.nuovoProdotto.i,
                                'mark': $scope.prodotto.m,
                                'line': $scope.prodotto.l,
                                'cod': $scope.prodotto.c,
                                'title': $scope.prodotto.n,
                                'tbpr': $scope.prodotto.t,
                                'dim': $scope.prodotto.d,
                                'pos': $scope.prodotto.y,
                                'lnfn': $scope.prodotto.x,
                                'note': $scope.prodotto.o,
                                'abb': $scope.prodotto.a,
                                'fin': $scope.prodotto.f,
                                'prices': $scope.prodotto.z,
                                'image': $scope.prodotto.r,
                                'sourceCod': $scope.prodottoOriginal.prodotto.c,
                                'sourceMark': $scope.prodottoOriginal.prodotto.m,
                                'sourceLine': $scope.prodottoOriginal.prodotto.l
                            }
                        ).success(function (data) {
                            console.log('Risposta dalla pagina PHP', data);
                            var copiedProdotto = {
                                i: $scope.vm.nuovoProdotto.i,
                                m: $scope.prodotto.m,
                                l: $scope.prodotto.l,
                                c: $scope.prodotto.c,
                                n: $scope.prodotto.n,
                                t: $scope.prodotto.t,
                                d: $scope.prodotto.d,
                                y: $scope.prodotto.y,
                                x: $scope.prodotto.x,
                                o: $scope.prodotto.o,
                                a: $scope.prodotto.a,
                                f: $scope.prodotto.f,
                                z: $scope.prodotto.z
                            };

                            $scope.vm.prodotti.push(angular.copy(copiedProdotto));
                            $scope.vm.nuovoProdotto = {
                                i: $scope.vm.nuovoProdotto.i + 1
                            };
                            $scope.vm.saveProdottoData();
                            $rootScope.saving = false;
                            $scope.errore.prodotto = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.prodotto = true;
                    }
                }
                if (type === 'D') {
                    $rootScope.saving = true;
                    $http.post('php/prodotti.php?type=delete', {
                            'id': $scope.prodotto.i,
                            'mark': $scope.prodotto.m,
                            'line': $scope.prodotto.l,
                            'cod': $scope.prodotto.c,
                            'title': $scope.prodotto.n,
                            'tbpr': $scope.prodotto.t,
                            'dim': $scope.prodotto.d,
                            'pos': $scope.prodotto.y,
                            'lnfn': $scope.prodotto.x,
                            'note': $scope.prodotto.o,
                            'abb': $scope.prodotto.a,
                            'fin': $scope.prodotto.f,
                            'prices': $scope.prodotto.z,
                            'image': $scope.prodotto.r
                        }
                    ).success(function (data) {
                        console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.prodotti = _.filter($scope.vm.prodotti, function (list) {
                            return list.i != $scope.prodotto.i;
                        });
                        $scope.vm.saveProdottoData();
                        $scope.newProdotto();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
                if (type === 'A') {
                    $rootScope.saving = true;
                    $http.post('php/prodotti.php?type=deleteAll', {
                            'mark': $scope.prodotto.m,
                            'line': $scope.prodotto.l
                        }
                    ).success(function (data) {
                        console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.prodotti = _.filter($scope.vm.prodotti, function (list) {
                            return list.i != $scope.prodotto.i;
                        });
                        $scope.vm.saveProdottoData();
                        $scope.newProdotto();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('prodottiSettori', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/prodottiSettori.html',
        scope: {
            prodottoSettoreOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope, dataSvc) {
            $scope.$watch('prodottoSettoreOriginal', function (newVal) {
                $scope.prodottoSettore = angular.copy(newVal.prodottoSettore);
            });

            $scope.saveDataDB = function () {
                $rootScope.saving = true;
                $http.post('php/prodottiSettori.php?type=db').success(function () {
                    $rootScope.saving = false;
                    dataSvc.prodottiSettori().then(function (data) {
                        $scope.vm.prodottiSettori = data;
                    });
                }).error(function (data, status) {
                    console.log(status);
                });
            };

            $scope.errore = {
                prodottoSettore: false
            };

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.$watch('prodottoSettore', function (newVal) {
                $scope.prodottiAvailable = [
                    {
                        c: ' Tutti',
                        i: -1
                    },
                    {
                        c: $scope.prodottoSettore.n,
                        i: $scope.prodottoSettore.c
                    }
                ];
                var prodottiPerLinea = _.where($scope.vm.prodotti, {l: newVal.l});
                _.each(prodottiPerLinea, function (v) {
                    if (!_.find($scope.vm.prodottiSettori, function (list) {
                        return list.c === v.i
                    }))
                        $scope.prodottiAvailable.push(v);
                });
            });

            $scope.$watch('prodottoSettore.w', function (newVal) {
                $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l: newVal});
                _.each($scope.settoriAvailable, function (v) {
                    v.n = _.findWhere($scope.vm.settori, {i: v.h}).n;
                });
            });

            $scope.$watch('prodottoSettore.c', function (newVal) {
                if (newVal && newVal != -1) {
                    var prdList = _.find($scope.vm.prodotti, function (list) {
                        return list.i == newVal
                    });
                    $scope.prodottoSettore.n = prdList.c;
                }
            });

            $scope.selectedCat = function (ID) {
                return ($scope.prodottoSettore.h.indexOf(ID) != -1);
            };

            $scope.toggleSet = function (ID) {
                if ($scope.prodottoSettore.h.indexOf(ID) == -1) {
                    $scope.prodottoSettore.h.push(parseInt(ID));
                } else {
                    $scope.prodottoSettore.h.splice($scope.prodottoSettore.h.indexOf(ID), 1);
                }
            };

            $scope.updateCheck = function () {
                return ($scope.prodottoSettore.c == -1);
            };

            $scope.enableUpdate = false;
            $scope.$watchCollection('prodottoSettore.h', function (newVal) {
                if ($scope.prodottoSettore.i == $scope.prodottoSettoreOriginal.prodottoSettore.i && newVal != $scope.prodottoSettoreOriginal.h) {
                    $scope.enableUpdate = true;
                }
            });

            $scope.copyCheck = function () {
                return ($scope.prodottoSettore.c === -1 || $scope.prodottoSettore.c === $scope.prodottoSettoreOriginal.prodottoSettore.c);
            };

            function checkSetArray() {
                return $scope.prodottoSettore.h.length;
            }

            $scope.newProdottoSettore = function () {
                $rootScope.saving = false;
                $scope.errore.prodottoSettore = false;
                $scope.prodottoSettoreOriginal.selected = false;
                $scope.vm.nuovoProdottoSettore = {
                    i: $scope.vm.nuovoProdottoSettore.i + 1,
                    m: false,
                    l: false,
                    c: false,
                    h: []
                };
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (checkSetArray() != 0) {
                        $rootScope.saving = true;
                        $http.post('php/prodottiSettori.php?type=update', {
                                'id': $scope.prodottoSettore.i,
                                'cod': $scope.prodottoSettore.c,
                                'mark': $scope.prodottoSettore.m,
                                'line': $scope.prodottoSettore.l,
                                'nwln': $scope.prodottoSettore.w,
                                'array': $scope.prodottoSettore.h
                            }
                        ).success(function (data) {
                            //console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.prodottiSettori, function (v, k) {
                                if (v.i == $scope.prodottoSettore.i) {
                                    v.c = $scope.prodottoSettore.c;
                                    v.n = $scope.prodottoSettore.n;
                                    v.m = $scope.prodottoSettore.m;
                                    v.l = $scope.prodottoSettore.l;
                                    v.w = $scope.prodottoSettore.w;
                                    v.h = $scope.prodottoSettore.h;
                                    $scope.prodottoSettore = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                            $scope.errore.prodottoSettore = false;
                            $scope.vm.saveProdottoSettoreData();
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.prodottoSettore = true;
                    }
                }
                if (type == 'C') {
                    if (checkSetArray() != 0) {
                        $rootScope.saving = true;
                        $http.post('php/prodottiSettori.php?type=new', {
                                'id': $scope.vm.nuovoProdottoSettore.i,
                                'cod': $scope.prodottoSettore.c,
                                'mark': $scope.prodottoSettore.m,
                                'line': $scope.prodottoSettore.l,
                                'nwln': $scope.prodottoSettore.w,
                                'array': $scope.prodottoSettore.h
                            }
                        ).success(function (data) {
                            //console.log('Risposta dalla pagina PHP', data);
                            $scope.vm.copiedProdottoSettore = {
                                i: $scope.vm.nuovoProdottoSettore.i,
                                c: $scope.prodottoSettore.c,
                                n: $scope.prodottoSettore.n,
                                m: $scope.prodottoSettore.m,
                                l: $scope.prodottoSettore.l,
                                w: $scope.prodottoSettore.w,
                                h: $scope.prodottoSettore.h

                            };
                            $scope.vm.prodottiSettori.push($scope.vm.copiedProdottoSettore);
                            $scope.vm.nuovoProdottoSettore = {
                                i: $scope.vm.nuovoProdottoSettore.i + 1
                            };
                            $scope.vm.saveProdottoSettoreData();
                            $rootScope.saving = false;
                            $scope.errore.prodottoSettore = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.prodottoSettore = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/prodottiSettori.php?type=delete', {
                            'id': $scope.prodottoSettore.i,
                            'cod': $scope.prodottoSettore.c,
                            'mark': $scope.prodottoSettore.m,
                            'line': $scope.prodottoSettore.l,
                            'nwln': $scope.prodottoSettore.w,
                            'array': $scope.prodottoSettore.h
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        if ($scope.prodottoSettore.c != -1) {
                            $scope.vm.prodottiSettori = _.filter($scope.vm.prodottiSettori, function (list) {
                                return list.i != $scope.prodottoSettore.i;
                            });
                            $scope.vm.saveProdottoSettoreData();
                        } else {
                            $scope.saveDataDB();
                        }
                        $scope.newProdottoSettore();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('vetrine', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/vetrine.html',
        scope: {
            vetrinaOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {

            $scope.errore = {
                vetrina: false
            };

            function convertMark(IDS) {
                _.each($scope.vm.marchi, function (v) {
                    if (v.i == IDS) {
                        markByName = v.n;
                    }
                });
                return markByName;
            }

            function convertLine(IDS) {
                _.each($scope.vm.linee, function (v) {
                    if (v.i == IDS) {
                        lineByName = v.n;
                    }
                });
                return lineByName;
            }

            $scope.generateSettoriInLinea = function (id) {
                if (id) {
                    var array = [];
                    var settori = _.find($scope.vm.linee, function (num) {
                        return num.i === id
                    }).q;
                    _.each(settori, function (v) {
                        var settore = _.find($scope.vm.settori, function (num) {
                            return num.i === v;
                        }).n;
                        array.push({i: v, n: settore});
                    });
                    return array;
                }
            };

            $scope.selectedCat = function (ID) {
                console.log($scope.vetrina)
                return ($scope.vetrina.s.indexOf(ID) != -1);
            };

            $scope.toggleSet = function (ID) {
                if ($scope.vetrina.s.indexOf(ID) == -1) {
                    $scope.vetrina.s.push(parseInt(ID));
                } else {
                    $scope.vetrina.s.splice($scope.vetrina.s.indexOf(ID), 1);
                }
            };

            function replaceAll(string, find, replace) {
                return string.replace(new RegExp(find, 'g'), replace);
            }

            $scope.$watch('vetrinaOriginal', function (newVal) {
                $scope.vetrina = angular.copy(newVal.vetrina);

                var markName = convertMark($scope.vetrina.m);
                var lineName = convertLine($scope.vetrina.l);
                markName = replaceAll(markName, ' ', '_');
                lineName = replaceAll(lineName, ' ', '_');
                var fileName = lineName + '_' + $scope.vetrina.c + '.jpg';
                $scope.vetrina.r = '../dashboard/archivio_dati/' + markName + '/' + lineName + '/Vetrina/' + fileName;
            });

            $scope.settoriInLinea = false;

            $scope.$watch('vetrina.l', function (n) {
                $scope.settoriInLinea = $scope.generateSettoriInLinea(n);
            });

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (
                    !$scope.vetrina.c ||
                    !$scope.vetrina.n ||
                    !$scope.vetrina.m ||
                    !$scope.vetrina.l ||
                    !$scope.vetrina.r ||
                    !$scope.vetrina.s ||
                    isNaN($scope.vetrina.y)
                );
            };

            $scope.deleteCheck = function () {
                return (
                    $scope.vetrina.c !== $scope.vetrinaOriginal.vetrina.c ||
                    $scope.vetrina.m !== $scope.vetrinaOriginal.vetrina.m ||
                    $scope.vetrina.l !== $scope.vetrinaOriginal.vetrina.l
                )
            };

            $scope.copyCheck = function () {
                return (
                    !$scope.vetrina.c ||
                    !$scope.vetrina.m ||
                    !$scope.vetrina.l ||
                    ($scope.vetrina.c === $scope.vetrinaOriginal.vetrina.c &&
                        $scope.vetrina.l === $scope.vetrinaOriginal.vetrina.l)
                );
            };

            var checkVetrina = function () {
                if ($scope.vetrina.c != $scope.vetrinaOriginal.vetrina.c || $scope.vetrina.l != $scope.vetrinaOriginal.vetrina.l) {
                    return _.findWhere($scope.vm.vetrine, {c: $scope.vetrina.c, l: $scope.vetrina.l});
                } else {
                    return false;
                }
            };

            var checkCopy = function () {
                return _.findWhere($scope.vm.vetrine, {c: $scope.vetrina.c, m: $scope.vetrina.m, l: $scope.vetrina.l});
            };

            /*
            function checkSetArray() {
                return $scope.vetrina.h.length;
            }
*/

            $scope.newVetrina = function () {
                $rootScope.saving = false;
                $scope.errore.vetrina = false;
                $scope.vetrinaOriginal.selected = false;
                $scope.vm.nuovaVetrina = {
                    i: $scope.vm.nuovaVetrina.i + 1,
                    m: false,
                    l: false,
                    s: false,
                    y: 1,
                    // h : []
                    v: 1
                };
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (!checkVetrina()) {
                        $rootScope.saving = true;
                        $http.post('php/vetrine.php?type=update', {
                                'id': $scope.vetrina.i,
                                'mark': $scope.vetrina.m,
                                'line': $scope.vetrina.l,
                                'cod': $scope.vetrina.c,
                                'title': $scope.vetrina.n,
                                'show': $scope.vetrina.v,
                                'pos': $scope.vetrina.y,
                                'note': $scope.vetrina.o,
                                'settore': $scope.vetrina.s,
                                // 'array'     :   $scope.vetrina.h,
                                'image': $scope.vetrina.r,
                                'sourceCod': $scope.vetrinaOriginal.vetrina.c,
                                'sourceMark': $scope.vetrinaOriginal.vetrina.m,
                                'sourceLine': $scope.vetrinaOriginal.vetrina.l
                            }
                        ).success(function (data) {
                            $scope.errore.vetrina = false;
                            $scope.vm.saveVetrinaData();
                            console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.vetrine, function (v) {
                                if (v.i == $scope.vetrina.i) {
                                    v.m = $scope.vetrina.m;
                                    v.l = $scope.vetrina.l;
                                    v.c = $scope.vetrina.c;
                                    v.n = $scope.vetrina.n;
                                    v.s = $scope.vetrina.s;
                                    // v.h = $scope.vetrina.h;
                                    v.v = $scope.vetrina.v;
                                    v.y = $scope.vetrina.y;
                                    v.o = $scope.vetrina.o;
                                    v.r = $scope.vetrina.r;
                                    $scope.vetrina = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                            $scope.errore.vetrina = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.vetrina = true;
                    }
                }
                if (type == 'C') {
                    if (!checkCopy()) {
                        $rootScope.saving = true;
                        $http.post('php/vetrine.php?type=new', {
                                'id': $scope.vm.nuovaVetrina.i,
                                'mark': $scope.vetrina.m,
                                'line': $scope.vetrina.l,
                                'cod': $scope.vetrina.c,
                                'title': $scope.vetrina.n,
                                'show': $scope.vetrina.v,
                                'pos': $scope.vetrina.y,
                                'note': $scope.vetrina.o,
                                'settore': $scope.vetrina.s,
                                // 'array'     :   $scope.vetrina.h,
                                'image': $scope.vetrina.r,
                                'sourceCod': $scope.vetrinaOriginal.vetrina.c,
                                'sourceMark': $scope.vetrinaOriginal.vetrina.m,
                                'sourceLine': $scope.vetrinaOriginal.vetrina.l
                            }
                        ).success(function (data) {
                            console.log('Risposta dalla pagina PHP', data);
                            $scope.vm.copiedVetrina = {
                                i: $scope.vm.nuovoProdotto.i,
                                m: $scope.vetrina.m,
                                l: $scope.vetrina.l,
                                c: $scope.vetrina.c,
                                n: $scope.vetrina.n,
                                s: $scope.vetrina.s,
                                // h :   $scope.vetrina.h,
                                v: $scope.vetrina.v,
                                y: $scope.vetrina.y,
                                o: $scope.vetrina.o
                            };
                            $scope.vm.vetrine.push($scope.vm.copiedVetrina);
                            $scope.vm.nuovaVetrina = {
                                i: $scope.vm.nuovaVetrina.i + 1
                            };
                            $scope.vm.saveVetrinaData();
                            $rootScope.saving = false;
                            $scope.errore.vetrina = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.vetrina = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/vetrine.php?type=delete', {
                            'id': $scope.vetrina.i,
                            'mark': $scope.vetrina.m,
                            'line': $scope.vetrina.l,
                            'cod': $scope.vetrina.c,
                            'title': $scope.vetrina.n,
                            'show': $scope.vetrina.v,
                            'pos': $scope.vetrina.y,
                            'note': $scope.vetrina.o,
                            'settore': $scope.vetrina.s,
                            // 'array'     :   $scope.vetrina.h,
                            'image': $scope.vetrina.r
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.vetrine = _.filter($scope.vm.vetrine, function (list) {
                            return list.i != $scope.vetrina.i;
                        });
                        $scope.vm.saveVetrinaData();
                        $scope.newVetrina();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('vetrineProdotti', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/vetrineProdotti.html',
        scope: {
            vetrinaProdottoOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {
            $scope.$watch('vetrinaProdottoOriginal', function (newVal) {
                $scope.vetrinaProdotto = angular.copy(newVal.vetrinaProdotto);
            });

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.$watch('vetrinaProdotto.p', function (newVal, oldVal) {
                if (newVal != oldVal && $scope.vetrinaProdottoOriginal.i == $scope.vetrinaProdotto) $scope.vetrinaProdotto.u = false;
                if (newVal) {
                    var prodotto = _.findWhere($scope.vm.prodotti, {i: newVal});
                    var idsList = _.pluck(prodotto.z, 'a');
                    $scope.tabsAvailable = [];
                    for (var i = 0; i < idsList.length; i++) {
                        var tab = _.findWhere($scope.vm.finitureTabelle, {i: idsList[i]});
                        $scope.tabsAvailable.push({'i': idsList[i], 'n': tab.n});
                    }
                    return $scope.tabsAvailable;
                }
            });

            $scope.$watch('vetrinaProdotto.u', function (newVal, oldVal) {
                if (newVal != oldVal && $scope.vetrinaProdottoOriginal.i == $scope.vetrinaProdotto) $scope.vetrinaProdotto.f = false;
                if (newVal) {
                    $scope.finsAvailable = _.where($scope.vm.abbinamenti, {u: newVal});
                    return $scope.finsAvailable;
                }
            });

            $scope.newVetrinaProdotto = function () {
                $rootScope.saving = false;
                $scope.vetrinaProdotto = {
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
                    !$scope.vetrinaProdotto.c ||
                    !$scope.vetrinaProdotto.p ||
                    !$scope.vetrinaProdotto.l ||
                    !$scope.vetrinaProdotto.j ||
                    !$scope.vetrinaProdotto.u ||
                    !$scope.vetrinaProdotto.f ||
                    isNaN($scope.vetrinaProdotto.y) ||
                    isNaN($scope.vetrinaProdotto.q)
                );
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    $rootScope.saving = true;
                    $http.post('php/vetrineProdotti.php?type=update', {
                            'id': $scope.vetrinaProdotto.i,
                            'comp': $scope.vetrinaProdotto.c,
                            'prd': $scope.vetrinaProdotto.p,
                            'pline': $scope.vetrinaProdotto.l,
                            'cline': $scope.vetrinaProdotto.j,
                            'pmark': $scope.vetrinaProdotto.m,
                            'cmark': $scope.vetrinaProdotto.k,
                            'fin': $scope.vetrinaProdotto.f,
                            'tab': $scope.vetrinaProdotto.u,
                            'pos': $scope.vetrinaProdotto.y,
                            'qnt': $scope.vetrinaProdotto.q
                        }
                    ).success(function (data) {
                        $scope.vm.saveVetrineProdottiData();
                        console.log('Risposta dalla pagina PHP', data);
                        _.each($scope.vm.vetrineProdotti, function (v) {
                            if (v.i == $scope.vetrinaProdotto.i) {
                                v.c = $scope.vetrinaProdotto.c;
                                v.p = $scope.vetrinaProdotto.p;
                                v.l = $scope.vetrinaProdotto.l;
                                v.j = $scope.vetrinaProdotto.j;
                                v.m = $scope.vetrinaProdotto.m;
                                v.k = $scope.vetrinaProdotto.k;
                                v.f = $scope.vetrinaProdotto.f;
                                v.u = $scope.vetrinaProdotto.u;
                                v.y = $scope.vetrinaProdotto.y;
                                v.q = $scope.vetrinaProdotto.q;
                                $scope.vetrinaProdotto = angular.copy(v);
                            }
                        });
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
                if (type == 'C') {
                    $rootScope.saving = true;
                    $http.post('php/vetrineProdotti.php?type=new', {
                            'id': $scope.vm.nuovoVetrinaProdotto.i,
                            'comp': $scope.vetrinaProdotto.c,
                            'prd': $scope.vetrinaProdotto.p,
                            'pline': $scope.vetrinaProdotto.l,
                            'cline': $scope.vetrinaProdotto.j,
                            'pmark': $scope.vetrinaProdotto.m,
                            'cmark': $scope.vetrinaProdotto.k,
                            'fin': $scope.vetrinaProdotto.f,
                            'tab': $scope.vetrinaProdotto.u,
                            'pos': $scope.vetrinaProdotto.y,
                            'qnt': $scope.vetrinaProdotto.q
                        }
                    ).success(function (data) {
                        console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.copiedVetrinaProdotto = {
                            i: $scope.vm.nuovoVetrinaProdotto.i,
                            c: $scope.vetrinaProdotto.c,
                            p: $scope.vetrinaProdotto.p,
                            l: $scope.vetrinaProdotto.l,
                            j: $scope.vetrinaProdotto.j,
                            m: $scope.vetrinaProdotto.m,
                            k: $scope.vetrinaProdotto.k,
                            f: $scope.vetrinaProdotto.f,
                            u: $scope.vetrinaProdotto.u,
                            y: $scope.vetrinaProdotto.y,
                            q: $scope.vetrinaProdotto.q

                        };
                        $scope.vm.vetrineProdotti.push($scope.vm.copiedVetrinaProdotto);
                        $scope.vm.nuovoVetrinaProdotto = {
                            i: $scope.vm.nuovoVetrinaProdotto.i + 1
                        };
                        $scope.vm.saveVetrineProdottiData();
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/vetrineProdotti.php?type=delete', {
                            'id': $scope.vetrinaProdotto.i,
                            'comp': $scope.vetrinaProdotto.c,
                            'prd': $scope.vetrinaProdotto.p,
                            'pline': $scope.vetrinaProdotto.l,
                            'cline': $scope.vetrinaProdotto.j,
                            'pmark': $scope.vetrinaProdotto.m,
                            'cmark': $scope.vetrinaProdotto.k,
                            'fin': $scope.vetrinaProdotto.f,
                            'tab': $scope.vetrinaProdotto.u,
                            'pos': $scope.vetrinaProdotto.y,
                            'qnt': $scope.vetrinaProdotto.q
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.vetrineProdotti = _.filter($scope.vm.vetrineProdotti, function (list) {
                            return list.i != $scope.vetrinaProdotto.i;
                        });
                        $scope.vm.saveVetrineProdottiData();
                        $scope.newVetrinaProdotto();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('nazioni', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/nazioni.html',
        scope: {
            cat: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {
            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (!$scope.cat.n || !$scope.cat.x);
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    $rootScope.saving = true;
                    $http.post('php/nazioni.php?type=update', {
                            'id': $scope.cat.i,
                            'nome': $scope.cat.n,
                            'show': $scope.cat.v,
                            'prx': $scope.cat.x
                        }
                    ).success(function (data) {
                        $scope.vm.saveNazioniData();
                        //console.log('Risposta dalla pagina PHP', data);
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/nazioni.php?type=delete', {
                            'id': $scope.cat.i,
                            'nome': $scope.cat.n,
                            'show': $scope.cat.v,
                            'prx': $scope.cat.x
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.nazioni = _.filter($scope.vm.nazioni, function (list) {
                            return list.i != $scope.cat.i;
                        });
                        $scope.vm.saveNazioniData();
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('regioni', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/regioni.html',
        scope: {
            regioneOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {
            $scope.$watch('regioneOriginal', function (newVal) {
                $scope.regione = angular.copy(newVal.regione);
            });

            $scope.errore = {
                regione: false
            };

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (!$scope.regione.n || !$scope.regione.z);
            };

            $scope.newItem = function () {
                $scope.regioneOriginal.selected = false;
                $scope.errore.regione = false;
                $rootScope.saving = false;
                $scope.vm.nuovaRegione = {
                    i: $scope.vm.nuovaRegione.i + 1,
                    z: false
                }
            };

            var checkExist = function () {
                return _.findWhere($scope.vm.regioni, {n: $scope.regione.n, z: $scope.regione.z});
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (!checkExist()) {
                        $rootScope.saving = true;
                        $http.post('php/regioni.php?type=update', {
                                'id': $scope.regione.i,
                                'nome': $scope.regione.n,
                                'nazione': $scope.regione.z
                            }
                        ).success(function (data) {
                            $scope.vm.saveRegioniData();
                            //console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.regioni, function (v) {
                                if (v.i == $scope.regione.i) {
                                    v.n = $scope.regione.n;
                                    v.z = $scope.regione.z;
                                    $scope.regione = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.regione = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/regioni.php?type=delete', {
                            'id': $scope.regione.i,
                            'nome': $scope.regione.n,
                            'nazioni': $scope.regione.z
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.regioni = _.filter($scope.vm.regioni, function (list) {
                            return list.i != $scope.regione.i;
                        });
                        $scope.vm.saveRegioniData();
                        $scope.newItem();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('province', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/province.html',
        scope: {
            provinciaOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {
            $scope.$watch('provinciaOriginal', function (newVal) {
                $scope.provincia = angular.copy(newVal.provincia);
            });

            $scope.errore = {
                provincia: false
            };

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            var updateCheck = function () {
                return (!$scope.provincia.n || !$scope.provincia.z);
            };

            $scope.copyCheck = function () {
                return (
                    !$scope.provincia.n ||
                    !$scope.provincia.c ||
                    !$scope.provincia.r ||
                    !$scope.provincia.z ||
                    $scope.provincia.n === $scope.provinciaOriginal.provincia.n);
            };

            var checkExist = function () {
                return _.findWhere($scope.vm.province, {
                    n: $scope.provincia.n,
                    c: $scope.provincia.c,
                    z: $scope.provincia.z,
                    r: $scope.provincia.r
                });
            };

            $scope.newItem = function () {
                $rootScope.saving = false;
                $scope.provinciaOriginal.selected = false;
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

            $scope.action = function (type) {
                if (type == 'U') {
                    if (!updateCheck()) {
                        $rootScope.saving = true;
                        $http.post('php/province.php?type=update', {
                                'id': $scope.provincia.i,
                                'nome': $scope.provincia.n,
                                'sigla': $scope.provincia.c,
                                'nazione': $scope.provincia.z,
                                'regione': $scope.provincia.r,
                                'trasporto': $scope.provincia.t,
                                'trasporto_type': $scope.provincia.j,
                                'montaggio': $scope.provincia.m,
                                'montaggio_type': $scope.provincia.k,
                                'limite': $scope.provincia.l,
                                'minimo': $scope.provincia.b
                            }
                        ).success(function (data) {
                            $scope.vm.saveProvinceData();
                            //console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.province, function (v) {
                                if (v.i == $scope.provincia.i) {
                                    v.n = $scope.provincia.n;
                                    v.c = $scope.provincia.c;
                                    v.z = $scope.provincia.z;
                                    v.r = $scope.provincia.r;
                                    v.t = $scope.provincia.t;
                                    v.j = $scope.provincia.j;
                                    v.m = $scope.provincia.m;
                                    v.k = $scope.provincia.k;
                                    v.l = $scope.provincia.l;
                                    v.b = $scope.provincia.b;
                                    $scope.provincia = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.provincia = true;
                    }
                }
                if (type == 'C') {
                    if (!checkExist()) {
                        $rootScope.saving = true;
                        $http.post('php/province.php?type=new', {
                                'id': $scope.vm.nuovaProvincia.i + 1,
                                'nome': $scope.provincia.n,
                                'sigla': $scope.provincia.c,
                                'nazione': $scope.provincia.z,
                                'regione': $scope.provincia.r,
                                'trasporto': $scope.provincia.t,
                                'trasporto_type': $scope.provincia.j,
                                'montaggio': $scope.provincia.m,
                                'montaggio_type': $scope.provincia.k,
                                'limite': $scope.provincia.l,
                                'minimo': $scope.provincia.b
                            }
                        ).success(function (data) {
                            //console.log('Risposta dalla pagina PHP', data);
                            $scope.vm.copiedProvincia = {
                                i: $scope.vm.nuovaProvincia.i,
                                n: $scope.provincia.n,
                                c: $scope.provincia.c,
                                z: $scope.provincia.z,
                                r: $scope.provincia.r,
                                t: $scope.provincia.t,
                                j: $scope.provincia.j,
                                m: $scope.provincia.m,
                                k: $scope.provincia.k,
                                l: $scope.provincia.l,
                                b: $scope.provincia.b
                            };
                            $scope.vm.province.push($scope.vm.copiedProvincia);
                            $scope.vm.nuovaProvincia = {
                                i: $scope.vm.nuovaProvincia.i + 1
                            };
                            $scope.vm.saveProvinceData();
                            $rootScope.saving = false;
                            $scope.errore.provincia = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.provincia = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/province.php?type=delete', {
                            'id': $scope.provincia.i,
                            'nome': $scope.provincia.n,
                            'sigla': $scope.provincia.c,
                            'nazione': $scope.provincia.z,
                            'regione': $scope.provincia.r,
                            'trasporto': $scope.provincia.t,
                            'trasporto_type': $scope.provincia.j,
                            'montaggio': $scope.provincia.m,
                            'montaggio_type': $scope.provincia.k,
                            'limite': $scope.provincia.l,
                            'minimo': $scope.provincia.b
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.province = _.filter($scope.vm.province, function (list) {
                            return list.i != $scope.provincia.i;
                        });
                        $scope.vm.saveProvinceData();
                        $scope.newItem();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('convenzioni', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/convenzioni.html',
        scope: {
            cat: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {
            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (!$scope.cat.n);
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    $rootScope.saving = true;
                    $http.post('php/convenzioni.php?type=update', {
                            'id': $scope.cat.i,
                            'nome': $scope.cat.n,
                            'email': $scope.cat.e
                        }
                    ).success(function (data) {
                        $scope.vm.saveConvenzioniData();
                        //console.log('Risposta dalla pagina PHP', data);
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/convenzioni.php?type=delete', {
                            'id': $scope.cat.i,
                            'nome': $scope.cat.n,
                            'email': $scope.cat.e
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.convenzioni = _.filter($scope.vm.convenzioni, function (list) {
                            return list.i != $scope.cat.i;
                        });
                        $scope.vm.saveConvenzioniData();
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

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
});

angular.module("mpuDashboard").directive('rivenditori', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/rivenditori.html',
        scope: {
            rivenditoreOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {

            $scope.errore = {
                rivenditore: false
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

            $scope.$watch('rivenditoreOriginal', function (newVal) {
                $scope.rivenditore = angular.copy(newVal.rivenditore);
                var fileName = $scope.rivenditore.i + '.jpg';
                $scope.rivenditore.g = '../dashboard/archivio_dati/Rivenditori/' + fileName;
            });

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (
                    (
                        (
                            !$scope.rivenditore.z ||    //nazione
                            !$scope.rivenditore.r ||    //regione
                            !$scope.rivenditore.p       //provincia
                        ) &&
                        !$scope.rivenditore.v
                    ) ||
                    !$scope.rivenditore.n ||    //nome società
                    !$scope.rivenditore.x ||    //referente
                    !$scope.rivenditore.s ||    //sede
                    (
                        !$scope.rivenditore.h &&    //telefono
                        !$scope.rivenditore.c       //cellulare
                    ) ||
                    !$scope.rivenditore.e ||    //email
                    !$scope.rivenditore.w ||    //password
                    !$scope.rivenditore.g       //immagine
                );
            };

            $scope.copyCheck = function () {
                if (!$scope.rivenditore.v) {
                    return (
                        !$scope.rivenditore.z ||
                        !$scope.rivenditore.r ||
                        !$scope.rivenditore.p ||
                        !$scope.rivenditore.n ||
                        !$scope.rivenditore.x ||
                        !$scope.rivenditore.s ||
                        (
                            !$scope.rivenditore.t &&
                            !$scope.rivenditore.c
                        ) ||
                        !$scope.rivenditore.e ||
                        !$scope.rivenditore.w ||
                        (
                            $scope.rivenditore.p === $scope.rivenditoreOriginal.rivenditore.p
                        )
                    );
                } else {
                    return (
                        !$scope.rivenditore.n ||
                        !$scope.rivenditore.x ||
                        !$scope.rivenditore.s ||
                        (
                            !$scope.rivenditore.t &&
                            !$scope.rivenditore.c
                        ) ||
                        !$scope.rivenditore.e ||
                        !$scope.rivenditore.w ||
                        (
                            $scope.rivenditore.n === $scope.rivenditoreOriginal.rivenditore.n
                        )
                    );
                }
            };

            var checkUpdate = function () {
                if ($scope.rivenditore.p && $scope.rivenditore.p != $scope.rivenditoreOriginal.rivenditore.p) {
                    return _.findWhere($scope.vm.rivenditori, {p: $scope.rivenditore.p});
                } else {
                    return false;
                }
            };

            var checkCopy = function () {
                if ($scope.rivenditore.p) return _.findWhere($scope.vm.rivenditori, {p: $scope.rivenditore.p});
            };

            $scope.openMarchi = function () {
                $scope.vm.mv = !$scope.vm.mv;
            };

            var markManager = function () {
                $scope.vm.mv = false;
                $scope.vm.nuovoRivenditore.y = angular.copy($scope.vm.marchi);
                _.each($scope.vm.nuovoRivenditore.y, function (v) {
                    v.s = 0;
                    delete v.n;
                    delete v.b;
                    delete v.g;
                });
                return $scope.vm.nuovoRivenditore.y;
            };

            markManager();

            $scope.newItem = function () {
                $rootScope.saving = false;
                $scope.errore.rivenditore = false;
                $scope.rivenditoreOriginal.selected = false;
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
                    //o : [0, 0]
                };
                markManager();
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (!checkUpdate()) {
                        $rootScope.saving = true;
                        $http.post('php/rivenditori.php?type=update', {
                                'id': $scope.rivenditore.i,
                                'nome': $scope.rivenditore.n,
                                'naz': $scope.rivenditore.z,
                                'reg': $scope.rivenditore.r,
                                'prov': $scope.rivenditore.p,
                                'conv': $scope.rivenditore.v,
                                'rif': $scope.rivenditore.x,
                                'sede': $scope.rivenditore.s,
                                'tel': $scope.rivenditore.h,
                                'fax': $scope.rivenditore.f,
                                'cell': $scope.rivenditore.c,
                                'web': $scope.rivenditore.q,
                                'email': $scope.rivenditore.e,
                                'psw': $scope.rivenditore.w,
                                'limite': $scope.rivenditore.l,
                                'minimo': $scope.rivenditore.b,
                                'trasporto': $scope.rivenditore.t,
                                'trasporto_type': $scope.rivenditore.j,
                                'montaggio': $scope.rivenditore.m,
                                'montaggio_type': $scope.rivenditore.k,
                                'mark': $scope.rivenditore.y,
                                'coords': $scope.rivenditore.o,
                                'notes': $scope.rivenditore.a,
                                'image': $scope.rivenditore.g
                            }
                        ).success(function (data) {
                            $scope.errore.rivenditore = false;
                            $scope.vm.saveRivenditoreData();
                            console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.rivenditori, function (v) {
                                if (v.i == $scope.rivenditore.i) {
                                    v.n = $scope.rivenditore.n;
                                    v.z = $scope.rivenditore.z;
                                    v.r = $scope.rivenditore.r;
                                    v.p = $scope.rivenditore.p;
                                    v.v = $scope.rivenditore.v;
                                    v.r = $scope.rivenditore.r;
                                    v.s = $scope.rivenditore.s;
                                    v.h = $scope.rivenditore.h;
                                    v.f = $scope.rivenditore.f;
                                    v.c = $scope.rivenditore.c;
                                    v.q = $scope.rivenditore.q;
                                    v.e = $scope.rivenditore.e;
                                    v.w = $scope.rivenditore.w;
                                    v.l = $scope.rivenditore.l;
                                    v.b = $scope.rivenditore.b;
                                    v.t = $scope.rivenditore.t;
                                    v.j = $scope.rivenditore.j;
                                    v.m = $scope.rivenditore.m;
                                    v.k = $scope.rivenditore.k;
                                    v.y = $scope.rivenditore.y;
                                    v.o = $scope.rivenditore.o;
                                    v.a = $scope.rivenditore.a;
                                    v.g = $scope.rivenditore.g;
                                    $scope.rivenditore = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                            $scope.errore.rivenditore = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.rivenditore = true;
                    }
                }
                if (type == 'C') {
                    if (!checkCopy()) {
                        $rootScope.saving = true;
                        $http.post('php/rivenditori.php?type=new', {
                                'id': $scope.vm.nuovoRivenditore.i + 1,
                                'nome': $scope.rivenditore.n,
                                'naz': $scope.rivenditore.z,
                                'reg': $scope.rivenditore.r,
                                'prov': $scope.rivenditore.p,
                                'conv': $scope.rivenditore.v,
                                'rif': $scope.rivenditore.x,
                                'sede': $scope.rivenditore.s,
                                'tel': $scope.rivenditore.h,
                                'fax': $scope.rivenditore.f,
                                'cell': $scope.rivenditore.c,
                                'web': $scope.rivenditore.q,
                                'email': $scope.rivenditore.e,
                                'psw': $scope.rivenditore.w,
                                'limite': $scope.rivenditore.l,
                                'minimo': $scope.rivenditore.b,
                                'trasporto': $scope.rivenditore.t,
                                'trasporto_type': $scope.rivenditore.j,
                                'montaggio': $scope.rivenditore.m,
                                'montaggio_type': $scope.rivenditore.k,
                                'mark': $scope.rivenditore.y,
                                'coords': $scope.rivenditore.o,
                                'notes': $scope.rivenditore.a,
                                'image': $scope.rivenditore.g,
                                'sourceID': $scope.rivenditoreOriginal.rivenditore.i
                            }
                        ).success(function (data) {
                            //console.log('Risposta dalla pagina PHP', data);
                            $scope.vm.copiedRivenditore = {
                                i: $scope.vm.nuovoRivenditore.i + 1,
                                n: $scope.rivenditore.n,
                                z: $scope.rivenditore.z,
                                r: $scope.rivenditore.r,
                                p: $scope.rivenditore.p,
                                v: $scope.rivenditore.v,
                                x: $scope.rivenditore.x,
                                s: $scope.rivenditore.s,
                                h: $scope.rivenditore.h,
                                f: $scope.rivenditore.f,
                                c: $scope.rivenditore.c,
                                q: $scope.rivenditore.q,
                                e: $scope.rivenditore.e,
                                w: $scope.rivenditore.w,
                                l: $scope.rivenditore.l,
                                b: $scope.rivenditore.b,
                                t: $scope.rivenditore.t,
                                j: $scope.rivenditore.j,
                                m: $scope.rivenditore.m,
                                k: $scope.rivenditore.k,
                                y: $scope.rivenditore.y,
                                o: $scope.rivenditore.o,
                                a: $scope.rivenditore.a
                            };
                            $scope.vm.rivenditori.push($scope.vm.copiedRivenditore);
                            $scope.vm.nuovoRivenditore = {
                                i: $scope.vm.nuovoRivenditore.i + 1
                            };
                            $scope.vm.saveRivenditoreData();
                            $rootScope.saving = false;
                            $scope.errore.rivenditore = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.rivenditore = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/rivenditori.php?type=delete', {
                            'id': $scope.rivenditore.i,
                            'nome': $scope.rivenditore.n,
                            'naz': $scope.rivenditore.z,
                            'reg': $scope.rivenditore.r,
                            'prov': $scope.rivenditore.p,
                            'conv': $scope.rivenditore.v,
                            'rif': $scope.rivenditore.r,
                            'sede': $scope.rivenditore.s,
                            'tel': $scope.rivenditore.h,
                            'fax': $scope.rivenditore.f,
                            'cell': $scope.rivenditore.c,
                            'web': $scope.rivenditore.q,
                            'email': $scope.rivenditore.e,
                            'psw': $scope.rivenditore.w,
                            'limite': $scope.rivenditore.l,
                            'minimo': $scope.rivenditore.b,
                            'trasporto': $scope.rivenditore.t,
                            'trasporto_type': $scope.rivenditore.j,
                            'montaggio': $scope.rivenditore.m,
                            'montaggio_type': $scope.rivenditore.k,
                            'mark': $scope.rivenditore.y,
                            'coords': $scope.rivenditore.o,
                            'notes': $scope.rivenditore.a,
                            'image': $scope.rivenditore.g
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.rivenditori = _.filter($scope.vm.rivenditori, function (list) {
                            return list.i != $scope.rivenditore.i;
                        });
                        $scope.vm.saveRivenditoreData();
                        $scope.newItem();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('esposizioni', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/esposizioni.html',
        scope: {
            esposizioneOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {

            $scope.errore = {
                esposizione: false
            };

            function convertMark(IDS) {
                _.each($scope.vm.marchi, function (v) {
                    if (v.i == IDS) {
                        markByName = v.n;
                    }
                });
                return markByName;
            }

            function convertLine(IDS) {
                _.each($scope.vm.linee, function (v) {
                    if (v.i == IDS) {
                        lineByName = v.n;
                    }
                });
                return lineByName;
            }

            function replaceAll(string, find, replace) {
                return string.replace(new RegExp(find, 'g'), replace);
            }

            $scope.$watch('esposizioneOriginal', function (newVal) {
                $scope.esposizione = angular.copy(newVal.esposizione);

                var markName = convertMark($scope.esposizione.m);
                var lineName = convertLine($scope.esposizione.l);
                markName = replaceAll(markName, ' ', '_');
                lineName = replaceAll(lineName, ' ', '_');
                var finName = replaceAll($scope.esposizione.f, ' ', '_');
                var fileName = lineName + '_' + $scope.esposizione.c + '_' + finName + '.jpg';
                $scope.esposizione.r = '../dashboard/archivio_dati/' + markName + '/' + lineName + '/Render/' + fileName;
            });

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (
                    !$scope.esposizione.c ||
                    !$scope.esposizione.f ||
                    !$scope.esposizione.m ||
                    !$scope.esposizione.l ||
                    !$scope.esposizione.t ||
                    !$scope.esposizione.r ||
                    isNaN($scope.esposizione.y)
                );
            };

            $scope.deleteCheck = function () {
                return (
                    $scope.esposizione.c !== $scope.esposizioneOriginal.esposizione.c ||
                    $scope.esposizione.m !== $scope.esposizioneOriginal.esposizione.m ||
                    $scope.esposizione.l !== $scope.esposizioneOriginal.esposizione.l ||
                    $scope.esposizione.f !== $scope.esposizioneOriginal.esposizione.f
                );
            };

            $scope.copyCheck = function () {
                return (
                    !$scope.esposizione.c ||
                    !$scope.esposizione.m ||
                    !$scope.esposizione.l ||
                    !$scope.esposizione.f ||
                    ($scope.esposizione.c === $scope.esposizioneOriginal.esposizione.c &&
                        $scope.esposizione.l === $scope.esposizioneOriginal.esposizione.l &&
                        $scope.esposizione.f === $scope.esposizioneOriginal.esposizione.f)
                );
            };

            var checkUpdate = function () {
                if
                (
                    $scope.esposizione.c != $scope.esposizioneOriginal.esposizione.c ||
                    $scope.esposizione.l != $scope.esposizioneOriginal.esposizione.l ||
                    $scope.esposizione.f != $scope.esposizioneOriginal.esposizione.f
                ) {
                    return _.findWhere($scope.vm.esposizioni, {
                        c: $scope.esposizione.c,
                        l: $scope.esposizione.l,
                        f: $scope.esposizione.f
                    });
                } else {
                    return false;
                }
            };

            var checkCopy = function () {
                return _.findWhere($scope.vm.esposizioni, {
                    c: $scope.esposizione.c,
                    m: $scope.esposizione.m,
                    l: $scope.esposizione.l,
                    f: $scope.esposizione.f
                });
            };

            $scope.newItem = function () {
                $rootScope.saving = false;
                $scope.errore.esposizione = false;
                $scope.esposizioneOriginal.selected = false;
                $scope.vm.nuovoComposto = {
                    i: $scope.vm.nuovaEsposizione.i + 1,
                    m: false,
                    l: false,
                    t: false,
                    y: 1
                };
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (!checkUpdate()) {
                        $rootScope.saving = true;
                        $http.post('php/esposizioni.php?type=update', {
                                'id': $scope.esposizione.i,
                                'mark': $scope.esposizione.m,
                                'line': $scope.esposizione.l,
                                'tbpr': $scope.esposizione.t,
                                'cod': $scope.esposizione.c,
                                'fin': $scope.esposizione.f,
                                'dim': $scope.esposizione.d,
                                'pos': $scope.esposizione.y,
                                'nome': $scope.esposizione.n,
                                'image': $scope.esposizione.r,
                                'sourceCod': $scope.esposizioneOriginal.esposizione.c,
                                'sourceMark': $scope.esposizioneOriginal.esposizione.m,
                                'sourceLine': $scope.esposizioneOriginal.esposizione.l,
                                'sourceFin': $scope.esposizioneOriginal.esposizione.f
                            }
                        ).success(function (data) {
                            $scope.errore.esposizione = false;
                            $scope.vm.saveEsposizioneData();
                            console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.esposizioni, function (v) {
                                if (v.i == $scope.esposizione.i) {
                                    v.m = $scope.esposizione.m;
                                    v.l = $scope.esposizione.l;
                                    v.t = $scope.esposizione.t;
                                    v.c = $scope.esposizione.c;
                                    v.f = $scope.esposizione.f;
                                    v.d = $scope.esposizione.d;
                                    v.y = $scope.esposizione.y;
                                    v.n = $scope.esposizione.n;
                                    v.r = $scope.esposizione.r;
                                    $scope.esposizione = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                            $scope.errore.esposizione = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.esposizione = true;
                    }
                }
                if (type == 'C') {
                    if (!checkCopy()) {
                        $rootScope.saving = true;
                        $http.post('php/esposizioni.php?type=new', {
                                'id': $scope.vm.nuovaEsposizione.i,
                                'mark': $scope.esposizione.m,
                                'line': $scope.esposizione.l,
                                'tbpr': $scope.esposizione.t,
                                'cod': $scope.esposizione.c,
                                'fin': $scope.esposizione.f,
                                'dim': $scope.esposizione.d,
                                'pos': $scope.esposizione.y,
                                'nome': $scope.esposizione.n,
                                'image': $scope.esposizione.r,
                                'sourceCod': $scope.esposizioneOriginal.esposizione.c,
                                'sourceMark': $scope.esposizioneOriginal.esposizione.m,
                                'sourceLine': $scope.esposizioneOriginal.esposizione.l,
                                'sourceFin': $scope.esposizioneOriginal.esposizione.f
                            }
                        ).success(function (data) {
                            console.log('Risposta dalla pagina PHP', data);
                            $scope.vm.copiedEsposizione = {
                                i: $scope.vm.nuovaEsposizione.i,
                                m: $scope.esposizione.m,
                                l: $scope.esposizione.l,
                                t: $scope.esposizione.t,
                                c: $scope.esposizione.c,
                                f: $scope.esposizione.f,
                                d: $scope.esposizione.d,
                                y: $scope.esposizione.y,
                                n: $scope.esposizione.n
                            };
                            $scope.vm.esposizioni.push($scope.vm.copiedEsposizione);
                            $scope.vm.nuovoComposto = {
                                i: $scope.vm.nuovoComposto.i + 1
                            };
                            $scope.vm.saveEsposizioneData();
                            $rootScope.saving = false;
                            $scope.errore.esposizione = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.esposizione = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/esposizioni.php?type=delete', {
                            'id': $scope.esposizione.i,
                            'mark': $scope.esposizione.m,
                            'line': $scope.esposizione.l,
                            'tbpr': $scope.esposizione.t,
                            'cod': $scope.esposizione.c,
                            'fin': $scope.esposizione.f,
                            'dim': $scope.esposizione.d,
                            'pos': $scope.esposizione.y,
                            'nome': $scope.esposizione.n,
                            'image': $scope.esposizione.r
                        }
                    ).success(function (data) {
                        console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.esposizioni = _.filter($scope.vm.esposizioni, function (list) {
                            return list.i != $scope.esposizione.i;
                        });
                        $scope.vm.saveEsposizioneData();
                        $scope.newItem();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('composti', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/composti.html',
        scope: {
            compostoOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {

            $scope.errore = {
                composto: false
            };

            function convertMark(IDS) {
                _.each($scope.vm.marchi, function (v) {
                    if (v.i == IDS) {
                        markByName = v.n;
                    }
                });
                return markByName;
            }

            function convertLine(IDS) {
                _.each($scope.vm.linee, function (v) {
                    if (v.i == IDS) {
                        lineByName = v.n;
                    }
                });
                return lineByName;
            }

            function replaceAll(string, find, replace) {
                return string.replace(new RegExp(find, 'g'), replace);
            }

            $scope.$watch('compostoOriginal', function (newVal) {
                $scope.composto = angular.copy(newVal.composto);

                var markName = convertMark($scope.composto.m);
                var lineName = convertLine($scope.composto.l);
                markName = replaceAll(markName, ' ', '_');
                lineName = replaceAll(lineName, ' ', '_');
                var finName = replaceAll($scope.composto.f, ' ', '_');
                var fileName = lineName + '_' + $scope.composto.c + 'C_' + finName + '.jpg';
                $scope.composto.r = '../dashboard/archivio_dati/' + markName + '/' + lineName + '/Render/' + fileName;
            });

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.updateCheck = function () {
                return (
                    !$scope.composto.c ||
                    !$scope.composto.f ||
                    !$scope.composto.m ||
                    !$scope.composto.l ||
                    !$scope.composto.n ||
                    !$scope.composto.r ||
                    isNaN($scope.composto.y)
                );
            };

            $scope.deleteCheck = function () {
                return (
                    $scope.composto.c !== $scope.compostoOriginal.composto.c ||
                    $scope.composto.m !== $scope.compostoOriginal.composto.m ||
                    $scope.composto.l !== $scope.compostoOriginal.composto.l ||
                    $scope.composto.f !== $scope.compostoOriginal.composto.f
                );
            };

            $scope.copyCheck = function () {
                return (
                    !$scope.composto.c ||
                    !$scope.composto.m ||
                    !$scope.composto.l ||
                    !$scope.composto.f ||
                    ($scope.composto.c === $scope.compostoOriginal.composto.c &&
                        $scope.composto.l === $scope.compostoOriginal.composto.l &&
                        $scope.composto.f === $scope.compostoOriginal.composto.f)
                );
            };

            var checkUpdate = function () {
                if ($scope.composto.c != $scope.compostoOriginal.composto.c || $scope.composto.l != $scope.compostoOriginal.composto.l || $scope.composto.f != $scope.compostoOriginal.composto.f) {
                    return _.findWhere($scope.vm.composti, {
                        c: $scope.composto.c,
                        l: $scope.composto.l,
                        f: $scope.composto.f
                    });
                } else {
                    return false;
                }
            };

            var checkCopy = function () {
                return _.findWhere($scope.vm.composti, {
                    c: $scope.composto.c,
                    m: $scope.composto.m,
                    l: $scope.composto.l,
                    f: $scope.composto.f
                });
            };

            $scope.newItem = function () {
                $rootScope.saving = false;
                $scope.errore.composto = false;
                $scope.compostoOriginal.selected = false;
                $scope.vm.nuovoComposto = {
                    i: $scope.vm.nuovoComposto.i + 1,
                    m: false,
                    l: false,
                    y: 1
                };
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (!checkUpdate()) {
                        $rootScope.saving = true;
                        $http.post('php/composti.php?type=update', {
                                'id': $scope.composto.i,
                                'mark': $scope.composto.m,
                                'line': $scope.composto.l,
                                'cod': $scope.composto.c,
                                'fin': $scope.composto.f,
                                'pos': $scope.composto.y,
                                'nome': $scope.composto.n,
                                'image': $scope.composto.r,
                                'sourceCod': $scope.compostoOriginal.composto.c,
                                'sourceMark': $scope.compostoOriginal.composto.m,
                                'sourceLine': $scope.compostoOriginal.composto.l,
                                'sourceFin': $scope.compostoOriginal.composto.f
                            }
                        ).success(function (data) {
                            $scope.errore.composto = false;
                            $scope.vm.saveCompostoData();
                            console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.composti, function (v) {
                                if (v.i == $scope.composto.i) {
                                    v.m = $scope.composto.m;
                                    v.l = $scope.composto.l;
                                    v.c = $scope.composto.c;
                                    v.f = $scope.composto.f;
                                    v.y = $scope.composto.y;
                                    v.n = $scope.composto.n;
                                    v.r = $scope.composto.r;
                                    $scope.composto = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                            $scope.errore.composto = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.composto = true;
                    }
                }
                if (type == 'C') {
                    if (!checkCopy()) {
                        $rootScope.saving = true;
                        $http.post('php/composti.php?type=new', {
                                'id': $scope.vm.nuovoComposto.i,
                                'mark': $scope.composto.m,
                                'line': $scope.composto.l,
                                'cod': $scope.composto.c,
                                'fin': $scope.composto.f,
                                'pos': $scope.composto.y,
                                'nome': $scope.composto.n,
                                'image': $scope.composto.r,
                                'sourceCod': $scope.compostoOriginal.composto.c,
                                'sourceMark': $scope.compostoOriginal.composto.m,
                                'sourceLine': $scope.compostoOriginal.composto.l,
                                'sourceFin': $scope.compostoOriginal.composto.f
                            }
                        ).success(function (data) {
                            console.log('Risposta dalla pagina PHP', data);
                            $scope.vm.copiedComposto = {
                                i: $scope.vm.nuovoComposto.i,
                                m: $scope.composto.m,
                                l: $scope.composto.l,
                                c: $scope.composto.c,
                                f: $scope.composto.f,
                                y: $scope.composto.y,
                                n: $scope.composto.n
                            };
                            $scope.vm.composti.push($scope.vm.copiedComposto);
                            $scope.vm.nuovoComposto = {
                                i: $scope.vm.nuovoComposto.i + 1
                            };
                            $scope.vm.saveCompostoData();
                            $rootScope.saving = false;
                            $scope.errore.composto = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.composto = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/composti.php?type=delete', {
                            'id': $scope.composto.i,
                            'mark': $scope.composto.m,
                            'line': $scope.composto.l,
                            'cod': $scope.composto.c,
                            'fin': $scope.composto.f,
                            'pos': $scope.composto.y,
                            'nome': $scope.composto.n,
                            'image': $scope.composto.r
                        }
                    ).success(function (data) {
                        console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.composti = _.filter($scope.vm.composti, function (list) {
                            return list.i != $scope.composto.i;
                        });
                        $scope.vm.saveCompostoData();
                        $scope.newItem();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('esposizioniProdotti', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/esposizioniProdotti.html',
        scope: {
            esposizioneProdottoOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {
            $scope.$watch('esposizioneProdottoOriginal', function (newVal) {
                $scope.esposizioneProdotto = angular.copy(newVal.esposizioneProdotto);
            });

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.$watch('esposizioneProdotto.p', function (newVal, oldVal) {
                if (newVal != oldVal && $scope.esposizioneProdottoOriginal.i == $scope.esposizioneProdotto) $scope.esposizioneProdotto.u = false;
                if (newVal) {
                    var prodotto = _.findWhere($scope.vm.prodotti, {i: newVal});
                    var idsList = _.pluck(prodotto.z, 'a');
                    $scope.tabsAvailable = [];
                    for (var i = 0; i < idsList.length; i++) {
                        var tab = _.findWhere($scope.vm.finitureTabelle, {i: idsList[i]});
                        $scope.tabsAvailable.push({'i': idsList[i], 'n': tab.n});
                    }
                    return $scope.tabsAvailable;
                }
            });

            $scope.$watch('esposizioneProdotto.u', function (newVal, oldVal) {
                if (newVal != oldVal && $scope.esposizioneProdottoOriginal.i == $scope.esposizioneProdotto) $scope.esposizioneProdotto.f = false;
                if (newVal) {
                    $scope.finsAvailable = _.where($scope.vm.abbinamenti, {u: newVal});
                    return $scope.finsAvailable;
                }
            });

            $scope.newItem = function () {
                $rootScope.saving = false;
                $scope.esposizioneProdotto = {
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
                    !$scope.esposizioneProdotto.c ||
                    !$scope.esposizioneProdotto.p ||
                    !$scope.esposizioneProdotto.l ||
                    !$scope.esposizioneProdotto.j ||
                    !$scope.esposizioneProdotto.u ||
                    !$scope.esposizioneProdotto.f ||
                    isNaN($scope.esposizioneProdotto.y) ||
                    isNaN($scope.esposizioneProdotto.q)
                );
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    $rootScope.saving = true;
                    $http.post('php/esposizioniProdotti.php?type=update', {
                            'id': $scope.esposizioneProdotto.i,
                            'comp': $scope.esposizioneProdotto.c,
                            'prd': $scope.esposizioneProdotto.p,
                            'pline': $scope.esposizioneProdotto.l,
                            'cline': $scope.esposizioneProdotto.j,
                            'pmark': $scope.esposizioneProdotto.m,
                            'cmark': $scope.esposizioneProdotto.k,
                            'fin': $scope.esposizioneProdotto.f,
                            'tab': $scope.esposizioneProdotto.u,
                            'pos': $scope.esposizioneProdotto.y,
                            'qnt': $scope.esposizioneProdotto.q
                        }
                    ).success(function (data) {
                        $scope.vm.saveEsposizioniProdottiData();
                        //console.log('Risposta dalla pagina PHP', data);
                        _.each($scope.vm.esposizioniProdotti, function (v) {
                            if (v.i == $scope.esposizioneProdotto.i) {
                                v.c = $scope.esposizioneProdotto.c;
                                v.p = $scope.esposizioneProdotto.p;
                                v.l = $scope.esposizioneProdotto.l;
                                v.j = $scope.esposizioneProdotto.j;
                                v.m = $scope.esposizioneProdotto.m;
                                v.k = $scope.esposizioneProdotto.k;
                                v.f = $scope.esposizioneProdotto.f;
                                v.u = $scope.esposizioneProdotto.u;
                                v.y = $scope.esposizioneProdotto.y;
                                v.q = $scope.esposizioneProdotto.q;
                                $scope.esposizioneProdotto = angular.copy(v);
                            }
                        });
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
                if (type == 'C') {
                    $rootScope.saving = true;
                    $http.post('php/esposizioniProdotti.php?type=new', {
                            'id': $scope.vm.nuovoEsposizioneProdotto.i,
                            'comp': $scope.esposizioneProdotto.c,
                            'prd': $scope.esposizioneProdotto.p,
                            'pline': $scope.esposizioneProdotto.l,
                            'cline': $scope.esposizioneProdotto.j,
                            'pmark': $scope.esposizioneProdotto.m,
                            'cmark': $scope.esposizioneProdotto.k,
                            'fin': $scope.esposizioneProdotto.f,
                            'tab': $scope.esposizioneProdotto.u,
                            'pos': $scope.esposizioneProdotto.y,
                            'qnt': $scope.esposizioneProdotto.q
                        }
                    ).success(function (data) {
                        console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.copiedEsposizioneProdotto = {
                            i: $scope.vm.nuovoEsposizioneProdotto.i,
                            c: $scope.esposizioneProdotto.c,
                            p: $scope.esposizioneProdotto.p,
                            l: $scope.esposizioneProdotto.l,
                            j: $scope.esposizioneProdotto.j,
                            m: $scope.esposizioneProdotto.m,
                            k: $scope.esposizioneProdotto.k,
                            f: $scope.esposizioneProdotto.f,
                            u: $scope.esposizioneProdotto.u,
                            y: $scope.esposizioneProdotto.y,
                            q: $scope.esposizioneProdotto.q

                        };
                        $scope.vm.esposizioniProdotti.push($scope.vm.copiedEsposizioneProdotto);
                        $scope.vm.nuovoEsposizioneProdotto = {
                            i: $scope.vm.nuovoEsposizioneProdotto.i + 1
                        };
                        $scope.vm.saveEsposizioniProdottiData();
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/esposizioniProdotti.php?type=delete', {
                            'id': $scope.esposizioneProdotto.i,
                            'comp': $scope.esposizioneProdotto.c,
                            'prd': $scope.esposizioneProdotto.p,
                            'pline': $scope.esposizioneProdotto.l,
                            'cline': $scope.esposizioneProdotto.j,
                            'pmark': $scope.esposizioneProdotto.m,
                            'cmark': $scope.esposizioneProdotto.k,
                            'fin': $scope.esposizioneProdotto.f,
                            'tab': $scope.esposizioneProdotto.u,
                            'pos': $scope.esposizioneProdotto.y,
                            'qnt': $scope.esposizioneProdotto.q
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.esposizioniProdotti = _.filter($scope.vm.esposizioniProdotti, function (list) {
                            return list.i != $scope.esposizioneProdotto.i;
                        });
                        $scope.vm.saveEsposizioniProdottiData();
                        $scope.newItem();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('compostiProdotti', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/compostiProdotti.html',
        scope: {
            compostoProdottoOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope) {
            $scope.$watch('compostoProdottoOriginal', function (newVal) {
                $scope.compostoProdotto = angular.copy(newVal.compostoProdotto);
            });

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.$watch('compostoProdotto.p', function (newVal, oldVal) {
                if (newVal != oldVal && $scope.compostoProdottoOriginal.i == $scope.compostoProdotto) $scope.compostoProdotto.u = false;
                if (newVal) {
                    var prodotto = _.findWhere($scope.vm.prodotti, {i: newVal});
                    var idsList = _.pluck(prodotto.z, 'a');
                    $scope.tabsAvailable = [];
                    for (var i = 0; i < idsList.length; i++) {
                        var tab = _.findWhere($scope.vm.finitureTabelle, {i: idsList[i]});
                        $scope.tabsAvailable.push({'i': idsList[i], 'n': tab.n});
                    }
                    return $scope.tabsAvailable;
                }
            });

            $scope.$watch('compostoProdotto.u', function (newVal, oldVal) {
                if (newVal != oldVal && $scope.compostoProdottoOriginal.i == $scope.compostoProdotto) $scope.compostoProdotto.f = false;
                if (newVal) {
                    $scope.finsAvailable = _.where($scope.vm.abbinamenti, {u: newVal});
                    return $scope.finsAvailable;
                }
            });

            $scope.newItem = function () {
                $rootScope.saving = false;
                $scope.compostoProdotto = {
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
                    !$scope.compostoProdotto.c ||
                    !$scope.compostoProdotto.p ||
                    !$scope.compostoProdotto.l ||
                    !$scope.compostoProdotto.j ||
                    !$scope.compostoProdotto.u ||
                    !$scope.compostoProdotto.f ||
                    isNaN($scope.compostoProdotto.y) ||
                    isNaN($scope.compostoProdotto.q)
                );
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    $rootScope.saving = true;
                    $http.post('php/compostiProdotti.php?type=update', {
                            'id': $scope.compostoProdotto.i,
                            'comp': $scope.compostoProdotto.c,
                            'prd': $scope.compostoProdotto.p,
                            'pline': $scope.compostoProdotto.l,
                            'cline': $scope.compostoProdotto.j,
                            'pmark': $scope.compostoProdotto.m,
                            'cmark': $scope.compostoProdotto.k,
                            'fin': $scope.compostoProdotto.f,
                            'tab': $scope.compostoProdotto.u,
                            'pos': $scope.compostoProdotto.y,
                            'qnt': $scope.compostoProdotto.q
                        }
                    ).success(function (data) {
                        $scope.vm.saveCompostoProdottiData();
                        //console.log('Risposta dalla pagina PHP', data);
                        _.each($scope.vm.compostiProdotti, function (v) {
                            if (v.i == $scope.compostoProdotto.i) {
                                v.c = $scope.compostoProdotto.c;
                                v.p = $scope.compostoProdotto.p;
                                v.l = $scope.compostoProdotto.l;
                                v.j = $scope.compostoProdotto.j;
                                v.m = $scope.compostoProdotto.m;
                                v.k = $scope.compostoProdotto.k;
                                v.f = $scope.compostoProdotto.f;
                                v.u = $scope.compostoProdotto.u;
                                v.y = $scope.compostoProdotto.y;
                                v.q = $scope.compostoProdotto.q;
                                $scope.compostoProdotto = angular.copy(v);
                            }
                        });
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
                if (type == 'C') {
                    $rootScope.saving = true;
                    $http.post('php/compostiProdotti.php?type=new', {
                            'id': $scope.vm.nuovoCompostoProdotto.i,
                            'comp': $scope.compostoProdotto.c,
                            'prd': $scope.compostoProdotto.p,
                            'pline': $scope.compostoProdotto.l,
                            'cline': $scope.compostoProdotto.j,
                            'pmark': $scope.compostoProdotto.m,
                            'cmark': $scope.compostoProdotto.k,
                            'fin': $scope.compostoProdotto.f,
                            'tab': $scope.compostoProdotto.u,
                            'pos': $scope.compostoProdotto.y,
                            'qnt': $scope.compostoProdotto.q
                        }
                    ).success(function (data) {
                        console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.copiedCompostoProdotto = {
                            i: $scope.vm.nuovoCompostoProdotto.i,
                            c: $scope.compostoProdotto.c,
                            p: $scope.compostoProdotto.p,
                            l: $scope.compostoProdotto.l,
                            j: $scope.compostoProdotto.j,
                            m: $scope.compostoProdotto.m,
                            k: $scope.compostoProdotto.k,
                            f: $scope.compostoProdotto.f,
                            u: $scope.compostoProdotto.u,
                            y: $scope.compostoProdotto.y,
                            q: $scope.compostoProdotto.q

                        };
                        $scope.vm.compostiProdotti.push($scope.vm.copiedCompostoProdotto);
                        $scope.vm.nuovoCompostoProdotto = {
                            i: $scope.vm.nuovoCompostoProdotto.i + 1
                        };
                        $scope.vm.saveCompostoProdottiData();
                        $rootScope.saving = false;
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/compostiProdotti.php?type=delete', {
                            'id': $scope.compostoProdotto.i,
                            'comp': $scope.compostoProdotto.c,
                            'prd': $scope.compostoProdotto.p,
                            'pline': $scope.compostoProdotto.l,
                            'cline': $scope.compostoProdotto.j,
                            'pmark': $scope.compostoProdotto.m,
                            'cmark': $scope.compostoProdotto.k,
                            'fin': $scope.compostoProdotto.f,
                            'tab': $scope.compostoProdotto.u,
                            'pos': $scope.compostoProdotto.y,
                            'qnt': $scope.compostoProdotto.q
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        $scope.vm.compostiProdotti = _.filter($scope.vm.compostiProdotti, function (list) {
                            return list.i != $scope.compostoProdotto.i;
                        });
                        $scope.vm.saveCompostoProdottiData();
                        $scope.newItem();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('esposizioniSettori', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/esposizioniSettori.html',
        scope: {
            esposizioneSettoreOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope, dataSvc) {
            $scope.$watch('esposizioneSettoreOriginal', function (newVal) {
                $scope.esposizioneSettore = angular.copy(newVal.esposizioneSettore);
            });

            $scope.saveDataDB = function () {
                $rootScope.saving = true;
                $http.post('php/esposizioniSettori.php?type=db').success(function () {
                    $rootScope.saving = false;
                    dataSvc.esposizioniSettori().then(function (data) {
                        $scope.vm.esposizioniSettori = data;
                    });
                }).error(function (data, status) {
                    console.log(status);
                });
            };

            $scope.errore = {
                esposizioneSettore: false
            };

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.convert = function (ID, list, item) {
                var element = '';
                _.each($scope.vm[list], function (v) {
                    if (v.i == ID) {
                        element = v[item];
                    }
                });
                return element;
            };

            $scope.$watch('esposizioneSettore', function (newVal) {
                $scope.esposizioniAvailable = [
                    {
                        c: ' Tutti',
                        i: -1
                    },
                    {
                        c: $scope.convert($scope.esposizioneSettore.c, 'esposizioni', 'c') + '_' + $scope.convert($scope.esposizioneSettore.c, 'esposizioni', 'f'),
                        i: $scope.esposizioneSettore.c
                    }
                ];
                var esposizioniPerLinea = _.where($scope.vm.esposizioni, {l: $scope.esposizioneSettore.l});
                _.each(esposizioniPerLinea, function (v) {
                    if (!_.find($scope.vm.esposizioniSettori, function (list) {
                        return (list.c === v.i && newVal.l === v.l)
                    }))
                        $scope.esposizioniAvailable.push(v);
                });
            });

            $scope.$watch('esposizioneSettore.w', function (newVal) {
                $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l: newVal});
                _.each($scope.settoriAvailable, function (v) {
                    v.n = _.findWhere($scope.vm.settori, {i: v.h}).n;
                });
            });

            $scope.selectedCat = function (ID) {
                return ($scope.esposizioneSettore.h.indexOf(ID) != -1);
            };

            $scope.toggleSet = function (ID) {
                if ($scope.esposizioneSettore.h.indexOf(ID) == -1) {
                    $scope.esposizioneSettore.h.push(parseInt(ID));
                } else {
                    $scope.esposizioneSettore.h.splice($scope.esposizioneSettore.h.indexOf(ID), 1);
                }
            };

            $scope.updateCheck = function () {
                return ($scope.esposizioneSettore.c == -1);
            };

            $scope.enableUpdate = false;
            $scope.$watchCollection('esposizioneSettore.h', function (newVal) {
                if ($scope.esposizioneSettore.i == $scope.esposizioneSettoreOriginal.esposizioneSettore.i && newVal != $scope.esposizioneSettoreOriginal.h) {
                    $scope.enableUpdate = true;
                }
            });

            $scope.copyCheck = function () {
                return ($scope.esposizioneSettore.c == -1 || $scope.esposizioneSettore.c === $scope.esposizioneSettoreOriginal.esposizioneSettore.c);
            };

            function checkSetArray() {
                return $scope.esposizioneSettore.h.length;
            }

            $scope.newItem = function () {
                $rootScope.saving = false;
                $scope.errore.esposizioneSettore = false;
                $scope.esposizioneSettoreOriginal.selected = false;
                $scope.vm.nuovoEsposizioneSettore = {
                    i: $scope.vm.nuovoEsposizioneSettore.i + 1,
                    m: false,
                    l: false,
                    c: false,
                    v: 0,
                    h: []
                };
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (checkSetArray() != 0) {
                        $rootScope.saving = true;
                        $http.post('php/esposizioniSettori.php?type=update', {
                                'id': $scope.esposizioneSettore.i,
                                'cod': $scope.esposizioneSettore.c,
                                'mark': $scope.esposizioneSettore.m,
                                'line': $scope.esposizioneSettore.l,
                                'nwln': $scope.esposizioneSettore.w,
                                'array': $scope.esposizioneSettore.h,
                                'view': $scope.esposizioneSettore.v
                            }
                        ).success(function (data) {
                            //console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.esposizioniSettori, function (v, k) {
                                if (v.i == $scope.esposizioneSettore.i) {
                                    v.c = $scope.esposizioneSettore.c;
                                    v.n = $scope.esposizioneSettore.n;
                                    v.m = $scope.esposizioneSettore.m;
                                    v.l = $scope.esposizioneSettore.l;
                                    v.w = $scope.esposizioneSettore.w;
                                    v.h = $scope.esposizioneSettore.h;
                                    v.v = $scope.esposizioneSettore.v;
                                    $scope.esposizioneSettore = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                            $scope.errore.esposizioneSettore = false;
                            $scope.vm.saveEsposizioneSettoreData();
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.esposizioneSettore = true;
                    }
                }
                if (type == 'C') {
                    if (checkSetArray() != 0) {
                        $rootScope.saving = true;
                        $http.post('php/esposizioniSettori.php?type=new', {
                                'id': $scope.vm.nuovoEsposizioneSettore.i,
                                'cod': $scope.esposizioneSettore.c,
                                'mark': $scope.esposizioneSettore.m,
                                'line': $scope.esposizioneSettore.l,
                                'nwln': $scope.esposizioneSettore.w,
                                'view': $scope.esposizioneSettore.v,
                                'array': $scope.esposizioneSettore.h
                            }
                        ).success(function (data) {
                            //console.log('Risposta dalla pagina PHP', data);
                            $scope.vm.copiedEsposizioneSettore = {
                                i: $scope.vm.nuovoEsposizioneSettore.i,
                                c: $scope.esposizioneSettore.c,
                                n: $scope.esposizioneSettore.n,
                                m: $scope.esposizioneSettore.m,
                                l: $scope.esposizioneSettore.l,
                                w: $scope.esposizioneSettore.w,
                                v: $scope.esposizioneSettore.v,
                                h: $scope.esposizioneSettore.h

                            };
                            $scope.vm.esposizioniSettori.push($scope.vm.copiedEsposizioneSettore);
                            $scope.vm.nuovoEsposizioneSettore = {
                                i: $scope.vm.nuovoEsposizioneSettore.i + 1
                            };
                            $scope.vm.saveEsposizioneSettoreData();
                            $rootScope.saving = false;
                            $scope.errore.esposizioneSettore = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.esposizioneSettore = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/esposizioniSettori.php?type=delete', {
                            'id': $scope.esposizioneSettore.i,
                            'cod': $scope.esposizioneSettore.c,
                            'mark': $scope.esposizioneSettore.m,
                            'line': $scope.esposizioneSettore.l,
                            'nwln': $scope.esposizioneSettore.w,
                            'view': $scope.esposizioneSettore.v,
                            'array': $scope.esposizioneSettore.h
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        if ($scope.esposizioneSettore.c != -1) {
                            $scope.vm.esposizioniSettori = _.filter($scope.vm.esposizioniSettori, function (list) {
                                return list.i != $scope.esposizioneSettore.i;
                            });
                            $scope.vm.saveEsposizioneSettoreData();
                        } else {
                            $scope.saveDataDB();
                        }
                        $scope.newItem();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});

angular.module("mpuDashboard").directive('compostiSettori', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/compostiSettori.html',
        scope: {
            compostoSettoreOriginal: "=",
            vm: "="
        },
        controller: function ($scope, $http, $timeout, $rootScope, dataSvc) {
            $scope.$watch('compostoSettoreOriginal', function (newVal) {
                $scope.compostoSettore = angular.copy(newVal.compostoSettore);
            });

            $scope.saveDataDB = function () {
                $rootScope.saving = true;
                $http.post('php/compostiSettori.php?type=db').success(function () {
                    $rootScope.saving = false;
                    dataSvc.compostiSettori().then(function (data) {
                        $scope.vm.compostiSettori = data;
                    });
                }).error(function (data, status) {
                    console.log(status);
                });
            };

            $scope.errore = {
                compostoSettore: false
            };

            $scope.confirm = false;
            $scope.askConfirm = function () {
                $scope.confirm = true;
                $timeout(function () {
                    $scope.confirm = false;
                }, 4000);
            };

            $scope.convert = function (ID, list, item) {
                var element = '';
                _.each($scope.vm[list], function (v) {
                    if (v.i == ID) {
                        element = v[item];
                    }
                });
                return element;
            };

            $scope.$watch('compostoSettore', function (newVal) {
                $scope.compostiAvailable = [
                    {
                        c: ' Tutti',
                        i: -1
                    },
                    {
                        c: $scope.convert($scope.compostoSettore.c, 'composti', 'c') + '_' + $scope.convert($scope.compostoSettore.c, 'composti', 'f'),
                        i: $scope.compostoSettore.c
                    }
                ];
                var esposizioniPerLinea = _.where($scope.vm.composti, {l: $scope.compostoSettore.l});
                _.each(esposizioniPerLinea, function (v) {
                    if (!_.find($scope.vm.compostiSettori, function (list) {
                        return (list.c === v.i && newVal.l === v.l)
                    }))
                        $scope.compostiAvailable.push(v);
                });
            });

            $scope.$watch('compostoSettore.w', function (newVal) {
                $scope.settoriAvailable = _.where($scope.vm.lineeSettori, {l: newVal});
                _.each($scope.settoriAvailable, function (v) {
                    v.n = _.findWhere($scope.vm.settori, {i: v.h}).n;
                });
            });

            $scope.selectedCat = function (ID) {
                return ($scope.compostoSettore.h.indexOf(ID) != -1);
            };

            $scope.toggleSet = function (ID) {
                if ($scope.compostoSettore.h.indexOf(ID) == -1) {
                    $scope.compostoSettore.h.push(parseInt(ID));
                } else {
                    $scope.compostoSettore.h.splice($scope.compostoSettore.h.indexOf(ID), 1);
                }
            };

            $scope.updateCheck = function () {
                return ($scope.compostoSettore.c == -1);
            };

            $scope.enableUpdate = false;
            $scope.$watchCollection('compostoSettore.h', function (newVal) {
                if ($scope.compostoSettore.i == $scope.compostoSettoreOriginal.compostoSettore.i && newVal != $scope.compostoSettoreOriginal.h) {
                    $scope.enableUpdate = true;
                }
            });

            $scope.copyCheck = function () {
                return ($scope.compostoSettore.c == -1 || $scope.compostoSettore.c === $scope.compostoSettoreOriginal.compostoSettore.c);
            };

            function checkSetArray() {
                return $scope.compostoSettore.h.length;
            }

            $scope.newItem = function () {
                $rootScope.saving = false;
                $scope.errore.compostoSettore = false;
                $scope.compostoSettoreOriginal.selected = false;
                $scope.vm.nuovoCompostoSettore = {
                    i: $scope.vm.nuovoCompostoSettore.i + 1,
                    m: false,
                    l: false,
                    c: false,
                    v: 0,
                    h: []
                };
            };

            $scope.action = function (type) {
                if (type == 'U') {
                    if (checkSetArray() != 0) {
                        $rootScope.saving = true;
                        $http.post('php/compostiSettori.php?type=update', {
                                'id': $scope.compostoSettore.i,
                                'cod': $scope.compostoSettore.c,
                                'mark': $scope.compostoSettore.m,
                                'line': $scope.compostoSettore.l,
                                'nwln': $scope.compostoSettore.w,
                                'array': $scope.compostoSettore.h,
                                'view': $scope.compostoSettore.v
                            }
                        ).success(function (data) {
                            //console.log('Risposta dalla pagina PHP', data);
                            _.each($scope.vm.compostiSettori, function (v, k) {
                                if (v.i == $scope.compostoSettore.i) {
                                    v.c = $scope.compostoSettore.c;
                                    v.n = $scope.compostoSettore.n;
                                    v.m = $scope.compostoSettore.m;
                                    v.l = $scope.compostoSettore.l;
                                    v.w = $scope.compostoSettore.w;
                                    v.h = $scope.compostoSettore.h;
                                    v.v = $scope.compostoSettore.v;
                                    $scope.compostoSettore = angular.copy(v);
                                }
                            });
                            $rootScope.saving = false;
                            $scope.errore.compostoSettore = false;
                            $scope.vm.saveCompostoSettoreData();
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.compostoSettore = true;
                    }
                }
                if (type == 'C') {
                    if (checkSetArray() != 0) {
                        $rootScope.saving = true;
                        $http.post('php/compostiSettori.php?type=new', {
                                'id': $scope.vm.nuovoCompostoSettore.i,
                                'cod': $scope.compostoSettore.c,
                                'mark': $scope.compostoSettore.m,
                                'line': $scope.compostoSettore.l,
                                'nwln': $scope.compostoSettore.w,
                                'view': $scope.compostoSettore.v,
                                'array': $scope.compostoSettore.h
                            }
                        ).success(function (data) {
                            //console.log('Risposta dalla pagina PHP', data);
                            $scope.vm.copiedCompostoSettore = {
                                i: $scope.vm.nuovoCompostoSettore.i,
                                c: $scope.compostoSettore.c,
                                n: $scope.compostoSettore.n,
                                m: $scope.compostoSettore.m,
                                l: $scope.compostoSettore.l,
                                w: $scope.compostoSettore.w,
                                v: $scope.compostoSettore.v,
                                h: $scope.compostoSettore.h

                            };
                            $scope.vm.compostiSettori.push($scope.vm.copiedCompostoSettore);
                            $scope.vm.nuovoCompostoSettore = {
                                i: $scope.vm.nuovoCompostoSettore.i + 1
                            };
                            $scope.vm.saveCompostoSettoreData();
                            $rootScope.saving = false;
                            $scope.errore.compostoSettore = false;
                        }).error(function (data, status) {
                            console.log(status);
                        });
                    } else {
                        $scope.errore.compostoSettore = true;
                    }
                }
                if (type == 'D') {
                    $rootScope.saving = true;
                    $http.post('php/compostiSettori.php?type=delete', {
                            'id': $scope.compostoSettore.i,
                            'cod': $scope.compostoSettore.c,
                            'mark': $scope.compostoSettore.m,
                            'line': $scope.compostoSettore.l,
                            'nwln': $scope.compostoSettore.w,
                            'view': $scope.compostoSettore.v,
                            'array': $scope.compostoSettore.h
                        }
                    ).success(function (data) {
                        //console.log('Risposta dalla pagina PHP', data);
                        if ($scope.compostoSettore.c != -1) {
                            $scope.vm.compostiSettori = _.filter($scope.vm.compostiSettori, function (list) {
                                return list.i != $scope.compostoSettore.i;
                            });
                            $scope.vm.saveCompostoSettoreData();
                        } else {
                            $scope.saveDataDB();
                        }
                        $scope.newItem();
                    }).error(function (data, status) {
                        console.log(status);
                    });
                }
            };
        }
    }
});
