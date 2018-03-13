import React, {Component} from 'react';
import PropTypes from "prop-types";
import lodash from "lodash";
import { Form, Text } from 'react-form';
import ProductList from "./ProductList"
import messages from "../shared/messages"

class ProductBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: props.products
        };
    }

    addProduct = (newProductFormValues) => {
        this.setState(state => ({
            products: [
                ...state.products,
                {
                    id: this.props.idGenerator(),
                    name: newProductFormValues.newProductName
                }
            ]
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
                        newName: selectedProduct.name,
                        error: null
                    } :
                    product;
            })
        }));
    };

    updateProduct = (productToUpdate) => {
        if (lodash.isEmpty(productToUpdate.newName)) {
            this.throwUpdateProductNameValidationError(productToUpdate);

            return;
        }

        this.setState(state => ({
            products: state.products.map(product => {
                return product.id === productToUpdate.id ?
                    {
                        ...product,
                        editMode: false,
                        name: productToUpdate.newName,
                        error: null
                    } :
                    product;
            })
        }));
    };

    throwUpdateProductNameValidationError = (productToUpdate) => {
        this.setState(state => ({
            products: state.products.map(product => {
                return product.id === productToUpdate.id ?
                    {
                        ...product,
                        error: messages.pl.validation.fieldNullOrEmpty
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
        const validateNewProduct = value => ({
            error: !value ? messages.pl.validation.fieldNullOrEmpty : null
        });

        return (
            <div>
                <Form
                    onSubmit={(values, e, formApi) => {
                        this.addProduct(values);
                        formApi.resetAll();
                    }}
                    validateOnSubmit
                >
                    {formApi => (
                        <form
                            onSubmit={formApi.submitForm}
                            id="newProductForm"
                            className="mb-4"
                        >
                            <label htmlFor="newProductName">{messages.pl.products.labels.newProduct}:</label>
                            <Text
                                field="newProductName"
                                id="newProductName"
                                validate={validateNewProduct}
                                className={formApi.errors && formApi.errors.newProductName ? "invalid-value" : ""}
                            />
                            <div className="validation-error">{formApi.errors ? formApi.errors.newProductName : null}</div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {messages.pl.products.labels.addProduct}
                            </button>

                        </form>
                    )}
                </Form>
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