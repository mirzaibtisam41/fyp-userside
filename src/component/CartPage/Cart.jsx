import React, { useContext, useState } from 'react';
import { ServerPort } from "../../Api/apiActions";
import Avatar from "react-avatar";
import { MainGlobalContext } from "../MainContext/Context";
import "./style.css";
import Payment from "./Payment";

const Cart = ({ state, bill, discount }) => {
    const { removeCartFunc, updateCartFunc } = useContext(MainGlobalContext);
    let token = JSON.parse(localStorage.getItem("token"));

    const updateBillFunc = (btn, cartID, quantity) => {
        if (btn === "minus" && quantity > 1) {
            state.forEach(item => {
                if (item._id === cartID) {
                    item.product.quantity = Number(quantity) - 1;
                }
            })
            updateCartFunc({ token, products: state });
        }
        if (btn === "plus" && quantity >= 1) {
            state.forEach(item => {
                if (item._id === cartID) {
                    let newQuantity = Number(quantity) + 1;
                    item.product.quantity = newQuantity;
                }
            })
            updateCartFunc({ token, products: state });
        }
    }

    return <React.Fragment>
        <div className={state.length > 0 ? "py-2 cart-padding" : "py-2 px-5 m-2 bg-white cart-padding"} style={{ minHeight: "75vh" }}>
            {
                state && state.length === 0 ?
                    <div className="d-flex justify-content-center mt-24">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3AZ826hsut4_Te3sWXtIm7EfzDi-3xKLpyA&usqp=CAU" alt="" />
                    </div>
                    :
                    <>
                        <h4 className="text-center py-3 bg-white">My Cart ({state && state.length})</h4>
                        <section className="flex justify-between mt-3 cart-container">
                            <div className="flex-1 col-lg-8 bg-white px-4 py-3" style={{ height: "fit-content" }}>
                                {
                                    state && state.map((item, index) => {
                                        return <section key={index} className="d-flex cart-main mb-4 justify-content-between">
                                            <div className="d-flex cart-items-parent justify-content-around align-items-center">

                                                <div className="d-flex align-items-center name-section">
                                                    <Avatar src={`${ServerPort}${item.product?.img[0].img}`} />
                                                    <div><span className="name-margin">{item.product?.name}</span></div>
                                                </div>

                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button onClick={(e) => {
                                                        updateBillFunc("minus", item._id, e.target.nextElementSibling.innerText)
                                                    }} className="minus-btn py-1 px-3 cursor-pointer">-</button>

                                                    <section className="px-4">
                                                        {item.product?.quantity}
                                                    </section>

                                                    <button onClick={(e) => {
                                                        updateBillFunc("plus", item._id, e.target.previousElementSibling.innerText)
                                                    }} className="minus-btn py-1 px-3 cursor-pointer"> + </button>
                                                </div>

                                            </div>

                                            <div className="price-section">
                                                <span className="text-yellow-600">Rs {item.product?.price}</span>
                                                <i onClick={(e) => {
                                                    e.preventDefault();
                                                    let token = JSON.parse(localStorage.getItem("token"));
                                                    removeCartFunc({ token, cartItem: item._id })
                                                }} className="fa fa-trash-o text-red-500"></i>
                                            </div>
                                        </section>
                                    })
                                }
                            </div>
                            <div className="col-lg-4 bill-parent">
                                <Payment state={state} bill={bill} discount={discount} />
                            </div>
                        </section>
                    </>
            }
        </div>
    </React.Fragment>
}

export default Cart;