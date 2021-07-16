import React, { useContext } from 'react';
import Cart from './Cart';
import { MainGlobalContext } from "../MainContext/Context";
import { Helmet } from "react-helmet";

const Index = () => {
    const { cartItems } = useContext(MainGlobalContext);
    let bill = 0;
    let discount = 0;
    cartItems && cartItems.forEach(item => {
        let offer = item.product?.offer;
        let price = item.product?.price;
        discount = discount + (offer * item.product?.quantity);
        bill = bill + (item.product?.quantity * price);
    });
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Flipcart | My-Cart</title>
            </Helmet>
            <Cart state={cartItems} bill={bill} discount={discount} />
        </div>
    )
}

export default Index;