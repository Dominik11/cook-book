import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ProductBook from "./Products/ProductBook";
import RecipesCreator from "./Recipes/RecipesCreator";
import RecipesSearch from "./ReciplesSearchEngine/RecipesSearch";
import products from './Products/reducers';
import recipes from './Recipes/reducers';
import "./App.css";
import {initialState} from "./shared/constants"

const reducers = combineReducers({
    products,
    recipes
});

const store = createStore(reducers, initialState);

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="container">
                        <ul>
                            <li>
                                <Link to="/">Produkty</Link>
                            </li>
                            <li>
                                <Link to="/recipes">Przepisy</Link>
                            </li>
                            <li>
                                <Link to="/search">Wyszukiwarka</Link>
                            </li>
                        </ul>
                        <Route exact path="/" component={ProductBook}/>
                        <Route path="/recipes" component={RecipesCreator}/>
                        <Route path="/search" component={RecipesSearch}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;