import request from 'supertest'
import { expect } from "chai";
import { describe, it } from "mocha";
import app from '../server.js'

const producto = {
    title:"martillo",
    price:1332.2,
    thumbnail: "http...",
    id: "4321"
}
const nuevoProducto = {
    title:"pala",
    price: 445,
    thumbnail: "http...",
    id: "1254"
}

describe("Testeando persistencia de productos",()=>{

    before("Poner a 0 la base de datos productos",async()=>{
        let response = await request(app).delete(`/api/productos/reset`)
        expect(response.status).to.eql(200)
    })

     let product_id
    it("debería retornar estado 200 y el id",async ()=>{
        let response = await request(app).get('/api/productos')
        expect(response.status).to.eql(200)
        expect(response.body).to.eql([])
    }) 
    it("debería agregar producto a la persistencia", async ()=>{
        let response = await request(app).post('/api/productos').send(producto)
        expect(response.status).to.eql(201)
        expect(response.body).to.include.keys("id")
        product_id = response.body.id
    })
    it("debería recuperarlo por id",async ()=>{
        let response = await request(app).get(`/api/productos/${product_id}`)
        expect(response.status).to.eql(200)
        const addedProduct = response.body
        expect(addedProduct).to.include.keys("_id","id","title","thumbnail","price")
        expect(addedProduct._id).to.eql(product_id)
        expect(addedProduct.id).to.eql(producto.id)
        expect(addedProduct.title).to.eql(producto.title)
        expect(addedProduct.thumbnail).to.eql(producto.thumbnail)
        expect(addedProduct.price).to.eql(producto.price)
    })
    it("debería agregar otro producto y listarlos ambos",async()=>{
        await request(app).post('/api/productos').send(producto)
        let response = await request(app).get('/api/productos')
        const products = response.body
        expect(products.length).to.eql(2)
    })
    it("debería modificar el producto por id",async ()=>{
        let response = await request(app).put(`/api/productos/${product_id}`).send(nuevoProducto)
        expect(response.status).to.eql(200)
        response = await request(app).get(`/api/productos/${product_id}`)
        const newProduct = response.body
        expect(newProduct).to.include.keys("_id","id","title","thumbnail","price")
        expect(newProduct._id).to.eql(product_id)
        expect(newProduct.id).to.eql(nuevoProducto.id)
        expect(newProduct.title).to.eql(nuevoProducto.title)
        expect(newProduct.thumbnail).to.eql(nuevoProducto.thumbnail)
        expect(newProduct.price).to.eql(nuevoProducto.price)
    })

    it("debería borrar el producto de la persistencia y no encontrarlo por su id",async()=>{
        let response = await request(app).delete(`/api/productos/${product_id}`)
        expect(response.status).to.eql(200)
        response = await request(app).get(`/api/productos/${product_id}`)
        expect(response.status).to.eql(404)
        expect(response.body.error).to.eql(`no existe un registro con id: ${product_id}`)
    })  

})
  
describe("Testeando persistencia de carritos",()=>{

    let cart_id
    let dbproduct = {}

    before("pone a 0 las bases y agrega un producto a la base productos",async()=>{
        let response = await request(app).delete(`/api/productos/reset`)
        expect(response.status).to.eql(200)
        response = await request(app).delete(`/api/carritos/reset`)
        expect(response.status).to.eql(200)
        response = await request(app).post('/api/productos').send(producto)
        expect(response.status).to.eql(201)
        dbproduct.id = response.body.id
    })

    it("Debería crear un carrito y devolver su id",async()=>{
        let response = await request(app).post(`/api/carritos`)
        expect(response.status).to.eql(201)
        expect(response.body).to.include.keys("cart_id")
        cart_id = response.body.cart_id
    })
    it("Debería recuperar el carrito y contener la estructura apropiada",async()=>{
        let response = await request(app).get(`/api/carritos/${cart_id}`)
        expect(response.status).to.eql(200)
        const carrito = response.body
        expect(carrito).to.include.keys("_id","products")
        expect(carrito._id).to.eql(cart_id)
        expect(carrito.products.length).to.eql(0)
    })
    it("Debería agregar un producto al carrito",async()=>{
        let response = await request(app).post(`/api/carritos/${cart_id}/productos`).send(dbproduct)
        expect(response.status).to.eql(200)
        response = await request(app).get(`/api/carritos/${cart_id}`)
        const carrito = response.body
        expect(carrito).to.include.keys("_id","products")
        expect(carrito._id).to.eql(cart_id)
        expect(carrito.products.length).to.eql(1)
        const addedProduct = carrito.products[0]
        expect(addedProduct).to.include.keys("_id","id","title","thumbnail","price")
        expect(addedProduct._id).to.eql(dbproduct.id)
        expect(addedProduct.id).to.eql(producto.id)
        expect(addedProduct.title).to.eql(producto.title)
        expect(addedProduct.thumbnail).to.eql(producto.thumbnail)
        expect(addedProduct.price).to.eql(producto.price)
    })
    it("Debería borrar el producto por id",async()=>{
        let response = await request(app).delete(`/api/carritos/${cart_id}/productos/${dbproduct.id}`)
        expect(response.status).to.eql(200)
        response = await request(app).get(`/api/carritos/${cart_id}`)
        const carrito = response.body
        expect(carrito).to.include.keys("_id","products")
        expect(carrito._id).to.eql(cart_id)
        expect(carrito.products.length).to.eql(0)
    })
    it("Debería agregar 2 productos y luego limpiar el carrito",async()=>{
        let response = await request(app).post(`/api/carritos/${cart_id}/productos`).send(dbproduct)
        response = await request(app).post(`/api/carritos/${cart_id}/productos`).send(dbproduct)
        response = await request(app).get(`/api/carritos/${cart_id}`)
        let carrito = response.body
        expect(carrito).to.include.keys("_id","products")
        expect(carrito._id).to.eql(cart_id)
        expect(carrito.products.length).to.eql(2)
        response = await request(app).delete(`/api/carritos/${cart_id}`)
        response = await request(app).get(`/api/carritos/${cart_id}`)
        carrito = response.body
        expect(carrito).to.include.keys("_id","products")
        expect(carrito._id).to.eql(cart_id)
        expect(carrito.products.length).to.eql(0)
    })
})  