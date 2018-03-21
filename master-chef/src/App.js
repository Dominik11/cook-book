import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import ProductBook from './Products/ProductBook';
import RecipesCreator from './Recipes/RecipesCreator';
import RecipesSearch from './ReciplesSearchEngine/RecipesSearch';
import './App.css';

class App extends Component {

    render() {
        return (
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
        );
    }
}

export default App;