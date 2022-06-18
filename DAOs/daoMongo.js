import mongoContainer from "../Containers/mongoContainer.js"
import { MongoClient } from 'mongodb'

class daoMongo extends mongoContainer {

    constructor(mongodb,database,collection){
        const client = new MongoClient(mongodb.uri, mongodb.options)
        super(client,database,collection)
    }

}

export default daoMongo