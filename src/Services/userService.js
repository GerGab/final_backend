import UserModel from '../Models/users.js'
import { isValidPassword } from '../utils/passwordEncrypt.js'
import { clientMail } from '../MessageSenders/emailSender/index.js'
import formatNewRegister from '../MessageSenders/messageModels/newRegister.js'
import { customError, standardErrors } from '../Models/errors.js'
import UsersDto from '../DTOs/usersDto.js'

export default class userService {

    #userDao

    constructor(userDao){
        this.#userDao = userDao
    }

    async createUser (_user){
        try{    
            const user = new UserModel(_user).print()
            await this.checkIfUserExists(user)
            await this.#userDao.create(user)
            const dto = new UsersDto(user)
            await clientMail.send(formatNewRegister(dto))
            return user
        }catch(err){
            customError(`Error en registro de usuario => ${err.message}`,err.type??standardErrors.BAD_REQUEST)
        }
    }

    async passwordValidation(_user){
        const databaseUser = await this.findUser(_user)
        if (isValidPassword(databaseUser,_user.password)){
            return databaseUser
        }else{
            customError('password incorrecto',standardErrors.BAD_REQUEST)
        }
    }

    async checkIfUserExists(_user){
        const param = {"email":_user.email}
        try{
            const users = await this.#userDao.findByParameter(param)
            const user = users[0]
            if (user) {
                customError('Ya existe un usuario con este email',standardErrors.BAD_REQUEST)
                }
        }catch(err){
            customError(`Al inspeccionar en los usuarios => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    async findUser(_user){
        const param = {"email":_user.email}
        try{
            const users = await this.#userDao.findByParameter(param)
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
}