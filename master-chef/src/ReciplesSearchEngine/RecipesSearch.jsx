import React, {Component} from "react";
import PropTypes from "prop-types";
import SelectProductList from "../shared/SelectProductList"
import RecipeList from "../shared/RecipeList"
import messages from "../shared/messages"

class RecipesSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: [],
            recipes: props.recipes,
            products: props.products
        };
    }

    switchProductSelection = selectedProduct => {
        this.setState(prevState => ({
            products: prevState.products.map(product =>
                product.id === selectedProduct.id ?
                    {
                        ...product,
                        selected: !selectedProduct.selected
                    } :
                    product
            )
        }));
    };

    selectProduct = selectedProduct => {
        this.setState(prevState => ({
            ingredients: [
                ...prevState.ingredients,
                selectedProduct
            ],
        }));
        this.switchProductSelection(selectedProduct);
    };

    deselectProduct = productToDeselect => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.filter(product => product.id !== productToDeselect.id)
        }));
        this.switchProductSelection(productToDeselect);
    };

    filteredRecipes = () => {
        const userIngredientsIds = this.state.ingredients.map(ingredient => ingredient.id);

        return this.state.recipes.filter(recipe => {
            const missingIngredients = recipe.ingredients
                .filter(ingredient => !userIngredientsIds.includes(ingredient.id));

            return missingIngredients.length === 0;
        })
    };

    render() {
        return (
            <div>
                <SelectProductList
                    products={this.state.products}
                    selectProduct={this.selectProduct}
                    deselectProduct={this.deselectProduct}
                />
                <RecipeList
                    recipes={this.filteredRecipes()}
                    recipesEmptyListMessage={messages.pl.recipes.labels.recipesNotFound}
                />
            </div>
        )
    }
}

RecipesSearch.propTypes = {
    products: PropTypes.array,
    recipes: PropTypes.array
};

export default RecipesSearch;