import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {PATH} from "../routes/routes";
import Test from "../../../s2-features/f0-test/Test";
import Profile from "../../../s2-features/f2-profile/Profile";
import Login from "../../../s2-features/f1-auth/a1-login/Login";
import Register from '../../../s2-features/f1-auth/a2-register/Register';
import PasswordRecovery from "../../../s2-features/f3-password/p1-recovery/PasswordRecovery";
import ChangePassword from "../../../s2-features/f3-password/p2-change/ChangePassword";
import E404 from "../../../s2-features/f4-E404/E404";

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to={PATH.TEST}/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.AUTH.LOGIN} element={<Login/>}/>
                <Route path={PATH.AUTH.REGISTER} element={<Register/>}/>
                <Route path={PATH.PASSWORD.RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.PASSWORD.CHANGE} element={<ChangePassword/>}/>
                <Route path={PATH.E404} element={<E404/>}/>

            </Routes>
        </div>
    );
};

export default Main;