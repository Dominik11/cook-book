import React, {Component} from 'react';
import PropTypes from "prop-types";
import messages from "../shared/messages";
import Button from "../shared/Button";

class ProductList extends Component {

    renderProductList = (products) => {
        return products.map(this.renderProduct)
    };

    setNewName = (event, productToSetName) => {
        const newName = event.target.value;
        this.props.setNewName(productToSetName, newName);
    };

    renderProduct = (product) => {
        return product.editMode ?
            this.renderEditedProductRow(product) :
            this.renderProductRow(product);
    };

    renderEditedProductRow = (product) => {
        const buttonsConfig = [
            {
                action: this.props.removeProduct,
                label: "remove"
            },
            {
                action: this.props.updateProduct,
                label: "save"
            },
            {
                action: this.props.switchProductEdition,
                label: "cancel"
            }
        ];

        return (
            <div>
                <input
                    type="text"
                    onChange={(event) => this.setNewName(event, product)}
                    value={product.newName}
                    className={product.error ? "invalid-value" : ""}
                />
                {product.error ? <span class="validation-error">{product.error}</span> : null}
                {this.renderButtons(buttonsConfig, product)}
            </div>
        )
    };

    renderProductRow = (product) => {
        const buttonsConfig = [
            {
                action: this.props.removeProduct,
                label: "remove"
            },
            {
                action: this.props.switchProductEdition,
                label: "edit"
            }
        ];

        return (
            <div key={product.id}>
                <li key={product.id}>{product.name}</li>
                {this.renderButtons(buttonsConfig, product)}
            </div>
        )
    };

    renderButtons = (buttonsConfig, product) => {
        return buttonsConfig.map((buttonConfig, index) =>
            <Button
                key={index}
                onButtonClick={() => buttonConfig.action(product)}
                label={messages.pl.products.labels[buttonConfig.label]}
            />
        );
    };

    render() {
        const shouldRenderProductList = this.props.products.length > 0;

        return shouldRenderProductList ? (
            <ul>
                {this.renderProductList(this.props.products)}
            </ul>
        ) : (
            <p>{messages.pl.products.labels.emptyList}</p>
        );
    }
}

ProductList.propTypes = {
    products: PropTypes.array,
    removeProduct: PropTypes.func,
    switchProductEdition: PropTypes.func,
    updateProduct: PropTypes.func,
    setNewName: PropTypes.func
};

export default ProductList;