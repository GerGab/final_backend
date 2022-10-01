const customError = (message,type,attach=[])=>{

    const error = new Error(message)
    error.type = type
    error.attachments = attach
    throw error
}

const fowardError = (message,type,attach=[])=>{
    return{message:message,type:type,attachments:attach}
}

const standardErrors = {

    BAD_REQUEST : "BAD_REQUEST",
    UNAUTHORIZED : "UNAUTHORIZED",
    FORBIDDEN : "FORBIDDEN",
    DB_NOT_FOUND : "DB_NOT_FOUND",
    DB_NOT_RESPOND : "DB_NOT_RESPOND",
    NOT_IMPLEMENTED : "NOT_IMPLEMENTED",
    INTERNAL_ERROR : "INTERNAL_ERROR"

}

export {customError,fowardError, standardErrors }