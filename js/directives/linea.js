(function () {
    'use strict';

    angular.module('mpu')
        .directive('linea', linea);

    linea.$inject = ['ASSETS', 'URL'];

    function linea(ASSETS, URL) {
        return {
            restrict: 'E',
            templateUrl: '/html/templates/linea.html',
            scope: {
                linea: '<',
                settore: '<',
                categoria: '<'
            },
            link: function (scope) {
                let mixin = new window.Mixin();
                let path = URL + ASSETS + mixin.generateUrl(scope.linea.marchio.nome) + '/' + mixin.generateUrl(scope.linea.nome);
                scope.linea.image = (scope.linea.marchio.nome !== 'Zad') ? path + '/Vetrina/' + mixin.generateUrl(scope.linea.nome) + '_' + mixin.generateUrl(scope.settore) + '.jpg' : path + '/' + mixin.generateUrl(scope.linea.nome) + '.jpg';
                scope.setPrice = function (settori, settore) {
                    return _.find(settori, function (num) {
                        return num.nome === settore
                    }).prezzo;
                };
                scope.setPriceRange = function (price) {
                    switch (price) {
                        case 1:
                            return 'bassa';
                        case 2:
                            return 'media/bassa';
                        case 3:
                        default:
                            return 'media';
                        case 4:
                            return 'media/alta';
                        case 5:
                            return 'alta';
                    }
                };
                scope.linea.prezzo = scope.setPrice(scope.linea.settori, scope.settore);
                scope.linea.priceRange = scope.setPriceRange(scope.linea.prezzo);

                scope.urls =
                {
                    linea: mixin.generateUrl(scope.linea.nome),
                    settore: mixin.generateUrl(scope.settore),
                    categoria: mixin.generateUrl(scope.categoria),
                };
            }
        }
    }
})();