import React, { useContext } from 'react';
import { MainGlobalContext } from "../MainContext/Context";
import { ServerPort } from "../../Api/apiActions";
import Avatar from 'react-avatar';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import "./style.css";
import { Helmet } from "react-helmet";

const WishList = () => {
    const history = useHistory();
    const { wishList, removewishListFunc, allProducts, setProductDetailFunc } = useContext(MainGlobalContext);
    const viewFromWishList = (id) => {
        let find = allProducts && allProducts.find(item => item._id === id);
        if (find) return seeProductDetail(find);
    }
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
        history.push(`/productDetail?Deal=WishList&Product=${item.name}`);
    }
    return (
        <div className={wishList.length > 0 ? "py-2 px-5 cart-padding" : "py-2 px-5 m-2 bg-white"} style={{ minHeight: "75vh" }}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Flipcart | Wish-List</title>
            </Helmet>
            {
                wishList && wishList.length === 0 ?
                    <div className="d-flex justify-content-center mt-24">
                        <img src="https://bollyglow.com/wp-content/themes/bollyglow/assets/images/empty_wishlist.png" alt="" />
                    </div>
                    :
                    <>
                        <h4 className="text-center py-3 bg-white">My WishList ({wishList?.length})</h4>
                        <div className="flex-1 bg-white px-4 py-3" style={{ height: "fit-content" }}>
                            {
                                wishList && wishList.map((item, index) => {
                                    return <section key={index} className="d-flex main-wishlist mb-5 align-items-center justify-content-around">
                                        <div className="d-flex justify-content-around align-items-center">
                                            <div className="d-flex align-items-center name-section">
                                                <Avatar src={`${ServerPort}${item.product?.img[0].img}`} />
                                                <div><span className="name-margin">{item.product?.name}</span></div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-center" >
                                            <NumberFormat className={item.product.offer > 0 ? "lineover font-size mr-2" : "mr-2 text-yellow-600"} value={item.product.price} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                                            {
                                                item.product.offer > 0 &&
                                                <NumberFormat className="text-yellow-600" value={item.product.price - item.product.offer} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                                            }
                                        </div>
                                        <div className="d-flex align-items-center view-div">
                                            <button onClick={(e) => viewFromWishList(item.product.product_ID)} className="btn btn-dark">View</button>
                                            <i onClick={(e) => {
                                                e.preventDefault();
                                                let token = JSON.parse(localStorage.getItem("token"));
                                                removewishListFunc({ token, cartItem: item._id })
                                            }} className="fa fa-trash-o fa-lg text-red-500 ml-5"></i>
                                        </div>
                                    </section>
                                })
                            }
                        </div>
                    </>
            }

        </div>
    )
}

export default WishList;