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
                </nav>
            </div>
            <div className={s.headerNavigatorRight}>
                <nav className={s.navLinks}>
                    <NavLink to={PATH.AUTH.LOGIN} className={s.navLink}>Sign In</NavLink>
                    <NavLink to={PATH.AUTH.REGISTER} className={s.navLink}>Join</NavLink>
                </nav>
            </div>
        </div>
    );
};
//sdfsdfgsdfg
export default Header;