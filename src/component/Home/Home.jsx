import React, { useContext, useEffect } from 'react';
import HomeCarousel from "../Carousel/HomeSlider";
import SaverDeal from "../SuperSaverDeal/Deal";
import NextToSuperSaver from '../SuperSaverDeal/NextToSuperSaver';
import RecentlyViewed from '../RecentlyViwed/RecentlyViewd';
import { GlobalContext } from "../Home/HomeContext";
import { MainGlobalContext } from "../MainContext/Context";
import Aos from "aos";

const Home = () => {
    const { ImagesAddsCarousel } = useContext(GlobalContext);
    const { allProducts, addToCartFunc } = useContext(MainGlobalContext);
    const filterAdd = ImagesAddsCarousel && ImagesAddsCarousel.filter(item => item.imageFor === 'adds');
    const filterDealProducts = allProducts && allProducts.filter(value => value.active === "In Deal");
    const filterMobiles = allProducts && allProducts.filter(value => (value.parent === "Mobiles" && value.active === "Active"));
    const filterMobileAccess = allProducts && allProducts.filter(value => (value.parent === "Mobile Accessories" && value.active === "Active"));
    const filterHomeAppliances = allProducts && allProducts.filter(value => (value.parent === "Home Appliances" && value.active === "Active"));
    const filterFurniture = allProducts && allProducts.filter(value => (value.parent === "Furniture" && value.active === "Active"));

    const array = [
        { heading: 'Super Saver Deals Of The Day', subHeading: 'Deals change in Every 24 Hours' },
        { heading: 'Best Of Mobiles', subHeading: 'Buy Now' },
        { heading: 'Best Of Mobile Accessories', subHeading: 'Buy Now' },
        { heading: 'Best Of Home Appliances', subHeading: 'Buy Now' },
        { heading: 'Best Of Furniture', subHeading: 'Buy Now' }
    ];

    useEffect(() => {
        Aos.init({ duration: "2000" });
    }, [])

    return <React.Fragment>
        <div style={{ backgroundColor: "#f1f3f6", padding: "8px 8px 0px 8px" }}>
            <div><HomeCarousel /></div>

            <SaverDeal priceCategory={false} addToCartFunc={addToCartFunc} adds={filterAdd} item={array[0]} products={filterDealProducts} />
            <div data-aos="fade-up"><NextToSuperSaver adds={filterAdd} /></div>

            <SaverDeal priceCategory={false} addToCartFunc={addToCartFunc} adds={filterAdd} item={array[1]} products={filterMobiles} />

            <SaverDeal priceCategory={false} addToCartFunc={addToCartFunc} adds={filterAdd} item={array[2]} products={filterMobileAccess} />

            <SaverDeal priceCategory={false} addToCartFunc={addToCartFunc} adds={filterAdd} item={array[3]} products={filterHomeAppliances} />

            <SaverDeal priceCategory={false} addToCartFunc={addToCartFunc} adds={filterAdd} item={array[4]} products={filterFurniture} />

            <div data-aos="fade-up"><RecentlyViewed /></div>
        </div>
    </React.Fragment>
}

export default Home;
