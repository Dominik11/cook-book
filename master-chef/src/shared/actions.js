const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const ADD_RECIPE = "ADD_RECIPE";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const REMOVE_RECIPE = "REMOVE_RECIPE";

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

export function removeProduct(product) {
    return {
        type: REMOVE_PRODUCT,
        product
    }
}

export function addRecipe(newRecipe) {
    return {
        type: ADD_RECIPE,
        newRecipe
    }
}

export function removeRecipes(productId) {
    return {
        type: REMOVE_RECIPE,
        productId
    }
}