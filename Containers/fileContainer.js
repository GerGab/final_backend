import fs from 'fs'
import { addId, completeId } from './containerHelpers/AssignId.js';

// clase general capaz de configurarse por constructor para distintos textos planos

class fileContainer {

    constructor(path,file){
        this.file = path.concat("/",file);
        // retirar a funcion helper
        //this.keys = keys;
    }

    // función save para guardar un producto por medio de Post
    async create(object){
        let objects = await this.readFromFile();
        object = addId(object)
        objects.push(object);
        await this.writeInFile(objects)
        return object
    }

    // funcion para obtener por metodo Get/:id
    async getById(id){
        let objects = await this.readFromFile()
        let object = objects.find(object => object._id === id)
        if (!object){
            const error = new Error(`no existe un registro con id: ${id}`)
            error.type = "db not found"
            throw error
        } 
        return  object
    }

    // función para obtener todos los productos por Get
    async getAll(){
        let objects = await this.readFromFile()
        return objects
    }

    // función para borar un objeto por DELETE/:id
    async deleteById(id){
        const objects =  await this.readFromFile()
        const filterObjects = objects.filter(item => item._id !== id);
        if(filterObjects.length == objects.length){
            const error = new Error(`No se pudo borrar el producto. No existe un producto con id: ${id}`)
            error.type = "db not found"
            throw error
        }else{
            await this.writeInFile(filterObjects)
        }
    }

    // funcion para modificar un objeto ya creado PUT/:id
    async modById(id,object){
        object = completeId(id,object)
        const objects = await this.readFromFile();
        const index = objects.findIndex(item => item._id === id);
        console.log(index)
        if(index<0){
            const error = new Error(`no existe un producto con id: ${id}`)
            error.type = "db not found"
            throw error
        }else{
            objects[index] = object
            await this.writeInFile(objects)
        }
        return object
    }

    // función no utilizada por el momento
    async deleteAll(){
        await this.writeInFile([])
    }

    // función para callback manejo del archivo de texto plano
    async writeInFile(content){
        try{
            await fs.promises.writeFile(this.file,JSON.stringify(content,null,2))
        }
        catch(err){
            console.log(`Error en escritura: ${err}`)
        }
    }

    // función para callback manejo del archivo de texto plano
    async readFromFile(){
        try{
            let content = await fs.promises.readFile(this.file)
            return JSON.parse(content)
        }
        catch(err){
            console.log(`Error en lectura: ${err}`)
        }
    }
}

export default fileContainer