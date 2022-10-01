import { fowardError, standardErrors } from '../Models/errors.js'
import { generateAuthToken } from '../utils/jwtModule.js'
import { UserService, CartsService } from '../Services/servicesIndex.js'

const apiUsers = {

    registerUser : async (req,res,next) => {
        try{    
            const user = await UserService.createUser(req.body)
            await CartsService.createCart(user.id)
            const token = generateAuthToken(user)
            res.status(201).json({token : token})
        }catch(error){
            next(fowardError(`Error al registrar usuario => ${error.message}`,error.type??standardErrors.BAD_REQUEST))
        }
    },

    logInUser : async (req,res,next) =>{
        try {
            const user = await UserService.passwordValidation(req.body)
            const token = generateAuthToken(user)
            res.status(200).json({token:token})
        } catch (error) {
            next(fowardError(`Error al logear usuario => ${error.message}`,error.type??standardErrors.BAD_REQUEST))
        }
    }

}

export default apiUsers
