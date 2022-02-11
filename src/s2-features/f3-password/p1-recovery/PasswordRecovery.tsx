import React, {useState, ChangeEvent} from 'react';
import SuperInputText from "../../../s1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import { recoveryPassword, ResetPasswordStatus } from '../../../s1-main/m2-bll/password-reducer';
import { useNavigate } from 'react-router-dom';
import { StoreType } from '../../../s1-main/m2-bll/store';
import css from "../p1-recovery/PasswordRecovery.module.css";



const PasswordRecovery = () => {

    const [email, setEmail] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetPasswordStatus = useSelector<StoreType, ResetPasswordStatus>((state)=>state.password.resetPasswordStatus);


    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    };

    const sendRegistrationDataHandler = () => {
        dispatch(recoveryPassword(email, "from: VadymHromyk"))
    };

    return (
        <div className={css.loginFormWrapper}>
            <div className={css.loginFormContainer}>
            <h2>Forgot your password?</h2>
            <div>
                <SuperInputText onChange={onChangeEmailHandler}></SuperInputText>

                <div className={css.infoMessage + " " + 
                    (resetPasswordStatus === "success" ? css.succesMessage : 
                        resetPasswordStatus === "error" ? css.errorMessage : css.noMessage
                    )} >
                    <span>Instructions sent. Please, check your email</span>
                    {/* in future change text on server response message */}
                </div>
                
                <br/>
                <span>Enter your email address and we will send you further instructions</span>
            </div>
            <div>
                <SuperButton 
                        onClick={sendRegistrationDataHandler}
                        disabled={resetPasswordStatus === 'loading'}
                >
                    Send instructions
                </SuperButton>
            </div>
            <div>
                <span>Did you remember your password?</span>
                <br/>
                <SuperButton onClick={()=> navigate("/login")}>Try logginin in</SuperButton>
            </div>
        </div>
        </div>
    );
};

export default PasswordRecovery;