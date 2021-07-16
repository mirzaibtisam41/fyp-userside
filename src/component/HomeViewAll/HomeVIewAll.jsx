import React, { useContext, useState } from 'react';
import "./ViewAll.css";
import { MainGlobalContext } from "../MainContext/Context";
import NumberFormat from "react-number-format";
import queryString from "query-string";
import MapView from './MapView';
import { Helmet } from "react-helmet";

const HomeVIewAll = () => {
    const { HomeViewAll } = useContext(MainGlobalContext);
    const { Deal, Items, priceCategory } = queryString.parse(window.location.search);
    const [range, setRange] = useState(60000);

    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div className="bg-white m-2">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Flipcart | View All</title>
            </Helmet>
            <div className="py-6 flex flex-col justify-center items-center" style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }}>
                <h4 className="home-heading">{Deal}</h4>
                <p className="text-muted font-smaller">{Items} Items</p>
                {
                    priceCategory === 'false' &&
                    <>
                        <input value={range} onChange={(e) => setRange(e.target.value)} type="range" className="form-range" min="20000" max="100000" step="20000" id="customRange3"></input>
                        <NumberFormat className="font-size mt-2" value={range} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                    </>
                }
            </div>

            <section className="text-gray-600 body-font pb-2">
                <div className="px-3 w-11/12 py-4 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {
                            HomeViewAll && HomeViewAll.filter(item => {
                                if (item.offer === 0) {
                                    return item.price <= range
                                }
                                else {
                                    return (item.price - item.offer) <= range
                                }
                            })
                                .map((item, index) => {
                                    return <MapView priceCategory={priceCategory} key={index} item={item} Deal={Deal} />
                                })
                        }
                    </div>
                </div>
            </section>

        </div >
    )
}

export default HomeVIewAll;