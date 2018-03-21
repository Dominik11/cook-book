import React, {Component} from "react"
import PropTypes from "prop-types";
import messages from "./messages";

class SelectProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: props.products,
            selectProduct: props.selectProduct,
            deselectProduct: props.deselectProduct
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products !== this.state.products) {
            this.setState({
                products: nextProps.products
            })
        }
    }

    renderProductList = () => {
        const shouldRenderProductsList = this.state.products.length > 0;

        return shouldRenderProductsList ?
            this.state.products.map(this.renderProduct) :
            messages.pl.recipes.labels.emptyProductsList;
    };

    renderProduct = product => {
        const additionalClass = product.selected ? "product-selected" : "";

        return (
            <div
                key={product.id}
                className={`product-node ${additionalClass}`}
                onClick={() => product.selected ? this.state.deselectProduct(product) : this.state.selectProduct(product)}
            >
                {product.name}
                {product.selected}
            </div>
        )
    };

    render() {
        return (
            <div>
                {this.renderProductList()}
            </div>
        )
    }
}

SelectProductList.propTypes = {
    products: PropTypes.array.isRequired,
    selectProduct: PropTypes.func,
    deselectProduct: PropTypes.func
};

export default SelectProductList;