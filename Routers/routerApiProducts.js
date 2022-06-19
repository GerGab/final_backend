// importación de paquetes, modulos y librerias
import express from "express";
import { Router } from "express";
import apiProducts from "../ApiControllers/apiProducts.js";
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
routerApiProducts.post("/",apiProducts.postProduct)
routerApiProducts.put("/:id",apiProducts.putProduct)
routerApiProducts.delete("/reset",apiProducts.reset)
routerApiProducts.delete("/:id",apiProducts.delProduct)

export default routerApiProducts