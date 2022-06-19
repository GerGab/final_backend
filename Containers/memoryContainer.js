import { addId, completeId } from "./containerHelpers/AssignId.js";

class memoryContainer {

    constructor(){
        this.items = [];
    }

    // función save para guardar un producto por medio de Post
    create(object){
        object = addId(object)
        this.items.push(object);
        return {id:object._id}
    }

    // funcion para obtener por metodo Get/:id
    getById(id){
        let object = this.items.find(object => object._id === id)
        if (!object){
            const error = new Error(`no existe un registro con id: ${id}`)
            error.type = "db not found"
            throw error
        } 
        return  object
    }

    // función para obtener todos los productos por Get
    getAll(){
        let objects =  this.items
        return objects
    }

    // función para borar un objeto por DELETE/:id
    deleteById(id){
        const objects =  this.items
        const filterObjects = objects.filter(item => item._id !== id);
        if(filterObjects.length == objects.length){
            const error = new Error(`No se pudo borrar el producto. No existe un producto con id: ${id}`)
            error.type = "db not found"
            throw error
        }else{
            this.items = filterObjects 
        }
    }

    // funcion para modificar un objeto ya creado PUT/:id
    modById(id,object){
        object = completeId(id,object)
        const objects = this.items
        const index = objects.findIndex(item => item._id === id);
        if(index<0){
            const error = new Error(`no existe un registro a modificar con id: ${id}`)
            error.type = "db not found"
            throw error
        }else{
            objects[index] = object
            this.items = objects
        }
        return object
    }

    // función no utilizada por el momento
    deleteAll(){
        this.items = []
    }

}

export default memoryContainer