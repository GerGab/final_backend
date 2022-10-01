// importación de paquetes, modulos y librerias
import { Router } from "express";
import apiUsers from "../ApiControllers/apiUsers.js";

// creacion de instancias
const routerAuth= new Router()

// ruteo ApiUsers
routerAuth.post("/login",apiUsers.logInUser)

export default routerAuth

