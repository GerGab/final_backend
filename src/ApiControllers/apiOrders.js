import { OrdersService, CartsService } from "../Services/servicesIndex.js"
import { fowardError, standardErrors } from "../Models/errors.js"

const apiOrders = {

    getAll : async (req,res,next)=>{

        const user = req.user
        try {
            const orders = await OrdersService.recoverOrders(user)
            res.status(200).json(orders)
        } catch (error) {
            next(fowardError(`Fallo al recuperar ordenes => ${error.message}`,error.type??standardErrors.INTERNAL_ERROR))
        }
        
    },

    generate : async (req,res,next) => {

        const user = req.user
        try {
            const cart = await CartsService.getCart(user.id)
            await OrdersService.createOrder(user,cart)
            await CartsService.emptyCart(user.id)
            res.sendStatus(201)
        } catch (error) {
            next(fowardError(`Fallo al generar nueva orden => ${error.message}`,error.type??standardErrors.INTERNAL_ERROR))
        }    

    }

}

export default apiOrders