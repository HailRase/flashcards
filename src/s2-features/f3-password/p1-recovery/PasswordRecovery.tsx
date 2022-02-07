import React, {useState, ChangeEvent} from 'react';
import SuperInputText from "../../../s1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import { recoveryPassword } from '../../../s1-main/m2-bll/password-reducer';
import { useNavigate } from 'react-router-dom';



const PasswordRecovery = () => {

    const [email, setEmail] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    };

    const sendRegistrationDataHandler = () => {
        dispatch(recoveryPassword(email, "from: VadymHromyk"))
    };

    return (
        <div>
            <span>Forgot your password?</span>
            <div>
                <SuperInputText onChange={onChangeEmailHandler}></SuperInputText>
                <br/>
                <span>Enter your email address and we will send you further instructions</span>
            </div>
            <div>
                <SuperButton onClick={sendRegistrationDataHandler}>Send instructions</SuperButton>
            </div>
            <div>
                <span>Did you remember your password?</span>
                <br/>
                <SuperButton onClick={()=> navigate("/login")}>Try logginin in</SuperButton>
            </div>
        </div>
    );
};

export default PasswordRecovery;