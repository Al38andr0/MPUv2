(function () {
    'use strict';

    angular.module('mpu')
        .directive('carousel', carousel);

    carousel.$inject = ['$interval', '$timeout'];

    function carousel($interval, $timeout) {
        return {
            restrict: 'E',
            templateUrl: '/html/templates/carousel.html',
            scope: {
                categoria: '@',
                delay: "<"
            },
            link: function (scope, elem, attrs) {
                scope.list = [];
                let index = 0,
                    timing = 5000;
                scope.current = {};
                scope.next = {};
                switch (scope.categoria) {
                    case 'mobili':
                        scope.list = [
                            {
                                bg: '/img/home/particolare_direzionali.jpg',
                                title: 'Ambienti direzionali',
                                message: 'Monss experimentum, tanquam domesticus lixa.',
                                link: ''
                            },
                            {
                                bg: '/img/home/postazione_lavoro.jpg',
                                title: 'Ambienti operativi',
                                message: 'Everyone just loves the saltyness of popcorn smoothie jumbled with radish sprouts.',
                                link: ''
                            },
                            {
                                bg: '/img/home/ambiente_reception_bianco.jpg',
                                title: 'Ambienti reception',
                                message: 'Lead me gull, ye evil reef!',
                                link: ''
                            }
                        ]
                }

                let applyBg = function (index, className) {
                    let current = index % scope.list.length,
                        next = (index + 1) % scope.list.length,
                        div = index % 2,
                        sibling = (div === 0) ? 1 : 0;

                    scope.current = scope.list[current];
                    scope.next = scope.list[next];

                    angular.element(elem[0].children[div]).addClass(className).css({
                        'background': 'url("' + scope.current.bg + '") no-repeat center',
                        'z-index': index
                    });
                    $timeout(function () {
                        angular.element(elem[0].children[sibling]).removeClass('visible init').css({
                            'background': 'url("' + scope.next.bg + '") no-repeat center',
                            'z-index': index + 1
                        });
                    }, timing/2);
                };

                applyBg(index, 'init');

                $timeout(function () {
                    $interval(function () {
                        applyBg(++index, 'visible');
                    }, timing);
                }, scope.delay)
            }
        }
    }
})();