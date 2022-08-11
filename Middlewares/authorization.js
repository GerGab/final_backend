import logger from "../logger.js"

function requiereAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        const {url, method} = req
        logger.warn({code: 401, error : `No autenticado denegado el acceso`,Endpoint : url,Method : method});
        res.sendStatus(401)
    }
}

function requireAdmin(req,res,next){
    if (req.session?.passport?.user?.email == process.env.ADMIN) {
        next()
    } else {
        const {url, method} = req
        logger.warn({code: 403, error : `No tiene permisos suficientes`,Endpoint : url,Method : method});
        res.sendStatus(403)
    }
}

export {requiereAuth,requireAdmin}

