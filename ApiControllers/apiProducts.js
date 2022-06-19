// importar librerias, modulos y paquetes
import {productDao}  from "../DAOs/daoIndex.js"

const apiProducts = {
    // solicitar todos los productos
    getProducts: async (req, res) => {
        try{
            res.json( await productDao.getAll())
        }
        catch(err){
            console.log(`error:${err.message}`)
        }
    },
    // solicitar producto unico por id
    getProductId: async (req,res) => {
        const id = req.params.id
        try{
            res.json( await productDao.getById(id))
        }catch(err){
            err.type === "db not found" ?
                res.status(404).json({error: err.message})
                :
                res.status(500).json({error: err.message})
        }
    },
    // crear un producto nuevo
    postProduct: async (req,res) =>{
        const data = req.body
        try{
            const addedProduct =  await productDao.create(data)
            res.status(201).json( addedProduct)
        }catch(err){
            err.type === "error de validacion" ?
                res.status(400).json({error: err.message})
                :
                res.status(500).json({error: err.message}) 
        }
    },
    // modificar un producto ya existente dado un id
    putProduct: async (req,res) =>{
        const data = req.body
        const id = req.params.id
        
        try{
            const modProduct =  await productDao.modById(id,data)
            res.status(200).json(modProduct)
        }catch(err){
            if (err.type === "error de validacion") {
                res.status(400).json({error: err.message})
            }else if (err.type === "db not found"){
                res.status(404).json({error: err.message})
            }
            else res.status(500).json({error: err.message}) 
        }
    },
    // eliminar un producto por su id
    delProduct: async (req,res) =>{
        const id = req.params.id
        try{
            await productDao.deleteById(id)
            res.sendStatus(200)
        }catch(err){
            err.type === "db not found" ?
                res.status(404).json({error: err.message})
                :
                res.status(500).json({error: err.message})
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