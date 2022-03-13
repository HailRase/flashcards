import React, {ChangeEvent, useState} from 'react';
import SuperButton from '../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton';
import s from './Register.module.css'
import {useDispatch} from "react-redux";
import {register} from "../../../s1-main/m2-bll/auth-reducer";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChaneEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChaneRepeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.currentTarget.value)
    }
    const onClickSendRegistrationData = () => {
        dispatch(register(email, password, repeatPassword))
    }
    const onNavigateToLoginHandler = () => navigate('/login')
    return (
        <div className={s.registerFormWrapper}>
            <div className={s.registerFormContainer}>
                <span className={s.registerTitle} style={{fontSize: '24px'}}>Flashcards</span>
                <span className={s.registerTitle}>Sign Up</span>
                <div className={s.registerFields}>
                    <div className={s.registerField}>
                        <input className={s.fieldInput}
                               onChange={onChaneEmailHandler}
                               placeholder={' '}/>
                        <label className={s.fieldTitle}>Email</label>
                    </div>
                    <div className={s.registerField}>
                        <input className={s.fieldInput}
                               onChange={onChangePasswordHandler}
                               placeholder={' '}/>
                        <label className={s.fieldTitle}>Password</label>
                    </div>
                    <div className={s.registerField}>
                        <input className={s.fieldInput}
                               onChange={onChaneRepeatPasswordHandler}
                               placeholder={' '}/>
                        <label className={s.fieldTitle}>Confirm password</label>
                    </div>
                </div>
                <div className={s.groupRegisterButton}>
                    <button className={s.registerButton} onClick={onNavigateToLoginHandler}>Back</button>
                    <button className={s.registerButton} onClick={onClickSendRegistrationData}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Register;