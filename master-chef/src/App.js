import React, {Component} from 'react';
import ProductBook from './Products/ProductBook';
import RecipesCreator from './Recipes/RecipesCreator';
import './App.css';

class App extends Component {

    constructor(){
        super();

        this.state = {
            products: [
                {
                    id: this.generateRandomId(),
                    name: "mleko"
                },
                {
                    id: this.generateRandomId(),
                    name: "masło"
                },
                {
                    id: this.generateRandomId(),
                    name: "jajka"
                },
                {
                    id: this.generateRandomId(),
                    name: "sól"
                }
            ],
            recipes: [
                {
                    name: "jajecznica",
                    description: "Roztopić masło na patelni następnie rozbic dwa jajka i dodać soli mieszać ok. 2 min.",
                    ingredient: [
                        "jajka",
                        "sól",
                        "masło"
                    ]
                }
            ]
        };
    }

    generateRandomId = () => {
       return Math.random() *1000000000000000000;
    };

    render() {
        return (
            <div>
                <ProductBook products={this.state.products} idGenerator={this.generateRandomId}/>
                <hr/>
                <RecipesCreator products={this.state.products} idGenerator={this.generateRandomId}/>
            </div>
        );
    }
}

export default App;





