import React from 'react';
import Detail from './Detail';
import { Helmet } from "react-helmet";

const index = () => {
    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Flipcart | Product Detail</title>
        </Helmet>
        <Detail />
    </>
}

export default index;
