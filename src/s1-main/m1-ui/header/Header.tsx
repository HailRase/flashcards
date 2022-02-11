import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/routes";
import SuperInputText from '../common/c1-SuperInputText/SuperInputText';
import SuperButton from "../common/c2-SuperButton/SuperButton";

const Header = () => {
    return (
        <div className={s.headerNavigator}>
            <div className={s.headerNavigatorLeft}>
                <span className={s.logo}>Flashcards</span>
                <nav className={s.navLinks}>
                    <NavLink to={PATH.PROFILE} className={s.navLink}>Profile</NavLink>
                    <NavLink to={PATH.TEST} className={s.navLink}>Test</NavLink>
                    <NavLink to={PATH.E404} className={s.navLink}>E404</NavLink>
                </nav>
            </div>
            <div className={s.headerNavigatorRight}>
                <div className={s.searchBlock}>
                    <SuperInputText type={"search"} style={{width: '50%', height: '80%'}}
                                    placeholder={'Enter request...'}/>
                    <SuperButton>Search</SuperButton>
                </div>
                <nav className={s.navLinks}>
                    <NavLink to={PATH.AUTH.LOGIN} className={s.navLink}>Login</NavLink>
                    <NavLink to={PATH.AUTH.REGISTER} className={s.navLink}>Register</NavLink>
                    <NavLink to={PATH.PASSWORD.RECOVERY} className={s.navLink}>Password recovery</NavLink>
                    <NavLink to={PATH.PASSWORD.CHANGE} className={s.navLink}>Change password</NavLink>
                </nav>
            </div>
        </div>
    );
};
//sdfsdfgsdfg
export default Header;