import React, { useContext } from 'react';
import { MainGlobalContext } from "../MainContext/Context";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from '../Home/index';
import Header from "../Header/index";
import Footer from "../Footer/Footer";
import BackToTop from '../BackToTop/BackToTop';
import HomeVIewAll from '../HomeViewAll/HomeVIewAll';
import Detail from '../ProductDetail/index';
import CategoryProducts from '../MoreCategoryProducts/CategoryProducts';
import Cart from '../CartPage/index';
import Loader from "../Loader/Loader";
import Signup from "../Signup/Signup";
import Login from '../Login/Login';
import Alert from '../Alert/Alert';
import Page404 from '../Page404/Page404';
import PriceWiseProducts from '../PriceVWiseProducts/PriceWiseProducts';
import WishList from '../WishList/WishList';
import Orders from "../MyOrders/Orders";

const Routes = () => {
    const { Loading } = useContext(MainGlobalContext);
    return <BrowserRouter>
        {
            Loading ? <Loader /> :
                <>
                    <BackToTop />
                    <Navbar />
                    <Header />
                    <Alert />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/viewAllProducts" component={HomeVIewAll} />
                        <Route path="/MoreProducts" component={CategoryProducts} />
                        <Route path="/productDetail" component={Detail} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/category" component={PriceWiseProducts} />
                        <Route path="/wishlist" component={WishList} />
                        <Route path="/myorders" component={Orders} />
                        <Route component={Page404} />
                    </Switch>
                    <Footer />
                </>
        }
    </BrowserRouter>
}

export default Routes;