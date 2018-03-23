import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SelectProductList from "../shared/SelectProductList"
import RecipeList from "../shared/RecipeList"
import messages from "../shared/messages"

class RecipesSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: [],
            products: this.props.products,
            recipes: this.props.recipes
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
                selectedProduct.id
            ],
        }));
        this.switchProductSelection(selectedProduct);
    };

    deselectProduct = productToDeselect => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.filter(productId => productId !== productToDeselect.id)
        }));
        this.switchProductSelection(productToDeselect);
    };

    filteredRecipes = () => {
        const userIngredientsIds = this.state.ingredients;

        return this.state.recipes.filter(recipe => {
            const missingIngredients = recipe.ingredients.filter(
                ingredientId => !userIngredientsIds.includes(ingredientId)
            );

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
                    products={this.props.products}
                    recipesEmptyListMessage={messages.pl.recipes.labels.recipesNotFound}
                />
            </div>
        )
    }
}


RecipesSearch.propTypes = {
    recipes: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
        products: state.products
    };
};

export default connect(mapStateToProps, null)(RecipesSearch);