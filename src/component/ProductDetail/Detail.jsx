import React, { useContext, useState, Fragment } from 'react';
import { ServerPort } from "../../Api/apiActions";
import { MainGlobalContext } from "../MainContext/Context";
import queryString from "query-string";
import NumberFormat from "react-number-format";
import Avatar from "react-avatar";
import ReactImageMagnify from 'react-image-magnify';
import "./Detail.css";
import Reviews from './Reviews';
import SimallarProducts from './SimallarProducts';
import { Redirect } from "react-router-dom";
import { createObject } from "./Function";

const Detail = () => {
    const array = [1, 2, 3, 4, 5];
    const [showImg, setImage] = useState(0);
    const { productDetail, user, addToCartFunc, cartItems, removeCartFunc, alertMessage, addToWishListFunc, removewishListFunc, wishList } = useContext(MainGlobalContext);
    const { Deal, Product } = queryString.parse(window.location.search);
    let findItem = cartItems && cartItems.find(item => item.product.product_ID === productDetail._id);
    let findWishListItem = wishList && wishList.find(item => item.product.product_ID === productDetail._id);

    const addTocart = () => {
        if (user !== null) {
            let token = JSON.parse(localStorage.getItem("token"));
            let product = createObject(productDetail);
            addToCartFunc({ token, product });
        }
        if (user === null) {
            alertMessage("error", "You need to login")
        }
    }

    const addToWishList = () => {
        if (user !== null) {
            let token = JSON.parse(localStorage.getItem("token"));
            let product = createObject(productDetail);
            addToWishListFunc({ token, product });
        }
        if (user === null) {
            alertMessage("error", "You need to login")
        }
    }

    return <Fragment>
        {productDetail === null && <Redirect to="/" />}
        <section className="text-gray-600 bg-white mt-2 mx-2 body-font overflow-hidden">
            <div className="text-center py-3">
                <span className="cate-head text-muted font-light ml-1 mr-1">Home <i className="fa fa-chevron-right fa-sm m-1"></i></span>
                <span className="cate-head text-muted font-light ml-1 mr-1">{Deal}<i className="fa fa-chevron-right fa-sm m-1"></i></span>
                <span className="cate-head text-muted font-light ml-1 mr-1">{productDetail && productDetail.parent} <i className="fa fa-chevron-right fa-sm m-1"></i></span>
                <span className="cate-head text-muted font-light ml-1 mr-1">{Product}</span>
            </div>
            <div className="container py-8 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div style={{ width: "50%" }}>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: productDetail && `${ServerPort}${productDetail.productPics[showImg].img}`
                            },
                            largeImage: {
                                src: productDetail && `${ServerPort}${productDetail.productPics[showImg].img}`,
                                width: 1200,
                                height: 1800
                            }
                        }} />
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:pb-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{productDetail && productDetail.brand}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productDetail && productDetail.name}</h1>
                        <p className="text-red-500 mt-3">{productDetail && productDetail.quantity > 0 ? "In Stock" : "Out of stock"}</p>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {
                                    array && array.map((item, index) => {
                                        return <svg key={index} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    })
                                }
                                <span className="text-gray-600 ml-3">{productDetail && productDetail.reviews.length} Reviews</span>
                            </span>
                        </div>
                        <p className="leading-relaxed text-justify">{productDetail && productDetail.description}</p>
                        <div className=" mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            {
                                productDetail && productDetail.offer > 0 &&
                                <div className="flex items-center mb-3">
                                    <NumberFormat className="lineover mr-2" value={productDetail.price} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                                    <span className="text-danger">Up to {
                                        ((productDetail.offer / productDetail.price) * 100).toFixed(2)
                                    }% off</span><br />
                                </div>
                            }
                            <div className="flex justify-around flex-wrap">
                                {
                                    productDetail && productDetail.productPics
                                        .map((item, index) => {
                                            return <Avatar key={index} onClick={(e) => setImage(index)} className="hover:opacity-75" src={`${ServerPort}${item.img}`} />
                                        })
                                }
                            </div>
                        </div>
                        <div className="flex align-items-center price-div-detail justify-content-between">
                            <span className="title-font font-medium text-2xl text-gray-900">
                                <NumberFormat value={productDetail && productDetail.price - productDetail.offer} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                            </span>
                            <div className="d-flex align-items-center btn-cart-and-wish">
                                {
                                    !findItem &&
                                    <button onClick={addTocart} className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-400 rounded">
                                        <i className="fa fa-shopping-cart mt-1 mr-2"></i>
                                        Add To Cart
                                    </button>
                                }
                                {
                                    findItem &&
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        let token = JSON.parse(localStorage.getItem("token"));
                                        removeCartFunc({ token, cartItem: findItem._id });
                                    }} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-400 rounded">
                                        <i className="fa fa-shopping-cart mt-1 mr-2"></i>
                                        Remove Cart
                                    </button>
                                }
                                {!findWishListItem && <i onClick={addToWishList} className="fa fa-heart fa-lg ml-4"></i>}
                                {
                                    findWishListItem &&
                                    <i onClick={(e) => {
                                        e.preventDefault();
                                        let token = JSON.parse(localStorage.getItem("token"));
                                        removewishListFunc({ token, cartItem: findWishListItem._id });
                                    }} className="fa fa-heart text-primary fa-lg ml-4" ></i>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Reviews product={productDetail && productDetail} />
        <SimallarProducts product={productDetail && productDetail} />
    </Fragment>
}

export default Detail;