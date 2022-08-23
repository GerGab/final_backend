// importación de modulos y paquetes
import express from 'express'
import routerApiProducts from './Routers/routerApiProducts.js'
import routerApiCarts from './Routers/routerApiCart.js'
import authRouter from './Routers/authRouters.js'
import webRouter from './Routers/webRouter.js'
import config from './config.js'
import { passportMiddleware, passportSessionHandler } from './Middlewares/passport.js'
import { sessionHandler as session } from './Middlewares/session.js';
import { loginController, registerController } from './ApiControllers/authController.js'
import { logoutController } from './ApiControllers/authController.js'
import logger from './logger.js'
import routerApiOrders from './Routers/ordersRouters.js'
import errorHandler from './Middlewares/errorHandler.js'

// TO DO

// implementar el aviso de compra al admin por mail y wsp, por sms al comprador.... ok.
// utilizar mongoAtlas en todo armar para local y tambien subir a Heroku.


// creación de instancias
const app = express()

//=== MIDDLEWARES ===
app.use(express.json())
app.use(session)
app.use(passportMiddleware)
app.use(passportSessionHandler)

//======= ROUTERS =======

app.use("/api/products",routerApiProducts)
app.use("/api/shoppingcartproducts",routerApiCarts)
app.use("/api/orders",routerApiOrders)
app.post("/login",loginController)
app.post("/api/users",registerController)
app.use("/auth",authRouter)
app.post("/logout",logoutController)
app.use('/',webRouter)
app.use(errorHandler)

// ===== MOUNTING SERVER =====
const PORT = process.env.PORT || config.PORT;

const mountServer = ()=>{ const server = app.listen(PORT, () =>{
    logger.info(`Servidor express escuchando en el puerto ${PORT} - MODE: ${config.production} - PID WORKER - ${process.pid}`)
})

server.on("error", error => logger.error(`Error en servidor ${error}- PID WORKER - ${process.pid}`))}

export default mountServer