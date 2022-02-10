import {Dispatch} from "redux";
import {PasswordAPI} from "../m3-dal/api";

// ACTIONS
const setResetPasswordStatus = (status: ResetPasswordStatus) => {
    return {
        type: "PASSWORD/SET_RESET_PASSWORD_STATUS",
        payload: status,
    } as const;
};

type SetResetPasswordStatusAction = ReturnType<typeof setResetPasswordStatus>;

// THUNKS
export const changePassword = (password: string, token: string) => {

    return (dispatch: Dispatch<SetResetPasswordStatusAction>) => {
        let action: SetResetPasswordStatusAction;
        PasswordAPI.changePassword(password, token).then(res => {
            action = setResetPasswordStatus("success")
        }).catch(err => {
            action = setResetPasswordStatus("error");
        }).finally(() => {
            dispatch(action);
        })
    }
}

export const recoveryPassword = (email: string, from: string) => {

    return (dispatch: Dispatch<SetResetPasswordStatusAction>) => {
        let action: SetResetPasswordStatusAction;
        PasswordAPI.recoverPassword(email, from).then(res => {
            action = setResetPasswordStatus("success")
        }).catch(err => {
            action = setResetPasswordStatus("error");
        }).finally(() => {
            dispatch(action);
        })
    }
}

// REDUCER
const initialState: PasswordReducerType = {
    resetPasswordStatus: "init",
};

export const passwordReducer = (
    state = initialState,
    action: Action
): PasswordReducerType => {
    switch (action.type) {
        case "PASSWORD/SET_RESET_PASSWORD_STATUS": {
            return {...state, resetPasswordStatus: action.payload};
        }
        default:
            return state;
    }
};

// TYPES
export type ResetPasswordStatus = "init" | "success" | "error";

export type PasswordReducerType = {
    resetPasswordStatus: ResetPasswordStatus;
};

type Action = SetResetPasswordStatusAction;
