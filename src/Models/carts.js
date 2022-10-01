import { customError, standardErrors } from "./errors.js"

export default class CartsModel {

    #id
    #products

    constructor(id,products){
        (!id)?? customError(`Debe indicar se un id para el carrito`,standardErrors.BAD_REQUEST)
        this.#id = id
        this.#products = products || []
    }

    addProduct(product){
        let found = false
        this.#products.map(_product => {
            if (_product.id === product.id){
                _product.qty +=1
                found = true
            }
        })
        if(!found) this.#products.push({...product,qty:1})
    }

    removeProduct(id){
        this.#products.map(_product =>{if(_product.id=== id) _product.qty -=1})
        this.#products = this.#products.filter(_product => _product.qty > 0)
    }

    emptyCart(){
        this.#products = []
    }

    print(){
        return Object.freeze(JSON.parse(JSON.stringify({
            _id : this.#id,
            id: this.#id,
            products : this.#products
        })))
    }
}

