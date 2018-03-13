import React, {Component} from 'react';
import PropTypes from "prop-types";
import ProductList from "./ProductList"
import messages from "../shared/messages"

class ProductBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: props.products,
            newProductName: ""
        };
    }

    setNewProduct = (event) => {
        const productName = event.currentTarget.value;
        this.setState({
            newProductName: productName
        });
    };

    addProduct = (event) => {
        event.preventDefault();
        this.setState(state => ({
            products: [
                ...state.products,
                {
                    id: this.props.idGenerator(),
                    name: state.newProductName
                }
            ],
            newProductName: ""
        }));
    };

    removeProduct = (elementToRemove) => {
        this.setState(state => ({
            products: state.products.filter(element => element.id !== elementToRemove.id)
        }));
    };

    switchProductEdition = (selectedProduct) => {
        this.setState(state => ({
            products: state.products.map(product => {
                return product.id === selectedProduct.id ?
                    {
                        ...product,
                        editMode: !selectedProduct.editMode,
                        newName: selectedProduct.name
                    } :
                    product;
            })
        }));
    };

    updateProduct = (productToUpdate) => {
        this.setState(state => ({
            products: state.products.map(product => {
                return product.id === productToUpdate.id ?
                    {
                        ...product,
                        editMode: false,
                        name: productToUpdate.newName
                    } :
                    product;
            })
        }));
    };

    setNewName = (productToSetName, newName) => {
        this.setState(state => ({
            products: state.products.map(product => {
                return product.id === productToSetName.id ?
                    {
                        ...product,
                        newName: newName
                    } :
                    product;
            })
        }));
    };

    render() {
        return (
            <div>
                <form onSubmit={this.addProduct}>
                    <label>
                        {messages.pl.products.labels.newProduct}:
                        <input
                            type="text"
                            value={this.state.newProductName}
                            onChange={this.setNewProduct}
                        />
                    </label>
                    <input
                        type="submit"
                        value={messages.pl.products.labels.addProduct}
                    />
                </form>
                <ProductList
                    products={this.state.products}
                    removeProduct={this.removeProduct}
                    switchProductEdition={this.switchProductEdition}
                    updateProduct={this.updateProduct}
                    setNewName={this.setNewName}
                />
            </div>
        );
    }
}

ProductBook.propTypes = {
    products: PropTypes.array,
    idGenerator: PropTypes.func
};

export default ProductBook;