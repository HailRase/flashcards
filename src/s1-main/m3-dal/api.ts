import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/',
})


export const authAPI = {
    register(email: string, password: string, repeatPassword: string) {
        return instance.post(`auth/register`, { email, password, repeatPassword })
    },
    Login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, { email, password, rememberMe })
    },
    me() {
        return instance.get(`auth/me`)
    },

}

export const PasswordAPI = {
    changePassword(password: string, resetPasswordToken: string) {
        return instance.post(`auth/set-new-password`, { password, resetPasswordToken })
    },
    recoverPassword(email: string, from: string) {
        const message = `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='https://hailrase.github.io/flashcards/#/change/$token$'>
            link</a></div>` ;
        return instance.post(`auth/forgot`, { email, from, message });
    },
}