import React, { useContext } from 'react';
import NumberFormat from "react-number-format";
import { ServerPort } from "../../Api/apiActions";
import { useHistory } from "react-router-dom";
import { MainGlobalContext } from "../MainContext/Context";

const MapView = ({ item, Deal, priceCategory }) => {
    const history = useHistory();
    const { setProductDetailFunc } = useContext(MainGlobalContext);

    const moreProducts = (item) => {
        console.log(priceCategory);
        if (priceCategory === "true") {
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
        else {
            history.push(`/MoreProducts?deal=${Deal}&category=${item.parent}&product=${item.name}&brand=${item.brand}`);
        }
    }

    return (
        <div className="lg:w-1/4 md:w-1/2 sm:w-1/2 p-4 w-full flex flex-col justify-center items-center" >
            <a className="block relative h-48 rounded img-a overflow-hidden" style={{ height: "200px", width: "200px" }}>
                <img onClick={(e) => moreProducts(item)} alt="ecommerce" className="object-fill object-center w-full h-full block" src={`${ServerPort}${item.productPics[0].img}`} />
            </a>
            <div className="mt-4 text-center mb-2">
                <h3 className="text-green-700 text-xs tracking-widest title-font mb-1 font-bold">{item.brand}</h3>
                <span className={item.active === "In Deal" ? "inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-white bg-indigo-700 rounded" : "inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-white bg-green-700 rounded"}>
                    {item.active}
                </span>
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs text-yellow-500 font-bold leading-none rounded">
                    {item.reviews.length} Reviews
                                            </span>
                <div className="flex justify-center items-center">
                    <h6 className="mt-2 mx-1">{item.name}</h6>
                </div>
                <div style={{ overflow: "hidden", height: "28px", width: "200px" }} className="text-center mx-auto">
                    <NumberFormat className={item.offer > 0 ? "lineover font-size mr-2" : " font-size mr-2"} value={item.price} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                    {
                        item.offer > 0 &&
                        <NumberFormat className="font-size" value={item.price - item.offer} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                    }
                </div>
                {
                    item.offer > 0 &&
                    <span className="text-danger" style={{ fontSize: ".8rem" }}>Up to {
                        ((item.offer / item.price) * 100).toFixed(2)
                    }% off</span>
                }
            </div >
        </div>
    )
}

export default MapView;