import {connect} from "react-redux";
import RecipesCreator from "./RecipesCreator";
import * as actions from "./actions";

const mapStateToProps = state => ({
    products: state.products,
    recipes: state.recipes
});

const mapDispatchToProps = dispatch => ({
    addRecipeToStore: newRecipe => dispatch(actions.addRecipe(newRecipe)),
    removeRecipeToStore: recipe => dispatch(actions.removeRecipeById(recipe.id)),
    updateRecipe: recipe => dispatch(actions.updateRecipe(recipe))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesCreator);

