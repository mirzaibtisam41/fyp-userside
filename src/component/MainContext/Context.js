import React, { createContext, useState, useEffect } from "react";
import { changeOrderStatusAPi, cancelOrderApi, getOrderByUserApi, createOrderApi, createPaymentApi, wishListAddApi, getAllwishListApi, wishListRemoveApi, getAllProductAPi, SignUpUserApi, postReviewApi, addToCartApi, AuthUserApi, SignInUserApi, getAllCartItemsApi, removeToCartApi, updateCartQuantityApi } from "../../Api/apiActions";
import axios from "axios";

export const MainGlobalContext = createContext();

const MainContext = ({ children }) => {
    const viewProducts = JSON.parse(localStorage.getItem('viewAllHomeProduct'));
    const detail = JSON.parse(localStorage.getItem('productDetail'));
    const recentProducts = JSON.parse(localStorage.getItem("recent"));

    const [HomeViewAll, setViewAll] = useState(viewProducts && viewProducts);
    const [productDetail, setDetail] = useState(detail && detail);
    const [user, setUser] = useState(null);
    const [allProducts, setAllProducts] = useState();
    const [open, setOpen] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [productsFilterPrice, setFilterPrice] = useState("Newest");
    const [priceByCount, setPriceByCount] = useState(null);
    const [recentView, setRecentView] = useState(recentProducts && recentProducts);
    const [sortByBrandName, setBrandNameSort] = useState("All");
    const [alert, setAlert] = useState(null);
    const [wishList, setWishList] = useState([]);
    const [orders, setOrders] = useState([]);
    const [filterOrder, setFilterOrder] = useState('All');

    useEffect(() => {
        getAllProductsFunc();
        getUserOnRefresh();
        getCartItemsFunc();
        getWishListFunc();
        getOrdersByUserFunc();
    }, [])

    // get user with token on refresh====================================
    const getUserOnRefresh = async () => {
        const { data } = await axios.post(AuthUserApi, {
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            }
        });
        if (data.msg) {
            alertMessage("error", `Your Session has been expired ${data.msg}`);
        }
        if (data.user) {
            setUser(data.user);
        }
    }

    // orders functionality =====================================
    const getOrdersByUserFunc = async () => {
        let token = JSON.parse(localStorage.getItem('token'));
        const { data } = await axios.post(getOrderByUserApi, { token });
        if (data) return setOrders(data);
    }

    const cancelOrderFunc = async (id) => {
        let token = JSON.parse(localStorage.getItem('token'));
        const { data } = await axios.post(cancelOrderApi, { token, id });
        if (data) {
            setOrders(data);
            alertMessage("success", "Order cancel successfully")
        }
    }

    const chageOrderStatus = async (id, status) => {
        const { data } = await axios.post(changeOrderStatusAPi, { id, status });
        if (data) {
            alertMessage('success', "Thanks for you information");
            return setOrders(data);
        }
    }

    // cart functionality================================================
    const getCartItemsFunc = async () => {
        const { data } = await axios.post(getAllCartItemsApi, {
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            }
        });
        if (data.message) {
            alertMessage("error", data.message);
        }
        if (data.user) {
            setCartItems(data.cartItems);
        }
    }

    const addToCartFunc = async (object) => {
        const { data } = await axios.post(addToCartApi, object);
        if (data.user) {
            setCartItems(data.cartItems);
            alertMessage("success", "Added to cart");
        }
        else {
            alertMessage("error", "Something went wrong");
        }
    }

    const removeCartFunc = async (item) => {
        const { data } = await axios.post(removeToCartApi, item);
        if (data.user) {
            setCartItems(data.cartItems);
            alertMessage("success", "Removed successfully");
        }
        else {
            alertMessage("error", "Something went wrong");
        }
    }

    const updateCartFunc = async (detail) => {
        startLoading();
        const { data } = await axios.post(updateCartQuantityApi, detail);
        if (data) {
            setTimeout(() => {
                setCartItems(data.cartItems);
                stopLoading();
            }, 1000);
        }
    }
    // wishlist functionality===================================
    const addToWishListFunc = async (object) => {
        const { data } = await axios.post(wishListAddApi, object);
        if (data.user) {
            setWishList(data.cartItems);
            alertMessage("success", "Added to wishlist");
        }
        else {
            alertMessage("error", "Something went wrong");
        }
    }

    const removewishListFunc = async (item) => {
        const { data } = await axios.post(wishListRemoveApi, item);
        if (data.user) {
            setWishList(data.cartItems);
            alertMessage("success", "Removed successfully");
        }
        else {
            alertMessage("error", "Something went wrong");
        }
    }

    const getWishListFunc = async () => {
        const { data } = await axios.post(getAllwishListApi, {
            headers: {
                token: JSON.parse(localStorage.getItem("token"))
            }
        });
        if (data.message) {
            alertMessage("error", data.message);
        }
        if (data.user) {
            setWishList(data.cartItems);
        }
    }

    // alert messages===========================================
    const alertMessage = (t, m) => {
        let obj = { type: t, message: m };
        setAlert(obj);
        removeAlert();
    }

    //get all available products =====================================================================
    const getAllProductsFunc = async () => {
        startLoading();
        const { data } = await axios.get(getAllProductAPi);
        if (data) {
            stopLoading();
            return setAllProducts(data);
        }
    }

    //view all product on user side =====================================================================
    const viewProductsFunc = (products) => {
        setViewAll(products);
    }

    //add product detail for detail page =====================================================================
    const setProductDetailFunc = (item) => {
        setDetail(item);
    }

    // open modal=================================================
    const handleClose = () => {
        setOpen(false);
    };

    const setModalShowFunc = (value) => {
        setModalShow(value);
    }
    // rating to products  =====================================================================
    const giveRatingToProduct = async (object) => {
        const { data } = await axios.post(postReviewApi, object);
        if (data.error) return alertMessage("error", data.error);
        localStorage.setItem('productDetail', JSON.stringify(data));
        setDetail(JSON.parse(localStorage.getItem('productDetail')));
    }

    // loading functions=================================================
    const startLoading = () => {
        setLoading(true);
    }

    const stopLoading = () => {
        setLoading(false);
    }

    // more products filter methods======================================
    const filterProductsByPriceFunc = (price) => {
        startLoading();
        setTimeout(() => {
            stopLoading();
            setFilterPrice(price);
        }, 1000);
    }

    const filterProductsByPriceRangeFunc = (price) => {
        startLoading();
        setTimeout(() => {
            if (price === "All") {
                stopLoading();
                setFilterPrice("Newest");
                setPriceByCount(null);
                setBrandNameSort("All");
            }
            else {
                stopLoading();
                setPriceByCount(price);
            }
        }, 1000);
    }

    const sortByBrandNameFunc = (name) => {
        startLoading();
        setTimeout(() => {
            if (name === "All") {
                stopLoading();
                setFilterPrice("Newest");
                setPriceByCount(null);
                setBrandNameSort("All");
            }
            else {
                stopLoading();
                setBrandNameSort(name);
            }
        }, 1000);
    }

    // remove alert message box==============================
    const removeAlert = () => {
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    // signup functionality==================================
    const signUpUserFunc = async (user) => {
        const { data } = await axios.post(SignUpUserApi, user);
        if (data.errors) {
            alertMessage("error", data.errors[0].msg);
        }
        if (data.user) {
            alertMessage("success", "Registed Successfully Done");
            localStorage.setItem("token", JSON.stringify(data.token));
            setUser(data.user);
            let URL = JSON.parse(localStorage.getItem("URL"));
            window.location.href = URL
        }
    }

    // login functionality==============================================
    const SignInUserApiFunc = async (user) => {
        const { data } = await axios.post(SignInUserApi, user);
        if (data.message) {
            alertMessage("error", data.message);
        }
        if (data.user) {
            alertMessage("success", "Login Successfully Done");
            localStorage.setItem("token", JSON.stringify(data.token));
            setUser(data.user);
            getCartItemsFunc();
            let URL = JSON.parse(localStorage.getItem("URL"));
            window.location.href = URL
        }
    }

    // payment functionality=============================================
    const createPayment = async (product, token, amount) => {
        const { data } = await axios.post(createPaymentApi, { product, token });
        if (data.status === "error") {
            return alertMessage("error", "Something went wrong");
        }
        if (data.status === "success") {
            let userToken = JSON.parse(localStorage.getItem('token'));
            const res = await axios.post(createOrderApi, { token: userToken, total: amount, charge: data.charge });
            if (res.data) {
                setCartItems([]);
                setOrders(data);
                alertMessage("success", "Payment Successfully Done");
                return window.location.href = "http://localhost:3000/myorders";
            }
        }
    }

    return <>
        <MainGlobalContext.Provider value={
            {
                HomeViewAll, recentView, productDetail, allProducts, open, user, modalShow, cartItems,
                Loading, productsFilterPrice, priceByCount, sortByBrandName, alert, wishList, orders,
                viewProductsFunc, setProductDetailFunc, handleClose, updateCartFunc, filterOrder,
                filterProductsByPriceRangeFunc, signUpUserFunc, SignInUserApiFunc, setFilterOrder,
                giveRatingToProduct, setModalShowFunc, addToCartFunc, getAllProductsFunc,
                filterProductsByPriceFunc, sortByBrandNameFunc, removeCartFunc, alertMessage,
                addToWishListFunc, removewishListFunc, createPayment, cancelOrderFunc, chageOrderStatus
            }
        }
        >
            {children}
        </MainGlobalContext.Provider>
    </>
}

export default MainContext;