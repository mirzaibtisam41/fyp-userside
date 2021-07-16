import React, { useContext } from 'react';
import NumberFormat from "react-number-format";
import StripeCheckout from 'react-stripe-checkout';
import { MainGlobalContext } from "../MainContext/Context";

const Payment = ({ state, bill, discount }) => {
    const { createPayment } = useContext(MainGlobalContext);

    const handleToken = (token) => {
        let amount = bill - discount;
        const product = { name: 'All Products', price: amount }
        if (token) return createPayment(product, token, amount);
    }

    return (
        <div className="bg-white payment-container">
            <div className="py-3 px-4 border-bottom">
                <span style={{ fontSize: "large" }} className="text-muted">PRICE DETAILS</span>
            </div>
            <div className="border-bottom py-3 px-4">
                <section className="d-flex justify-content-between py-2">
                    <span>Price ({state && state.length} item) </span>
                    <NumberFormat value={bill} displayType={'text'} thousandSeparator={true} prefix={'Rs '} />
                </section>
                <section className="d-flex justify-content-between py-2">
                    <span>Discount</span>
                    <span className="text-green-500">- Rs {discount}</span>
                </section>
                <section className="d-flex justify-content-between py-2">
                    <span>Delivery Charges</span>
                    <span>Rs 100</span>
                </section>
            </div>
            <div className="py-2 px-4 text-red-500 border-bottom">
                <section className="d-flex justify-content-between py-2">
                    <span>Total Amount</span>
                    <span >Rs {(bill - discount) + 100}</span>
                </section>
            </div>
            <div className="py-2 px-4">
                <section className="d-flex justify-content-between py-2">
                    <span className="text-green-600">You will save Rs {discount} on this order</span>
                </section>
            </div>
            <div className="p-3 text-center">
                <StripeCheckout
                    token={handleToken}
                    stripeKey="pk_test_51J03ifFhTtqd1jfZWr7bbTZvdFNrG04BbqrYa3ZjHYAP2VZrPuBjxhMwns4L22Z740StSKDwM0f9o0KPMYwoN6OU00GIKFpoBG"
                    billingAddress
                    shippingAddress
                    amount={bill - discount}
                    name="FlipKart Payment"
                />
            </div>
        </div>
    )
}

export default Payment;