import React, { useContext } from 'react';
import Carousel from 'react-elastic-carousel';
import { MainGlobalContext } from "../MainContext/Context";
import NumberFormat from "react-number-format";
import { ServerPort } from "../../Api/apiActions";
import { useHistory } from "react-router-dom";
import queryString from "query-string";


const SimallarProducts = ({ product }) => {
    const { allProducts, setProductDetailFunc } = useContext(MainGlobalContext);
    const { Deal } = queryString.parse(window.location.search);
    const history = useHistory();

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
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
    ]

    return (
        <div className="bg-white my-2 mx-2">
            <h3 className="py-3 mx-3" style={{ borderBottom: "1px solid #dee2e6" }}>Simillar Products</h3>
            <Carousel breakPoints={breakPoints} pagination={false}>
                {
                    allProducts && allProducts.map((item, index) => {
                        if (item._id !== product._id && product.parent === item.parent) {
                            return <div key={index} className="deal-image my-3">
                                <img onClick={(e) => seeProductDetail(item)} className="image-hover" src={`${ServerPort}${item.productPics[0].img}`} alt="" style={{ objectFit: "contain", height: "150px", width: "100%" }} />
                                <div className="detail-div">
                                    <div className="d-flex justify-content-center">
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
                                    <div className="mt-2 font-bold" style={{ overflow: "hidden", height: "28px" }} >
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
                        }
                    })
                }
            </Carousel>
        </div >
    )
}

export default SimallarProducts;