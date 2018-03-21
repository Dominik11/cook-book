import React, {Component} from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import messages from "../shared/messages";
import {Form, Text} from "react-form";
import RecipeList from "../shared/RecipeList";
import SelectProductList from "../shared/SelectProductList";

class RecipesCreator extends Component {

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
        }
    }

    generateRandomId = () => {
        return Math.random() * 1000000000000000000;
    };


    selectProduct = selectedProduct => {
        this.setState(state => ({
            ingredients: [
                ...state.ingredients,
                selectedProduct
            ],
        }));
        this.switchProductSelection(selectedProduct);
    };

    deselectProduct = productToDeselect => {
        this.setState(state => ({
            ingredients: state.ingredients.filter(product => product.id !== productToDeselect.id)
        }));
        this.switchProductSelection(productToDeselect);
    };

    switchProductSelection = selectedProduct => {
        this.setState(state => ({
            products: state.products.map(product =>
                product.id === selectedProduct.id ?
                    {
                        ...product,
                        selected: !selectedProduct.selected
                    } :
                    product
            )
        }));
    };


    addRecipe = (newRecipeFormValues, formApi) => {
        if (this.state.ingredients.length < 1) {
            this.setState({
                anyIngredientSelectedError: messages.pl.recipes.validation.anyIngredientSelected
            });

            return;
        }

        this.setState(state => ({
            recipes: [
                ...state.recipes,
                {
                    id: this.generateRandomId(),
                    name: newRecipeFormValues.name,
                    description: newRecipeFormValues.description,
                    ingredients: state.ingredients
                }
            ],
            anyIngredientSelectedError: null
        }));

        formApi.resetAll();
        this.clearForm();
    };

    clearForm = () => {
        this.setState(state => ({
            ingredients: [],
            products: state.products.map(product => ({
                    ...product,
                    selected: false
                })
            )
        }));
    };

    renderIngredientsError = () => {
        return this.state.anyIngredientSelectedError ?
            <span className="validation-error">{this.state.anyIngredientSelectedError}</span> :
            null;
    };


    render() {
        const validateNewRecipe = value => ({
            error: !value ? messages.pl.validation.fieldNullOrEmpty : null
        });

        return (
            <div>
                <ul>
                    <SelectProductList
                        products={this.state.products}
                        selectProduct={this.selectProduct}
                        deselectProduct={this.deselectProduct}
                    />
                    {this.renderIngredientsError()}
                </ul>
                <Form
                    onSubmit={(values, e, formApi) => this.addRecipe(values, formApi)}
                    validateOnSubmit
                >
                    {formApi => (
                        <form
                            onSubmit={formApi.submitForm}
                            id="newRecipeForm"
                            className="mb-4"
                        >
                            <label htmlFor="recipeName">{messages.pl.recipes.labels.newRecipe}:</label>
                            <Text
                                field="name"
                                id="name"
                                validate={validateNewRecipe}
                                className={formApi.errors && formApi.errors.name ? "invalid-value" : ""}
                                placeholder={messages.pl.recipes.labels.name}
                            />
                            <div className="validation-error">{get(formApi.errors, "name", null)}</div>
                            <Text
                                field="description"
                                id="description"
                                validate={validateNewRecipe}
                                className={formApi.errors && formApi.errors.description ? "invalid-value" : ""}
                                placeholder={messages.pl.recipes.labels.description}
                            />
                            <div className="validation-error">{get(formApi.errors, "description", null)}</div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {messages.pl.recipes.labels.addRecipe}
                            </button>

                        </form>
                    )}
                </Form>
                <RecipeList
                    recipes={this.state.recipes}
                    recipesEmptyListMessage={messages.pl.recipes.labels.emptyRecipesList}
                />
            </div>
        )
    };
}

export default RecipesCreator;