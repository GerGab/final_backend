// importación de paquetes, modulos y librerias
import express from "express";
import { Router } from "express";
import apiProducts from "../ApiControllers/apiProducts.js";
import {addId,completeId} from '../MiddleWares/AssignId.js'
import { mustBeAdmin } from "../MiddleWares/Authenticate.js";
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
routerApiProducts.post("/",mustBeAdmin,addId,apiProducts.postProduct)
routerApiProducts.put("/:id",mustBeAdmin,completeId,apiProducts.putProduct)
routerApiProducts.delete("/:id",mustBeAdmin,apiProducts.delProduct)

export default routerApiProducts