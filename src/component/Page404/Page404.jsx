import React from 'react';
import { Helmet } from "react-helmet";

const Page404 = () => {
    return (
        <div className="bg-white m-2 justify-content-center d-flex">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Flipcart | Page not found</title>
            </Helmet>
            <img style={{ height: "29.3rem" }} src="https://i.pinimg.com/originals/54/34/b2/5434b25d9d17889d3bc024622ece4dd0.png" alt="" />
        </div>
    )
}

export default Page404;