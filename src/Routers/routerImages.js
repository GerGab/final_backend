// importación de paquetes, modulos y librerias
import express from "express";
import { Router } from "express";
import imageMiddleware from "../Middlewares/imageMiddleware.js";
import apiImages from "../ApiControllers/apiImages.js";
// creacion de instancias
const routerImages = new Router()

// middlewares para manejo de peticiones
routerImages.use(express.urlencoded({extended:true}))

// ruteo getProducts
routerImages.post("/",imageMiddleware,apiImages.saveImage)

export default routerImages