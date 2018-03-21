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
            recipes: [
                {
                    id: 1,
                    name: "Jajecznica",
                    description: "Roztopić masło na patelni następnie rozbic dwa jajka i dodać soli mieszać ok. 2 min.",
                    ingredients: [
                        {
                            id: 2,
                            name: "masło",
                        },
                        {
                            id: 3,
                            name: "jajka",
                        },
                        {
                            id: 4,
                            name: "sól",
                        }
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


export default RecipesSearch;