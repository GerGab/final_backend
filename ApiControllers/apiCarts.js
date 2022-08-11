// importar librerias, paquetes y modulos
import { productDao, cartDao } from "../DAOs/daoIndex.js"
import { fowardError, standardErrors } from "../Models/errors.js"

const apiCarts = {
    // crear carrito
    createCart: async (req,res,next)=>{
        const data = {products:[]}
        try{
            const cart = await cartDao.create(data)
            return cart.id
        }catch(err){
            next(fowardError(`Error al crear carrito => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }

    },
    // Agregar producto al carrito 
    addProduct: async (req,res,next)=>{
        const {cart_id} = req.session?.passport?.user
        const product_id = req.body.productId
        try{
            const cart = await cartDao.getById(cart_id) // recupero el carro por su id
            const product = await productDao.getById(product_id)// importada la instancia del product container recupero el producto (si es que existe, esto además sirve de verificación)
            cart.products.push(product) 
            await cartDao.modById(cart_id,cart) // modifico el carro por su id.
            res.sendStatus(200)
        }catch(err){
            next(fowardError(`Error al agregar producto al carrito => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }
    },
    // devolver el carrito completo
    getCart: async (req,res,next) =>{
        const {cart_id} = req.session?.passport?.user
        try{
            const cart = await cartDao.getById(cart_id)
            res.status(200).json(cart)
        }catch(err){
            next(fowardError(`Error al agregar producto al carrito => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }
    },
    // eliminar 1 producto del carrito por id
    delProduct: async (req,res,next) =>{
        const {cart_id} = req.session?.passport?.user
        const product_id = req.params.product_id
        try{
            const cart = await cartDao.getById(cart_id)// recupero el carro por su id
            const products = cart.products.filter(prods => prods._id.toString()!==product_id)
            cart.products = products
            await cartDao.modById(cart_id,cart) // modifico el carro por su id.
            res.sendStatus(204)
        }catch(err){
            next(fowardError(`Error al borrar producto del carrito => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }

    },
    delCart: async (req,res,next)=>{
        const {cart_id} = req.session?.passport?.user
        try{//_id:cart_id, revisar para implementar en las bases no remotas
            let cart = {products:[]}
            await cartDao.modById(cart_id,cart)
            res.sendStatus(204)
        }catch(err){
            next(fowardError(`Error al borrar contenido del carrito => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }
    }
}

export default apiCarts