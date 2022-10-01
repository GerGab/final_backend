// importación de paquetes, modulos y librerias
import { Router } from "express";
import apiUsers from "../ApiControllers/apiUsers.js";

// creacion de instancias
const routerApiUsers= new Router()

// ruteo ApiUsers
routerApiUsers.post("/api/users",apiUsers.registerUser)

export default routerApiUsers