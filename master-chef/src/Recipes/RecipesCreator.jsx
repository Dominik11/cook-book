import React, {Component} from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import messages from "../shared/messages";
import {Form, Text} from "react-form";
import RecipeList from "../shared/RecipeList";
import SelectProductList from "../shared/SelectProductList";
import {generateRandomId} from "../shared/helper"
import {connect} from "react-redux";
import * as actions from "../shared/actions";

class RecipesCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: [],
            products: this.props.products,
            recipes: this.props.recipes
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recipes !== this.state.recipes) {
            this.setState({
                recipes: nextProps.recipes
            })
        }
    }

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

        const newRecipe =  {
            id: generateRandomId(),
            name: newRecipeFormValues.name,
            description: newRecipeFormValues.description,
            ingredients: this.state.ingredients
        };
        this.props.addRecipeToStore(newRecipe);

        this.setState({
            anyIngredientSelectedError: null
        });
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

RecipesCreator.propTypes = {
    products: PropTypes.array.isRequired,
    recipes: PropTypes.array.isRequired,
    addRecipeToStore: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        recipes: state.recipes
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addRecipeToStore: (newRecipe) => dispatch(actions.addRecipe(newRecipe))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesCreator);
