import React, {Component} from 'react';
import ProductList from "./ProductList"
import messages from "../shared/messages"

class ProductBook extends Component {
    constructor() {
        super();

        this.state = {
            products: [
                {
                    name: "mleko",
                    editMode: false
                },
                {
                    name: "masło",
                    editMode: false
                },
                {
                    name: "jajko",
                    editMode: false
                },
                {
                    name: "sól",
                    editMode: false
                }
            ],
            newProductName: ""
        };
    }

    setNewProduct = (event) => {
        const productName = event.currentTarget.value;
        this.setState({
            newProductName: productName
        });
    };

    addProduct = (event) => {
        event.preventDefault();
        this.setState(state => ({
            products: [...state.products, {
                name: state.newProductName,
                editMode: false
            }],
            newProductName: ""
        }));
    };

    removeProduct = (elementToRemove) => {
        this.setState(state => ({
            products: state.products.filter(element => element !== elementToRemove)
        }));
    };

    switchProductEdition = (selectedProduct) => {
        this.setState(state => ({
            products: state.products.map(product => {
                return product === selectedProduct ?
                    {...product, editMode: !selectedProduct.editMode, newName: selectedProduct.name} :
                    product;
            })
        }));
    };

    updateProduct = (productToUpdate) => {
        this.setState(state => ({
            products: state.products.map(product => {
                return product === productToUpdate ?
                    {...product, editMode: false, name: productToUpdate.newName} :
                    product;
            })
        }));
    };

    setNewName = (productToSetName, newName) => {
        this.setState(state => ({
            products: state.products.map(product => {
                return product === productToSetName ?
                    {...product, newName: newName} :
                    product;
            })
        }));
    };

    render() {
        return (
            <div>
                <form onSubmit={this.addProduct}>
                    <label>
                        Nowy produkt:
                        <input
                            type="text"
                            value={this.state.newProductName}
                            onChange={this.setNewProduct}
                        />
                    </label>
                    <input
                        type="submit"
                        value={messages.pl.products.labels.addProduct}
                    />
                </form>
                <ProductList
                    products={this.state.products}
                    removeProduct={this.removeProduct}
                    switchProductEdition={this.switchProductEdition}
                    updateProduct={this.updateProduct}
                    setNewName={this.setNewName}
                />
            </div>
        );
    }
}

export default ProductBook;