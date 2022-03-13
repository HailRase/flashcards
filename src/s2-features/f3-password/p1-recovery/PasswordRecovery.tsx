import React, {ChangeEvent, useState} from 'react';
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {recoveryPassword, ResetPasswordStatus} from '../../../s1-main/m2-bll/password-reducer';
import {useNavigate} from 'react-router-dom';
import {StoreType} from '../../../s1-main/m2-bll/store';
import s from "./PasswordRecovery.module.css";


const PasswordRecovery = () => {

    const [email, setEmail] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetPasswordStatus = useSelector<StoreType, ResetPasswordStatus>((state) => state.password.resetPasswordStatus);


    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    };
    const sendRegistrationDataHandler = () => {
        dispatch(recoveryPassword(email, "from: VadymHromyk"))
    };
    const onLoginHandler = () => navigate("/login")
    return (
        <div className={s.recoveryFormWrapper}>
            <div className={s.recoveryFormContainer}>
                <span className={s.recoveryTitle} style={{fontSize: '24px'}}>Flashcards</span>
                <span className={s.recoveryTitle}>Forgot your password?</span>
                <div className={s.recoveryFields}>
                    <div className={s.recoveryField}>
                        <input className={s.fieldInput}
                               onChange={onChangeEmailHandler}
                               placeholder={' '}/>
                        <label className={s.fieldTitle}>Email</label>
                    </div>
                    <span className={s.info}>Enter your email address and we will send you further instructions</span>
                </div>
                <button className={s.recoveryButton} onClick={sendRegistrationDataHandler}>Send instruction</button>
                <div className={s.rememberPassword}>
                    <span className={s.rememberPasswordQuestion}>Did you remember your password?</span>
                    <span className={s.rememberPasswordButton} onClick={onLoginHandler}>Try logging in</span>
                </div>
            </div>
        </div>
    );
};

export default PasswordRecovery;