import React, { useContext } from 'react';
import { MainGlobalContext } from "../MainContext/Context";
import { ServerPort } from "../../Api/apiActions";
import Carousel from 'react-elastic-carousel';
import { useHistory } from "react-router-dom";
import { breakPoints } from "./Function";
import "./style.css";
import NumberFormat from "react-number-format";

const RecentlyViewed = () => {
    const { recentView, viewProductsFunc, user, addToCartFunc, cartItems, removeCartFunc, alertMessage } = useContext(MainGlobalContext);
    const heading = "Recently Viewed";
    const history = useHistory();
    let arrayID = [];
    const moreProducts = (item) => {
        history.push(`/MoreProducts?deal=${heading}&category=${item.parent}&product=${item.name}&brand=${item.brand}`);
    }
    const addToCart = (item) => {
        let token = JSON.parse(localStorage.getItem("token"));
        let product = {
            product_ID: item._id,
            img: item.productPics,
            name: item.name,
            actualQuantity: item.quantity,
            quantity: 1,
            offer: item.offer,
            price: item.price
        }
        addToCartFunc({ token, product });
    }

    return <React.Fragment>
        <div className="bg-white mt-3">
            <div className="d-flex justify-content-between saver-heading">
                <div>
                    <h2 style={{ fontWeight: "500", fontSize: "22px" }}>{heading}</h2>
                </div>

                <div>
                    {
                        recentView !== null &&
                        <button className="btn btn-primary px-4" onClick={(e) => {
                            e.preventDefault();
                            localStorage.setItem('viewAllHomeProduct', JSON.stringify(recentView))
                            viewProductsFunc(recentView);
                            history.push(`/viewAllProducts?Deal=${heading}&Items=${recentView.length}`)
                        }}>View All</button>
                    }
                </div>
            </div>
            <div className="py-4">
                {
                    recentView ?
                        <Carousel breakPoints={breakPoints} pagination={false}>
                            {
                                recentView?.map((item, index) => {
                                    return <div key={index} className="deal-image ml-4 p-1">
                                        <img onClick={(e) => moreProducts(item)} className="image-hover" src={`${ServerPort}${item.productPics[0].img}`} alt="" style={{ objectFit: "contain", height: "150px", width: "100%" }} />
                                        <div className="detail-div">
                                            <h6 className="car-head mt-2 mx-1 text-green-700">{item.brand}</h6>
                                            <span className={item.active === "In Deal" ? "inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-white bg-indigo-700 rounded" : "inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-white bg-green-700 rounded"}>
                                                {item.active}
                                            </span>
                                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs text-yellow-500 font-bold leading-none rounded">
                                                {item.reviews.length} Reviews
                                            </span>
                                            <div className="flex justify-center items-center">
                                                <h6 className="car-head mt-2 mx-1">{item.name}</h6>
                                            </div>
                                            <div style={{ overflow: "hidden", height: "28px" }} >
                                                <NumberFormat className={item.offer > 0 ? "lineover font-size mr-2" : "font-size mr-2"} value={item.price} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                                                {
                                                    item.offer > 0 &&
                                                    <NumberFormat value={item.price - item.offer} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                                                }
                                            </div>
                                            {
                                                cartItems && cartItems.map((value, index) => {
                                                    if (value.product?.product_ID === item._id) {
                                                        arrayID.push(value.product.product_ID);
                                                        return <button key={index} onClick={(e) => {
                                                            e.preventDefault();
                                                            let token = JSON.parse(localStorage.getItem("token"));
                                                            removeCartFunc({ token, cartItem: value._id });
                                                        }} className="btn btn-danger">
                                                            <i className="fa fa-shopping-cart mr-2"></i>
                                                            Remove Cart
                                                        </button>
                                                    }
                                                })
                                            }
                                            {
                                                !arrayID.includes(item._id) &&
                                                < button onClick={() => user ? addToCart(item) : alertMessage("error", "you need to login")} className="btn btn-info">
                                                    <i className="fa fa-shopping-cart mr-2"></i>
                                                    Add To Cart
                                                </button>
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </Carousel>
                        :
                        <div className="text-center text-red-500">
                            <h4>No Product in your view list...!</h4>
                        </div>
                }
            </div>
        </div>
    </React.Fragment >
}

export default RecentlyViewed;