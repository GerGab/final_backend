import { customError, standardErrors,fowardError } from "../Models/errors.js"

const apiImages = {

    saveImage: async(req,res,next) =>{
        const file  = req.file
        console.log(file)
        try {
            if(!file) customError(`Debe adjuntar una imagen`,standardErrors.BAD_REQUEST)
            res.status(200).json({path : `${req.get('host')}/images/${file.filename}`})//
        } catch (error) {
            next(fowardError(`Error al guarda imagen => ${error.message}`,error.type??standardErrors.INTERNAL_ERROR))
        }
        
    }
}

export default apiImages