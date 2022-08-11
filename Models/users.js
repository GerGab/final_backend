import { customError, standardErrors } from "./errors.js"

export default function validateUser (user) {

    if(!user.email || user?.email==="") customError('email sin asignar',standardErrors.BAD_REQUEST)
    if(!user.name || user?.name==="")  customError('nombre sin asignar',standardErrors.BAD_REQUEST)
    if(!user.lastname || user?.lastname==="")  customError('apellido sin asignar',standardErrors.BAD_REQUEST)
    if(!user.phone || user?.phone==="")  customError('telefono sin asignar',standardErrors.BAD_REQUEST)
    if(!user.password || user?.password==="")  customError('password sin asignar',standardErrors.BAD_REQUEST)

}