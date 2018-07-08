angular.module("mpu").filter('truncate', function () {
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

angular.module("mpu").filter('mainFilter', function() {
    return function( items, linea, settore) {
        var filtered = [];
        _.each(items, function(v) {
            if(v.line == linea && v.set.indexOf(settore) != -1) filtered.push(v);
        });
        return filtered;
    };
});

angular.module("mpu").filter('settoreFilter', function() {
    return function( items, categoria) {
        var categorie = false;
        categorie = _.findWhere(items, {id : categoria});
        if(categorie) return categorie.settori;
    };
});

angular.module("mpu").filter('lineaFilter', function() {
    return function( items, categoria, settore) {
        var categorie = false;
        var settori = false;
        categorie = _.findWhere(items, {id : categoria});
        if(categorie) settori = _.findWhere(categorie.settori, {id : settore});
        if(settori) return settori.line;
    };
});

angular.module("mpu").filter('tbprFilter', function() {
    return function( items, linea, tbpr) {
        var filtered = [];
        _.each(items, function(v) {
            if(v.line == linea && v.tbpr == tbpr) filtered.push(v);
        });
        return filtered;
    };
});

angular.module("mpu").filter('filterNaz', function() {
    return function( items, tabID) {
        if(!tabID) {
            return items;
        } else {
            return _.where(items, {z : tabID});
        }
    };
});

angular.module("mpu").filter('filterReg', function() {
    return function( items, tabID) {
        if(!tabID) {
            return items;
        } else {
            return _.where(items, {r : tabID});
        }
    };
});

angular.module("mpu").filter('filterPrv', function() {
    return function( items, tabID) {
        if(!tabID) {
            return items;
        } else {
            return _.where(items, {p : tabID});
        }
    };
});

/*
angular.module("mpu").filter('filterByPrice', function() {
    return function( items, tabID) {
        console.log(tabID)
        if(!tabID) {
            return items;
        } else {
            console.log(tabID)
            if(tabID == 1 || tabID == 2) return _.filter(items, function(list){ return list.z <= 2});
            if(tabID == 3) return _.where(items, {z : 3});
            if(tabID == 4 || tabID == 5) return _.filter(items, function(list){ return list.z >= 4});
        }
    };
});
*/

angular.module("mpu").filter('filterByDelivery', function() {
    return function( items, tabID) {
        if(!tabID) {
            return items;
        } else {
            return _.filter(items, function(list) {
                return list.e <= tabID;
            });
        }
    };
});

angular.module("mpu").filter('filterByCod', function() {
    return function( items, tabID) {
        if(!tabID) {
            return items;
        } else {
            return _.where(items, {c : tabID});
        }
    };
});

angular.module("mpu").filter('filterByTbpr', function() {
    return function( items, tabID) {
        if(!tabID) {
            return items;
        } else {
            return _.where(items, {i : tabID});
        }
    };
});

angular.module("mpu").filter('filterBySettori', function() {
    return function( items, tabID) {
        if(tabID.length == 0) {
            return items;
        } else {
            var list = [];
            _.each(items, function(v) {
                _.each(tabID, function(k) {
                    if(_.contains(v.q, k)) {
                        list.push(v);
                    }
                })
            });
            return _.uniq(list);
        }
    };
});

angular.module("mpu").filter('filterByPrice', function() {
    return function( items, tabID) {
        if(tabID.length == 0) {
            return items;
        } else {
            var list = [];
            _.each(items, function(v) {
                _.each(tabID, function(k) {
                    if(k <= 2) {
                        if(v.z == 1 || v.z == 2) {
                            list.push(v);
                        }
                    }
                    if(k == 3 && v.z == 3) {
                        list.push(v);
                    }
                    if(k >= 4) {
                        if(v.z == 4 || v.z == 5) {
                            list.push(v);
                        }
                    }
                })
            });
            return _.uniq(list);
        }
    };
});

angular.module("mpu").filter('filterByFin0', function() {
    return function( items, finID) {
        if(!finID) {
            return items;
        } else {
            return _.filter(items, function(list) {return list.f[0].i == finID});
        }
    };
});

angular.module("mpu").filter('filterByFin1', function() {
    return function( items, finID) {
        if(!finID) {
            return items;
        } else {
            return _.filter(items, function(list) {return list.f[1].i == finID});
        }
    };
});

angular.module("mpu").filter('filterByFin2', function() {
    return function( items, finID) {
        if(!finID) {
            return items;
        } else {
            return _.filter(items, function(list) {return list.f[2].i == finID});
        }
    };
});

angular.module("mpu").filter('filterByFin3', function() {
    return function( items, finID) {
        if(!finID) {
            return items;
        } else {
            return _.filter(items, function(list) {return list.f[3].i == finID});
        }
    };
});

angular.module("mpu").filter('filterByFin4', function() {
    return function( items, finID) {
        if(!finID) {
            return items;
        } else {
            return _.filter(items, function(list) {return list.f[4].i == finID});
        }
    };
});

angular.module("mpu").filter('filterByFin5', function() {
    return function( items, finID) {
        if(!finID) {
            return items;
        } else {
            return _.filter(items, function(list) {return list.f[5].i == finID});
        }
    };
});

angular.module("mpu").filter('filterByFin6', function() {
    return function( items, finID) {
        if(!finID) {
            return items;
        } else {
            return _.filter(items, function(list) {return list.f[6].i == finID});
        }
    };
});