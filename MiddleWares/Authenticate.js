const isAdmin = true // modificar mock para probar auth

function mustBeAdmin(req,res,next){
    if (isAdmin){
        next()
    }else{
        console.log(req.method)
        console.log(req.originalUrl)
        res.status(403).json({error: 403, descripcion: `no autorizado en ruta ${req.originalUrl} con uso de método ${req.method}`})
    }

}

export {mustBeAdmin}