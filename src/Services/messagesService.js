import messagesDto from '../DTOs/messagesDto.js'
import { customError, standardErrors } from "../Models/errors.js";
import messageModel from '../Models/messages.js';

export default class messagesService {
    
    #messagesDao

    constructor(messagesDao){
        this.#messagesDao = messagesDao
    }

    async saveMessage(_message){
        try{
            const message = new messageModel(_message).print()
            await this.#messagesDao.create(message)
        }catch(error){
            customError(`Error al guardar el mensaje =>${error.message}`,error.type??standardErrors.INTERNAL_ERROR)
        }
    }

    async recoverMessages(){
        try {
            const messages = await this.#messagesDao.getAll()
            const dtos = messages.map(message => new messagesDto(message))
            return dtos
        } catch (error) {
            customError(`Error al recuperar los mensajes =>${error.message}`,error.type??standardErrors.INTERNAL_ERROR)
        }
    }
}