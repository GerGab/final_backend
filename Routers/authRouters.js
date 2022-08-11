import {Router} from 'express'

import { failLoginController, failRegisterController, logoutController, successController } from '../ApiControllers/authController.js'

const authRouter = new Router()

// Login
authRouter.all("/successLogin",successController)
authRouter.all("/failLogin",failLoginController)

// Register
authRouter.all("/successRegister",successController)
authRouter.all("/failRegister",failRegisterController)

// Logout
authRouter.get("/logout",logoutController)

export default authRouter