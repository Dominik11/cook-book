import React, {Component} from 'react';
import PropTypes from "prop-types";
import {getProductName} from "../shared/helper";

class RecipeList extends Component {

    renderRecipeList = recipes => {
        const shouldRenderRecipesList = recipes.length > 0;

        return shouldRenderRecipesList ?
            recipes.map(this.renderRecipe) :
            this.props.recipesEmptyListMessage;
    };

    renderRecipe = recipe => {
        /*tymczasowe render*/
        return (
            <li key={recipe.id}>
                {recipe.name}|
                {recipe.description}|
                [
                    {recipe.ingredients.map(productId =>
                        <span key={productId}>
                            {getProductName(this.props.products, productId)},
                        </span>
                    )}
                ]
            </li>
        )
    };

    render() {
        return (
            <div>
                {this.renderRecipeList(this.props.recipes)}
            </div>
        )
    }
}

RecipeList.propTypes = {
    recipes: PropTypes.array,
    products: PropTypes.array,
    recipesEmptyListMessage: PropTypes.string
};

RecipeList.defaultProps = {
    recipes: [],
    products: [],
};

export default RecipeList;