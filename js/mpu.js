"use strict";

var app = angular.module("mpu", ['ngRoute', 'underscore', 'ngCookies', 'ng-ftscroller', 'services', 'ngTouch', 'ngSanitize', 'infinite-scroll']);

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'it', includedLanguages: 'en'}, 'google_translate_element');
}

(function(
    angular, $
) {
    angular.module('mpu').directive('a', [
        function blueImpFix() {
            function prevent(e) {
                e.preventDefault();
            }
            function unprevent() {
                $(this).unbind('click', prevent);
            }
            return {
                restrict: 'E',
                link: function(scope, elem, attrs) {
                    if('gallery' in attrs) {
                        elem.bind('click', prevent).on('$destroy', unprevent);
                    }
                    return elem;
                }
            };
        }
    ]);
})(
    window.angular,
    window.jQuery
);