(function () {
    'use strict';

    angular.module('mpu')
        .directive('vetrina', vetrina);

    vetrina.$inject = ['ASSETS', 'URL', 'settoriSrv', '$rootScope'];

    function vetrina(ASSETS, URL, settoriSrv, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: '/html/templates/vetrina.html',
            scope: {
                vetrina: '<',
                index: '<',
                linea: '<'
            },
            link: function (scope) {
                let mixin = new window.Mixin();
                let path = URL + ASSETS + mixin.generateUrl(scope.linea.marchio.nome) + '/' + mixin.generateUrl(scope.linea.nome) + '/Vetrina/';
                scope.vetrina.image = path + mixin.generateUrl(scope.linea.nome) + '_' + scope.vetrina.nome + '.jpg';
                scope.vetrina.prezzo = 0;
                _.each(scope.vetrina.prodotti, function (v) {
                    v.scontanto = mixin.getPrice(scope.linea.marchio.sconto, scope.linea.marchio.listino, scope.linea.sconto, v.prezzo[0].z);
                    scope.vetrina.prezzo += (v.scontanto * v.quantita);
                });

                console.log(scope.vetrina)

/*
                scope.urls =
                {
                    linea: mixin.generateUrl(scope.linea.nome),
                    settore: mixin.generateUrl(scope.settore),
                    categoria: mixin.generateUrl(scope.categoria),
                };
*/
            }
        }
    }
})();