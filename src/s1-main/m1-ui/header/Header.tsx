import React, {useState} from 'react';
import s from './Header.module.css'
import {LinkProps, NavLink, useMatch, useResolvedPath} from "react-router-dom";
import {PATH} from "../routes/routes";
import {useAppSelector} from "../../m2-bll/store";
import {useDispatch} from "react-redux";
import {logout} from "../../m2-bll/auth-reducer";
import PCards from './../../../assets/cards.svg'
import PProfile from './../../../assets/profile.svg'
import PLogout from './../../../assets/logout.svg'

const Header = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const noLogoutHandler = () => {
        dispatch(logout())
    }
    function CustomLink({ children, to, ...props }: LinkProps) {
        let resolved = useResolvedPath(to);
        let match = useMatch({ path: resolved.pathname, end: true });
        return (
                <NavLink
                    to={to}
                    className={match ? `${s.navLink} ${s.active}` : s.navLink}
                    {...props}
                >
                    {children}
                </NavLink>
        );
    }
    return (
        <div className={s.headerNavigatorContainer}>
            <div className={s.headerNavigator}>
                <span className={s.logo}>Flashcards</span>
                <div className={s.headerNavigatorLeft}>
                    <nav className={s.navLinks}>
                        <CustomLink to={PATH.PROFILE}>
                            <img className={s.image} src={PProfile} alt='cardsPic'/> Profile
                        </CustomLink>
                        <CustomLink to={PATH.PACKS.APP}>
                            <img className={s.image} src={PCards} alt='cardsPic'/>Packs
                        </CustomLink>
                    </nav>
                </div>
                <div className={s.headerNavigatorRight}>
                    {!isAuth
                        ? <nav className={s.navLinks}>
                            <CustomLink to={PATH.AUTH.LOGIN}>Sign In</CustomLink>
                            <CustomLink to={PATH.AUTH.REGISTER}>Sign Up</CustomLink>
                        </nav>
                        : <div onClick={noLogoutHandler} className={s.navLink}>
                            <img className={s.image} src={PLogout} alt="logoutPic"/> Logout
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
export default Header;