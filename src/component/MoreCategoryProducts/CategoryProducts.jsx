import React from 'react';
import "./Category.css";
import CategoryLeft from './CategoryLeft';
import CategoryRight from "./CategoryRight";
import { Helmet } from "react-helmet";

const CategoryProducts = () => {

    return <>
        <div className="more-category-product flex">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Flipcart | More Products</title>
            </Helmet>
            <CategoryLeft />
            <CategoryRight />
        </div>
    </>
}

export default CategoryProducts;
