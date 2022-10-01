import {MessagesService} from '../Services/servicesIndex.js'

const messagesController = {

    saveMessage : async (message) =>{
        return await MessagesService.saveMessage(message)
         
    },
    recoverMessages : async() =>{
        return await MessagesService.recoverMessages()
    }
}

export default messagesController