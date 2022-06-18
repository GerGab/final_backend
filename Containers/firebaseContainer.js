
class firebaseContainer {

    constructor(database,collection){
        this.collection = database.collection(collection);
    }

    // función save para guardar un producto por medio de Post
    async create(object){
        const {id} = await this.collection.add(object)
        return {id:id}
    }

    // funcion para obtener por metodo Get/:id
    async getById(id){
        let object  = await this.collection.doc(id).get()
        object = this.asObj(object)
        if (!object.id&&!object.products){
            const error = new Error(`no existe un registro con id: ${id}`)
            error.type = "db not found"
            throw error
        }
        return  object
    }

    // función para obtener todos los productos por Get
    async getAll(){
        let objects = []
        let result = await this.collection.get()
        result.forEach(doc =>{objects.push(this.asObj(doc))})
        return objects
    }

    // función para borar un objeto por DELETE/:id
    async deleteById(id){
        await this.collection.doc(id).delete()
    }

    // funcion para modificar un objeto ya creado PUT/:id
    async modById(id,object){
        let obj  = await this.collection.doc(id).get()
        obj = this.asObj(obj)
        if (!obj.id&&!obj.products){
            const error = new Error(`no existe un registro con id: ${id}`)
            error.type = "db not found"
            throw error
        }
        const newObject = await this.collection.doc(id).set(object)
        return newObject
    }

    // función no utilizada por el momento
    async deleteAll(){
        this.collection.onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                ref.doc(doc.id).delete()
            })
        })
    }

    // función para callback manejo del archivo de texto plano
    asObj = doc =>({_id:doc.id,...doc.data()})
}

export default firebaseContainer