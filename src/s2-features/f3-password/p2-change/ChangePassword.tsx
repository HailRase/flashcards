import SuperInputText from "../../../s1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {PATH} from "../../../s1-main/m1-ui/routes/routes";
import {changePassword, ResetPasswordStatus,} from "../../../s1-main/m2-bll/password-reducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../../s1-main/m2-bll/store";
import React, {ChangeEvent, useState} from "react";
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
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const [newPassword, setNewPassword] = useState("");
    const {resetPasswordToken} = useParams<URLParams>();

    if (status === "success") {
        return (<Navigate to={PATH.AUTH.LOGIN}/>);
    }

    const onNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.currentTarget.value);
    };

    const onSubmit = () => {
        resetPasswordToken && newPassword &&
        dispatch(changePassword(newPassword, resetPasswordToken));
    };

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <span className={s.changeTitle} style={{fontSize: '24px'}}>Flashcards</span>
                <span className={s.changeTitle}>Create new password</span>
                <div className={s.changeFields}>
                    <div className={s.changeField}>
                        <input className={s.fieldInput}
                               onChange={onNewPasswordChange}
                               placeholder={' '}/>
                        <label className={s.fieldTitle}>Password</label>
                    </div>
                    <span className={s.info}>Create new password and we will send you further instructions to email</span>
                </div>
                <button className={s.changeButton} onClick={onSubmit}>Change Password</button>
            </div>
        </div>
    );
};

export default ChangePassword;
