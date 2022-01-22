import React from 'react';
import './App.css';
import Header from "./header/Header";
import {HashRouter} from "react-router-dom";
import Main from './ main/Main';
import {Provider} from 'react-redux';
import store from "../m2-bll/store";

const App = () => {
    return (
        <div className="App">
            <HashRouter>
                {/*//hr, prov*/}
                <Provider store={store}>
                    <Header/>
                    <Main/>
                </Provider>
            </HashRouter>
        </div>
    );
}

export default App;
