import config from '../config.js'
import fs from 'fs'
import admin from "firebase-admin"

let cartDao,productDao;

switch (config.DATABASE_TYPE) {
    case 'json':
        const { default: daoFile } = await import('./daoFile.js')
        // agregar en el constructor la colección
        productDao = new daoFile(config.fileSystem.path,"products.json")
        cartDao = new daoFile(config.fileSystem.path,"carts.json")
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
        break
    case 'mongodb':
        const { default: daoMongo } = await import('./daoMongo.js')
        productDao = new daoMongo(config.mongodb,"ecommerce","products")
        cartDao = new daoMongo(config.mongodb,"ecommerce","carts")
        break
    default:
        const { default: daoMemory } = await import('./daoMemory.js')
        productDao = new daoMemory()
        cartDao = new daoMemory()
        break
} 

export { productDao, cartDao }