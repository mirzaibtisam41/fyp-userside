import React, { createContext, useState, useEffect } from "react";
import { getCarouselImgAndAdds, getDealsHomePageDataApi } from "../../Api/apiActions";
import axios from "axios";

export const GlobalContext = createContext();

const HomeContext = ({ children }) => {
    const [ImagesAddsCarousel, setImagesAddsCarousel] = useState([]);
    const [DealsData, setDealsData] = useState([]);

    const getImages = async () => {
        const { data } = await axios.get(getCarouselImgAndAdds);
        setImagesAddsCarousel(data);
    }

    const getDeals = async () => {
        const { data } = await axios.get(getDealsHomePageDataApi);
        setDealsData(data);
    }

    useEffect(() => {
        getImages();
        getDeals();
    }, [])

    return (
        <GlobalContext.Provider value={{ ImagesAddsCarousel, DealsData }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default HomeContext;