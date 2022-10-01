import { customError, standardErrors } from "../Models/errors.js";
import { extractUser } from "../utils/jwtModule.js";


function requiereAuth(req, res, next) {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';
    const token = authHeader?.split(' ')[1] || authHeader
    if (!token) {
            customError('Error de autenticación => debe adjuntar un token con formato valido',standardErrors.BAD_REQUEST)
        }
    try {
        const user = extractUser(token)
        req.user = user
        next()
    } catch (error) {
        customError(`Error de autenticación => ${error.message}`,error.type??standardErrors.UNAUTHORIZED)
    }
    
}

function requireAdmin(req,res,next){
    const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';
    const token = authHeader?.split(' ')[1] || authHeader
    if (!token) {
            customError('Error de autenticación => debe adjuntar un token valido',standardErrors.BAD_REQUEST)
        }
    try {
        const user = extractUser(token)
        if(user.email == process.env.ADMIN){
            req.user = user
            next()}
        else{ customError(`No posee los permisos suficientes para esta acción`,standardErrors.UNAUTHORIZED)}
    } catch (error) {
        customError(`Error de autenticación => ${error.message}`,error.type??standardErrors.UNAUTHORIZED)
    }
    
}

export {requiereAuth,requireAdmin}

