import { expect } from "chai";
import { describe, it } from "mocha";
import {product,modProduct,newProduct,adminUser,newUser, falseUser} from './objects.js'
import axiosClient from './axiosClient.js'

describe("Creción de usuarios debe:",()=>{

    it("crear el usuario Admin",async function(){
        const response = await axiosClient.post('api/users',adminUser)
        expect(response.status).to.eql(201)
        expect(response.data).to.have.keys('token')
    });

    it("crear el usuario sin permisos",async function(){
        const response = await axiosClient.post('api/users',newUser)
        expect(response.status).to.eql(201)
        expect(response.data).to.have.keys('token')
    });

    it("fallar al crear el usuario repetido",async function(){
        const response = await axiosClient.post('api/users',newUser)
        expect(response.status).to.eql(400)
    });

})

/* describe("Logueo de usuarios debe:",()=>{

    it("Logguear usuario Admin",async function(){
        const response = await axiosClient.post('login',adminUser)
        expect(response.status).to.eql(200)
        expect(response.data).to.have.keys('token')
    });

    it("logguear usuario sin permisos",async function(){
        const response = await axiosClient.post('login',newUser)
        expect(response.status).to.eql(200)
        expect(response.data).to.have.keys('token')
    });

    it("Rechazar el usuario no ingresado",async function(){
        const response = await axiosClient.post('login',falseUser)
        expect(response.status).to.eql(400)
    });

}) */

describe("Api Productos debe:",()=>{

    let token
    before(`Loggear al usuario`,async()=>{
        const response = await axiosClient.post('login',newUser)
        token = response.data.token
    })
    it("recuperar carrito",async function(){
        console.log(token)
        const response = await axiosClient.post('api/shoppingcartproducts',{},{Authorization:token})
        console.log(response.data)
        expect(response.status).to.eql(200)
    })

/*     it("logguear usuario sin permisos",async function(){
        const response = await axiosClient.post('login',newUser)
        expect(response.status).to.eql(200)
        expect(response.data).to.have.keys('token')
    }); */

/*     it("Sin usuario Recuperar todos los productos",async function(){
        const response = await axiosClient.get('api/products',adminUser)
        expect(response.status).to.eql(200)
        response.data.map(object => expect(object).to.have.keys('name','image','price','id','description'))
        response.data.map(object => expect(object).to.not.have.keys('_id'))
    }); */

    

    it("Rechazar el usuario no ingresado",async function(){
        const response = await axiosClient.post('login',falseUser)
        expect(response.status).to.eql(400)
    });

})

/* 
describe("Se debe verificar en la api productos que:",()=>{

    let modId
    let delId

    it("recupera los productos",async function(){
        const response = await axiosClient.get('/api/productos')
        modId = (response.data[1].id)
        delId = (response.data[0].id)
        expect(response.status).to.eql(200)
        expect(response.data).to.be.an('array')
        response.data.map(object => expect(object).to.have.keys('title','thumbnail','price','id'))
    });

    it("crear un producto",async function(){
        const response = await axiosClient.post('/api/productos',nuevoProducto)
        expect(response.status).to.eql(201)
    });

    it("Impide crear un producto incompleto",async function(){
        const {thumbnail,price} = nuevoProducto
        const response = await axiosClient.post('/api/productos',{thumbnail,price})
        expect(response.status).to.eql(400)
    })

    it("Modifica un producto por id",async function(){
        const response = await axiosClient.put('/api/productos',{id:modId,...productoModificado})
        expect(response.status).to.eql(200)
    })

    it("Elimina un producto por id",async function(){
        const response = await axiosClient.delete('/api/productos',delId)
        expect(response.status).to.eql(200)
    })


})    */