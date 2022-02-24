import { authAPI } from "../m3-dal/auth";
import { Dispatch } from "redux";
import { initializedSuccess, ThunkType } from "./app-reducer";


const SET_USER_DATA = "SET-USER-DATA";
const SET_DISABLED = "SET_DISABLED";

export type userDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод


};
export type AuthType = typeof initialState;
export type InitialStateType = {
    userData: userDataType | null
    isAuth: boolean
    isDisabled: boolean
}

export const initialState: InitialStateType = {
    userData: {
        _id: '',
        name: "",
        email: "",
        avatar: '',
        publicCardPacksCount: 0
    },
    isAuth: false,
    isDisabled: false,
};


export const authReducer = (state: AuthType = initialState, action: ActionAuthType): typeof initialState => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                userData: action.userData,
                isAuth: action.isAuth
            }
        }
        case SET_DISABLED: {
            return {
                ...state,
                isDisabled: action.isDisabled
            }
        }
        default:
            return state
    }
}
export const setUserData = (userData: userDataType | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        userData,
        isAuth
    } as const;
};
export const setDisabledButton = (isDisabled: boolean) => {
    return {
        type: SET_DISABLED,
        isDisabled
    } as const;
};



export const register = (email: string, password: string, repeatPassword: string) => () => {
    authAPI.register(email, password, repeatPassword)
        .then(response => {

        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            alert(error)
        })
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch) => {
    authAPI.Login(email, password, rememberMe)
        .then(response => {
            dispatch(getAuthUserData());
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            alert(error)
        })
}
export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
            dispatch(setUserData(null, false));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + 'more details in the console')
            alert(error)
        })
}


export const getAuthUserData = () => (dispatch: Dispatch) => {
    return authAPI.me()
        .then(response => {
            dispatch(setUserData(response.data, true))
        })
}
type setUserDataACType = ReturnType<typeof setUserData>
type setDisabledButtonACType = ReturnType<typeof setDisabledButton>
type ActionAuthType = setUserDataACType | setDisabledButtonACType

export const editAuthUserData = (name: string, avatar: string) => (dispatch: Dispatch) => {
    setDisabledButton(true)
    return authAPI.edit(name, avatar)
        .then(response => {
            dispatch(setUserData(response.data.updatedUser, true));
            setDisabledButton(false)
        })
}



