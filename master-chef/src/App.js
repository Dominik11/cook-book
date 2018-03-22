import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import ProductBook from "./Products/ProductBook";
import RecipesCreator from "./Recipes/RecipesCreator";
import RecipesSearch from "./ReciplesSearchEngine/RecipesSearch";
import "./App.css";

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_PRODUCT": {
            return {
                ...state,
                products: [...state.products, action.newProduct]
            };
        }
        case "UPDATE_PRODUCT": {
            const productToUpdate = action.product;
            const products = state.products.map(product =>
                product.id === productToUpdate.id ?
                    {
                        ...product,
                        name: productToUpdate.newName
                    } :
                    product
            );

            return {
                ...state,
                products: products
            };
        }
        case "REMOVE_PRODUCT": {
            const productToRemove = action.product;
            const products = state.products.filter(element => element.id !== productToRemove.id);

            return {
                ...state,
                products: products
            };
        }
        case "ADD_RECIPE": {
            return {
                ...state,
                recipes: [...state.recipes, action.newRecipe]
            };
        }
        default:
            return state;
    }
};

const initialStore = {
    recipes: [
        {
            id: 1,
            name: "Jajecznica",
            description: "Roztopić masło na patelni następnie rozbic dwa jajka i dodać soli mieszać ok. 2 min.",
            ingredients: [
                {
                    id: 2,
                    name: "masło",
                },
                {
                    id: 3,
                    name: "jajka",
                },
                {
                    id: 4,
                    name: "sól",
                }
            ]
        }
    ],
    products: [
        {
            id: 1,
            name: "mleko"
        },
        {
            id: 2,
            name: "masło"
        },
        {
            id: 3,
            name: "jajka"
        },
        {
            id: 4,
            name: "sól"
        }
    ]
};

const store = createStore(reducer, initialStore);

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
                        <Route exact path="/" component={ProductBook} />
                        <Route path="/recipes" component={RecipesCreator} />
                        <Route path="/search" component={RecipesSearch} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;