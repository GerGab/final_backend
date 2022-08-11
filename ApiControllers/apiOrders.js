import { cartDao, ordersDao } from "../DAOs/daoIndex.js"
import { clientMail } from "../MessageSenders/emailSender/index.js"
import { clientWsp } from "../MessageSenders/wspSender/index.js"
import { clientSms } from "../MessageSenders/smsSender/index.js"
import { formatNewOrder } from "../Models/newOrder.js"
import { customError, fowardError, standardErrors } from "../Models/errors.js"


const apiOrders = {

    getAll : async (req,res,next)=>{

        const {email} = req.session?.passport?.user
        try {
            const orders = await ordersDao.findByParameter({"user":email})
            res.json(orders)
        } catch (error) {
            next(fowardError(`Fallo al recuperar ordenes => ${error.message}`,error.type??standardErrors.DB_NOT_RESPOND))
        }
        
    },

    generate : async (req,res,next) => {

        // obtener el carrito del cliente.
        const {cart_id, email} = req.session?.passport?.user
        try {
            const {products} = await cartDao.getById(cart_id)
            if (products.length>0){
                const purchaseOrder = {date: new Date(Date.now()).toLocaleString(),
                                            products:products,
                                            user: email }
                const {id} = await ordersDao.create(purchaseOrder)
                // enviar correo con el detalle de quien compra y que compra.
                await clientMail.send(formatNewOrder.email({id,...purchaseOrder}))
                // enviar wsp de que se ha generado una nueva compra
                await clientWsp.send(formatNewOrder.wsp({id,...purchaseOrder}))
                // enviar sms al comprador de que su compra esta confirmada
                await clientSms.send(formatNewOrder.sms({id,...purchaseOrder}))
                // vaciar carrito de compras.
                await cartDao.modById(cart_id,{products:[]})
                res.sendStatus(200)
            }else{
                customError(`No hay productos en el carrito`,standardErrors.BAD_REQUEST)
            }
        } catch (error) {
            next(fowardError(`Fallo al generar nueva orden => ${error.message}`,error.type??standardErrors.DB_NOT_RESPOND))
        }    

    }

}

export default apiOrders