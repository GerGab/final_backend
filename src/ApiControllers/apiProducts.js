// importar librerias, modulos y paquetes
import { fowardError, standardErrors } from "../Models/errors.js"
import { ProductsService } from "../Services/servicesIndex.js"

const apiProducts = {

    // solicitar todos los productos
    getProducts: async (req, res,next) => {
        try{
            const products = await ProductsService.getAllProducts()
            res.status(200).json(products)
        }
        catch(error){
            next(fowardError(`Error al obtener productos => ${error.message}`,error.type??standardErrors.DB_NOT_RESPOND))
        }
    },
    // solicitar producto unico por id
    getProductId: async (req,res,next) => {
        const id = req.params.id
        try{
            const product = await ProductsService.getAProduct(id)
            res.status(200).json(product)
        }catch(error){
            next(fowardError(`Error al obtener producto por ID => ${error.message}`,error.type??standardErrors.DB_NOT_RESPOND))
        }
    },
    // crear un producto nuevo
    postProduct: async (req,res,next) =>{
        const product = req.body
        try{
            const id  = await ProductsService.createProduct(product)
            res.status(201).json(id)
        }catch(error){
            next(fowardError(`Error en la creación del producto => ${error.message}`,error.type??standardErrors.DB_NOT_RESPOND)) 
        }
    },
    // modificar un producto ya existente dado un id
    modProduct: async (req,res,next) =>{
        const data = req.body
        const id = req.params.id
        try{
            const modProduct =  await ProductsService.modifyAProduct(id,data)
            res.status(200).json(modProduct)
        }catch(error){
            next(fowardError(`Error al modificar producto por ID => ${error.message}`,error.type??standardErrors.DB_NOT_RESPOND)) 
        }
    },
    // eliminar un producto por su id
    delProduct: async (req,res,next) =>{
        const id = req.params.id
        try{
            await ProductsService.deleteProduct(id)
            res.sendStatus(200)
        }catch(error){
            next(fowardError(`Error al eliminar producto por ID => ${error.message}`,error.type??standardErrors.DB_NOT_RESPOND))
        }
    }
}

export default apiProducts