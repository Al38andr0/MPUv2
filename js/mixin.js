window.Mixin = function () {
    let generateUrl = function (text) {
        return text.toString().toLowerCase()
            .replace(/&+/g, 'e')
            .replace(/\s+/g, '_')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    let getPrice = function (marchio, listino, linea, prezzo) {
        let price = prezzo + ((prezzo * listino) / 100);
        price += (price * marchio) / 100;
        price += (price * linea) / 100;
        return Math.ceil(price);
    };

    return {
        generateUrl: generateUrl,
        getPrice: getPrice
    }
};