import React from 'react';
import SuperInputText from "../../../s1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../../s1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";

const Login = () => {
    return (
        <div>
            <h1>LOGIN PAGE!</h1>
            <div><SuperInputText/></div>
            <div><SuperInputText/></div>
            <div><SuperCheckbox/>Remember me</div>
            <div><SuperButton
                placeholder={"Enter"}
            />Enter
            </div>
        </div>
    );
};

export default Login;