(function () {
    'use strict';

    angular.module('mpu')
        .controller('composizioniCtrl', composizioniCtrl);

    composizioniCtrl.$inject = ['$scope', '$rootScope', 'params', 'vetrineSrv'];

    function composizioniCtrl($scope, $rootScope, params, vetrineSrv) {
        let mixin = new window.Mixin();

        $scope.current = {
            intro: false,
            categoria: {},
            settore: {},
            linea: {},
            vetrine: [],
            getAllByLinea: function (id, settore) {
                let success = function (data) {
                    _.each(angular.copy(data), function (v) {
                        if(_.find(v.settori, function (num) {
                            return num.id === settore;
                        }))
                            $scope.current.vetrine.unshift(v);
                        else
                            $scope.current.vetrine.push(v);

                        if(!_.find($rootScope.current.vetrine, function (num) {
                            return num.id === v.id;
                        }))
                            $rootScope.current.vetrine.push(v);
                    });
                };
                vetrineSrv.getAllByLinea(id, success)
            }
        };

        $scope.current.categoria = _.find($rootScope.current.categorie, function (num) {
            return mixin.generateUrl(num.nome) === params.categoria
        });
        $scope.current.settore = _.find($scope.current.categoria.settori, function (num) {
            return mixin.generateUrl(num.nome) === params.settore
        });
        $scope.current.linea = _.find($scope.current.settore.linee, function (num) {
            return mixin.generateUrl(num.nome) === params.linea
        });
        $scope.current.composizione = _.find($scope.current.settore.linee, function (num) {
            return mixin.generateUrl(num.nome) === params.linea
        });

        $scope.current.getAllByLinea($scope.current.linea.id, $scope.current.settore.id);
    }
})();