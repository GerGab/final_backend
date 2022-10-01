import { customError, standardErrors } from "./errors.js"
import assignId from '../utils/assignId.js'
import { createHash } from "../utils/passwordEncrypt.js"

export default class UserModel {
    #id
    #name
    #lastname
    #phone
    #password
    #image
    #email

    constructor({id,email,name,lastname,phone,password,image}){
        this.#id = id || assignId()
        this.#checkEmailFormat(email)
        this.#checkPassword(password)
        this.#checkPhone(phone)
        this.#checkUserNames(name,lastname)
        this.#checkImage(image)
    }

    #checkEmailFormat(email) {
        if(!email.includes("@")) customError('Formato de email no admitido',standardErrors.BAD_REQUEST)
        this.#email = email
    }

    #checkPassword(password){
        if(!password || password==="")  customError('El campo password es requerido',standardErrors.BAD_REQUEST)
        this.#password = createHash(password)
    }

    #checkPhone(phone){
        if(!phone || phone==="")  customError('El campo telefono es requerido',standardErrors.BAD_REQUEST)
        this.#phone = phone
    }
    
    #checkUserNames(name,lastname){
        if(!name || name==="")  customError('El campo nombre es requerido',standardErrors.BAD_REQUEST)
        if(!lastname || lastname==="")  customError('El campo apellido es requerido',standardErrors.BAD_REQUEST)
        this.#name = name
        this.#lastname = lastname
    }

    #checkImage(image){
        if(!image || image==="")  customError('El campo imagen es requerido',standardErrors.BAD_REQUEST)
        this.#image = image
    }

    print(){
        return Object.freeze(JSON.parse(JSON.stringify({
            _id : this.#id,
            id : this.#id,
            email : this.#email,
            name: this.#name,
            lastname: this.#lastname,
            image: this.#image,
            password : this.#password,
            phone : this.#phone
        })))
    }
}
