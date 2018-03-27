import React, {Component} from 'react';
import PropTypes from "prop-types";
import messages from "./messages";
import {getProductName} from "./helper";
import Button from "./Button";
import RecipeEditionModal from "../Recipes/RecipeEditionModal"

class RecipeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opened: false
        }
    }

    renderEditionActions = (recipe) => {
        return this.props.showEditionActions ? (
            this.renderActions(recipe)
        ) : null;
    };

    openEditModal = recipe => {
        this.setState({
            opened: true,
            selectedRecipe: recipe
        })
    };

    closeEditModal = () => {
        this.setState({
            opened: false,
        })
    };

    renderActions = recipe => {
        const buttonsConfig = [
            {
                action: this.props.removeRecipe,
                label: "removeRecipe"
            },
            {
                action: this.openEditModal,
                label: "edit"
            }
        ];

        return (
            this.renderButtons(buttonsConfig, recipe)
        )
    };

    renderButtons = (buttonsConfig, recipe) => {
        return buttonsConfig.map((buttonConfig, index) =>
            <Button
                key={index}
                onButtonClick={() => buttonConfig.action(recipe)}
                label={messages.pl.recipes.labels[buttonConfig.label]}
            />
        );
    };

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
                {this.renderEditionActions(recipe)}
            </li>
        )
    };

    renderEditionModal = () => {
        return this.state.opened ? (
            <RecipeEditionModal
                close={this.closeEditModal}
                recipe={this.state.selectedRecipe}
                products={this.props.products}
                updateRecipe={this.props.updateRecipe}
            />
        ) : null
    };

    render() {
        return (
            <div>
                {this.renderEditionModal()}
                {this.renderRecipeList(this.props.recipes)}
            </div>
        )
    }
}

RecipeList.propTypes = {
    recipes: PropTypes.array,
    products: PropTypes.array,
    recipesEmptyListMessage: PropTypes.string,
    removeRecipe: PropTypes.func,
    showEditionActions: PropTypes.bool,
    updateRecipe: PropTypes.func
};

RecipeList.defaultProps = {
    recipes: [],
    products: [],
};

export default RecipeList;