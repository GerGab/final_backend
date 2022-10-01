import assignId from "../utils/assignId.js"
import { customError, standardErrors } from "./errors.js"

export default class ordersModel {

    #id
    #date
    #clientId
    #products

    constructor(cart){
        this.#id = assignId()
        this.#date = Date.now()
        this.#clientId = this.#checkClientId(cart.id)
        this.#products = this.#checkProducts(cart.products)
    }

    #checkClientId(id){
        if (!id) customError(`El id es un campo requerido`,standardErrors.INTERNAL_ERROR)
        return id
    }

    #checkProducts(products){

        if(products.length === 0) customError(`La lista de productos esta vacia`,standardErrors.BAD_REQUEST)
        return products
    }

    print(){
        return  Object.freeze(JSON.parse(JSON.stringify({
            _id: this.#id,
            id:this.#id,
            date:this.#date,
            clientId: this.#clientId,
            products : this.#products
        })))
    }
}