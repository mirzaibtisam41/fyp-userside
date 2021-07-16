import React, { useContext } from 'react';
import { MainGlobalContext } from "../MainContext/Context";
import SaverDeal from '../SuperSaverDeal/Deal';
import queryString from "query-string";
import { getCategories } from "./Func";
import millify from "millify";
import RecentlyViewed from "../RecentlyViwed/RecentlyViewd";
import { Helmet } from "react-helmet";

const PriceWiseProducts = () => {
    const { allProducts } = useContext(MainGlobalContext);
    const { slug } = queryString.parse(window.location.search);
    const filterProducts = allProducts && allProducts.filter(item => (item.parent === slug && item.active !== "In Deal"));
    const allCategories = getCategories(slug);
    const array = [
        { heading: `${slug} Below ${millify(allCategories.category1.max)}`, subHeading: 'Buy Now' },
        { heading: `${slug} From ${millify(allCategories.category2.min)} -  ${millify(allCategories.category2.max)}`, subHeading: 'Buy Now' },
        { heading: `${slug} From ${millify(allCategories.category3.min)} -  ${millify(allCategories.category3.max)}`, subHeading: 'Buy Now' },
        { heading: `${slug} Above ${millify(allCategories.category4.min)}`, subHeading: 'Buy Now' },
    ];
    const first = filterProducts && filterProducts.filter(item => item.price <= allCategories.category1.max);
    const second = filterProducts && filterProducts.filter(item => (item.price > allCategories.category2.min && item.price <= allCategories.category2.max));
    const third = filterProducts && filterProducts.filter(item => (item.price > allCategories.category3.min && item.price <= allCategories.category3.max));
    const fourth = filterProducts && filterProducts.filter(item => item.price > allCategories.category4.min);

    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Flipcart | Price Category</title>
        </Helmet>
        <div className="my-20 m-2 bg-white">
            <SaverDeal item={array[0]} products={first} priceCategory={true} />
        </div>
        <div className="my-20 m-2 bg-white">
            <SaverDeal item={array[1]} products={second} priceCategory={true} />
        </div>
        <div className="my-20 m-2 bg-white">
            <SaverDeal item={array[2]} products={third} priceCategory={true} />
        </div>
        <div className="my-20 m-2 bg-white">
            <SaverDeal item={array[3]} products={fourth} priceCategory={true} />
        </div>
        <div className="my-20 m-2 bg-white">
            <RecentlyViewed />
        </div>
    </>
}

export default PriceWiseProducts;