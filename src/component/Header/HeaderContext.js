import React, { createContext, useState, useEffect } from "react";
import { getAllMainCategoriesAPi, getAllCategoriesAPi } from "../../Api/apiActions";
import axios from "axios";

export const GlobalContext = createContext();

const HeaderContext = ({ children }) => {
    const [categoryList, setCategoryList] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        getCategories();
        getAllCategories();
    }, [])

    const getCategories = async () => {
        const { data } = await axios.get(getAllMainCategoriesAPi);
        setCategoryList(data);
    }

    const getAllCategories = async () => {
        const { data } = await axios.get(getAllCategoriesAPi);
        setAllCategories(data);
    }


    return (
        <GlobalContext.Provider value={{ categoryList, allCategories }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default HeaderContext;
