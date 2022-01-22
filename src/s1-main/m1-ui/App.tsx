import React from 'react';
import './App.css';
import Header from "./header/Header";
import {HashRouter} from "react-router-dom";
import Main from './ main/Main';

const App = () => {
    return (
        <div className="App"><HashRouter>
            {/*//hr, prov*/}
            <Header/>
            <Main/>
        </HashRouter>
        </div>
    );
}

export default App;
