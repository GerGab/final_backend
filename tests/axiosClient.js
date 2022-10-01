import axios from "axios"
import URL from './tests.config.js'

export default class axiosClient {

    static URL = URL
    

    static get = async (endpoint,payload) => {
        try {return await axios.get(`${this.URL}${endpoint}`,payload)} catch (error) { return error.response}    
    }

    static post = async (endpoint,payload) => {
        try {return await axios.post(`${this.URL}${endpoint}`,payload)} catch (error) { return error.response}
    }

    static put = async (endpoint,payload) => {
        try {return await axios.put(`${this.URL}${endpoint}`,payload)} catch (error) { return error.response}
    }

    static delete = async (endpoint,payload) => {
        try {return await axios.delete(`${this.URL}${endpoint}/${payload}`)} catch (error) { return error.response}
    }

}