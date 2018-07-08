angular.module("mpu").directive("clearInputWithEsc", [function () {
    return {
        restrict : 'A',
        require: "?ngModel",
        link: function (scope, element, attr, controller) {
            element.on("keydown keypress", function (e) {
                if (e.keyCode != 27) return;
                scope.$apply(function() {
                    controller.$setViewValue("");
                    controller.$render();
                });
            });
        }
    }
}]);

angular.module("mpu").directive('hoverClass', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.on('mouseenter', function() {
                element.addClass('hover');
            });
            element.on('mouseleave', function() {
                element.removeClass('hover');
            });
            element.on('click', function() {
                element.removeClass('hover');
            });
        }
    };
});

angular.module("mpu").directive('hoverClassSvg', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var className = 'hover';
            element.on('mouseenter', function() {
                if (!element.hasClass(className)) {
                    element.attr('class', element.attr('class') + ' ' + className);
                }
            });
            element.on('mouseleave', function() {
                var removedClass = element.attr('class').replace(new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'), '$2');
                element.attr('class', removedClass);
            });
            element.on('click', function() {
                var removedClass = element.attr('class').replace(new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'), '$2');
                element.attr('class', removedClass);
            });
        }
    };
});

angular.module("mpu").directive('imageonload', function() {
    return {
        scope : {
            loaded : "="
        },
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.loaded = true;
            });
        }
    };
});
/*
angular.module("mpu").directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        var r = element;
        w.bind('resize', function () {
            scope.$apply(update);
        });
        update();
        function update() {
            var width = r.width();
            scope.vm.divWidth = width - 400;
        }
    }
});
*/

angular.module("mpu").directive('categoria', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/categoria.html',
        scope : {
            categoria : "=",
            fnz : "="
        },
        controller : ['$scope', function($scope){
            $scope.categoria.r = "url('dashboard/archivio_dati/Categorie/" + $scope.categoria.i + ".jpg') no-repeat right";
/*
            $scope.selected = 1;
            $scope.changeSelected = function (value) {
                $scope.selected = value;
            }
*/
        }]
    }
});

angular.module("mpu").directive('settori', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/settori.html',
        scope : {
            settore : "="
        },
        controller : ['$scope', function($scope){
            $scope.settore.r = "url('dashboard/archivio_dati/Settori/" + $scope.settore.i + ".jpg') no-repeat right";
        }]
    }
});

angular.module("mpu").directive('linea', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/linea.html',
        scope : {
            linea : "=",
            fnz : '=',
            vetrine : '=',
            marchi : "="
        },
        controller : ['$scope', '$rootScope', '$timeout', function($scope, $rootscope, $timeout){
            $timeout(function(){
                $scope.info = false;
                $scope.imgList = _.pluck(_.filter($scope.vetrine, function(list) {return list.l == $scope.linea.i}), 'c');
                var marchio = _.find($scope.marchi, function(list) {return list.i == $scope.linea.m});
                if(marchio.d && marchio.d != 0) {
                    $scope.consegna = marchio.d;
                } else {
                    $scope.consegna = $scope.linea.e;
                }
                var markName = $scope.fnz.convert($scope.linea.m, 'marchi', 'n');
                markName = $scope.fnz.replaceAll(markName, ' ', '_');
                var lineName = $scope.fnz.replaceAll($scope.linea.n, ' ', '_');
                $scope.path = 'dashboard/archivio_dati/' + markName + '/' + lineName + '/Vetrina/' + lineName;
                $scope.pdfPath = 'dashboard/archivio_dati/' + markName + '/' + lineName + '/' + lineName;
            })
        }]
    }
});

angular.module("mpu").directive('newlinea', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/newlinea.html',
        scope : {
            linea : "=",
            fnz : '=',
            vetrine : '=',
            marchi : "="
        },
        controller : ['$scope', '$rootScope', '$timeout', function($scope, $rootscope, $timeout){
            $timeout(function(){
                $scope.info = false;
                $scope.imgList = _.pluck(_.filter($scope.vetrine, function(list) {return list.l == $scope.linea.i}), 'c');
                var marchio = _.find($scope.marchi, function(list) {return list.i == $scope.linea.m});
                if(marchio.d && marchio.d != 0) {
                    $scope.consegna = marchio.d;
                } else {
                    $scope.consegna = $scope.linea.e;
                }
                var markName = $scope.fnz.convert($scope.linea.m, 'marchi', 'n');
                markName = $scope.fnz.replaceAll(markName, ' ', '_');
                var lineName = $scope.fnz.replaceAll($scope.linea.n, ' ', '_');
                $scope.path = $scope.fnz.findDomain() + '/dashboard/archivio_dati/' + markName + '/' + lineName + '/Vetrina/' + lineName;
                $scope.linea.r = $scope.fnz.findDomain() + '/dashboard/archivio_dati/' + markName + '/' + lineName + '/' + lineName  + '.jpg';
                $scope.pdfPath = $scope.fnz.findDomain() + '/dashboard/archivio_dati/' + markName + '/' + lineName + '/' + lineName;
            })
        }]
    }
});

angular.module("mpu").directive('composizioni', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/composizioni.html',
        scope : {
            item : "=",
            fnz : '=',
            lista : '=',
            prodotti : '=',
            marchi : '=',
            linee : '=',
            type : '@'
        },
        controller : ['$scope', '$timeout', function($scope, $timeout){
            $scope.loaded = false;
            $scope.info = false;
            var render = function() {
                var cmpPrice = 0;
                var prdList = _.where($scope.lista, {c : $scope.item.i});
                _.each(prdList, function(v) {
                    var prd = _.findWhere($scope.prodotti, {i : v.p});
                    var marchio = _.find($scope.marchi, function(list) {return list.i == v.k});
                    var linea = _.find($scope.linee, function(list){return list.i == v.j});
                    _.each(prd.z, function(w) {
                        if(w.a === v.u) {
                            var prdPrice = $scope.fnz.scontistica(w.z, marchio.s, marchio.b, linea.s);
                            cmpPrice += prdPrice * v.q;
                        }
                    });
                });
                return $scope.cmpPrice = $scope.fnz.convertPrice(cmpPrice);
            };

            $timeout(render);

            var markName = $scope.fnz.convert($scope.item.m, 'marchi', 'n');
            var lineName = $scope.fnz.convert($scope.item.l, 'linee', 'n');
            markName = $scope.fnz.replaceAll(markName, ' ', '_');
            lineName = $scope.fnz.replaceAll(lineName, ' ', '_');
            switch ($scope.type) {
                case 'vtr':
                    $scope.path = 'dashboard/archivio_dati/' + markName + '/' + lineName + '/Vetrina/' + lineName + '_' + $scope.item.c + '.jpg';
                    break;
                case 'cmp':
                    $scope.path = 'dashboard/archivio_dati/' + markName + '/' + lineName + '/Render/' + lineName + '_' + $scope.item.c + 'C_' + $scope.item.f + '.jpg';
                    break;
                case 'vetrina':
                    $scope.path = 'dashboard/archivio_dati/' + markName + '/' + lineName + '/Render/' + lineName + '_' + $scope.item.c + '_' + $scope.item.f + '.jpg';
                    break;
            }
        }]
    }
});

angular.module("mpu").directive('listino', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/listino.html',
        scope : {
            articolo : "=",
            marchi : '=',
            linee : '=',
            fnz : '=',
            loc : '='
        },
        controller : ['$scope', '$location', function($scope, $location){
            $scope.settore = $location.search().s;
            $scope.linea = $location.search().l;
            $scope.loaded = false;
            var markName = $scope.fnz.convert($scope.articolo.m, 'marchi', 'n');
            markName = $scope.fnz.replaceAll(markName, ' ', '_');
            var lineName = $scope.fnz.convert($scope.articolo.l, 'linee', 'n');
            lineName = $scope.fnz.replaceAll(lineName, ' ', '_');
            var marchio = _.find($scope.marchi, function(list) {return list.i == $scope.articolo.m});
            var linea = _.find($scope.linee, function(list){return list.i == $scope.articolo.l});
            $scope.path = 'dashboard/archivio_dati/' + markName + '/' + lineName + '/Prodotti/' + $scope.articolo.c + '.jpg';
            if($scope.articolo.z.length == 1) {
                $scope.price = 'prezzo: ' + $scope.fnz.convertPrice($scope.fnz.scontistica($scope.articolo.z[0].z, marchio.s, marchio.b, linea.s));
            } else {
                var minPrice = _.min(_.pluck($scope.articolo.z, 'z'));
                $scope.price = 'a partire da: ' + $scope.fnz.convertPrice($scope.fnz.scontistica(minPrice, marchio.s, marchio.b, linea.s));
            }
        }]
    }
});

angular.module("mpu").directive('composizione', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/composizione.html',
        scope : {
            item : "=",
            dt : "=",
            fnz : '='
        },
        controller: ['$scope', function ($scope) {
            var prdInCmp;
            var marchio = _.find($scope.dt.marchi, function (list) {
                return list.i == $scope.item.m
            });
            var markName = marchio.n;
            var lineName = _.find($scope.dt.linee, function (list) {
                return list.i == $scope.item.l
            }).n;
            markName = $scope.fnz.replaceAll(markName, ' ', '_');
            lineName = $scope.fnz.replaceAll(lineName, ' ', '_');
            $scope.item.z = 0;
            $scope.item.pdfPath = 'dashboard/archivio_dati/' + markName + '/' + lineName + '/' + lineName;
            $scope.item.nome = lineName + '_' + $scope.item.c;
            $scope.item.type = 'vtr';
            $scope.item.path = 'dashboard/archivio_dati/' + markName + '/' + lineName + '/Vetrina/' + lineName + '_' + $scope.item.c + '.jpg';
            var consegna = [];
            var garanzia = [];
            _.each($scope.item.p, function (v) {
                var prd = _.find($scope.dt.prodotti, function (list) {
                    return list.i == v.p
                });
                v.cmp = v.c;
                v.cod = prd.c;
                v.n = prd.n;
                v.d = prd.d;
                v.i = prd.i;
                v.o = prd.o;
                v.t = prd.t;
                var price = _.find(prd.z, function (list) {
                    return list.a == v.u
                }).z;
                var marchio = _.find($scope.dt.marchi, function (list) {
                    return list.i == v.m
                });
                var linea = _.find($scope.dt.linee, function (list) {
                    return list.i == prd.l
                });
                v.marchio = $scope.fnz.replaceAll(marchio.n, ' ', '_');
                v.linea = $scope.fnz.replaceAll(linea.n, ' ', '_');
                v.path = 'dashboard/archivio_dati/' + v.marchio + '/' + v.linea + '/Prodotti/' + v.cod + '.jpg';
                var prdPrice = $scope.fnz.scontistica(price, marchio.s, marchio.b, linea.s);
                if (marchio.d && marchio.d != 0) {
                    v.consegna = marchio.d;
                } else {
                    v.consegna = linea.e;
                }
                v.garanzia = linea.w;
                consegna.push(linea.e);
                garanzia.push(linea.w);
                v.raw = prdPrice;
                v.selectedTab = {
                    a: v.u,
                    price: $scope.fnz.convertPrice(prdPrice),
                    z: price
                };
                v.price = $scope.fnz.convertPrice(prdPrice);
                $scope.item.z += prdPrice * v.q;
            });
            //console.log($scope.itemPrd)
            if (marchio.d && marchio.d != 0) {
                $scope.item.consegna = marchio.d;
            } else {
                $scope.item.consegna = _.max(consegna);
            }
            $scope.item.garanzia = _.min(garanzia);
            $scope.item.price = $scope.fnz.convertPrice($scope.item.z);
        }]
    }
});

angular.module("mpu").directive('prodotti', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/prodotti.html',
        scope : {
            item : "=",
            fnz : '=',
            current : '=',
            abb : '='
        },
        controller : ['$scope', function($scope){
            $scope.item.selectedFin = _.find($scope.abb, function(list) {return list.i == $scope.item.f});
        }]
    }
});

angular.module("mpu").directive('articolo', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/articolo.html',
        scope : {
            prodotti : "=",
            fnz : '=',
            abb : '=',
            sett : '=',
            tbpr : '=',
            prv : '=',
            vm : '='
        },
        controller : ['$scope', '$timeout', '$location', '$http', function($scope, $timeout, $location, $http){
            $scope.resetFin = function() {
                $scope.item.selectedFin = false;
                $scope.item.selectedTab = false;
                $scope.item.q = 1;
            };

            $scope.item = {};
            $scope.item.selectedFin = false;
            $scope.item.selectedTab = false;
            var ID = $location.search().a;
            var renderPrd = function(ID) {
                if($http.pendingRequests.length > 0) {
                    $timeout(function(){renderPrd(ID)});
                } else {
                    $scope.item = _.find($scope.prodotti, function(list) {return list.i == ID});
                    var marchio = _.find($scope.vm.marchi, function(list) {return list.i == $scope.item.m});
                    var linea = _.find($scope.vm.linee, function(list){return list.i == $scope.item.l});
                    if($scope.item.z.length == 1) {
                        $scope.item.price = $scope.fnz.convertPrice($scope.fnz.scontistica($scope.item.z[0].z, marchio.s, marchio.b, linea.s));
                        $scope.item.raw = $scope.fnz.scontistica($scope.item.z[0].z, marchio.s, marchio.b, linea.s);
                    } else {
                        var minPrice = _.min(_.pluck($scope.item.z, 'z'));
                        $scope.item.price = 'a partire da ' + $scope.fnz.convertPrice($scope.fnz.scontistica(minPrice, marchio.s, marchio.b, linea.s));
                        $scope.item.raw = $scope.fnz.scontistica(minPrice, marchio.s, marchio.b, linea.s);
                    }
                    $scope.item.marchio = $scope.fnz.replaceAll(marchio.n, ' ', '_');
                    $scope.item.linea = $scope.fnz.replaceAll(linea.n, ' ', '_');
                    $scope.item.path = $location.protocol() + '://' + $location.host() + '/' + 'dashboard/archivio_dati/' + $scope.item.marchio + '/' + $scope.item.linea + '/Prodotti/' + $scope.item.c + '.jpg';
                    //$scope.item.settore = _.find($scope.vm.lineeSettori, function(list) { return list.l == $scope.item.l}).h;
                    _.each($scope.item.z, function(v) {
                        v.price = $scope.fnz.convertPrice($scope.fnz.scontistica(v.z, marchio.s, marchio.b, linea.s));
                        $scope.item.finElements =  [];
                        $scope.item.fin = _.filter($scope.abb, function(list){ return list.u == v.a});
                        for(var i = 0; i< $scope.item.fin[0].f.length; i++) {
                            $scope.item.finElements.push($scope.item.fin[0].f[i].n)
                        }
                    });

                    $scope.item.cod = $scope.item.c;
                    if(marchio.d && marchio.d != 0) {
                        $scope.item.consegna = marchio.d;
                    } else {
                        $scope.item.consegna = linea.e;
                    }
                    $scope.item.garanzia = linea.w;
                    $scope.item.q = 1;
                    $scope.tbpr = $scope.item.t;
                    //console.log($scope.item)
                }
            };
/*
            $scope.$watch('item.selectedFin', function(v){
                console.log($scope.item)
            });
*/

            $timeout(function(){renderPrd(ID)});

            $scope.item.abb = _.find($scope.abb, function(list) {return list.i == $scope.item.f});
        }]
    }
});

angular.module("mpu").directive('finiture', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/finiture.html',
        scope : {
            item : "=",
            fnz : '=',
            abb : '=',
            z : '='
        },
        controller : ['$scope', function($scope){
            $scope.dir = {
                showTab : false
            };

            $scope.uniqFin = function (tab, index) {
                var abbFiltered = _.filter($scope.abb, function(list) { return list.u == tab; });
                var finiture = [];
                _.each(abbFiltered, function (v) {
                    _.each(v.f, function (w, k) {
                        if (!_.contains(finiture, w.i) && k == index) finiture.push(w.i);
                    })
                });
                //console.log(_.uniq(finiture))
                return _.uniq(finiture);
            };

            $scope.filtroFiniture = {};
            $scope.filtroFiniture[0] = false;
            $scope.filtroFiniture[1] = false;
            $scope.filtroFiniture[2] = false;
            $scope.filtroFiniture[3] = false;
            $scope.filtroFiniture[4] = false;
            $scope.filtroFiniture[5] = false;
            $scope.filtroFiniture[6] = false;
        }]
    }
});

angular.module("mpu").directive('preventivo', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/preventivo.html',
        scope : {
            fnz : '=',
            articolo : "=",
            prodotti : '=',
            prv : '=',
            vm : '='
        },
        controller : ['$scope', '$timeout', '$http', '$cookies', function($scope, $timeout, $http, $cookies){
            $scope.$watchCollection('articolo', function(v){
                var checkItem = _.find($scope.prv.list, function(list) {return list.c == v.c});
                var indexItem = $scope.prv.list.indexOf(checkItem);
                $scope.prv.list[indexItem] = v;
                $cookies.putObject('MPU-P', $scope.prv);
                $scope.$emit('prv.list');
            });

/*
            $scope.$watchCollection('prv.list', function(v){
                $scope.prv.list = v;
                console.log($scope.prv)
                $cookies.put('MPU-P', $scope.prv)
            });
*/

            var renderPrd = function(ID) {
                var prd = _.find($scope.prodotti, function(list) {return list.i == ID});
                $scope.item = angular.copy(prd);
                $scope.item.abb = _.find($scope.vm.abbinamenti, function(list) {return list.i == $scope.articolo.a});
                var marchio = _.find($scope.vm.marchi, function(list) {return list.i == $scope.item.m});
                var linea = _.find($scope.vm.linee, function(list){return list.i == $scope.item.l});
                $scope.item.price = $scope.fnz.convertPrice($scope.articolo.z);
                $scope.item.linea = linea.n;
                var marchioNome = $scope.fnz.replaceAll(marchio.n, ' ', '_');
                var lineaNome = $scope.fnz.replaceAll(linea.n, ' ', '_');
                var path = 'dashboard/archivio_dati/' + marchioNome + '/' + lineaNome + '/';
                $scope.item.pathPdf = path + lineaNome + '_specifiche.pdf';
                $scope.item.pathImg = path + 'Prodotti/' + $scope.item.c + '.jpg';
                $scope.item.pathFin = 'dashboard/archivio_dati/' + marchioNome + '/Finiture/';
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
            };
            //console.log($scope.articolo);
            $timeout(function(){renderPrd($scope.articolo.i)});

            $scope.dir = {};
            $scope.dir.add = function() {
                $scope.articolo.q++;
            };
            $scope.dir.remove = function() {
                if($scope.articolo.q > 1) $scope.articolo.q--;
            };
            $scope.dir.checkQnt = function(v) {
                if(v <= 0 || isNaN(v) || !v) $scope.articolo.q = 1;
            };

            $scope.dir.confirm = false;
            $scope.dir.askConfirm = function(){
                $scope.dir.confirm = true;
                $timeout(function(){
                    $scope.dir.confirm = false;
                }, 4000);
            };
        }]
    }
});


angular.module("mpu").directive('email', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/email.html',
        scope : {
            cod : '=',
            change : '=',
            vm : '=',
            path : '=',
            type : '@',
            linea : '@'
        },
        controller : ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
            $scope.email = {
                success : false,
                error : false
            };
            $scope.email.send = function () {
                switch ($scope.type) {
                    case 'menu':
                        $http.post('php/email.php', {
                                'type'  : $scope.type,
                                'from'  : $scope.email.from,
                                'to'    : $scope.email.to
                            }
                        ).success(function (result) {
                                //console.log(result)
                                if(parseInt(result) == 1) {
                                    $scope.email.success = true;
                                    $timeout(function(){
                                        $scope.vm.menuEmail = false;
                                        $scope.email.success = false;
                                        $scope.change = false;
                                    }, 4000);
                                } else {
                                    $scope.email.error = true;
                                    $timeout(function(){
                                        $scope.email.error = false;
                                    }, 4000);
                                }
                            });
                        break;
                    case 'dwg':
                        $http.post('php/email.php', {
                                'type'  : $scope.type,
                                'from'  : $scope.email.from,
                                'nome'    : $scope.email.nome,
                                'tel'    : $scope.email.tel,
                                'linea' : $scope.linea
                            }
                        ).success(function (result) {
                                //console.log(result)
                                if(parseInt(result) == 1) {
                                    $scope.email.success = true;
                                    $timeout(function(){
                                        $scope.vm.dwgEmail = false;
                                        $scope.email.success = false;
                                    }, 4000);
                                } else {
                                    $scope.email.error = true;
                                    $timeout(function(){
                                        $scope.email.error = false;
                                    }, 4000);
                                }
                            });
                        break;
                    case 'prodotti':
                        $http.post('php/email.php', {
                                'type'  : $scope.type,
                                'from'  : $scope.email.from,
                                'to'    : $scope.email.to,
                                'path'  : $scope.path
                            }
                        ).success(function (result) {
                                //console.log(result)
                                if(parseInt(result) == 1) {
                                    $scope.email.success = true;
                                    $timeout(function(){
                                        $scope.vm.prdEmail = false;
                                        $scope.email.success = false;
                                        $scope.change = false;
                                    }, 4000);
                                } else {
                                    $scope.email.error = true;
                                    $timeout(function(){
                                        $scope.email.error = false;
                                    }, 4000);
                                }
                            });
                        break;
                    case 'preventivo':
                        $http.post('php/email.php', {
                                'cod'  : $scope.cod,
                                'type'  : $scope.type,
                                'from'  : $scope.email.from,
                                'to'    : $scope.email.to,
                                'loc' : $scope.vm.loc
                            }
                        ).success(function (result) {
                                // console.log(result)
                                if(parseInt(result) == 1) {
                                    $scope.email.success = true;
                                    $timeout(function(){
                                        $scope.vm.prvEmail = false;
                                        $scope.email.success = false;
                                        $scope.change = false;
                                    }, 4000);
                                } else {
                                    $scope.email.error = true;
                                    $timeout(function(){
                                        $scope.email.error = false;
                                    }, 4000);
                                }
                            });
                        break;
                }
            };
            //console.log($scope.cod)
        }]
    }
});

angular.module("mpu").directive('request', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/request.html',
        scope : {
            request : '=',
            prv : '=',
            riv : '='
        },
        controller : ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
            $scope.request.success = false;
            $scope.request.error = false;
            $scope.request.sending = false;
            $scope.request.send = function () {
                $scope.request.sending = true;
                $http.post('php/email.php', {
                        'type'  : 'request',
                        'data'  : $scope.request
                    }
                ).success(function (result) {
                        //console.log(result)
                        $scope.request.sending = false;
                        if(parseInt(result) == 1) {
                            $scope.request.success = true;
                            $timeout(function(){
                                $scope.request.success = false;
                                $scope.request.u = false;
                            }, 2000);
                        } else {
                            $scope.request.error = true;
                            $timeout(function(){
                                $scope.request.error = false;
                            }, 4000);
                        }
                    });
            };
            //console.log($scope.cod)
        }]
    }
});

/*
angular.module("mpu").directive('esposizioni', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/listino.html',
        scope : {
            articolo : "=",
            marchi : '=',
            linee : '=',
            fnz : '=',
            prodotti : '='
        },
        controller : function($scope){
            $scope.loaded = false;
            var markName = $scope.fnz.convert($scope.articolo.m, 'marchi', 'n');
            markName = $scope.fnz.replaceAll(markName, ' ', '_');
            var lineName = $scope.fnz.convert($scope.articolo.l, 'linee', 'n');
            lineName = $scope.fnz.replaceAll(lineName, ' ', '_');
            $scope.path = 'dashboard/archivio_dati/' + markName + '/' + lineName + '/Render/' + lineName + '_' +  $scope.articolo.c + '_' + $scope.articolo.f + '.jpg';
            //var marchio = _.find($scope.marchi, function(list) {return list.i == $scope.articolo.m});
            //var linea = _.find($scope.linee, function(list){return list.i == $scope.articolo.l});
        }
    }
});
*/
