import {ObjectId} from 'bson'

class mongoContainer {

    constructor(client,database,collection){
        this.client = client
        this.database = database
        this.collection = collection;
    }

    // función save para guardar un producto por medio de Post
    async create(object){
        let collection = await this.connectCollection();
        const {insertedId} = await collection.insertOne(object)
        await this.closeCollection()
        return {id:insertedId.toString()}
    }

    // funcion para obtener por metodo Get/:id
    async getById(id){
        let trueId
        try{trueId = ObjectId(id)}
        catch{
            const error = new Error(`Formato de identificador no admitido`)
            error.type = "db not found"
            throw error
        }
        let collection = await this.connectCollection()
        let object = await collection.find({"_id":trueId}).toArray()
        if (!object[0]){
            const error = new Error(`no existe un registro con id: ${id}`)
            error.type = "db not found"
            throw error
        }
        await this.closeCollection()
        return  object[0]
    }

    // función para obtener todos los productos por Get
    async getAll(){
        let collection = await this.connectCollection()
        let objects = await collection.find().toArray()
        await this.closeCollection()
        return objects
    }

    // función para borar un objeto por DELETE/:id
    async deleteById(id){
        let trueId
        try{trueId = ObjectId(id)}
        catch{
            const error = new Error(`Formato de identificador no admitido`)
            error.type = "db not found"
            throw error
        }
        const collection =  await this.connectCollection()
        const {deletedCount} = await collection.deleteOne({"_id":trueId})
        if (deletedCount===0){
            const error = new Error(`no existe un registro con id: ${id}`)
            error.type = "db not found"
            throw error
        }
        await this.closeCollection()
    }

    // funcion para modificar un objeto ya creado PUT/:id
    async modById(id,object){
        let trueId
        try{trueId = ObjectId(id)}
        catch{
            const error = new Error(`Formato de identificador no admitido`)
            error.type = "db not found"
            throw error
        }
        const collection = await this.connectCollection();
        const {modifiedCount} = await collection.updateOne({"_id":trueId},{$set:{...object}})
        if (modifiedCount===0){
            const error = new Error(`no existe un registro con id: ${id}`)
            error.type = "db not found"
            throw error
        }
        await this.closeCollection()
        return object
    }

    // función no utilizada por el momento
    async deleteAll(){
        const collection = await this.connectCollection()
        await collection.deleteMany({})
        await this.closeCollection()
    }

    // función para callback manejo del archivo de texto plano
    async connectCollection(){
        try {
            await this.client.connect()
            const database = this.client.db(this.database)
            const collection = database.collection(this.collection);
            return collection
        } catch (err) {
            console.log(`Error en acceso a colección ${this.collection} - Error:${err}`)
        }
    }

    // función para callback manejo del archivo de texto plano
    async closeCollection(){
        try{
            await this.client.close();
        }
        catch(err){
            console.log(`Error en cierre base de datos: ${err}`)
        }
    }
}

export default mongoContainer