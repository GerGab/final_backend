// importar librerias, paquetes y modulos
import { fowardError, standardErrors } from "../Models/errors.js"
import { CartsService } from "../Services/servicesIndex.js"

const apiCarts = {

    // Agregar producto al carrito 
    addProduct: async (req,res,next)=>{
        const id = req.user.id
        const product_id = req.body.productId
        try{
            await CartsService.addProduct(id,product_id)
            res.sendStatus(200)
        }catch(err){
            next(fowardError(`Error al agregar producto => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }
    },
    // devolver el carrito completo
    getCart: async (req,res,next) =>{
        const id = req.user.id
        try{
            const cart = await CartsService.getCart(id)
            res.status(200).json(cart)
        }catch(err){
            next(fowardError(`Error al agregar producto al carrito => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }
    },
    // eliminar 1 producto del carrito por id
    delProduct: async (req,res,next) =>{
        const id = req.user.id
        const product_id = req.params.product_id
        try{
            await CartsService.removeProduct(id,product_id)
            res.sendStatus(200)
        }catch(err){
            next(fowardError(`Error al borrar producto del carrito => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }
    }
}

export default apiCarts