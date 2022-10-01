import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { customError, standardErrors } from '../Models/errors.js';

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

function generateAuthToken(user) {
    try {
        const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: '600s' });
    return token;
    } catch (error) {
        customError(`Error en generación de token => ${error.message}`)
    }
    
}

function extractUser(token) {
    try {
        const user = jwt.verify(token,PRIVATE_KEY)
        delete user.iat
        delete user.exp
        return user
    } catch (error) {
        customError(`Error de extracción jwt => ${error.message} `,standardErrors.UNAUTHORIZED)
    }
}

export {generateAuthToken,extractUser}
