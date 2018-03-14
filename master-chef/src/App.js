import React, {Component} from 'react';
import ProductBook from './Products/ProductBook';
import RecipesCreator from './Recipes/RecipesCreator';
import RecipesSearch from './ReciplesSearchEngine/RecipesSearch';
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {
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
            ],
            recipes: [
                {
                    id: this.generateRandomId(),
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
            ]
        };
    }

    generateRandomId = () => {
        return Math.random() * 1000000000000000000;
    };

    render() {
        return (
            <div>
                <ProductBook products={this.state.products} idGenerator={this.generateRandomId}/>
                <hr/>
                <RecipesCreator products={this.state.products} recipes={this.state.recipes}
                                idGenerator={this.generateRandomId}/>
                <hr/>
                <RecipesSearch products={this.state.products} recipes={this.state.recipes}/>
            </div>
        );
    }
}

export default App;