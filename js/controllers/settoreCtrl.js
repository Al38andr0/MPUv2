(function () {
    'use strict';

    angular.module('mpu')
        .controller('settoreCtrl', settoreCtrl);

    settoreCtrl.$inject = ['$scope', '$rootScope', 'params', 'settoriSrv'];

    function settoreCtrl($scope, $rootScope, params, settoriSrv) {
        let mixin = new window.Mixin();

        $scope.current = {
            intro: false,
            categoria: {},
            settore: {},
            id: "",
            linee: [],
            descrizione: "",
            getDescription : function() {
                let success = function(data) {
                    $scope.current.descrizione = data;
                };
                settoriSrv.getDescription($scope.current.settore.id, success);
            }
        };
        $scope.current.categoria = _.find($rootScope.current.categorie, function (num) {
            return mixin.generateUrl(num.nome) === params.categoria
        });
        $scope.current.settore = _.find($scope.current.categoria.settori, function (num) {
            return mixin.generateUrl(num.nome) === params.settore
        });
        $scope.current.linee = $scope.current.settore.linee;

        $scope.current.getDescription();
    }
})();