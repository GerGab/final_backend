import { expect } from "chai";
import { describe, it } from "mocha";
import {product,modProduct,newProduct,adminUser,newUser} from './objects.js'
import axiosClient from './axiosClient.js'

describe("Creción de usuarios debe:",()=>{

    it("crear el usuario Admin",async function(){
        const response = await axiosClient.get('/api/users',adminUser)
        console.log(response.data)
        expect(response.status).to.eql(200)
        expect(response.data).to.be.an('string')
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