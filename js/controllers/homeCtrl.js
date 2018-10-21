(function () {
    'use strict';

    angular.module('mpu')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope'];

    function homeCtrl($scope) {
        $scope.settori = {
            current : 0,
            indices: ['Arredi', 'Sedute', 'Pareti', 'Accessori', 'Art & Design'],
            list: [
                [
                    {
                        bg: '/img/home/particolare_direzionali.jpg',
                        title: 'Ambienti direzionali',
                        subtitle: 'Il valore dell\'immagine e della qualità.',
                        message: 'Scrivanie e mobili arricchite da materiali di prestigio, per dare un tocco di classe e lusso al proprio ufficio, accostate da forme geometriche essenziali, espressione di un design ricco di stile e funzionale.',
                        link: ''
                    },
                    {
                        bg: '/img/home/postazione_lavoro.jpg',
                        title: 'Ambienti operativi',
                        subtitle: 'Praticità, comfort & design.',
                        message: 'Gli ambienti operativi propongono soluzioni a queste esigenze per ottenere sempre il massimo dal tuo ambiente di lavoro.',
                        link: ''
                    },
                    {
                        bg: '/img/home/ambiente_reception_bianco.jpg',
                        title: 'Ambienti reception',
                        subtitle: 'Immagine ed accoglienza',
                        message: 'La reception è il biglietto da visita del vostro ufficio. Ospitalità, eleganza, praticità e comfort sono caratteristiche irrinunciabili alle esigenze di rappresentanza di un moderno ambiente di lavoro.',
                        link: ''
                    },
                    {
                        bg: '/img/home/ambiente_riunioni_vetro.jpg',
                        title: 'Ambienti riunioni',
                        subtitle: 'Liberis mori!',
                        message: 'Amors sunt fortiss de varius mons. Magnum bursa virtualiter imitaris scutum est. Vae, raptus xiphias! Ubi est secundus danista? Amor volares, tanquam azureus absolutio. Cum ignigena studere, omnes aususes talem secundus, alter fluctuses.',
                        link: ''
                    }
                ],
                [
                    {
                        bg: '/img/home/particolare_direzionali.jpg',
                        title: 'Sedute direzionali',
                        subtitle: 'Il valore dell\'immagine e della qualità.',
                        message: 'Scrivanie e mobili arricchite da materiali di prestigio, per dare un tocco di classe e lusso al proprio ufficio, accostate da forme geometriche essenziali, espressione di un design ricco di stile e funzionale.',
                        link: ''
                    },
                    {
                        bg: '/img/home/postazione_lavoro.jpg',
                        title: 'Sedute operative',
                        subtitle: 'Praticità, comfort & design.',
                        message: 'Gli ambienti operativi propongono soluzioni a queste esigenze per ottenere sempre il massimo dal tuo ambiente di lavoro.',
                        link: ''
                    },
                    {
                        bg: '/img/home/ambiente_reception_bianco.jpg',
                        title: 'Sedute attesa',
                        subtitle: 'Immagine ed accoglienza',
                        message: 'La reception è il biglietto da visita del vostro ufficio. Ospitalità, eleganza, praticità e comfort sono caratteristiche irrinunciabili alle esigenze di rappresentanza di un moderno ambiente di lavoro.',
                        link: ''
                    },
                    {
                        bg: '/img/home/ambiente_riunioni_vetro.jpg',
                        title: 'Poltrone e divani',
                        subtitle: 'Liberis mori!',
                        message: 'Amors sunt fortiss de varius mons. Magnum bursa virtualiter imitaris scutum est. Vae, raptus xiphias! Ubi est secundus danista? Amor volares, tanquam azureus absolutio. Cum ignigena studere, omnes aususes talem secundus, alter fluctuses.',
                        link: ''
                    }
                ],
                [
                    {
                        bg: '/img/home/particolare_direzionali.jpg',
                        title: 'Ambienti direzionali',
                        subtitle: 'Il valore dell\'immagine e della qualità.',
                        message: 'Scrivanie e mobili arricchite da materiali di prestigio, per dare un tocco di classe e lusso al proprio ufficio, accostate da forme geometriche essenziali, espressione di un design ricco di stile e funzionale.',
                        link: ''
                    },
                    {
                        bg: '/img/home/postazione_lavoro.jpg',
                        title: 'Ambienti operativi',
                        subtitle: 'Praticità, comfort & design.',
                        message: 'Gli ambienti operativi propongono soluzioni a queste esigenze per ottenere sempre il massimo dal tuo ambiente di lavoro.',
                        link: ''
                    },
                    {
                        bg: '/img/home/ambiente_reception_bianco.jpg',
                        title: 'Ambienti reception',
                        subtitle: 'Immagine ed accoglienza',
                        message: 'La reception è il biglietto da visita del vostro ufficio. Ospitalità, eleganza, praticità e comfort sono caratteristiche irrinunciabili alle esigenze di rappresentanza di un moderno ambiente di lavoro.',
                        link: ''
                    },
                    {
                        bg: '/img/home/ambiente_riunioni_vetro.jpg',
                        title: 'Ambienti riunioni',
                        subtitle: 'Liberis mori!',
                        message: 'Amors sunt fortiss de varius mons. Magnum bursa virtualiter imitaris scutum est. Vae, raptus xiphias! Ubi est secundus danista? Amor volares, tanquam azureus absolutio. Cum ignigena studere, omnes aususes talem secundus, alter fluctuses.',
                        link: ''
                    }
                ],
                [
                    {
                        bg: '/img/home/particolare_direzionali.jpg',
                        title: 'Ambienti direzionali',
                        subtitle: 'Il valore dell\'immagine e della qualità.',
                        message: 'Scrivanie e mobili arricchite da materiali di prestigio, per dare un tocco di classe e lusso al proprio ufficio, accostate da forme geometriche essenziali, espressione di un design ricco di stile e funzionale.',
                        link: ''
                    },
                    {
                        bg: '/img/home/postazione_lavoro.jpg',
                        title: 'Ambienti operativi',
                        subtitle: 'Praticità, comfort & design.',
                        message: 'Gli ambienti operativi propongono soluzioni a queste esigenze per ottenere sempre il massimo dal tuo ambiente di lavoro.',
                        link: ''
                    },
                    {
                        bg: '/img/home/ambiente_reception_bianco.jpg',
                        title: 'Ambienti reception',
                        subtitle: 'Immagine ed accoglienza',
                        message: 'La reception è il biglietto da visita del vostro ufficio. Ospitalità, eleganza, praticità e comfort sono caratteristiche irrinunciabili alle esigenze di rappresentanza di un moderno ambiente di lavoro.',
                        link: ''
                    },
                    {
                        bg: '/img/home/ambiente_riunioni_vetro.jpg',
                        title: 'Ambienti riunioni',
                        subtitle: 'Liberis mori!',
                        message: 'Amors sunt fortiss de varius mons. Magnum bursa virtualiter imitaris scutum est. Vae, raptus xiphias! Ubi est secundus danista? Amor volares, tanquam azureus absolutio. Cum ignigena studere, omnes aususes talem secundus, alter fluctuses.',
                        link: ''
                    }
                ],
                [
                    {
                        bg: '/img/home/particolare_direzionali.jpg',
                        title: 'Ambienti direzionali',
                        subtitle: 'Il valore dell\'immagine e della qualità.',
                        message: 'Scrivanie e mobili arricchite da materiali di prestigio, per dare un tocco di classe e lusso al proprio ufficio, accostate da forme geometriche essenziali, espressione di un design ricco di stile e funzionale.',
                        link: ''
                    },
                    {
                        bg: '/img/home/postazione_lavoro.jpg',
                        title: 'Ambienti operativi',
                        subtitle: 'Praticità, comfort & design.',
                        message: 'Gli ambienti operativi propongono soluzioni a queste esigenze per ottenere sempre il massimo dal tuo ambiente di lavoro.',
                        link: ''
                    },
                    {
                        bg: '/img/home/ambiente_reception_bianco.jpg',
                        title: 'Ambienti reception',
                        subtitle: 'Immagine ed accoglienza',
                        message: 'La reception è il biglietto da visita del vostro ufficio. Ospitalità, eleganza, praticità e comfort sono caratteristiche irrinunciabili alle esigenze di rappresentanza di un moderno ambiente di lavoro.',
                        link: ''
                    },
                    {
                        bg: '/img/home/ambiente_riunioni_vetro.jpg',
                        title: 'Ambienti riunioni',
                        subtitle: 'Liberis mori!',
                        message: 'Amors sunt fortiss de varius mons. Magnum bursa virtualiter imitaris scutum est. Vae, raptus xiphias! Ubi est secundus danista? Amor volares, tanquam azureus absolutio. Cum ignigena studere, omnes aususes talem secundus, alter fluctuses.',
                        link: ''
                    }
                ]
            ]
        };
    }
})();