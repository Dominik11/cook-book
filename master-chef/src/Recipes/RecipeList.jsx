import React, {Component} from 'react';
import PropTypes from "prop-types";
import messages from "../shared/messages";

class RecipeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
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

    setRecipeName = (event) => {
        const name = event.currentTarget.value;
        this.setState({
            name: name
        });
    };

    setDescription = (event) => {
        const description = event.currentTarget.value;
        this.setState({
            description: description
        });
    };

    addRecipe = (event) => {
        event.preventDefault();
        this.setState(state => ({
            recipes: [
                ...state.recipes,
                {
                    id: this.props.idGenerator(),
                    name: state.name,
                    description: state.description,
                    ingredients: state.ingredients
                }
            ]
        }));
        this.clearForm();
    };

    clearForm = () => {
        this.setState(state => ({
            name: "",
            description: "",
            ingredients: [],
            products: state.products.map(product => ({
                    ...product,
                    selected: false
                })
            )
        }));
    };

    render() {
        const shouldRenderRecipeList = this.state.products.length > 0;

        return shouldRenderRecipeList ? (
            <div>
                <ul>
                    {this.renderProductList(this.state.products)}
                </ul>
                <form onSubmit={this.addRecipe}>
                    <label>
                        {messages.pl.recipes.labels.newRecipe}:
                        <br />
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.setRecipeName}
                            placeholder={messages.pl.recipes.labels.name}
                        />
                        <br />
                        <input
                            type="text"
                            value={this.state.description}
                            onChange={this.setDescription}
                            placeholder={messages.pl.recipes.labels.description}
                        />
                    </label>
                    <br />
                    <input
                        type="submit"
                        value={messages.pl.recipes.labels.addNew}
                    />
                </form>
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