// importación de modulos y paquetes
import express from 'express'
import errorHandler from './src/Middlewares/errorHandler.js'
import routerApiCarts from './src/Routers/routerApiCarts.js'
import routerApiProducts from './src/Routers/routerApiProducts.js'
import webRouter from './src/Routers/webRouter.js'
import config from './config.js'
import logger from './logger.js'
import routerApiOrders from './src/Routers/routerApiOrders.js'
import routerApiUsers from './src/Routers/routerApiUsers.js'
import routerAuth from './src/Routers/routerAuth.js'
import routerImages from './src/Routers/routerImages.js'
import messagesController from './src/SocketControllers/messagesController.js'
import infoRouter from './src/Routers/infoRouters.js'
import http from "http";
import { Server } from "socket.io";

// creación de instancias
const app = express()
const httpServer = http.createServer(app);
const io = new Server(httpServer)

//=== MIDDLEWARES ===
app.use(express.json())
app.use(express.static("Public"))

//======= ROUTERS =======
app.use("/api/images",routerImages)
app.use("/api/products",routerApiProducts)
app.use("/api/shoppingcartproducts",routerApiCarts)
app.use("/api/orders",routerApiOrders)
app.post("/api/users",routerApiUsers)
app.post("/login",routerAuth)
app.use("/public",express.static('public'))
app.use("/info",infoRouter)
app.use('/',webRouter)
app.use(errorHandler)

//====== WEBSOCKET =======
io.on("connection", async (socket) =>{
    const messages =  await messagesController.recoverMessages()
    socket.emit("messages",{messages})
    socket.on("addMessage",async (message)=>{
        try {
            await messagesController.saveMessage(message)
            const messages = await messagesController.recoverMessages()
            io.sockets.emit("messages",{messages})
        } catch (error) {
            logger.error(`Error en socket => ${error.message} - ${error.type}`)
        }
    })
    
})

// ===== MOUNTING SERVER =====
const PORT = process.env.PORT || config.PORT;

const mountServer = ()=>{ const server = httpServer.listen(PORT, () =>{
    logger.info(`Servidor express escuchando en el puerto ${PORT} - MODE: ${config.production} - PID WORKER - ${process.pid}`)
})

server.on("error", error => logger.error(`Error en servidor ${error}- PID WORKER - ${process.pid}`))}

export {app , mountServer }
