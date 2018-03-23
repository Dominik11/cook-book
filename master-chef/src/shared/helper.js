import get from "lodash/get";

export function generateRandomId() {
    return Math.random() * 1000000000000000000;
}

export function getProductName(products = [], productId) {
    if (!productId) {
        throw "wrong productId";
    }
    const product = products.find(product => product.id === productId);

    return get(product, "name", "Brak nazwy produktu!");
}