import assignId from '../utils/assignId.js'
import { customError, standardErrors } from './errors.js'

export default class ProductModel{

    #name
    #description
    #price
    #image
    #id

    constructor({id,name, price,description, image}){
        this.#setName(name)
        this.#setPrice(price)
        this.#setDescription(description)
        this.#setImage(image)
        this.#id = id || assignId()
    }

    #setName(name){
        if(!name || name==='') customError('El nombre es un campo requerido',standardErrors.BAD_REQUEST)
        this.#name = name
    }
    #setPrice(price){
        try{
            if(!price) throw new Error('El precio es un campo requerido')
            if(isNaN(price)) throw new Error('El precio debe ser un valor numerico')
            if(price<=0) throw new Error('El precio debe ser un valor mayor que 0')
        }catch(error){
            customError(error.message,standardErrors.BAD_REQUEST)
        }
        this.#price = price
    }
    #setDescription(description ){
        if(!description || description==='') customError('La descripción es un campo requerido',standardErrors.BAD_REQUEST)
        this.#description = description
    }
    #setImage(image ){
        if(!image || image==='') customError('La imagen es un campo requerido',standardErrors.BAD_REQUEST)
        this.#image = image
    }

    print(){
        return Object.freeze(JSON.parse(JSON.stringify({
            _id : this.#id,
            id : this.#id,
            name: this.#name,
            price:this.#price,
            image:this.#image,
            description : this.#description
        })))
    }
}