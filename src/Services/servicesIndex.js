import cartsService from "./cartsService.js";
import productsService from "./productsService.js";
import userService from "./userService.js";
import ordersService from "./ordersService.js";
import { userDao, productDao, cartDao, ordersDao, messagesDao } from "../DAOs/daoIndex.js";
import messagesService from "./messagesService.js";

export const UserService = new userService(userDao)
export const ProductsService = new productsService(productDao)
export const CartsService = new cartsService(cartDao,productDao)
export const OrdersService = new ordersService(ordersDao)
export const MessagesService = new messagesService(messagesDao)