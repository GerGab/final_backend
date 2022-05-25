// implementar en funciones helpers
validate (object,database = []){

    // verificar que la cantida de campos es la debida
    if (Object.keys(object).length>this.keys.length) {
        const error = new Error("cantidad de campos excesivos")
        throw error
    }
    else{
        // verificar que lo campos son los correctos y estan completos
        const fields = this.keys.map(key => {
            if (!object[key] || object[key].length===0) return 0; else return 1
        });
        const result = fields.reduce((total,next)=>total*next)
        if(result===0){
            const error = new Error("campos erroneos o incompletos")
            throw error
        }
    }
    if (parseFloat(object["price"])<0||isNaN(object["price"])){
        const error = new Error("Precio no valido")
        throw error
    }
    // validación de producto por id repetido
    const repeated = database.find(data => data.id === object.id)
    if (repeated) {
        const error = new Error("producto ya existente")
        throw error
    }
}

