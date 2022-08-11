// importar modulos, paquetes y librerías
import { Router } from "express";
import { customError, standardErrors } from "../Models/errors.js";

// instanciar
const webRouter = new Router()

webRouter.all('*',(req,res,next)=>{
    next(customError(err.message??'Ruta no implmentada',err.type??standardErrors.BAD_REQUEST))
})

export default webRouter