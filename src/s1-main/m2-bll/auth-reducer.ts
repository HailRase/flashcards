import {authAPI} from "../m3-dal/api";
import {Dispatch} from "redux";
import {ThunkType} from "./app-reducer";


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
        case SET_USER_DATA: {
            return {
                ...state,
                userData: action.userData,
                isAuth: true
            }
        }
        default:
            return state
    }
}
export const setUserData = (userData: userDataType
    ) => {
        return {
            type: SET_USER_DATA,
            userData
        } as const;
    }
;


export const register = (email: string, password: string, repeatPassword: string) => () => {
    authAPI.register(email, password, repeatPassword)
        .then(response => {

        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            alert(error)
        })
}

export const login = (email: string, password: string, rememberMe: boolean):ThunkType => (dispatch) => {
    authAPI.Login(email, password, rememberMe)
        .then(response => {
            dispatch(getAuthUserData());
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            alert(error)
        })
}

export const getAuthUserData = () =>  (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            dispatch(setUserData(response.data))
        })
}
type setUserDataACType = ReturnType<typeof setUserData>
type ActionAuthType = setUserDataACType



