import passport from 'passport'
import logger from '../logger.js'
import { customError, fowardError, standardErrors } from '../Models/errors.js'

//hasta aca bien problema en passport
export const registerController = passport.authenticate('passRegister', {
    successRedirect: '/auth/successRegister',
    failureRedirect: '/auth/failRegister',
})


export const loginController = passport.authenticate('passLogin', {
    successRedirect: '/auth/successLogin',
    failureRedirect: '/auth/failLogin',
})

export function successController(req, res) {
    const {url,method} = req
    logger.info({ruta:url,metodo:method,res:`Loggeo exitoso`})
    res.sendStatus(200)
}

export function failRegisterController(req, res,next) {
    next(fowardError(`Fallo de registro => usuario o contraseña no proporcionados`,standardErrors.BAD_REQUEST))
}

export function failLoginController(req, res,next) {
    next(fowardError(`Fallo de login => usuario o contraseña no proporcionados`,standardErrors.BAD_REQUEST))
}


export function logoutController(req, res,next) {
    const {url,method} = req
    if (req.isAuthenticated()) {
        req.logout(function(err) {
            if (err) {
                next(customError(`Error de logut, error : ${err}`,standardErrors.BAD_REQUEST))
                }
            logger.info({ruta:url,metodo:method,res:`Deslogueo exitoso`})
            res.sendStatus(200);
          });
    }else{
        logger.warn({code: 400, error : `Usuario sin autenticar no puede solicitar deslogueo`,Endpoint : url,Method : method});
        res.sendStatus(400)
    }
} 