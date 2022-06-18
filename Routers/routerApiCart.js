// importación de paquetes, modulos y librerias
import express from "express";
import { Router } from "express";
import apiCarts from '../ApiControllers/apiCarts.js'

// creacion de instancias
const routerApiCarts = new Router()

// middlewares para manejo de peticiones
routerApiCarts.use(express.json())
routerApiCarts.use(express.urlencoded({extended:true}))
// middlewares propios

// ruteo ApiProducts
routerApiCarts.post("/",apiCarts.createCart)
routerApiCarts.post("/:cart_id/productos",apiCarts.addProduct)
routerApiCarts.get("/:cart_id",apiCarts.getCart)
routerApiCarts.delete("/:cart_id/productos/:product_id",apiCarts.delProduct)
routerApiCarts.delete("/:cart_id",apiCarts.delCart)

export default routerApiCarts