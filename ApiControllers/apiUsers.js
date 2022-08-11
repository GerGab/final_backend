import { userDao } from '../DAOs/daoIndex.js'
import { clientMail } from '../MessageSenders/emailSender/index.js'
import { customError, standardErrors } from '../Models/errors.js'
import formatNewRegister from '../Models/newRegister.js'
import { createHash,isValidPassword } from '../Models/passwordEncrypt.js'
import validateUser from '../Models/users.js'
import apiCarts from './apiCarts.js'

async function registerUser (_user) {
    try{    
        validateUser(_user)
        await checkIfUserExists(_user)
        const {password} = _user
        _user.password = createHash(password)
        const cart_id = await apiCarts.createCart()
        _user.cart_id = cart_id
        const {id}  = await userDao.create(_user)
        await clientMail.send(formatNewRegister({id,..._user}))
        return ({id,..._user})
    }catch(err){
        customError(`Error en registro de usuario => ${err.message}`,err.type??standardErrors.BAD_REQUEST)
    }
}

async function userAuthenticate(_user){
    const databaseUser = await findUser(_user)
    if (isValidPassword(databaseUser,_user.password)){
        return databaseUser
    }else{
        customError('password incorrecto',standardErrors.BAD_REQUEST)
    }
}

async function checkIfUserExists(_user){
    const param = {"email":_user.email}
    try{
        const users = await userDao.findByParameter(param)
        const user = users[0]
        if (user) {
            customError('ya existe un usuario con este email',standardErrors.BAD_REQUEST)
            }
    }catch(err){
        customError(`no se pudieron recuperar los usuarios => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND)
    }
}

async function findUser(_user){
    const param = {"email":_user.email}
    try{
        const users = await userDao.findByParameter(param)
        const user = users[0]
        if (user) {
            return user
        }else{
            customError('no existe el usuario por los parametros enviados.',standardErrors.BAD_REQUEST)
        }
    }catch(err){
        customError(`no fue posible recuperar el usuario solicitado => ${err.message}`,err.type??standardErrors.BAD_REQUEST)
    }
}

export { registerUser, findUser, userAuthenticate}