import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/',
})


export const authAPI = {
    register(email: string, password: string, repeatPassword: string) {
        return instance.post(`auth/register`, {email, password, repeatPassword})
    }
}