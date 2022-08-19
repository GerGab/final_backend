// importar modulos, paquetes y librerías
import { Router } from "express";
import { customError, fowardError, standardErrors } from "../Models/errors.js";

// instanciar
const webRouter = new Router()

webRouter.all('*',(req,res,next)=>{
    next(customError('Ruta no implementada',standardErrors.BAD_REQUEST))
})

export default webRouter