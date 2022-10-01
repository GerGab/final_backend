// importación de paquetes, modulos y librerias
import express from "express";
import { Router } from "express";
import apiOrders from "../ApiControllers/apiOrders.js";
import { requiereAuth } from "../Middlewares/authorization.js";

// creacion de instancias
const routerApiOrders = new Router()

// middlewares para manejo de peticiones
routerApiOrders.use(express.urlencoded({extended:true}))

// ruteo ApiProducts
routerApiOrders.post("/",requiereAuth,apiOrders.generate)
routerApiOrders.get("/",requiereAuth,apiOrders.getAll)

export default routerApiOrders