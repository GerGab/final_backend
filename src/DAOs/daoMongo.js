import mongoContainer from "../Containers/mongoContainer.js"
import { MongoClient } from 'mongodb'
import config from '../../config.js'

class daoMongo extends mongoContainer {

    constructor(database,collection){
        const mongoDb = (config.production === 'PRODUCTION')? config.mongoProd:config.mongoDev
        const client = new MongoClient(mongoDb.uri, mongoDb.options)
        super(client,database,collection)
    }

}

export default daoMongo