import {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {useAppSelector} from "../m2-bll/store";
import {initializeApp} from "../m2-bll/app-reducer";

import {PATH} from './routes/routes';

import Preloader from "./common/Preloader/Preloader";
import Header from "./header/Header";
import Test from '../../s2-features/f0-test/Test';
import Profile from '../../s2-features/f2-profile/Profile';
import Login from '../../s2-features/f1-auth/a1-login/Login';
import Register from '../../s2-features/f1-auth/a2-register/Register';
import PasswordRecovery from '../../s2-features/f3-password/p1-recovery/PasswordRecovery';
import ChangePassword from '../../s2-features/f3-password/p2-change/ChangePassword';
import E404 from '../../s2-features/f4-E404/E404';
import Packs from '../../s2-features/f5-packs/Packs';
import Cards from "../../s2-features/f6-cards/Cards";
import EditProfile from "../../s2-features/f2-profile/EditProfile";
import LearnPage from "../../s2-features/f6-cards/c3-learn-page/LearnPage";
import PackEditor from "../../s2-features/f5-packs/p4-pack-editor/PackEditor";
import CardEditor from "../../s2-features/f6-cards/c4-card-editor/CardEditor";

const App = () => {
    const initialized = useAppSelector(state => state.app.initialized)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <div className="App">
            {isAuth && <Header/>}
            <Routes>
                <Route path='/' element={<Navigate to={PATH.PROFILE}/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PACKS.APP} element={<Packs/>}/>
                <Route path={PATH.PACKS.LEARN} element={<LearnPage/>}/>
                <Route path={PATH.CARDS} element={<Cards/>}/>
                <Route path={PATH.AUTH.LOGIN} element={<Login/>}/>
                <Route path={PATH.AUTH.REGISTER} element={<Register/>}/>
                <Route path={PATH.PASSWORD.RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.PASSWORD.CHANGE} element={<ChangePassword/>}/>
                <Route path={PATH.E404} element={<E404/>}/>
                <Route path={PATH.EDIT.PROFILE} element={<EditProfile/>}/>
                <Route path={PATH.EDIT.PACK} element={<PackEditor/>}/>
                <Route path={PATH.EDIT.CARD} element={<CardEditor/>}/>
            </Routes>
        </div>
    );
}

export default App;
