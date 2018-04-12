import {connect} from "react-redux";
import ProductBook from "./ProductBook";
import * as actions from "./actions";

const mapStateToProps = state => ({
    products: state.products,
    recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({
    addProduct: newProduct => dispatch(actions.addProduct(newProduct)),
    updateProduct: product => dispatch(actions.updateProduct(product)),
    removeProduct: product => dispatch(actions.removeProduct(product)),
    removeRecipesByProductId: productId => dispatch(actions.removeRecipesByProductId(productId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductBook);

