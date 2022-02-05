import {authAPI} from "../m3-dal/api";
import {Dispatch} from "redux";

const SET_USER_DATA = "SET-USER-DATA"

export type DataType = {
    id: string;
    email: string;
    login: string;
};
export type isAuthType = {
    isAuth: boolean;
};
export type AuthType = typeof initialState;
export const initialState = {
    id: 1,
    email: "",
    login: "",
    isAuth: false,
};


export const authReducer = (state: AuthType = initialState, action: any): typeof initialState => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}
export const setUserDataAC = (
    id: number,
    login: string,
    email: string,
    isAuth: boolean
) => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth},
    } as const;
};

export const registerData = (email: string, password: string, repeatPassword: string) => () => {
    authAPI.register(email, password, repeatPassword)
        .then(response => {
            console.log(response)
        })
}

export const loginData = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.Login(email, password, rememberMe)
        .then(response =>
            console.log(response))
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            console.log(error)
        })
}


