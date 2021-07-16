export const createObject = (productDetail) => {
    let product = {
        product_ID: productDetail._id,
        img: productDetail.productPics,
        name: productDetail.name,
        actualQuantity: productDetail.quantity,
        quantity: 1,
        offer: productDetail.offer,
        price: productDetail.price
    }
    return product;
}