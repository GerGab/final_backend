// importación de paquetes, modulos y librerias
import express from "express";
import { Router } from "express";
import apiProducts from "../ApiControllers/apiProducts.js";
import { requireAdmin } from "../Middlewares/authorization.js";
// creacion de instancias
const routerApiProducts = new Router()

// middlewares para manejo de peticiones
routerApiProducts.use(express.json())
routerApiProducts.use(express.urlencoded({extended:true}))
// middlewares propios

// ruteo getProducts
routerApiProducts.get("/",apiProducts.getProducts)
routerApiProducts.get("/:id",apiProducts.getProductId)
// ruteo de api autenticadas
routerApiProducts.post("/",requireAdmin,apiProducts.postProduct)
routerApiProducts.put("/:id",requireAdmin,apiProducts.putProduct)
routerApiProducts.delete("/:id",requireAdmin,apiProducts.delProduct)

export default routerApiProducts