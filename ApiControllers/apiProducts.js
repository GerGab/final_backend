// importar librerias, modulos y paquetes
import {productDao}  from "../DAOs/daoIndex.js"
import { customError, fowardError, standardErrors } from "../Models/errors.js"
import validateProduct from "../Models/products.js"

const apiProducts = {
    // solicitar todos los productos
    getProducts: async (req, res,next) => {
        try{
            res.json( await productDao.getAll())
        }
        catch(err){
            next(fowardError(`Error al obtener producto => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }
    },
    // solicitar producto unico por id
    getProductId: async (req,res,next) => {
        const id = req.params.id
        try{
            res.json( await productDao.getById(id))
        }catch(err){
            next(fowardError(`Error al obtener producto por ID => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }
    },
    // crear un producto nuevo
    postProduct: async (req,res,next) =>{
        const data = req.body
        try{
            validateProduct(data)
            const addedProduct =  await productDao.create(data)
            res.status(201).json( addedProduct)
        }catch(err){
            next(fowardError(`Error al crear producto => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND)) 
        }
    },
    // modificar un producto ya existente dado un id
    putProduct: async (req,res,next) =>{
        const data = req.body
        const id = req.params.id
        
        try{
            const modProduct =  await productDao.modById(id,data)
            res.status(200).json(modProduct)
        }catch(err){
            next(fowardError(`Error al modificar producto por ID => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND)) 
        }
    },
    // eliminar un producto por su id
    delProduct: async (req,res,next) =>{
        const id = req.params.id
        try{
            await productDao.deleteById(id)
            res.sendStatus(200)
        }catch(err){
            next(fowardError(`Error al eliminar producto por ID => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND))
        }
    },

    reset: async(req,res)=>{
        try{
            await productDao.deleteAll()
            res.sendStatus(200)
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }
}

export default apiProducts