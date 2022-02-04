import {authAPI} from "../m3-dal/api";


export const authReducer = (state: any = {}, action: any): any => {
    switch (action.type) {
        default:
            return state
    }
}


export const registerData = (email: string, password: string, repeatPassword: string) => ()=> {
    authAPI.register(email,password, repeatPassword)
        .then(response => {
            console.log(response)
        })
}