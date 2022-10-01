import assignId from '../utils/assignId.js'
import {customError, standardErrors } from './errors.js'

export default class messageModel{

    #id
    #email
    #date
    #text

    constructor({email,text}){
        if(!email) customError(`El email es un campo obligatorio`,standardErrors.BAD_REQUEST)
        if(!text || text === '') customError(`El mensaje debe poseer contenido`,standardErrors.BAD_REQUEST)
        this.#id = assignId()
        this.#email = email
        this.#text = text
        this.#date = Date.now()
    }

    print(){
        return  Object.freeze(JSON.parse(JSON.stringify({
            id : this.#id,
            _id : this.#id,
            email: this.#email,
            text : this.#text,
            date : this.#date
        })))
    }
}