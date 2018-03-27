import React, {Component} from "react";
import PropTypes from "prop-types";
import Modal from 'react-modal';
import {Form, Text, TextArea} from "react-form";
import messages from "../shared/messages";
import SelectProductList from "../shared/SelectProductList";
import get from "lodash/get";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class RecipeEditionModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: this.getInitialProducts(props.products, props.recipe),
            recipeToUpdate: props.recipe,
            ingredients: get(props.recipe, "ingredients", []),
            initialValueForRecipeForm: {
                name: get(props.recipe, "name", ""),
                description: get(props.recipe, "description", "")
            }
        }
    }

    submitModal = (updatedRecipeFormValues, formApi) => {
        const ingredientsLength = get(this.state.ingredients, "length", 0);

        if (ingredientsLength < 1) {
            this.setState({
                anyIngredientSelectedError: messages.pl.recipes.validation.anyIngredientSelected
            });

            return;
        }

        const recipeToUpdate = {
            id: this.state.recipeToUpdate.id,
            name: updatedRecipeFormValues.name,
            description: updatedRecipeFormValues.description,
            ingredients: this.state.ingredients
        };
        this.props.updateRecipe(recipeToUpdate);
        formApi.resetAll();
        this.props.close();
    };

    getInitialProducts = (products, recipe) => {
        if (recipe) {
            return products.map(product =>
                recipe.ingredients.includes(product.id) ? {
                    ...product,
                    selected: true
                } : product
            );
        } else {
            return [];
        }
    };

    setSelectedIngredients = ingredients => {
        this.setState({
            ingredients: ingredients
        })
    };

    renderIngredientsError = () => {
        return this.state.anyIngredientSelectedError ?
            <span className="validation-error">{this.state.anyIngredientSelectedError}</span> :
            null;
    };

    render() {
        const validateRecipe = value => ({
            error: !value ? messages.pl.validation.fieldNullOrEmpty : null
        });

        return (
            <Modal
                isOpen={true}
                onRequestClose={this.props.close}
                style={customStyles}
            >
                <h2>{messages.pl.modals.recipeEdition.content}</h2>

                <SelectProductList
                    products={this.state.products}
                    setSelectedIngredients={this.setSelectedIngredients}
                    initialIngredients={this.state.ingredients}
                />
                {this.renderIngredientsError()}
                <Form
                    onSubmit={(values, e, formApi) => this.submitModal(values, formApi)}
                    validateOnSubmit
                    defaultValues={this.state.initialValueForRecipeForm}
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
                                validate={validateRecipe}
                                className={formApi.errors && formApi.errors.name ? "invalid-value" : ""}
                                placeholder={messages.pl.recipes.labels.name}
                            />
                            <div className="validation-error">{get(formApi.errors, "name", null)}</div>
                            <TextArea
                                field="description"
                                id="description"
                                validate={validateRecipe}
                                className={formApi.errors && formApi.errors.description ? "invalid-value" : ""}
                                placeholder={messages.pl.recipes.labels.description}
                            />
                            <div className="validation-error">{get(formApi.errors, "description", null)}</div>
                            <button
                                type="button"
                                onClick={this.props.close}
                            >
                                {messages.pl.modals.recipeEdition.cancel}
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {messages.pl.modals.recipeEdition.submit}
                            </button>
                        </form>
                    )}
                </Form>
            </Modal>
        )
    }
}

RecipeEditionModal.propTypes = {
    close: PropTypes.func,
    recipe: PropTypes.object,
    products: PropTypes.array,
    updateRecipe: PropTypes.func
};


export default RecipeEditionModal;