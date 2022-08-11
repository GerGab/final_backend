import {ObjectId} from 'bson'
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
            const {insertedId} = await this.connection.insertOne(object)
            return {id:insertedId.toString()}
        } catch (error) {
            customError(error.message,standardErrors.DB_NOT_RESPOND)
        }
    }

    // funcion para obtener por metodo Get/:id
    async getById(id){
        let trueId
        try{trueId = ObjectId(id)}catch{customError(`Formato de identificador no admitido`,standardErrors.BAD_REQUEST)}
        try {
            let object = await this.connection.find({"_id":trueId}).toArray()
            if (!object[0]){
                customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
            }
            return  object[0]
        } catch (error) {
            customError(error.message,error.type??standardErrors.DB_NOT_RESPOND)
        }
        
    }

    // función para obtener todos los productos por Get
    async getAll(){
        try {
            let objects = await this.connection.find().toArray()
            return objects
        } catch (error) {
            customError(`Error al recuperar los registros : ${error.message}`,standardErrors.DB_NOT_RESPOND)
        }
        
    }

    // función para borar un objeto por DELETE/:id
    async deleteById(id){
        let trueId
        try{trueId = ObjectId(id)}catch{customError(`Formato de identificador no admitido`,standardErrors.BAD_REQUEST)}
        try{
            const {deletedCount} = await this.connection.deleteOne({"_id":trueId})
            if (deletedCount===0){
                customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
            }
        }catch(error){
            customError(error.message,error.type??standardErrors.DB_NOT_RESPOND)
        }
        
    }

    // funcion para modificar un objeto ya creado PUT/:id
    async modById(id,object){
        let trueId
        try{trueId = ObjectId(id)}catch{customError(`Formato de identificador no admitido`,standardErrors.BAD_REQUEST)}
        const {modifiedCount} = await this.connection.updateOne({"_id":trueId},{$set:{...object}})
        if (modifiedCount===0){
            customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
        }
        return object
    }

    // función no utilizada por el momento
    async deleteAll(){
        await this.connection.deleteMany({})
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