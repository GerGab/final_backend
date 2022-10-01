import axios from "axios"
import URL from './tests.config.js'

console.log(URL)

export default class axiosClient {

    static URL = URL

    static get = async (endpoint,payload,header) => {
        try {return await axios.get(`${this.URL}${endpoint}`,payload,{headers:header})} catch (error) { return error.response}    
    }

    static post = async (endpoint,payload,header) => {
        try {return await axios.post(`${this.URL}${endpoint}`,payload,{headers:header})} catch (error) { return error.response}
    }

    static put = async (endpoint,payload,header) => {
        try {return await axios.put(`${this.URL}${endpoint}`,payload,{headers:header})} catch (error) { return error.response}
    }

    static delete = async (endpoint,payload,header) => {
        try {return await axios.delete(`${this.URL}${endpoint}/${payload}`,{},{headers:header})} catch (error) { return error.response}
    }

}