import React, { useContext } from 'react';
import EcommerceCards from './EcommerceCards';
import { useState } from 'react';
import Accordian from "./Accordian";
import queryString from "query-string";
import { MainGlobalContext } from "../MainContext/Context";
import { LowToHigh, HighToLow, filterByPriceCountFuncSort, filterProductsByBrandName } from "./Sort";

const CategoryRight = () => {
    let filter = [];
    const { allProducts, filterProductsByPriceFunc, productsFilterPrice, priceByCount, sortByBrandName } = useContext(MainGlobalContext);
    const [categoryCount, setCount] = useState(0);
    const setPageCountFn = count => setCount(count);
    const { deal, product, brand, category } = queryString.parse(window.location.search);

    filter = allProducts && allProducts.filter(item => item.parent === category);
    if (productsFilterPrice === "LowToHigh") filter = LowToHigh(allProducts, category);
    if (productsFilterPrice === "HighToLow") filter = HighToLow(allProducts, category);
    if (sortByBrandName !== "All") {
        const updatedArray = filterProductsByBrandName(allProducts, sortByBrandName, category);
        if (productsFilterPrice === "Newest") filter = updatedArray;
        if (productsFilterPrice === "LowToHigh") filter = LowToHigh(updatedArray, category);
        if (productsFilterPrice === "HighToLow") filter = HighToLow(updatedArray, category);
    }
    if (priceByCount !== null) {
        let UpdatedArray = filterByPriceCountFuncSort(allProducts, priceByCount, category);
        filter = UpdatedArray;
        if (productsFilterPrice === "LowToHigh") filter = LowToHigh(UpdatedArray, category);
        if (productsFilterPrice === "HighToLow") filter = HighToLow(UpdatedArray, category);
        if (sortByBrandName !== "All") {
            let newArray = UpdatedArray.filter(item => item.brand === sortByBrandName);
            if (productsFilterPrice === "LowToHigh") filter = LowToHigh(newArray, category);
            if (productsFilterPrice === "HighToLow") filter = HighToLow(newArray, category);
        }
    }

    return <>
        <div className="category-right">
            <div className="p-2 border-bottom-fix border-bottom bg-white">
                <div>
                    <span className="cate-head text-muted font-light ml-1 mr-1">Home <i className="fa fa-chevron-right fa-sm m-1"></i></span>
                    <span className="cate-head text-muted font-light ml-1 mr-1">{deal} <i className="fa fa-chevron-right fa-sm m-1"></i></span>
                    <span className="cate-head text-muted font-light ml-1 mr-1">{category} <i className="fa fa-chevron-right fa-sm m-1"></i></span>
                    <span className="cate-head text-muted font-light ml-1 mr-1">{product}</span>
                </div>

                <div className="pl-1 pr-3 py-1 text-justify">
                    <span className="cate-head text-muted font-light">
                        FlipKart is the right platform for you to look for a {category} that fits your budget,
                        here you can finds all the products you need according to your requirements, We have the products
                        with best quality for the customers that fulfill their needs.
                    </span>
                </div>

                <div className="py-1 px-1">
                    <span className="cate-head font-bold">{category}</span>
                    <span className="cate-head text-muted font-light ml-3">{`(Total ${categoryCount} products found)`}</span>
                </div>
                <div className="pt-1 px-1">
                    <span className="cate-head font-bold">Sort By</span>
                    <span onClick={() => { filterProductsByPriceFunc("Newest") }} className={productsFilterPrice === 'Newest' ? "cate-head font-light ml-3 cursor-pointer active" : "cate-head font-light ml-3 cursor-pointer"}>Newest First</span>
                    <span onClick={() => { filterProductsByPriceFunc("LowToHigh") }} className={productsFilterPrice === 'LowToHigh' ? "cate-head font-light ml-3 cursor-pointer active" : "cate-head font-light ml-3 cursor-pointer"}>Price -- Low to High</span>
                    <span onClick={() => { filterProductsByPriceFunc("HighToLow") }} className={productsFilterPrice === 'HighToLow' ? "cate-head font-light ml-3 cursor-pointer active" : "cate-head font-light ml-3 cursor-pointer"}>Price -- High to Low</span>
                </div>
            </div>

            <div className="bg-white">
                <EcommerceCards Deal={deal} product={filter} setPageCountFn={setPageCountFn} />
            </div>
            <Accordian />
        </div>
    </>
}

export default CategoryRight;