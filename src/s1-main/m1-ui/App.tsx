import React, {useEffect} from 'react';
import './App.css';
import Header from "./header/Header";
import {HashRouter} from "react-router-dom";
import Main from './ main/Main';
import {Provider, useDispatch} from 'react-redux';
import store, {useAppSelector} from "../m2-bll/store";
import {initializeApp} from "../m2-bll/app-reducer";
import Preloader from "./common/Preloader/Preloader";

const App = () => {
    const initialized = useAppSelector(state => state.app.initialized)
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(initializeApp())
    }, [])

    if (!initialized){
        return <Preloader/>
    }
    return (
        <div className="App">
            <Header/>
            <Main/>
        </div>
    );
}

const Flashcards = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    )
}

export default Flashcards;
