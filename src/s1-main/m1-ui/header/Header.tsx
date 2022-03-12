import React, {useEffect, useState} from 'react';
import s from './Header.module.css'
import {LinkProps, NavLink, useMatch, useResolvedPath} from "react-router-dom";
import {PATH} from "../routes/routes";
import {useAppSelector} from "../../m2-bll/store";
import {useDispatch} from "react-redux";
import {logout} from "../../m2-bll/auth-reducer";
import PCards from './../../../assets/cards.svg'
import PProfile from './../../../assets/profile.svg'
import PLogout from './../../../assets/logout.svg'
import PMenu from './../../../assets/menu.svg'
import PSignIn from './../../../assets/signin.svg'
import PSignUp from './../../../assets/signup.svg'


const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const changeWidth = () => {
        setScreenWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', changeWidth)
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])

    const noLogoutHandler = () => {
        dispatch(logout())
    }
    const onToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }
    const onCloseMenu = () => {
        setToggleMenu(false)
    }

    function CustomLink({children, to, ...props}: LinkProps) {
        let resolved = useResolvedPath(to);
        let match = useMatch({path: resolved.pathname, end: true});
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
                {(toggleMenu || screenWidth > 510) &&
                    <div className={s.headerNavigatorPosition}>
                        <nav className={s.navLinks}>
                            <CustomLink to={PATH.PROFILE} onClick={onCloseMenu}>
                                <img className={s.image} src={PProfile} alt='cardsPic'/> Profile
                            </CustomLink>
                            <CustomLink to={PATH.PACKS.APP} onClick={onCloseMenu}>
                                <img className={s.image} src={PCards} alt='cardsPic'/>Packs
                            </CustomLink>
                        </nav>
                    </div>}
                {(toggleMenu || screenWidth > 510) &&
                    <div className={s.headerNavigatorPosition}>
                        {!isAuth
                            ? <nav className={s.navLinks}>
                                <CustomLink to={PATH.AUTH.LOGIN} onClick={onCloseMenu}>
                                    <img className={s.image} src={PSignIn} alt='cardsPic'/> Sign In
                                </CustomLink >
                                <CustomLink to={PATH.AUTH.REGISTER} onClick={onCloseMenu}>
                                    <img className={s.image} src={PSignUp} alt='cardsPic'/> Sign Up
                                </CustomLink>
                            </nav>
                            : <div onClick={noLogoutHandler} className={s.navLink}>
                                <img className={s.image} src={PLogout} alt="logoutPic"/> Logout
                            </div>
                        }
                    </div>}
                <div className={s.sideBarButton}
                     onClick={onToggleMenu}>
                    <img src={PMenu} alt="menuPic"/>
                </div>
               {(toggleMenu && screenWidth < 510) && <div className={s.backBlurBlock}></div>}
            </div>
        </div>
    );
};
export default Header;