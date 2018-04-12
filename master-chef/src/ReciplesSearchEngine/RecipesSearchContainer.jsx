import {connect} from "react-redux";
import RecipesSearch from "./RecipesSearch";

const mapStateToProps = state => ({
    recipes: state.recipes,
    products: state.products
});

export default connect(mapStateToProps)(RecipesSearch);