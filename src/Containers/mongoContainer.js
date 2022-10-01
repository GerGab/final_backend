import {customError, standardErrors} from '../Models/errors.js';

class mongoContainer {

    constructor(client,database,collection){
        this.client = client
        this.database = database
        this.collection = collection;
        this.connectCollection()
        .then(connection => 
            {this.connection = connection})      
    }

    // función save para guardar un producto por medio de Post
    async create(object){
        try {
            await this.connection.insertOne(object)
            return ({id:object.id})
        } catch (error) {
            customError(error.message,standardErrors.DB_NOT_RESPOND)
        }
    }

    // función para recuperar objetos por un parametro dado.
    async findByParameter(param){
        try{
            let objects = await this.connection.find(param).toArray()
            objects.map(object => {
                return object})
            return objects

        }catch(err){
            customError(`fallo en findByParameter => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // funcion para obtener por metodo Get/:id
    async getById(id){
        try {
            let object = await this.connection.find({"id":id}).toArray()
            if (!object[0]){
                customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
            }
            const recovered = object[0]
            return  recovered
        } catch (error) {
            customError(error.message,error.type??standardErrors.DB_NOT_RESPOND)
        }
        
    }

    // función para obtener todos los productos por Get
    async getAll(){
        try {
            let objects = await this.connection.find().toArray()
            objects.map(object => {
                return object})
            return objects
        } catch (error) {
            customError(`Error al recuperar los registros : ${error.message}`,standardErrors.DB_NOT_RESPOND)
        }
        
    }

    // funcion para modificar un objeto ya creado PUT/:id
    async modById(id,object){
        try {
            const {modifiedCount} = await this.connection.updateOne({"id":id},{$set:{...object}})
            if (modifiedCount===0){
                customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
            }
            return object
        } catch (error) {
            customError(`Error al modificar los registros => ${error.message}`,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // función para borar un objeto por DELETE/:id
    async deleteById(id){
        try{
            const {deletedCount} = await this.connection.deleteOne({"id":id})
            if (deletedCount===0){
                customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
            }
        }catch(error){
            customError(error.message,error.type??standardErrors.DB_NOT_RESPOND)
        }
        
    }  

    // función no utilizada por el momento
    async deleteAll(){
        try {
            await this.connection.deleteMany({})
        } catch (error) {
            customError(error.message,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // función para callback manejo del archivo de texto plano
    async connectCollection(){
        try {
            await this.client.connect()
            const database = this.client.db(this.database)
            const collection = database.collection(this.collection);
            return collection
        } catch (err) {
            customError(`Error en acceso a colección ${this.collection} - Error:${err}}`,standardErrors.DB_NOT_RESPOND)
        }
    }
}

export default mongoContainer