import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    //baseURL: '',
    baseURL: 'http://localhost:7542/2.0/',
})


export const authAPI = {
    register(email: string, password: string, repeatPassword: string) {
        return instance.post(`auth/register`, {email, password, repeatPassword})
    },
    Login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instance.delete('auth/me')
    },
    me() {
        return instance.post(`auth/me`)
    },

}

export const PasswordAPI = {
    changePassword(password: string, resetPasswordToken: string) {
        return instance.post(`auth/set-new-password`, {password, resetPasswordToken})
    },
    recoverPassword(email: string, from: string) {
        const message = `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='http://localhost:3000/flashcards#/set-new-password/$token$'>
            link</a></div>` ;
        return instance.post(`auth/forgot`, {email, from, message});
    },
}