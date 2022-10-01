import {customError,standardErrors} from '../Models/errors.js'

class memoryContainer {

    #items

    constructor(){
        this.#items = [];
    }

    // función save para guardar un producto por medio de Post
    create(object){
        this.#items.push(object);
        return {id:object.id}
    }

    // función para recuperar objetos por un parametro dado.
    async findByParameter(param){
        const key = Object.keys(param)[0]
        try{
            let objects = this.#items.filter(item => item[key] == param[key])
            return objects

        }catch(err){
            customError(`fallo en findByParameter => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // funcion para obtener por metodo Get/:id
    getById(id){
        let object = this.#items.find(object => object.id === id)
        if (!object){
            customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
        } 
        return  object
    }

    // función para obtener todos los productos por Get
    getAll(){
        let objects =  this.#items
        return objects
    }

    // función para borar un objeto por DELETE/:id
    deleteById(id){
        const objects =  this.#items
        const filterObjects = objects.filter(item => item.id !== id);
        if(filterObjects.length == objects.length){
            customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
        }else{
            this.#items = filterObjects 
        }
    }

    // funcion para modificar un objeto ya creado PUT/:id
    modById(id,object){
        const objects = this.#items
        const index = objects.findIndex(item => item.id === id);
        if(index<0){
            customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
        }else{
            objects[index] = object
            this.#items = objects
        }
        return object
    }

    // función no utilizada por el momento
    deleteAll(){
        this.#items = []
    }

}

export default memoryContainer