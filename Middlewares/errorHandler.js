import logger from "../logger.js";

export default function errorHandler (err,req,res,next) {

    const {originalUrl:url, method} = req
    let errorCode = 500
    switch (err.type) {
        
        case 'BAD_REQUEST':
            errorCode = 404
            logger.error({code: errorCode, error : err.message,Endpoint : url,Method : method});
            break;

        case 'UNAUTHORIZED':
            errorCode = 401
            logger.error({code: errorCode, error : err.message,Endpoint : url,Method : method});
            break;

        case 'FORBIDDEN':
            errorCode = 403
            logger.error({code: errorCode, error : err.message,Endpoint : url,Method : method});
            break;

        case 'DB_NOT_FOUND':
            errorCode = 404
            logger.error({code: errorCode, error : err.message,Endpoint : url,Method : method});
            break;

        case 'DB_NOT_RESPOND':
            errorCode = 408
            logger.error({code: errorCode, error : err.message,Endpoint : url,Method : method});
            break;

        case 'NOT_IMPLEMENTED':
            errorCode = 501
            logger.error({code: errorCode, error : err.message,Endpoint : url,Method : method});
            break;

        default:
            logger.error({code: errorCode, error : err.message,Endpoint : url,Method : method});
            break;
    }
    res.sendStatus(errorCode)

}