import React, { useContext } from 'react';
import "./Deal.css";
import Carousel from 'react-elastic-carousel';
import DealMapProducts from './DealMapProducts';
import { MainGlobalContext } from '../MainContext/Context';
import { useHistory } from "react-router-dom";

const SaverDeal = ({ item, products, priceCategory }) => {
    const { viewProductsFunc } = useContext(MainGlobalContext);
    const history = useHistory();

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 3 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
    ]

    return <React.Fragment>
        <div className="d-flex">
            <div className="bg-white mt-3 containerWidthFull">
                <div className="d-flex justify-content-between saver-heading">
                    <div>
                        <h2 style={{ fontWeight: "500", fontSize: "22px" }}>{item.heading}</h2>
                        <h3 style={{ fontWeight: "400", fontSize: "14px" }} className="text-muted">{item.subHeading}</h3>
                    </div>

                    <div>
                        <button className="btn btn-primary px-4" onClick={(e) => {
                            e.preventDefault();
                            localStorage.setItem('viewAllHomeProduct', JSON.stringify(products))
                            viewProductsFunc(products);
                            history.push(`/viewAllProducts?Deal=${item.heading}&Items=${products.length}&priceCategory=${priceCategory}`)
                        }}>View All</button>
                    </div>
                </div>
                <div className="py-4">
                    <Carousel breakPoints={breakPoints} pagination={false}>
                        {
                            products && products.slice(0, 7)
                                .map((value, index) => {
                                    return <DealMapProducts priceCategory={priceCategory} key={index} heading={item.heading} item={value} />
                                })
                        }
                    </Carousel>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default SaverDeal;