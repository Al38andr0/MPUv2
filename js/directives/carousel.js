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
                list: '<',
                delay: "<"
            },
            link: function (scope, elem, attrs) {
                let index = 0,
                    timing = 10000;
                scope.current = {};
                scope.next = {};

                function getRandomInt(max) {
                    return Math.floor(Math.random() * Math.floor(max));
                }

                let applyBg = function (index, className) {
                    let current = index % scope.list.length,
                        next = (index + 1) % scope.list.length,
                        div = index % 2,
                        sibling = (div === 0) ? 1 : 0;

                    scope.current = scope.list[current];
                    scope.next = scope.list[next];

                    let currentDiv = angular.element(elem[0].children[div]),
                        siblingDiv = angular.element(elem[0].children[sibling]);

                    currentDiv.addClass(className).css({
                        'z-index': index
                    });
                    currentDiv.find('div').eq(0).css({
                        background: 'url("' + scope.current.bg + '") no-repeat center',
                        'transform-origin': getRandomInt(100) + '%' + getRandomInt(100) + '%'
                }).addClass('animated');
                    currentDiv.find('h3').html(scope.current.title);
                    currentDiv.find('h6').html(scope.current.subtitle);
                    currentDiv.find('p').html(scope.current.message);
                    $timeout(function () {
                        siblingDiv.removeClass('visible init').css({
                            'z-index': index + 1
                        });
                        siblingDiv.find('div').eq(0).css({
                            background: 'url("' + scope.next.bg + '") no-repeat center',
                            'transform-origin': getRandomInt(100) + '%' + getRandomInt(100) + '%'
                        }).removeClass('animated');
                        siblingDiv.find('h3').html(scope.next.title);
                        siblingDiv.find('h6').html(scope.next.subtitle);
                        siblingDiv.find('p').html(scope.next.message);
                    }, timing / 2);
                };

                $timeout(function () {
                    applyBg(index, 'init');
                },10);

                $timeout(function () {
                    $interval(function () {
                        applyBg(++index, 'visible');
                    }, timing);
                }, scope.delay)
            }
        }
    }
})();