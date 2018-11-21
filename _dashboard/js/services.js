angular.module("services", [])
    .service('pagesSrv', pagesSrv)
    .service('optionsSrv', optionsSrv);

function pagesSrv () {
    return [
        {
            name: 'struttura',
            link: 'marchi',
            sub: [
                {
                    name: 'categorie',
                    link: 'categorie'
                },
                {
                    name: 'settori',
                    link: 'settori'
                }
            ]
        },
        {
            name: 'marchi',
            link: 'marchi',
            sub: [
                {
                    name: 'marchi',
                    link: 'marchi'
                },
                {
                    name: 'tabelle prodotti',
                    link: 'tabelle_prodotti'
                }
            ]
        },
        {
            name: 'finiture',
            link: 'finiture',
            sub: [
                {
                    name: 'finiture',
                    link: 'finiture'
                },
                {
                    name: 'tabelle',
                    link: 'tabelle_finiture'
                },
                {
                    name: 'abbinamenti',
                    link: 'abbinamenti'
                }
            ]
        },
        {
            name: 'linee',
            link: 'linee',
            sub: [
                {
                    name: 'linee',
                    link: 'linee'
                },
                {
                    name: 'settori',
                    link: 'settori_linee'
                }
            ]
        },
        {
            name: 'prodotti',
            link: 'prodotti',
            sub: [
                {
                    name: 'prodotti',
                    link: 'prodotti'
                }
            ]
        },
        {
            name: 'vetrine',
            link: 'vetrine',
            sub: [
                {
                    name: 'vetrine',
                    link: 'vetrine'
                },
                {
                    name: 'prodotti',
                    link: 'vetrine_prodotti'
                }
            ]
        },
        {
            name: 'distribuzione',
            link: 'rivenditori',
            sub: [
                {
                    name: 'province',
                    link: 'province'
                },
                {
                    name: 'convenzioni',
                    link: 'convenzioni'
                },
                {
                    name: 'rivenditori',
                    link: 'rivenditori'
                },
                {
                    name: 'agenti',
                    link: 'agenti'
                }
            ]
        }
    ]
}

function optionsSrv () {
    return {
        generico: [
            {
                id: 1,
                label: 'Si'
            },
            {
                id: 0,
                label: 'No'
            }
        ],
        show: [
            {
                id: 1,
                label: 'Online'
            },
            {
                id: 0,
                label: 'Offline'
            }
        ],
        multiple: [
            {
                id: 1,
                label: 'Singola'
            },
            {
                id: 0,
                label: 'Multiple'
            }
        ],
        finitura: [
            {
                id: 1,
                label: 'Rivestimento'
            },
            {
                id: 0,
                label: 'Finitura'
            }
        ],
        homepage: [
            {
                id: 1,
                label: 'Visibile'
            },
            {
                id: 0,
                label: 'Non visibile'
            }
        ],
        vetrina: [
            {
                id: 1,
                label: 'Attivata'
            },
            {
                id: 0,
                label: 'Disattivata'
            }
        ],
        prezzo: [
            {
                id: 1,
                label: 'Bassa'
            },
            {
                id: 2,
                label: 'Media/Bassa'
            },
            {
                id: 3,
                label: 'Media'
            },
            {
                id: 4,
                label: 'Media/Alta'
            },
            {
                id: 5,
                label: 'Alta'
            }
        ],
        servizi: [
            {
                id: 1,
                label: 'Importo fisso'
            },
            {
                id: 2,
                label: 'Percentuale'
            },
            {
                id: 3,
                label: 'Da quantificare'
            }
        ],
        richiesta: [
            {
                id: 1,
                label: 'ritiro presso i vostri magazzini'
            },
            {
                id: 2,
                label: 'necessito solo del trasporto'
            },
            {
                id: 3,
                label: 'necessito del trasporto e montaggio'
            }
        ],
        cliente: [
            {
                id: 1,
                label: 'società / libero professionista'
            },
            {
                id: 2,
                label: 'privato'
            }
        ],
        pagamenti: [
            {
                id: 1,
                label: 'saldo totale all\'ordine'
            },
            {
                id: 2,
                label: 'acconto del 30% all\'ordine e saldo in contrassegno'
            },
            {
                id: 3,
                label: '\'acconto del 30% all\\\'ordine e saldo dilazionabile*\''
            }
        ]
    }
}