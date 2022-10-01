import fs from 'fs'
import {customError,standardErrors} from '../Models/errors.js'
// clase general capaz de configurarse por constructor para distintos textos planos

class fileContainer {

    constructor(path,file){
        this.file = path.concat("/",file);
        if(!fs.existsSync(this.file)) {
            const file = fs.openSync(this.file,"w")
            this.writeInFile([])
            fs.closeSync(file)
        }
    }

    // función save para guardar un producto por medio de Post
    async create(object){
        try {
            let objects = await this.readFromFile();
            objects.push(object);
            await this.writeInFile(objects)   
        } catch (error) {
            customError(error.message,standardErrors.DB_NOT_RESPOND)
        }
        return {id:object.id}
    }

    // función para recuperar objetos por un parametro dado.
    async findByParameter(param){
        const key = Object.keys(param)[0]
        try{
            let objects = await this.readFromFile();
            let filtered = objects.filter(item => item[key] == param[key])
            return filtered

        }catch(err){
            customError(`fallo en findByParameter => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // funcion para obtener por metodo Get/:id
    async getById(id){
        let objects = await this.readFromFile()
        let object = objects.find(object => object.id === id)
        if (!object){
            customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
        } 
        return  object
    }

    // función para obtener todos los productos por Get
    async getAll(){
        try {
            let objects = await this.readFromFile()
            return objects 
        } catch (error) {
            customError(`Error al recuperar los registros : ${error.message}`,standardErrors.DB_NOT_RESPOND)
        }
    }

    // función para borar un objeto por DELETE/:id
    async deleteById(id){
        try {
            const objects =  await this.readFromFile()
            const filterObjects = objects.filter(item => item.id !== id);
            if(filterObjects.length == objects.length){
                customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
            }else{
                await this.writeInFile(filterObjects)
            }  
        } catch (error) {
            customError(error.message,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // funcion para modificar un objeto ya creado PUT/:id
    async modById(id,object){
        try {
            const objects = await this.readFromFile();
            const index = objects.findIndex(item => item.id === id);
            if(index<0){
                customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
            }else{
                objects[index] = object
                await this.writeInFile(objects)
            }
            return object
        } catch (error) {
            customError(`Error al modificar los registros => ${error.message}`,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // función no utilizada por el momento
    async deleteAll(){
        try {
            await this.writeInFile([])
        } catch (error) {
            customError(`Error al eliminar los registros => ${error.message}`,standardErrors.DB_NOT_RESPOND)
        }
        
    }

    // función para callback manejo del archivo de texto plano
    async writeInFile(content){
        try{
            await fs.promises.writeFile(this.file,JSON.stringify(content,null,2))
        }
        catch(error){
            customError(`Error de lectura ${error.message}`,standardErrors.DB_NOT_RESPOND)
        }
    }

    // función para callback manejo del archivo de texto plano
    async readFromFile(){
        try{
            let content = await fs.promises.readFile(this.file)
            return JSON.parse(content)
        }
        catch(error){
            customError(`Error de lectura ${error.message}`,standardErrors.DB_NOT_RESPOND)
        }
    }
}

export default fileContainer