import MongoStore from 'connect-mongo'
import config from '../config.js';
import session from 'express-session'

export const sessionHandler = session({
    store: MongoStore.create({
        mongoUrl: config.mongodb.uri,
        mongoOptions: config.mongodb.options
    }),
    secret:"niidea",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 600000 // 10 min
    }   
})