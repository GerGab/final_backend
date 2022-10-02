import OrdersModel from "../Models/orders.js";
import formatNewOrder from '../MessageSenders/messageModels/newOrders.js'
import OrdersDto from '../DTOs/ordersDto.js'
import { clientMail } from '../MessageSenders/emailSender/index.js'
import { customError, standardErrors } from "../Models/errors.js";

export default class ordersService {

    #ordersDao

    constructor(ordersDao){
        this.#ordersDao = ordersDao
    }

    async createOrder (user,cart){
        try {
            const order = new OrdersModel(cart).print()
            await this.#ordersDao.create(order)
            await clientMail.send(formatNewOrder.adminEmail(user,order))
            await clientMail.send(formatNewOrder.clientEmail(user,order))
        } catch (error) {
            customError(`Error al crear la orden de compra=> ${error.message}`,error.type??standardErrors.INTERNAL_ERROR)
        }
    }

    async recoverOrders(user){
        try {
            const orders = await this.#ordersDao.findByParameter({clientId:user.id})
            const dtos = orders.map(order => new OrdersDto(order))
            return dtos
        } catch (error) {
            customError(`Error al recuperar las ordenes => ${error.message}`,error.type??standardErrors.INTERNAL_ERROR)
        }
    }
}