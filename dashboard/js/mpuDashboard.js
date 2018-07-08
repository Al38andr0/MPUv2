"use strict";

var app = angular.module("mpuDashboard", ['ngRoute', 'ngAnimate', 'underscore', 'ngSanitize', 'ngCookies', 'ui.bootstrap', 'ng-ftscroller', 'services']);

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});