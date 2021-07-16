import React, { useContext } from 'react';
import queryString from "query-string";
import { MainGlobalContext } from "../MainContext/Context";

const CategoryLeft = () => {
    const { category, brand } = queryString.parse(window.location.search);
    const { allProducts, filterProductsByPriceRangeFunc, priceByCount, sortByBrandNameFunc, sortByBrandName } = useContext(MainGlobalContext);
    const brandsArray = [];
    const filter = allProducts && allProducts.filter(item => item.parent === category);
    filter && filter.forEach(item => brandsArray.push(item.brand));
    const uniqueArray = new Set(brandsArray);

    return (
        <div className="category-left">
            <div className="p-2 filter-heading border-bottom">
                <span>Filters</span>
            </div>
            <section className="left-grid">
                <div className="p-2 border-bottom">
                    <span className="cate-head">Category</span>
                    <div className="flex flex-col ml-2 mt-2 cate-container">
                        <span className="py-1"><i className="fa fa-chevron-left mr-1"></i> {category}</span>
                        {/* <span className="py-1"><i className="fa fa-chevron-left mr-1"></i> {brand}</span> */}
                    </div>
                </div>
                <div className="p-2 border-bottom">
                    <span className="cate-head">Price</span>
                    <div className="d-flex flex-column mt-2 ml-3 cursor-pointer">
                        <span className={priceByCount === null && "text-blue-500"} style={{ fontSize: "smaller" }} onClick={(e) => filterProductsByPriceRangeFunc(e.target.innerText)}>All</span>
                        <span className={priceByCount === "Below 5k" && "text-blue-500"} style={{ fontSize: "smaller" }} onClick={(e) => filterProductsByPriceRangeFunc(e.target.innerText)}>Below 5k</span>
                        <span className={priceByCount === "Upto 10k" && "text-blue-500"} style={{ fontSize: "smaller" }} onClick={(e) => filterProductsByPriceRangeFunc(e.target.innerText)}>Upto 10k</span>
                        <span className={priceByCount === "Upto 20k" && "text-blue-500"} style={{ fontSize: "smaller" }} onClick={(e) => filterProductsByPriceRangeFunc(e.target.innerText)}>Upto 20k</span>
                        <span className={priceByCount === "Upto 30k" && "text-blue-500"} style={{ fontSize: "smaller" }} onClick={(e) => filterProductsByPriceRangeFunc(e.target.innerText)}>Upto 30k</span>
                        <span className={priceByCount === "Upto 40k" && "text-blue-500"} style={{ fontSize: "smaller" }} onClick={(e) => filterProductsByPriceRangeFunc(e.target.innerText)}>Upto 40k</span>
                        <span className={priceByCount === "Upto 50k" && "text-blue-500"} style={{ fontSize: "smaller" }} onClick={(e) => filterProductsByPriceRangeFunc(e.target.innerText)}>Upto 50k</span>
                        <span className={priceByCount === "50k+" && "text-blue-500"} style={{ fontSize: "smaller" }} onClick={(e) => filterProductsByPriceRangeFunc(e.target.innerText)}>50k+</span>
                    </div>
                </div>
                <div className="p-2 border-bottom">
                    <span className="cate-head">Brand</span>
                    <div className="flex flex-col ml-2 mt-2 cate-container">
                        <div className="d-flex align-items-center">
                            <input className="mr-2" checked={sortByBrandName === "All" && true}
                                onChange={(e) => {
                                    sortByBrandNameFunc(e.target.nextElementSibling.innerHTML);
                                }}
                                type="radio" name="brand" id="" />
                            <span>All</span>
                        </div>
                        {
                            uniqueArray && Array.from(uniqueArray).map((item, index) => {
                                return <span key={index} className="py-1">
                                    <input type="radio" checked={sortByBrandName === item && true} name="brand"
                                        onChange={(e) => {
                                            sortByBrandNameFunc(e.target.nextElementSibling.innerHTML);
                                        }}
                                        className="pt-1" />
                                    <span className="ml-2">{item}</span>
                                </span>
                            })
                        }
                    </div>
                </div>
                <div className="p-2 border-bottom">
                    <span className="cate-head">Customer Rating</span>
                    <div className="flex flex-col-reverse ml-2 mt-2 cate-container">
                        <span className="py-1"> <input type="radio" name="rating" className="pt-1 mr-2" />1 <i className="fa fa-star"></i> Rating</span>
                        <span className="py-1"> <input type="radio" name="rating" className="pt-1 mr-2" />2 <i className="fa fa-star"></i> Rating</span>
                        <span className="py-1"> <input type="radio" name="rating" className="pt-1 mr-2" />3 <i className="fa fa-star"></i> Rating</span>
                        <span className="py-1"> <input type="radio" name="rating" className="pt-1 mr-2" />4 <i className="fa fa-star"></i> Rating</span>
                        <span className="py-1"> <input type="radio" name="rating" className="pt-1 mr-2" />5 <i className="fa fa-star"></i> Rating</span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CategoryLeft;
