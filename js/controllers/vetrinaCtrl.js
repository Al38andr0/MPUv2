(function () {
    'use strict';

    angular.module('mpu')
        .controller('vetrinaCtrl', vetrinaCtrl);

    vetrinaCtrl.$inject = ['$scope', '$rootScope', 'params', 'vetrineSrv'];

    function vetrinaCtrl($scope, $rootScope, params, vetrineSrv) {
        let mixin = new window.Mixin();

        $scope.current = {
            intro: false,
            categoria: {},
            settore: {},
            linea: {},
            vetrine: [],
            getAllByLinea: function (id) {
                let success = function (data) {
                    $scope.current.vetrine = data;
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

        $scope.current.getAllByLinea($scope.current.linea.id);
    }
})();