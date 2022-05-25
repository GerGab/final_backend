// importación de modulos y paquetes
import express from 'express'
import routerApiProducts from './Routers/routerApiProducts.js'
import routerApiCarts from './Routers/routerApiCart.js'
import webRouter from './Routers/webRouter.js'
//import routerApiCart from './Routers/routerApiCart.js'

// creación de instancias
const app = express()

// asignación de rutas
app.use("/api/productos",routerApiProducts)
app.use("/api/carritos",routerApiCarts)
app.use('/',webRouter)

// configuración del servidor
const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`Servidor http escuchando en el puerto: ${server.address().port}`)
})


// avisos y alertas
server.on("error", error => console.log(`Error en servidor ${error}`))