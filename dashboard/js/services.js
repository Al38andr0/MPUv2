angular.module("services", ['ngRoute']);
angular.module("services").service('dashboardPages', function(){
    return [
        {
            name : 'struttura',
            link : 'marchi',
            sub : [
                {
                    name : 'categorie',
                    link : 'categorie'
                },
                {
                    name : 'settori',
                    link : 'settori'
                }
            ]
        },
        {
            name : 'marchi',
            link : 'marchi',
            sub : [
                {
                    name : 'marchi',
                    link : 'marchi'
                },
                {
                    name : 'tabelle prodotti',
                    link : 'marchiTabelle'
                }
            ]
        },
        {
            name : 'finiture',
            link : 'finiture',
            sub : [
                {
                    name : 'finiture',
                    link : 'finiture'
                },
                {
                    name : 'tabelle',
                    link : 'finitureTabelle'
                },
                {
                    name : 'abbinamenti',
                    link : 'abbinamenti'
                }
            ]
        },
        {
            name : 'linee',
            link : 'linee',
            sub : [
                {
                    name : 'linee',
                    link : 'linee'
                },
                {
                    name : 'settori',
                    link : 'lineeSettori'
                }
            ]
        },
        {
            name : 'prodotti',
            link : 'prodotti',
            sub : [
                {
                    name : 'prodotti',
                    link : 'prodotti'
                }
            ]
        },
        {
            name : 'vetrine',
            link : 'vetrine',
            sub : [
                {
                    name : 'vetrine',
                    link : 'vetrine'
                },
                {
                    name : 'prodotti',
                    link : 'vetrineProdotti'
                }
            ]
        },
        {
            name : 'distribuzione',
            link : 'rivenditori',
            sub : [
                {
                    name : 'province',
                    link : 'province'
                },
                {
                    name : 'convenzioni',
                    link : 'convenzioni'
                },
                {
                    name : 'rivenditori',
                    link : 'rivenditori'
                },
                {
                    name: 'agenti',
                    link: 'agenti'
                }
            ]
        }
    ]
});

angular.module("services").service('dataSvc', ['$http', function($http){

    function promise(url) {
        return $http.get(url);
    }
    var path = '/dashboard/json/';

    return {
        categorie: function(){
            return promise(path + "categorie.json");
        },
        gestione: function(){
            return promise(path + "gestione.json");
        },
        settori: function(){
            return promise(path + "settori.json");
        },
        marchi: function(){
            return promise(path + "marchi.json");
        },
        tbpr: function(){
            return promise(path + "marchi_tabelle.json");
        },
        finiture: function(){
            return promise(path + "finiture.json");
        },
        finitureTabelle: function(){
            return promise(path + "finiture_tabelle.json");
        },
        abbinamenti: function(){
            return promise(path + "abbinamenti.json");
        },
        linee: function(){
            return promise(path + "linee.json");
        },
        prodotti: function(){
            return promise(path + "prodotti.json");
        },
        prodottiSettori: function(){
            return promise(path + "prodotti_settori.json");
        },
        lineeSettori: function(){
            return promise(path + "linee_settori.json");
        },
        vetrine: function(){
            return promise(path + "vetrine.json");
        },
        vetrineProdotti: function(){
            return promise(path + "vetrine_prodotti.json");
        },
        esposizioni: function(){
            return promise(path + "esposizioni.json");
        },
        esposizioniProdotti: function(){
            return promise(path + "esposizioni_prodotti.json");
        },
        esposizioniSettori: function(){
            return promise(path + "esposizioni_settori.json");
        },
        composti: function(){
            return promise(path + "composti.json");
        },
        compostiProdotti: function(){
            return promise(path + "composti_prodotti.json");
        },
        compostiSettori: function(){
            return promise(path + "composti_settori.json");
        },
        nazioni: function(){
            return promise(path + "nazioni.json");
        },
        regioni: function(){
            return promise(path + "regioni.json");
        },
        province: function(){
            return promise(path + "province.json");
        },
        convenzioni: function(){
            return promise(path + "convenzioni.json");
        },
        rivenditori: function(){
            return promise(path + "rivenditori.json");
        },
        riv: function(){
            return promise(path + "riv.json");
        },
        tbprLin: function(ID){
            return promise(path + "tbpr/" + ID + ".json");
        },
        tbespLin: function(ID){
            return promise(path + "tbesp/" + ID + ".json");
        },
        intro: function(){
            return promise(path + "intro.json");
        },
        agenti: function(){
            return promise(path + "agenti.json");
        },
        age: function(){
            return promise(path + "age.json");
        },
        faq: function(){
            return promise(path + "faq.json");
        }
    };
}]);

angular.module("services").service('lineeManager', function(){
    return [
        {
            n : 'Vetrina',
            i : 1,
            y : 1
        },
        {
            n : 'Listino',
            i : 2,
            y : 4
        }
/*
        {
            n : 'Listino Base',
            i : 4,
            y : 3
        },
        {
            n : 'Composizioni',
            i : 3,
            y : 2
        }
*/
    ]
});

angular.module("services").service('priceManager', function(){
    return [
        {
            n : 'importo fisso',
            i : 1
        },
        {
            n : 'percentuale',
            i : 2
        },
        {
            n : 'da quantificare',
            i : 3
        }
    ]
});

angular.module("services").service('priceLinee', function(){
    return [
/*
        {
            n : 'miglior prezzo',
            i : 1
        },
*/
        {
            n : 'economico',
            i : 2
        },
        {
            n : 'design',
            i : 3
        },
        {
            n : 'top class',
            i : 4
        }
/*
        ,
        {
            n : 'luxury',
            i : 5
        }
*/
    ]
});

angular.module("services").service('tm', function(){
    return [
        {
            n : 'necessito del trasporto e montaggio',
            i : 2
        },
        {
            n : 'necessito solo del trasporto',
            i : 1
        },
        {
            n : 'ritiro presso i vostri magazzini',
            i : 0
        }
    ]
});

angular.module("services").service('cliente', function(){
    return [
        {
            i : 1,
            n : 'società / libero professionista'
        },
        {
            i : 2,
            n : 'privato'
        }
    ]
});

angular.module("services").service('spedizione', function(){
    return [
        {
            i : 1,
            n : 'si'
        },
        {
            i : 0,
            n : 'no'
        }
    ]
});

angular.module("services").service('pagamenti', function(){
    return [
        {
            i : 1,
            n : 'saldo totale all\'ordine'
        },
        {
            i : 2,
            n : 'acconto del 30% all\'ordine e saldo in contrassegno'
        },
        {
            i : 3,
            n : 'acconto del 30% all\'ordine e saldo dilazionabile*'
        }
    ]
});

