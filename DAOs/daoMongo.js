import mongoContainer from "../Containers/mongoContainer.js"
import { MongoClient } from 'mongodb'
import config from '../config.js'
import { customError, standardErrors } from "../Models/errors.js"

class daoMongo extends mongoContainer {

    constructor(database,collection){
        const client = new MongoClient(config.mongodb.uri, config.mongodb.options)
        super(client,database,collection)
    }

    async findByParameter(param){
        try{
            let objects = await this.connection.find(param).toArray()
            return objects

        }catch(err){
            customError(`fallo en findByParameter => ${err.message}`,err.type??standardErrors.DB_NOT_RESPOND)
        }
    }

}

export default daoMongo