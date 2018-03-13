import React, {Component} from 'react';
import PropTypes from "prop-types";
import messages from "../shared/messages";
import {Form, Text} from 'react-form';

class RecipeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: [],
            recipes: [],
            products: props.products
        }
    }

    renderProductList = (products) => products.map(this.renderProduct);

    renderProduct = (product) => {
        const additionalClass = product.selected ? "product-selected" : null;

        return (
            <div
                key={product.id}
                className={`product-node ${additionalClass} `}
                onClick={() => product.selected ? this.unselectProduct(product) : this.selectProduct(product)}
            >
                {product.name}
            </div>
        )
    };

    selectProduct = (selectedProduct) => {
        this.setState(state => ({
            ingredients: [
                ...state.ingredients,
                selectedProduct
            ],
        }));
        this.switchProductSelection(selectedProduct);
    };

    unselectProduct = (productToUnselect) => {
        this.setState(state => ({
            ingredients: state.ingredients.filter(product => product.id !== productToUnselect.id)
        }));
        this.switchProductSelection(productToUnselect);
    };

    switchProductSelection = (selectedProduct) => {
        this.setState(state => ({
            products: state.products.map(product => {
                return product.id === selectedProduct.id ?
                    {
                        ...product,
                        selected: !selectedProduct.selected
                    } :
                    product;
            })
        }));
    };

    renderRecipeList = (recipes) => recipes.map(this.renderRecipe);

    renderRecipe = (recipe) => {
        /*tymczasowe render*/
        return (
            <li key={recipe.id}>
                {recipe.name}|
                {recipe.description}|
                [
                {recipe.ingredients.map(i =>
                    <span key={i.id}>
                            {i.name},
                        </span>
                )}
                ]
            </li>
        )
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
                    id: this.props.idGenerator(),
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

    renderIngredientError = () => {
        return this.state.anyIngredientSelectedError ?
            <span className="validation-error">{this.state.anyIngredientSelectedError}</span> :
            null;
    };

    render() {
        const shouldRenderRecipeList = this.state.products.length > 0;
        const validateNewRecipe = value => ({
            error: !value ? messages.pl.validation.fieldNullOrEmpty : null
        });

        return shouldRenderRecipeList ? (
            <div>
                <ul>
                    {this.renderProductList(this.state.products)}
                    {this.renderIngredientError()}
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
                            <div className="validation-error">{formApi.errors ? formApi.errors.name : null}</div>
                            <Text
                                field="description"
                                id="description"
                                validate={validateNewRecipe}
                                className={formApi.errors && formApi.errors.description ? "invalid-value" : ""}
                                placeholder={messages.pl.recipes.labels.description}
                            />
                            <div className="validation-error">{formApi.errors ? formApi.errors.description : null}</div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {messages.pl.recipes.labels.addRecipe}
                            </button>

                        </form>
                    )}
                </Form>
                <ul>
                    {this.renderRecipeList(this.state.recipes)}
                </ul>
            </div>
        ) : (
            <p>{messages.pl.recipes.labels.emptyList}</p>
        );
    }
}

RecipeList.propTypes = {
    products: PropTypes.array,
    idGenerator: PropTypes.func
};

export default RecipeList;