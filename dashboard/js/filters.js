angular.module("mpuDashboard").filter('truncate', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        return value + (tail || ' …');
    };
});

angular.module("mpuDashboard").filter('mainFilter', function () {
    return function (items, linea, settore) {
        var filtered = [];
        _.each(items, function (v) {
            if (v.l == linea && v.set.indexOf(settore) != -1) filtered.push(v);
        });
        return filtered;
    };
});

angular.module("mpuDashboard").filter('settoreFilter', function () {
    return function (items, catID) {
        if (!catID) {
            return items;
        } else {
            return settori = _.where(items, {g: catID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByMark', function () {
    return function (items, markID) {
        if (!markID) {
            return items;
        } else {
            return result = _.where(items, {m: markID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByLine', function () {
    return function (items, lineID) {
        if (!lineID) {
            return items;
        } else {
            return result = _.where(items, {l: lineID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByLineVtr', function () {
    return function (items, lineID) {
        if (!lineID) {
            return items;
        } else {
            return result = _.where(items, {j: lineID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByNewLine', function () {
    return function (items, lineID) {
        if (!lineID) {
            return items;
        } else {
            return result = _.where(items, {w: lineID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByTab', function () {
    return function (items, tabID) {
        if (!tabID) {
            return items;
        } else {
            return result = _.where(items, {u: tabID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByCmp', function () {
    return function (items, tabID) {
        if (!tabID || tabID == '') {
            return items;
        } else {
            var result = [];
            _.each(tabID, function (v) {
                _.each(items, function (e) {
                    if (v == e.c) result.push(e);
                })
            });
            return result;
        }
    }
});

angular.module("mpuDashboard").filter('filterByPrd', function () {
    return function (items, tabID) {
        if (!tabID) {
            return items;
        } else {
            return result = _.where(items, {p: tabID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByNaz', function () {
    return function (items, tabID) {
        if (!tabID) {
            return items;
        } else {
            return result = _.where(items, {z: tabID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByReg', function () {
    return function (items, tabID) {
        if (!tabID) {
            return items;
        } else {
            return result = _.where(items, {r: tabID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByProv', function () {
    return function (items, tabID) {
        if (!tabID) {
            return items;
        } else {
            return result = _.where(items, {p: tabID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByConv', function () {
    return function (items, tabID) {
        if (!tabID) {
            return items;
        } else {
            return result = _.where(items, {v: tabID});
        }
    };
});

angular.module("mpuDashboard").filter('filterByRiv', function () {
    return function (items, tabID) {
        if (!tabID) {
            return items;
        } else {
            return result = _.where(items, {r: tabID});
        }
    };
});

angular.module("mpuDashboard").filter('lineaFilter', function () {
    return function (items, categoria, settore) {
        var categorie = false;
        var settori = false;
        categorie = _.findWhere(items, {i: categoria});
        if (categorie) settori = _.findWhere(categorie.settori, {i: settore});
        if (settori) return settori.l;
    };
});

/*
angular.module("mpuDashboard").filter('tbprFilter', function() {
    return function( items, linea, tbpr) {
        var filtered = [];
        _.each(items, function(v) {
            if(v.line == linea && v.tbpr == tbpr) filtered.push(v);
        });
        return filtered;
    };
});
*/

angular.module("mpuDashboard").filter('offset', function () {
    return function (items, start, end) {
        return (items || []).slice(start, end);
    };
});

angular.module("mpuDashboard").filter('filterById', function () {
    return function (items, id, elem) {
        if (!id)
            return items;
        else
            return _.filter(items, (num) => num[elem] === id);
    };
});

angular.module("mpuDashboard").filter('decoded', function () {
    let e = null;
    let cache = {};

    function htmlDecode(input) {
        if (cache[input]) {
            return cache[input];
        }

        if (e === null)
            e = document.createElement('div');

        e.innerHTML = input;
        let result = e.childNodes[0].nodeValue;

        cache[input] = result;
        return result;
    }

    return function (input) {
        if(input)
            return htmlDecode(input);
    }
});