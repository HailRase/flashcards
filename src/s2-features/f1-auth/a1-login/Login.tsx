import React, {ChangeEvent, useState} from 'react';
import s from "../a2-register/Register.module.css";
import SuperInputText from "../../../s1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {loginData} from "../../../s1-main/m2-bll/auth-reducer";
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
        dispatch(loginData(email, password, status))
    }
    const onClickChangeStatus = () => {
        setStatus(!status)
    }
    let navigate = useNavigate()
    const onClickForgotPassword = () => {
        navigate(PATH.PASSWORD.RECOVERY)
    }
    if (isAuthFromReducers) {
        return <Navigate to={PATH.PROFILE}/>
    }
    return (
        <div className={s.loginFormWrapper}>
            <div className={s.loginFormContainer}>
                <h2>Login</h2>
                <div>
                    <div><b>Email: </b></div>
                    <SuperInputText onChange={onChangeEmailHandler}/>
                </div>
                <div>
                    <div><b>Password: </b></div>
                    <SuperInputText type={"password"} onChange={onChanePasswordHandler}/>
                </div>
                <div><b>Remember me: </b></div>
                <div><SuperCheckbox type={"checkbox"} checked={status} onClick={onClickChangeStatus}/></div>
                <div>
                    <SuperButton onClick={onClickSendLogin}>Enter</SuperButton>
                </div>
                <div><SuperButton onClick={onClickForgotPassword}>Forgot your password</SuperButton></div>
            </div>
        </div>
    );
};

export default Login;