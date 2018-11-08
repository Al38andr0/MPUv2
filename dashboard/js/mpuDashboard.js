"use strict";

var app = angular.module("mpuDashboard", ['ngRoute', 'ngAnimate', 'underscore', 'ngSanitize', 'ngCookies', 'ui.bootstrap', 'services', 'ui.bootstrap']);

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});