import React, {Component} from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import messages from "../shared/messages";
import {Form, Text, TextArea} from "react-form";
import RecipeList from "../shared/RecipeList";
import SelectProductList from "../shared/SelectProductList";
import {generateRandomId} from "../shared/helper"
import {connect} from "react-redux";
import * as actions from "./actions";

class RecipesCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: [],
            products: this.props.products,
            recipes: this.props.recipes,
            resetSelectForm: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recipes !== this.state.recipes) {
            this.setState({
                recipes: nextProps.recipes
            })
        }
    }

    setSelectedIngredients = ingredients => {
        this.setState({
            ingredients: ingredients
        })
    };

    addRecipe = (newRecipeFormValues, formApi) => {
        if (this.state.ingredients.length < 1) {
            this.setState({
                anyIngredientSelectedError: messages.pl.recipes.validation.anyIngredientSelected
            });

            return;
        }

        this.props.addRecipeToStore({
            id: generateRandomId(),
            name: newRecipeFormValues.name,
            description: newRecipeFormValues.description,
            ingredients: this.state.ingredients
        });

        formApi.resetAll();
        this.clearForm();
    };

    clearForm = () => {
        this.setState(state => ({
            anyIngredientSelectedError: null,
            ingredients: [],
            products: state.products.map(product => ({
                    ...product,
                    selected: false
                })
            ),
            resetSelectForm: !state.resetSelectForm
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
                <SelectProductList
                    products={this.state.products}
                    setSelectedIngredients={this.setSelectedIngredients}
                    resetSelectForm={this.state.resetSelectForm}
                />
                {this.renderIngredientsError()}
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
                            <TextArea
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
                    products={this.props.products}
                    recipesEmptyListMessage={messages.pl.recipes.labels.emptyRecipesList}
                    removeRecipe={this.props.removeRecipeToStore}
                    showEditionActions
                    updateRecipe={this.props.updateRecipe}
                />
            </div>
        )
    };
}

RecipesCreator.propTypes = {
    products: PropTypes.array,
    recipes: PropTypes.array,
    addRecipeToStore: PropTypes.func,
    removeRecipeToStore: PropTypes.func
};

RecipesCreator.defaultProps = {
    products: [],
    recipes: []
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        recipes: state.recipes
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addRecipeToStore: newRecipe => dispatch(actions.addRecipe(newRecipe)),
        removeRecipeToStore: recipe => dispatch(actions.removeRecipeById(recipe.id)),
        updateRecipe: recipe => dispatch(actions.updateRecipe(recipe))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesCreator);
