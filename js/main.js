require.config({
    urlArgs: 'bust=' + (new Date()).getTime(),
    paths: {
        angular: '/lib/angular.min',
        angularAMD: '/lib/angularAMD.min',
        underscore: '/lib/underscore-min',
        router: '/lib/angular-ui-router.min',
        // ngMeta: '/lib/ngMeta.min',
        mpu: '/js/module'
    },
    shim: {
        underscore : {
            exports: '_'
        },
        angularAMD: ['angular'],
        ngMeta: ['angular'],
        router: ['angular']
    },
    deps: ['mpu']
});

require([
    '/js/routes.js',
    '/js/controllers/mainCtrl.js',
    '/js/services/rivenditori.js',
    '/js/services/rivenditori.js'
]);