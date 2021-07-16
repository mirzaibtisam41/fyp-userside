import React, { useState, useContext } from 'react';
import NumberFormat from 'react-number-format';
import Paginate from "./Paginate";
import { ServerPort } from "../../Api/apiActions";
import { MainGlobalContext } from "../MainContext/Context";
import { useHistory } from "react-router-dom";
import { createObject } from "../ProductDetail/Function";

const EcommerceCards = ({ setPageCountFn, product, Deal }) => {
    const { setProductDetailFunc, user, addToWishListFunc, alertMessage, wishList } = useContext(MainGlobalContext);
    const [pageNumber, setPageNumber] = useState(1);
    const [postPerPage, setPostPerPage] = useState(12);

    const lastIndexOf = pageNumber * postPerPage;
    const firstIndexOf = lastIndexOf - postPerPage;

    let PaginateArray = product && product.slice(firstIndexOf, lastIndexOf);

    setPageCountFn(product && product.length);
    const changePage = (page) => {
        setPageNumber(page);
    }

    let history = useHistory();
    const seeProductDetail = (item) => {
        // set detail
        localStorage.setItem('productDetail', JSON.stringify(item));
        setProductDetailFunc(item);
        // set recent viewed
        let recentArray = JSON.parse(localStorage.getItem('recent'));
        if (recentArray === null) {
            let array = [];
            array.push(item);
            localStorage.setItem("recent", JSON.stringify(array));
        }
        if (recentArray !== null) {
            let find = recentArray.find(value => value._id === item._id);
            if (!find) {
                recentArray.push(item);
                localStorage.setItem("recent", JSON.stringify(recentArray));
            }
        }
        history.push(`/productDetail?Deal=${Deal}&Product=${item.name}`);
    }

    const addToWishList = (item) => {
        if (user !== null) {
            let token = JSON.parse(localStorage.getItem("token"));
            let product = createObject(item);
            addToWishListFunc({ token, product });
        }
        if (user === null) {
            alertMessage("error", "You need to login")
        }
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto py-4 px-4 border-bottom">
                <div className="flex flex-wrap -m-4">
                    {
                        PaginateArray && PaginateArray.map((item, index) => {
                            let findWishListItem = wishList && wishList.find(value => value.product.product_ID === item._id);
                            return <div key={index} className="lg:w-1/4 md:w-1/2 p-3 w-full hover:shadow-2xl product-container position-relative pt-4">
                                {!findWishListItem && <i onClick={() => addToWishList(item)} className="fa fa-heart position-absolute right-2 top-2 text-gray-400"></i>}
                                {findWishListItem && <i className="fa text-primary fa-heart position-absolute right-2 top-2 text-gray-400"></i>}
                                <a className="block relative h-48 rounded overflow-hidden mr-2">
                                    <img onClick={() => seeProductDetail(item)} alt="ecommerce" className="object-contain object-center w-full h-full block" src={`${ServerPort}${item.productPics[0].img}`} />
                                </a>
                                <div className="mt-4 data-product">
                                    <div className="d-flex review-head">
                                        <h3 className="text-gray-500 text-xs mr-3 tracking-widest title-font mb-1">{item.brand}</h3>
                                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs text-yellow-500 font-bold leading-none rounded">
                                            {item.reviews.length} Reviews
                                        </span>
                                    </div>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
                                    <div>
                                        <span className={item.active === "In Deal" ? "inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-white bg-indigo-700 rounded" : "inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-white bg-green-700 rounded"}>
                                            {item.active}
                                        </span>
                                    </div>
                                    <div style={{ overflow: "hidden", height: "28px" }} >
                                        <NumberFormat className={item.offer > 0 ? "lineover font-size mr-2" : "font-size mr-2"} value={item.price} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                                        {
                                            item.offer > 0 &&
                                            <NumberFormat value={item.price - item.offer} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                                        }
                                    </div>
                                    {item.offer > 0 && <span className="text-red-500 font-bold" style={{ fontSize: ".8rem" }}>Up to {
                                        ((item.offer / item.price) * 100).toFixed(2)
                                    }% off</span>
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="border-bottom flex justify-center pb-3">
                <Paginate products={product} changePageNumber={changePage} postPerPage={postPerPage} />
            </div>
        </section>

    )
}

export default EcommerceCards;