"use strict";

let underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});

angular.module("mpuDashboard", ['ngRoute', 'ngAnimate', 'underscore', 'ngSanitize', 'ngCookies', 'ui.bootstrap', 'services', 'ui.bootstrap']);