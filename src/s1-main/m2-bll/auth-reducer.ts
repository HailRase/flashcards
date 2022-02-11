import {authAPI} from "../m3-dal/api";
import {Dispatch} from "redux";


const SET_USER_DATA = "SET-USER-DATA"

export type userDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод


};
export type AuthType = typeof initialState;
export type InitialStateType = {
    userData: userDataType,
    isAuth: boolean
}
export const initialState: InitialStateType = {
    userData: {
        _id: '',
        name: "",
        email: "",
        avatar: '',
        publicCardPacksCount: 0
    },
    isAuth: false
};


export const authReducer = (state: AuthType = initialState, action: ActionAuthType): typeof initialState => {
    switch (action.type) {
        case "Login/SET-IS-LOGGED-IN":
            return {...state, isAuth: action.value};
        case SET_USER_DATA: {
            return {...state, userData: action.userData}
        }
        default:
            return state
    }
}
export const setUserDataAC = (userData: userDataType
    ) => {
        return {
            type: SET_USER_DATA,
            userData
        } as const;
    }
;
export const setIsLoggedInAc = (value: boolean) => {
    return {
        type: "Login/SET-IS-LOGGED-IN", value
    } as const
}

export const registerData = (email: string, password: string, repeatPassword: string) => () => {
    authAPI.register(email, password, repeatPassword)
        .then(response => {
            console.log(response)
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            alert(error)
        })
}

export const loginData = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.Login(email, password, rememberMe)
        .then(response => {
            console.log(response.data)
            dispatch(setUserDataAC(response.data));
            dispatch(setIsLoggedInAc(true))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            alert(error)
        })
}

export const meData = () => () => {
    authAPI.me()
        .then(response => {
            console.log(response)
        })
}
type setIsLoggedInAcType = ReturnType<typeof setIsLoggedInAc>
type setUserDataACType = ReturnType<typeof setUserDataAC>
type ActionAuthType = setUserDataACType
    | setIsLoggedInAcType



