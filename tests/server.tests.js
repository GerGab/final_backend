import { assert, expect } from "chai";
import { describe, it } from "mocha";
import {product,modProduct,newProduct,adminUser,newUser, falseUser} from './objects.js'
import axiosClient from './axiosClient.js'
import { response } from "express";

describe("Creción de usuarios debe:",()=>{

    it("crear el usuario Admin",async function(){
        const response = await axiosClient.post({
            endpoint : 'api/users',
            payload: adminUser,
        })
        expect(response.status).to.eql(201)
        expect(response.data).to.have.keys('token')
    });

    it("crear el usuario sin permisos",async function(){
        const response = await axiosClient.post({
            endpoint : 'api/users',
            payload: newUser,
        })
        expect(response.status).to.eql(201)
        expect(response.data).to.have.keys('token')
    });

    it("fallar al crear el usuario repetido",async function(){
        const response = await axiosClient.post({
            endpoint : 'api/users',
            payload: newUser,
        })
        expect(response.status).to.eql(400)
    });

})

describe("Logueo de usuarios debe:",()=>{

    it("Logguear usuario Admin",async function(){
        const response = await axiosClient.post({
            endpoint : 'login',
            payload: adminUser,
        })
        expect(response.status).to.eql(200)
        expect(response.data).to.have.keys('token')
    });

    it("logguear usuario sin permisos",async function(){
        const response = await axiosClient.post({
            endpoint : 'login',
            payload: newUser,
        })
        expect(response.status).to.eql(200)
        expect(response.data).to.have.keys('token')
    });

    it("Rechazar el usuario no ingresado",async function(){
        const response = await axiosClient.post({
            endpoint : 'login',
            payload: falseUser,
        })
        expect(response.status).to.eql(400)
    });

})

describe("Api Productos debe:",()=>{

    let userToken,adminToken,id1,id2
    before(async()=>{
        const response = await axiosClient.post({
            endpoint : 'login',
            payload: adminUser,
        })
        adminToken = response.data.token
        const response2 = await axiosClient.post({
            endpoint : 'login',
            payload: newUser,
        })
        userToken = response2.data.token
    })

    it('Impedir que usuario no autorizado o no identificado cree productos',async()=>{
        const response = await axiosClient.post({
            endpoint : 'api/products',
            payload: newProduct,
            header:{authorization:userToken}
        })
        expect(response.status).to.eql(401)
        const response2 = await axiosClient.post({
            endpoint : 'api/products',
            payload: newProduct,
        })
        expect(response2.status).to.eql(400)
    })


    it('Poder crear productos como admin',async()=>{
        const response = await axiosClient.post({
            endpoint : 'api/products',
            payload: newProduct,
            header:{authorization:adminToken}
        })
        expect(response.status).to.eql(201)
        id1 = response.data.id
        const response2 = await axiosClient.post({
            endpoint : 'api/products',
            payload: product,
            header:{authorization:adminToken}
        })
        expect(response2.status).to.eql(201)
        id2 = response2.data.id
        const response3 = await axiosClient.post({
            endpoint : 'api/products',
            payload: product,
            header:{authorization:adminToken}
        })
        expect(response3.status).to.eql(201)
    })

    it('Que los productos creados tengan el formato adecuado',async()=>{
        const response = await axiosClient.get({
            endpoint : 'api/products',
        })
        expect(response.status).to.eql(200)
        response.data.map(object => expect(object).to.have.keys('name','image','price','id','description'))
        response.data.map(object => expect(object).to.not.have.keys('_id'))
    })

    it('Que permita buscar por id',async()=>{
        const response = await axiosClient.get({
            endpoint : 'api/products',
            params: id1
        })
        expect(response.status).to.eql(200)
        expect(response.data.name).to.eql(newProduct.name)
    })

    it('Modificar un producto',async()=>{
        const response = await axiosClient.put({
            endpoint : 'api/products',
            payload: {id:id2,...modProduct},
            params: id2,
            header:{authorization:adminToken}
        })
        expect(response.status).to.eql(200)
        const response2 = await axiosClient.get({
            endpoint : 'api/products',
            params: id2
        })
        expect(response.status).to.eql(200)
        expect(response2.data.name).to.eql(modProduct.name)
    })

    it('Eliminar un producto',async()=>{
        const response = await axiosClient.delete({
            endpoint : 'api/products',
            params: id2,
            header:{authorization:adminToken}
        })
        expect(response.status).to.eql(200)
    })

})

describe("el usuario debe poder:", async function(){

    let token, product1,product2
    before(async()=>{
        const response = await axiosClient.post({
            endpoint : 'login',
            payload: newUser,
        })
        token = response.data.token
        const response2 = await axiosClient.get({
            endpoint : 'api/products',
        })
        product1 = response2.data[0]
        product2 = response2.data[1]
    })
    

    it('Agregar productos a su carrito',async()=>{
        const response = await axiosClient.post({
            endpoint : 'api/shoppingcartproducts',
            payload: {"productId": product1.id},
            header:{authorization:token}
        })
        expect(response.status).to.eql(200)
        const response2 = await axiosClient.post({
            endpoint : 'api/shoppingcartproducts',
            payload: {"productId": product1.id},
            header:{authorization:token}
        })
        expect(response2.status).to.eql(200)
        const response3 = await axiosClient.post({
            endpoint : 'api/shoppingcartproducts',
            payload: {"productId": product2.id},
            header:{authorization:token}
        })
        expect(response3.status).to.eql(200)
    })

    it('No agregar productos a su carrito si no existen',async()=>{
        const response = await axiosClient.post({
            endpoint : 'api/shoppingcartproducts',
            payload: {"productId": "3a82d8cb94134a4f183c98c1"},
            header:{authorization:token}
        })
        expect(response.status).to.eql(404)
    })

    it('Verificar los productos agreados', async()=>{
        const response = await axiosClient.get({
            endpoint : 'api/shoppingcartproducts',
            header:{authorization:token}
        })
        expect(response.status).to.eql(200)
        const products = response.data.products
        expect(products.find(product=> product.id===product1.id).qty).to.eql(2)
        expect(products.find(product=> product.id===product2.id).qty).to.eql(1)
    })

    it('Borrar un producto de ser necesario',async()=>{
        const response = await axiosClient.delete({
            endpoint:'api/shoppingcartproducts',
            params: product2.id,
            header:{authorization:token}
        })
        expect(response.status).to.eql(200)
        const response2 = await axiosClient.get({
            endpoint : 'api/shoppingcartproducts',
            header:{authorization:token}
        })
        expect(response2.data.products.length).to.eql(1)
    })

})

describe("El usuario debe poder concretar las compras",()=>{

    let token, product1,product2
    before(async()=>{
        const response = await axiosClient.post({
            endpoint : 'login',
            payload: newUser,
        })
        token = response.data.token
        const response2 = await axiosClient.get({
            endpoint : 'api/products',
        })
        product1 = response2.data[0]
        product2 = response2.data[1]
    })
    it('Emitir la orden de compra',async()=>{
        const response = await axiosClient.post({
            endpoint: 'api/orders',
            header:{authorization:token}
        })
        expect(response.status).to.eql(201)
    })
    it('Fallar al emitir la orden de compra si el carrito esta vacio',async()=>{
        const response = await axiosClient.post({
            endpoint: 'api/orders',
            header:{authorization:token}
        })
        expect(response.status).to.eql(400)
    })
    it('Verificar sus ordenes realizadas',async()=>{
        const response = await axiosClient.get({
            endpoint: 'api/orders',
            header:{authorization:token}
        })
        expect(response.status).to.eql(200)
        response.data.map(object => expect(object).to.have.keys('id','clientId','date','products'))
    })
    
})
