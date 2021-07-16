import React, { useContext } from 'react';
import NumberFormat from "react-number-format";
import { ServerPort } from "../../Api/apiActions";
import { useHistory } from "react-router-dom";
import { MainGlobalContext } from "../MainContext/Context";

const DealMapProducts = ({ item, heading, priceCategory }) => {
    const history = useHistory();
    const { setProductDetailFunc } = useContext(MainGlobalContext);

    const moreProducts = (item, heading) => {
        if (priceCategory === true) {
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
            history.push(`/productDetail?Deal=${heading}&Product=${item.name}`);
        }
        else {
            history.push(`/MoreProducts?deal=${heading}&category=${item.parent}&product=${item.name}&brand=${item.brand}`);
        }
    }

    return (
        <div className="deal-image ml-4 p-1">
            <img onClick={(e) => moreProducts(item, heading)} className="image-hover" src={`${ServerPort}${item.productPics[0].img}`} alt="" style={{ objectFit: "contain", height: "150px", width: "100%" }} />
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
                {item.offer > 0 && <span className="text-red-500 font-bold" style={{ fontSize: ".8rem" }}>Up to {
                    ((item.offer / item.price) * 100).toFixed(2)
                }% off</span>
                }
            </div>
        </div>
    )
}

export default DealMapProducts;
