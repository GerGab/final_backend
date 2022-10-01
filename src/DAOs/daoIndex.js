import config from '../../config.js'
import fs from 'fs'
import admin from "firebase-admin"

let cartDao,productDao,userDao,ordersDao,messagesDao;

switch (config.DATABASE_TYPE) {
    case 'json':
        const { default: daoFile } = await import('./daoFile.js')
        // agregar en el constructor la colección
        productDao = new daoFile(config.fileSystem.path,"products.json")
        cartDao = new daoFile(config.fileSystem.path,"carts.json")
        userDao = new daoFile(config.fileSystem.path,"users.json")
        ordersDao = new daoFile(config.fileSystem.path,"orders.json")
        messagesDao = new daoFile(config.fileSystem.path,"messages.json")
        break
    case 'firebase':
        const { default: daoFirebase } = await import('./daoFirebase.js')
        const serviceAccount = JSON.parse(fs.readFileSync(config.firebase.json, 'utf8'))
        admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
                });      
        const db = admin.firestore();
        productDao = new daoFirebase(db,"products")
        cartDao = new daoFirebase(db,"carts")
        userDao = new daoFirebase(db,"users")
        ordersDao = new daoFirebase(db,"orders")
        messagesDao = new daoFirebase(db,"messages")
        break
    case 'mongodb':
        const { default: daoMongo } = await import('./daoMongo.js')
        productDao = new daoMongo("ecommerce","products")
        cartDao = new daoMongo("ecommerce","carts")
        userDao = new daoMongo("ecommerce","users")
        ordersDao = new daoMongo("ecommerce","orders")
        messagesDao = new daoMongo("ecommerce","messages")
        break
    default:
        const { default: daoMemory } = await import('./daoMemory.js')
        productDao = new daoMemory()
        cartDao = new daoMemory()
        userDao = new daoMemory()
        ordersDao = new daoMemory()
        messagesDao = new daoMemory()
        break
} 

export { productDao, cartDao, userDao,ordersDao, messagesDao }