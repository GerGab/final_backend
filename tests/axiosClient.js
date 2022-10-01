import axios from "axios"
import URL from './tests.config.js'

export default class axiosClient {

    static URL = URL

    static get = async ({endpoint,params='',header}) => {
        try {return await axios.get(`${this.URL}${endpoint}/${params}`,{headers:header})} catch (error) { return error.response}    
    }

    static post = async ({endpoint,payload,header}) => {
        try {return await axios.post(`${this.URL}${endpoint}`,payload,{headers:header})} catch (error) { return error.response}
    }

    static put = async ({endpoint,params='',payload,header}) => {
        try {return await axios.put(`${this.URL}${endpoint}/${params}`,payload,{headers:header})} catch (error) { return error.response}
    }

    static delete = async ({endpoint,params='',header}) => {
        try {return await axios.delete(`${this.URL}${endpoint}/${params}`,{headers:header})} catch (error) { return error.response}
    }

}