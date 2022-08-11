import config from "../config.js"

export default function formatNewRegister (newUser){

    const {email} = newUser
    return  {
        to: config.nodemailerUser,
        subject: 'Nuevo Registro',
        message: `Se ha dado de alta al nuevo usuario con email: ${email}`,
    }
}