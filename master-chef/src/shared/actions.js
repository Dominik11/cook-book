const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const ADD_RECIPE = "ADD_RECIPE";

export function addProduct(newProduct) {
    return {
        type: ADD_PRODUCT,
        newProduct
    }
}

export function updateProduct(product) {
    return {
        type: UPDATE_PRODUCT,
        product
    }
}

export function addRecipe(newRecipe) {
    return {
        type: ADD_RECIPE,
        newRecipe
    }
}