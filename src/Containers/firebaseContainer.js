import admin from "firebase-admin"
import {customError, standardErrors} from '../Models/errors.js'
class firebaseContainer {

    constructor(database,collection){
        this.collection = database.collection(collection);
        this.table = collection
    }

    // función save para guardar un producto por medio de Post
    async create(object){
        try {
            const {id} = await this.collection.add(object)
            return {id:id}   
        } catch (error) {
            customError(error.message,standardErrors.DB_NOT_RESPOND)
        }
    }

    // función para recuperar objetos por un parametro dado.
    async findByParameter(param){
        const key = Object.keys(param)[0]
        const objects = []
        try{
            const snapshot = await this.collection.where(key,'==',param[key]).get()
            snapshot.forEach(doc => objects.push(doc.data()));
            return objects
        }catch(err){
            customError(`fallo en findByParameter => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // funcion para obtener por metodo Get/:id
    async getById(id){
        let object
        try {
            const snapshot = await this.collection.where("id",'==',id).get()
            snapshot.forEach(doc => object = doc.data())
            if (!object){
                customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
            }
            return  object
        } catch (error) {
            customError(error.message,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // función para obtener todos los productos por Get
    async getAll(){
        let objects = []
        try {
            let result = await this.collection.get()
            result.forEach(doc =>{objects.push(this.asObj(doc))})
            return objects
        } catch (error) {
            customError(`Error al recuperar los registros : ${error.message}`,standardErrors.DB_NOT_RESPOND)
        }
    }

    // función para borar un objeto por DELETE/:id
    async deleteById(id){
        let objectId
        try {
            const snapshot = await this.collection.where("id",'==',id).get()
            snapshot.forEach(doc => objectId = doc.id)
            if (!objectId){
                customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
            }
            await this.collection.doc(objectId).delete()
        } catch (error) {
            customError(error.message,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // funcion para modificar un objeto ya creado PUT/:id
    async modById(id,object){
        let objectId
        try {
            const snapshot = await this.collection.where("id",'==',id).get()
            snapshot.forEach(doc => objectId = doc.id)
            if (!objectId){
                customError(`no existe un registro con id: ${id}`,standardErrors.DB_NOT_FOUND)
            }
            const newObject = await this.collection.doc(objectId).set(object)
            return newObject
        } catch (error) {
            customError(`Error al modificar los registros => ${error.message}`,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // función no utilizada por el momento
    async deleteAll(){
        try{
            const ids = []
            const snapshot = await this.collection.get();
            snapshot.forEach(doc => {
            ids.push(doc.id)
            })
            const promises = ids.map(id => this.collection.doc(id).delete())
            const resultados = await Promise.allSettled(promises)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                customError('No fue posible borrar todos los registros',standardErrors.DB_NOT_RESPOND)
            }
        }catch(error){
            customError(error.message,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    // función para callback manejo del archivo de texto plano
    asObj = doc =>({...doc.data()})
}

export default firebaseContainer