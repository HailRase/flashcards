import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/routes";
import {useAppSelector} from "../../m2-bll/store";
import {useDispatch} from "react-redux";
import {logout} from "../../m2-bll/auth-reducer";

const Header = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const noLogoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className={s.headerNavigator}>
            <div className={s.headerNavigatorLeft}>
                <span className={s.logo}>Flashcards</span>
                <nav className={s.navLinks}>
                    <NavLink to={PATH.PROFILE} className={s.navLink}>Profile</NavLink>
                    <NavLink to={PATH.PACKS.APP} className={s.navLink}>Packs</NavLink>
                </nav>
            </div>
            <div className={s.headerNavigatorRight}>
                {!isAuth
                    ? <nav className={s.navLinks}>
                        <NavLink to={PATH.AUTH.LOGIN} className={s.navLink}>Sign In</NavLink>
                        <NavLink to={PATH.AUTH.REGISTER} className={s.navLink}>Join</NavLink>
                    </nav>
                    : <button onClick={noLogoutHandler} className={s.buttonLogout}>Logout</button>
                }
            </div>
        </div>
    );
};
export default Header;