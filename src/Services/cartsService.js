import CartsModel from "../Models/carts.js";
import CartsDto from "../DTOs/cartsDto.js";
import ProductsDto from "../DTOs/productsDto.js";
import { customError, standardErrors } from "../Models/errors.js";

export default class cartsService {

    #cartsDao
    #productsDao

    constructor(cartsDao,productsDao){
        this.#cartsDao = cartsDao
        this.#productsDao = productsDao
    }

    async createCart (id){
        try {
            const newCart = new CartsModel(id).print()
            await this.#cartsDao.create(newCart)
        } catch (error) {
            customError(`Error al crear el carrito =>${error.message}`,error.type??standardErrors.DB_NOT_RESPOND)
        }     
    }

    async getCart(id){
        try {
            const cart = await this.#cartsDao.getById(id)
            const dto = new CartsDto(cart)
            return dto
        } catch (error) {
            customError(`Error al recuperar el carrito =>${error.message}`,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    async addProduct(id,productId){
        try {
            const product = await this.#productsDao.getById(productId)
            const prodDto = new ProductsDto(product)
            const data = await this.#cartsDao.getById(id)
            const cart = new CartsModel(data.id,data.products)
            cart.addProduct(prodDto)
            await this.#cartsDao.modById(id,cart.print())
        } catch (error) {
            customError(`Error al agregar un producto al carrito =>${error.message}`,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    async removeProduct(id,productId){
        try {
            const data = await this.#cartsDao.getById(id)
            const cart = new CartsModel(data.id,data.products)
            cart.removeProduct(productId)
            await this.#cartsDao.modById(id,cart.print())
        } catch (error) {
            customError(`Error al eliminar un producto del carrito =>${error.message}`,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }

    async emptyCart(id){
        try {
            const data = await this.#cartsDao.getById(id)
            const cart = new CartsModel(data.id,data.products)
            cart.emptyCart()
            await this.#cartsDao.modById(id,cart.print())
        } catch (error) {
            customError(`Error al vaciar el carrito =>${error.message}`,error.type??standardErrors.DB_NOT_RESPOND)
        }
    }
}