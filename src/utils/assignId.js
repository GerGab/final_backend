import {uid} from 'uid'

const assignId = (length)=>{
    return uid(length||24)
}

export default assignId
