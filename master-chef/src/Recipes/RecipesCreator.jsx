import React from 'react';
import PropTypes from "prop-types";
import RecipeList from "./RecipeList"

function RecipesCreator({products, idGenerator}) {
    return (
        <RecipeList products={products} idGenerator={idGenerator}/>
    );
}

RecipesCreator.propTypes = {
    products: PropTypes.array,
    idGenerator: PropTypes.func
};

export default RecipesCreator;