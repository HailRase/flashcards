import {Dispatch} from "redux";
import {PasswordAPI} from "../m3-dal/api";

// ACTIONS
const setResetPasswordStatus = (
    status: ResetPasswordStatus
) => {
    return {
        type: "PASSWORD/SET_RESET_PASSWORD_STATUS",
        payload: status,
    } as const;
};

type SetResetPasswordStatusAction = ReturnType<typeof setResetPasswordStatus>;

// THUNKS
const changePassword = (password: string, token: string) => {
    return async (dispatch: Dispatch<SetResetPasswordStatusAction>) => {
        const res = await PasswordAPI.changePassword(password, token);
        const action = res.data.info ? setResetPasswordStatus("success") : setResetPasswordStatus("error")
        dispatch(action);
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
type ResetPasswordStatus = "init" | "success" | "error";

type PasswordReducerType = {
    resetPasswordStatus: ResetPasswordStatus;
};

type Action = SetResetPasswordStatusAction;
