import React, {ChangeEvent, useState} from 'react';
import s from "./Login.module.css";
import SuperInputText from "../../../s1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {login} from "../../../s1-main/m2-bll/auth-reducer";
import SuperCheckbox from "../../../s1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../../s1-main/m1-ui/routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../../s1-main/m2-bll/store";

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [status, setStatus] = useState<boolean>(false)
    const dispatch = useDispatch()
    const isAuthFromReducers = useSelector<StoreType>(state => state.auth.isAuth)

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChanePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onClickSendLogin = () => {
        dispatch(login(email, password, status))
    }
    const onClickChangeStatus = () => {
        setStatus(!status)
    }
    let navigate = useNavigate()
    const onClickForgotPassword = () => {
        navigate(PATH.PASSWORD.RECOVERY)
    }
    const onSignUpHandler = () => {
        navigate(PATH.AUTH.REGISTER)
    }
    if (isAuthFromReducers) {
        return <Navigate to={PATH.PROFILE}/>
    }
    return (
        <div className={s.loginFormWrapper}>
            <div className={s.loginFormContainer}>
                <span className={s.loginTitle} style={{fontSize: '24px'}}>Flashcards</span>
                <span className={s.loginTitle}>Sign In</span>
                <div className={s.loginFields}>
                    <div className={s.loginField}>
                        <input className={s.fieldInput}
                               onChange={onChangeEmailHandler}
                               placeholder={' '}/>
                        <label className={s.fieldTitle}>Email</label>
                    </div>
                    <div className={s.loginField}>
                        <input type={"password"}
                               className={s.fieldInput}
                               onChange={onChanePasswordHandler}
                               placeholder={' '}/>
                        <label className={s.fieldTitle}>Password</label>
                    </div>
                    <div className={s.rememberMe}>
                        <span>Remember me: </span>
                        <input type="checkbox" checked={status} onClick={onClickChangeStatus}/>
                    </div>

                </div>
                <button className={s.loginButton} onClick={onClickSendLogin}>Login</button>
                <div className={s.forgot} onClick={onClickForgotPassword}>Forgot password?</div>
                <div className={s.signUp}>
                    <span className={s.signUpQuestion}>Don’t have an account?</span>
                    <span className={s.signUpButton} onClick={onSignUpHandler} >Sign Up</span>
                </div>
            </div>
        </div>
    );
};

export default Login;