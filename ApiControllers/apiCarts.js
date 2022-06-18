// importar librerias, paquetes y modulos
import { productDao, cartDao } from "../DAOs/daoIndex.js"

const apiCarts = {
    // crear carrito
    createCart: async (req,res)=>{
        const data = req.body
        data.products = []
        try{
            const cart = await cartDao.create(data)
            res.status(201).json({cart_id:cart.id})
        }catch(err){
            res.status(500).json({error: err.message})
        }

    },
    // Agregar producto al carrito
    addProduct: async (req,res)=>{
        const cart_id = req.params.cart_id
        const product_id = req.body.id
        try{
            
            const cart = await cartDao.getById(cart_id) // recupero el carro por su id
            const product = await productDao.getById(product_id)// importada la instancia del product container recupero el producto (si es que existe, esto además sirve de verificación)
            cart.products.push(product) 
            await cartDao.modById(cart_id,cart) // modifico el carro por su id.
            res.sendStatus(200)
        }catch(err){
            err.type === "db not found"?
            res.status(404).json({error:err.message})
            :
            res.status(500).json({error:err.message})
        }
    },
    // devolver el carrito completo
    getCart: async (req,res) =>{
        const cart_id = req.params.cart_id
        try{
            const cart = await cartDao.getById(cart_id)
            res.status(200).json(cart)
        }catch(err){
            err.type === "db not found"?
            res.status(400).json({error: err.message})
            :
            res.status(500).json({error: err.message})
        }
    },
    // eliminar 1 producto del carrito por id
    delProduct: async (req,res) =>{
        const cart_id = req.params.cart_id
        const product_id = req.params.product_id
        try{
            const cart = await cartDao.getById(cart_id)
            console.log(cart) // recupero el carro por su id
            const products = cart.products.filter(prods => prods._id.toString()!==product_id)
            cart.products = products
            await cartDao.modById(cart_id,cart) // modifico el carro por su id.
            res.sendStatus(200)
        }catch(err){
            err.type === "db not found"?
            res.status(404).json({error:err.message})
            :
            res.status(500).json({error:err.message})
        }

    },
    // CORREGIR HAY QUE VACIAR EL CARRO NO ELIMINARLO
    delCart: async (req,res)=>{
        const cart_id = req.params.cart_id
        try{//_id:cart_id, revisar para implementar en las bases no remotas
            let cart = {products:[]}
            await cartDao.modById(cart_id,cart)
            res.sendStatus(204)
        }catch(err){
            err.type === "db not found"?
            res.status(404).json({error:err.message})
            :
            res.status(500).json({error:err.message})
        }
    }
}

export default apiCarts