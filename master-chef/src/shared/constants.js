export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

export const ADD_RECIPE = "ADD_RECIPE";
export const REMOVE_RECIPE_BY_ID = "REMOVE_RECIPE_BY_ID";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const REMOVE_RECIPES_BY_PRODUCT_ID = "REMOVE_RECIPES_BY_PRODUCT_ID";

export const initialState = {
    recipes: [
        {
            id: 1,
            name: "Jajecznica",
            description: "Roztopić masło na patelni następnie rozbic dwa jajka i dodać soli mieszać ok. 2 min.",
            ingredients: [
                2,
                3,
                4
            ]
        }
    ],
    products: [
        {
            id: 1,
            name: "mleko"
        },
        {
            id: 2,
            name: "masło"
        },
        {
            id: 3,
            name: "jajka"
        },
        {
            id: 4,
            name: "sól"
        }
    ]
};