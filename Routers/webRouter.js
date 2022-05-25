// importar modulos, paquetes y librerías
import { Router } from "express";
import express from "express";

// instanciar
const webRouter = new Router()
webRouter.use(express.json())
webRouter.use(express.urlencoded({extended:true}))

webRouter.all('*',(req,res)=>{
    res.status(404).json("ruta no implementada.")
})

export default webRouter