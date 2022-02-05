import SuperInputText from "../../../s1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";

import {PATH} from "../../../s1-main/m1-ui/routes/routes";

import {
    changePassword,
    ResetPasswordStatus,
} from "../../../s1-main/m2-bll/password-reducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../../s1-main/m2-bll/store";

import {ChangeEvent, useState} from "react";
import {Navigate, useParams} from "react-router-dom";

import s from "./ChangePassword.module.css";

type URLParams = {
    resetPasswordToken: string;
};

const selectStatus = (
    state: StoreType
): ResetPasswordStatus => {
    return state.password.resetPasswordStatus;
};

const ChangePassword = () => {
    // Global State
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);

    // Local State
    const [newPassword, setNewPassword] = useState("");
    const {resetPasswordToken} = useParams<URLParams>();

    // Redirect to Login Page
    if (status === "success") {
        return (<Navigate to={PATH.AUTH.LOGIN}/>);
    }

    // Events
    const onNewPasswordChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setNewPassword(e.currentTarget.value);
    };

    const onSubmit = () => {
        resetPasswordToken && newPassword &&
        dispatch(changePassword(newPassword, resetPasswordToken));
    };

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h2 className={s.logo}>it-incubator</h2>
                <h2 className={s.title}>Create New Password</h2>
                <SuperInputText
                    type="password"
                    value={newPassword}
                    onChange={onNewPasswordChange}
                />
                <SuperButton onClick={onSubmit}>
                    Change Password
                </SuperButton>
                {status === "error" && (<p className={s.error}>An Error Occurred!</p>)}
            </div>
        </div>
    );
};

export default ChangePassword;
