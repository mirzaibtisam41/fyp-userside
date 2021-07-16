import React from 'react';
import Home from './Home';
import HomeContext from "./HomeContext";
import { Helmet } from "react-helmet";

const Index = () => {
    return (
        <HomeContext>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Flipcart | Home</title>
            </Helmet>
            <Home />
        </HomeContext>
    )
}

export default Index;
