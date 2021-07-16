import React from 'react';
import "./App.css";
import Routes from "./component/AllRoutes/Routes";
import MainContext from './component/MainContext/Context';
import HeaderContext from "./component/Header/HeaderContext";

const App = () => {
    return <React.Fragment>
        <MainContext>
            <HeaderContext>
                <Routes />
            </HeaderContext>
        </MainContext>
    </React.Fragment>
}

export default App;