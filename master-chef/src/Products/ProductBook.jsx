import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, Text} from 'react-form';
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Modal from 'react-modal';
import get from "lodash/get";
import ProductList from "./ProductList"
import messages from "../shared/messages"
import {generateRandomId} from "../shared/helper";
import * as actions from "../shared/actions";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class ProductBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: this.props.products,
            modalIsOpen: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products !== this.state.products) {
            this.setState({
                products: nextProps.products
            })
        }
    };

    openModal = (productToRemove) => {
        this.setState({
            modalIsOpen: true,
            productToRemove: productToRemove
        });
    };

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

    addProduct = newProductFormValues => {
        const newProduct =  {
            id: generateRandomId(),
            name: newProductFormValues.newProductName
        };

        this.props.addProduct(newProduct);
    };

    isProductUsed = (productId) => {
        const recipe = this.props.recipes.find(recipe =>
            recipe.ingredients.includes(productId)
        );

        return !!recipe;
    };

    prepareRemoveProduct = productToRemove => {
        if (this.isProductUsed(productToRemove.id)) {
            this.openModal(productToRemove);
        } else {
            this.removeProductAndRelatedRecipes(productToRemove);
        }
    };

    removeProduct = productToRemove => {
        this.removeProductAndRelatedRecipes(productToRemove);
        this.closeModal();
    };

    removeProductAndRelatedRecipes = (productToRemove) => {
        this.props.removeProduct(productToRemove);
        this.props.removeRecipes(productToRemove.id);
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

        this.props.updateProduct(productToUpdate);
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
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>{messages.pl.modal.content}</h2>
                    <button onClick={this.closeModal}>{messages.pl.modal.cancel}</button>
                    <button onClick={() => this.removeProduct(this.state.productToRemove)}>{messages.pl.modal.submit}</button>
                </Modal>
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
                    removeProduct={this.prepareRemoveProduct}
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
    recipes: PropTypes.array.isRequired,
    addProduct: PropTypes.func,
    updateProduct: PropTypes.func,
    removeProduct: PropTypes.func,
    removeRecipes: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        recipes: state.recipes,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: newProduct => dispatch(actions.addProduct(newProduct)),
        updateProduct: product => dispatch(actions.updateProduct(product)),
        removeProduct: product => dispatch(actions.removeProduct(product)),
        removeRecipes: productId => dispatch(actions.removeRecipes(productId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBook);