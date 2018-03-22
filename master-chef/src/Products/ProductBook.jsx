import React, {Component} from 'react';
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import {Form, Text} from 'react-form';
import ProductList from "./ProductList"
import messages from "../shared/messages"
import {connect} from "react-redux";
import {generateRandomId} from "../shared/helper";
import * as actions from "../shared/actions";

class ProductBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: this.props.products
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products !== this.state.products) {
            this.setState({
                products: nextProps.products
            })
        }
    }

    addProduct = newProductFormValues => {
        const newProduct =  {
            id: generateRandomId(),
            name: newProductFormValues.newProductName
        };

        this.props.addProduct(newProduct);
    };

    removeProduct = elementToRemove => {
        this.setState(state => ({
            products: state.products.filter(element => element.id !== elementToRemove.id)
        }));
    };

    switchProductEdition = selectedProduct => {
        this.setState(state => ({
            products: state.products.map(product =>
                product.id === selectedProduct.id ?
                    {
                        ...product,
                        editMode: !selectedProduct.editMode,
                        newName: selectedProduct.name,
                        error: null
                    } :
                    product
            )
        }));
    };

    updateProduct = productToUpdate => {
        if (isEmpty(productToUpdate.newName)) {
            this.throwUpdateProductNameValidationError(productToUpdate);
            return;
        }

        this.setState(state => ({
            products: state.products.map(product =>
                product.id === productToUpdate.id ?
                    {
                        ...product,
                        editMode: false,
                        name: productToUpdate.newName,
                        error: null
                    } :
                    product
            )
        }));

        this.props.updateProduct()
    };

    throwUpdateProductNameValidationError = productToUpdate => {
        this.setState(state => ({
            products: state.products.map(product =>
                product.id === productToUpdate.id ?
                    {
                        ...product,
                        error: messages.pl.validation.fieldNullOrEmpty
                    } :
                    product
            )
        }));
    };

    setNewName = (productToSetName, newName) => {
        this.setState(state => ({
            products: state.products.map(product =>
                product.id === productToSetName.id ?
                    {
                        ...product,
                        newName: newName
                    } :
                    product
            )
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
                                className={get(formApi.errors, "newProductName", null) ? "invalid-value" : ""}
                            />
                            <div className="validation-error">
                                {get(formApi.errors, "newProductName", null)}
                            </div>
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
    products: PropTypes.array.isRequired,
    addProduct: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        products: state.products
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: newProduct => dispatch(actions.addProduct(newProduct)),
        updateProduct: product => dispatch(actions.updateProduct(product))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBook);