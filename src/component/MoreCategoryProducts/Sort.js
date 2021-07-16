export let LowToHigh = (inputArr, category) => {
    inputArr = inputArr.filter(item => item.parent === category);
    let len = inputArr.length - 1;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (inputArr[j].price > inputArr[j + 1].price) {
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
            }
        }
    }
    return inputArr;
};

export let HighToLow = (inputArr, category) => {
    inputArr = inputArr.filter(item => item.parent === category);
    let len = inputArr.length - 1;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (inputArr[j].price < inputArr[j + 1].price) {
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
            }
        }
    }
    return inputArr;
};

export const filterByPriceCountFuncSort = (products, state, category) => {
    products = products.filter(item => item.parent === category);
    let filter = [];
    if (state === "Below 5k") filter = products.filter(item => item.price > 0 && item.price <= 5000);
    if (state === "Upto 10k") filter = products.filter(item => item.price > 0 && item.price <= 10000);
    if (state === "Upto 20k") filter = products.filter(item => item.price > 0 && item.price <= 20000);
    if (state === "Upto 30k") filter = products.filter(item => item.price > 0 && item.price <= 30000);
    if (state === "Upto 40k") filter = products.filter(item => item.price > 0 && item.price <= 40000);
    if (state === "Upto 50k") filter = products.filter(item => item.price > 0 && item.price <= 50000);
    if (state === "50k+") filter = products.filter(item => item.price >= 50000);
    return filter;
}

export const filterProductsByBrandName = (products, name, category) => {
    products = products.filter(item => item.parent === category);
    let filter = products.filter(item => item.brand === name);
    return filter;
}