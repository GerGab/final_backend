// importar modulos, paquetes y librerías
import { Router } from "express";
import { fowardError, standardErrors } from "../Models/errors.js";

// instanciar
const webRouter = new Router()

webRouter.all('*',(req,res,next)=>{
    next(fowardError('Ruta no implementada',standardErrors.BAD_REQUEST))
})

export default webRouter