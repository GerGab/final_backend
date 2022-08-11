// importación de paquetes, modulos y librerias
import express from "express";
import { Router } from "express";
import apiCarts from '../ApiControllers/apiCarts.js'
import { requiereAuth } from "../Middlewares/authorization.js";

// creacion de instancias
const routerApiCarts = new Router()

// middlewares para manejo de peticiones
routerApiCarts.use(express.json())
routerApiCarts.use(express.urlencoded({extended:true}))
// middlewares propios

// ruteo ApiProducts
routerApiCarts.post("/",requiereAuth,apiCarts.addProduct)
routerApiCarts.get("/",requiereAuth,apiCarts.getCart)
routerApiCarts.delete("/:product_id",requiereAuth,apiCarts.delProduct)

export default routerApiCarts