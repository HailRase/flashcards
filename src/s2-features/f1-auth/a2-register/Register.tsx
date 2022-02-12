import React, {ChangeEvent, useState} from 'react';
import SuperInputText from "../../../s1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from '../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton';
import s from './Register.module.css'
import {useDispatch} from "react-redux";
import {register} from "../../../s1-main/m2-bll/auth-reducer";

const Register = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")

    const dispatch = useDispatch()

    const onChaneEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChanePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChaneRepeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.currentTarget.value)
    }
    const onClickSendRegistrationData = () => {
        dispatch(register(email, password, repeatPassword))
    }

    return (
        <div className={s.registerFormWrapper}>
            <div className={s.registerFormContainer}>
                <h2>Registration</h2>
                <div>
                    <div><b>Email: </b></div>
                    <SuperInputText onChange={onChaneEmailHandler}/>
                </div>
                <div>
                    <div><b>Password: </b></div>
                    <SuperInputText type={"password"} onChange={onChanePasswordHandler}/>
                </div>
                <div>
                    <div><b>Repeat password: </b></div>
                    <SuperInputText type={"password"} onChange={onChaneRepeatPasswordHandler}/>
                </div>
                <SuperButton onClick={onClickSendRegistrationData}>OK</SuperButton>
            </div>
        </div>
    );
};

export default Register;