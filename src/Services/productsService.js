import ProductModel from "../Models/products.js"
import { customError, standardErrors } from "../Models/errors.js"
import ProductsDto from '../DTOs/productsDto.js'

export default class productsService {

    #productsDao

    constructor(productsDao){
        this.#productsDao = productsDao
    }

    async createProduct (_product){
        try {
            const product = new ProductModel(_product).print()
            const response = await this.#productsDao.create(product)
            return response
        } catch (error) {
            customError(`Error al crear el producto => ${error.message}`,error.type??standardErrors.INTERNAL_ERROR)
        }
    }

    async getAllProducts (){
        try {
            const products = await this.#productsDao.getAll()
            const dtos = products.map(product => new ProductsDto(product))
            return dtos
        } catch (error) {
            customError(`Error al recuperar los productos => ${error.message}`,error.type??standardErrors.INTERNAL_ERROR)
        }
    }

    async getAProduct (id){
        try {
            const product = await this.#productsDao.getById(id)
            const dto = new ProductsDto(product)
            return dto
        } catch (error) {
            customError(`Error al recuperar el producto => ${error.message}`,error.type??standardErrors.INTERNAL_ERROR)
        }
    }

    async modifyAProduct (id,_product){
        try {
            if (id!== _product.id) customError(`El id del producto no se corresponde con el id solicitado`,standardErrors.BAD_REQUEST)
            const product = new ProductModel(_product).print()
            await this.#productsDao.modById(id,product)
        } catch (error) {
            customError(`Error al modificar el producto => ${error.message}`,error.type??standardErrors.INTERNAL_ERROR)
        }
    }

    async deleteProduct (id) {
        try {
            await this.#productsDao.deleteById(id)
        } catch (error) {
            customError(`Error al eliminar el producto => ${error.message}`,error.type??standardErrors.INTERNAL_ERROR)
        }
    }

}