"use strict";

let underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});

angular.module("dashboardApp", ['ui.router', 'underscore', 'ngSanitize', 'services', 'ui.bootstrap'])
.run(['$http', '$rootScope', '$timeout', 'optionsSrv', function ($http, $rootScope, $timeout, optionsSrv) {
    $rootScope.options = optionsSrv;

    $rootScope.Actions = function (scope, entity) {
        this.success = function (data) {
            console.log('SUCCESS: ', data);
            scope.$emit('updateTable');
            if (data.data !== 'Updated')
                scope.actions.reset();
            $rootScope.saving = false;
            scope.confirm = false;
        };
        this.fail = function (error) {
            console.log('FAIL: ', error);
            $rootScope.saving = false;
        };
        this.confirm = () => {
            scope.confirm = true;
            $timeout(() => scope.confirm = false, 4E3);
        };
        this.checked = () => {
            scope.checked = true;
            $timeout(() => scope.checked = false, 4E3);
        };
        this.create = function () {
            $rootScope.saving = true;
            let body = scope.buildBody();
            $http.post('php/' + entity + '.php?type=new', JSON.stringify(body)).then(this.success, this.fail);
        };
        this.update = function () {
            $rootScope.saving = true;
            let body = scope.buildBody();
            body.id = scope.entity.id;
            $http.post('php/' + entity + '.php?type=update', JSON.stringify(body)).then(this.success, this.fail);
        };
        this.erase = function () {
            $rootScope.saving = true;
            let body = scope.buildBody();
            body.id = scope.entity.id;
            $http.post('php/' + entity + '.php?type=delete', JSON.stringify(body)).then(this.success, this.fail);
        };
        this.cleanInputFile = function () {
            angular.forEach(
                angular.element("input[type='file']"),
                function (inputElem) {
                    angular.element(inputElem).val(null);
                });
        }
    };

    $rootScope.settings = {
        itemsPerPage: 5,
        query: {},
        tooltip: 'top',
        load: function (entity, reload) {
            if (!reload && $rootScope[entity])
                return $rootScope[entity];

            $http.get('php/' + entity + '.php?type=get').then(
                function (data) {
                    console.log('GET SUCCESS ' + entity + ': ', data.data);
                    $rootScope[entity] = data.data;
                    $rootScope.$broadcast(entity);
                },
                function (error) {
                    console.log('GET FAILS: ', error);
                }
            )
        },
        show: (index, page) => (index >= (page - 1) * $rootScope.settings.itemsPerPage && index < page * $rootScope.settings.itemsPerPage),
        convert: (item, entity, id, name) => {
            if ($rootScope[entity])
                return _.find($rootScope[entity], function (num) {
                    return parseInt(num[id]) === parseInt(item);
                })[name];
        },
        parse: (string) => JSON.parse(string),
        checklist: {
            categorie: (entity, prefix, list) => {
                let array = [];
                _.each($rootScope[entity], function (v) {
                    let id = parseInt(v[prefix + '_id']);
                    array.push(
                        {
                            id: id,
                            nome: v[prefix + '_nome'],
                            checked: (list) ? list.indexOf(id) !== -1 : false
                        }
                    )
                });
                return array;
            },
            settori: (entity, prefix, list) => {
                let array = [];
                _.each($rootScope[entity], function (v) {
                    let id = parseInt(v[prefix + '_id']);
                    array.push(
                        {
                            id: id,
                            nome: v[prefix + '_nome'],
                            categoria: v[prefix + '_cat_id'],
                            checked: (list) ? list.indexOf(id) !== -1 : false
                        }
                    )
                });
                return array;
            }
        },
        replaceAll: (string, find, replace) => {
            return string.replace(new RegExp(find, 'g'), replace);
        },
        idToLabel: (id, list) => {
            return _.find(list, (num) => num.id === id).label;
        }
    };

    $rootScope.Model = function () {
        this.list = [];
        this.currentPage = 1;
    };

    $rootScope.saving = false;
    $rootScope.changing = false;
}]);