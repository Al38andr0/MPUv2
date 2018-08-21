<!DOCTYPE html>
<html ng-app="mpu" ng-controller="mainCtrl as vm" ng-cloak>
<head lang="it">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <link rel="icon" type="image/png" href="img/favicon.ico" title="mobiliperufficio.com"/>
    <link rel="author" href="https://plus.google.com/105034652436636507879">

    <title ng-bind="ngMeta.title">Mobiliperufficio.com</title>
    <meta name="author" content="{{ngMeta['author']}}" />
    <meta name="description" content="{{ngMeta.description}}" />
</head>
<body>
<a ui-sref="test({loc: 'mpu'})">TEST</a>
<a ui-sref="home">HOME</a>
<ui-view></ui-view>
</body>
<script src="/lib/angular.js"></script>
<!--<script src="/lib/angular.min.js"></script>-->
<script src="/lib/underscore-min.js"></script>
<script src="/lib/angular-ui-router.min.js"></script>
<script src="/lib/ngMeta.min.js"></script>
<script type="text/javascript" src="/js/module.js"></script>
<script type="text/javascript" src="/js/routes.js"></script>
<script type="text/javascript" src="/js/services/rivenditori.js"></script>
<!--<script type="text/javascript" src="/js/filters.js"></script>-->
<script type="text/javascript" src="/js/controllers/mainCtrl.js"></script>
</html>