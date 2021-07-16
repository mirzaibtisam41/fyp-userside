import React, { useContext, useState } from 'react';
import { MainGlobalContext } from "../MainContext/Context";
import ReviewDialogue from "./ReviewDialogue";
import moment from "moment";

const Reviews = ({ product }) => {
    const [showReview, setReview] = useState(10);
    const { user, setModalShowFunc, alertMessage } = useContext(MainGlobalContext);

    const openRatingModal = () => {
        if (user !== null) {
            setModalShowFunc(true);
        }
        else {
            alertMessage("error", "You need to login")
        }
    }

    return (
        <section className="bg-white mt-2 mx-2 py-4 body-font">
            <div className="container border pb-3 mx-auto width-review" style={{ paddingRight: "0px", paddingLeft: "0px", width: "75%" }} >
                <div className="flex justify-between items-center review-flex-container" style={{ borderBottom: "1px solid #dee2e6" }}>
                    <h3 className="mt-3 pb-3 px-3">Rating & Reviews</h3>
                    <button onClick={openRatingModal} className="btn text-white h-12 mr-3" style={{ backgroundColor: "#fb641b" }}>
                        <i className="fa fa-star text-white mx-2"></i>
                        Rate Product
                    </button>
                </div>
                {
                    (product && product.reviews.length > 0) && product.reviews.map((item, index) => {
                        if (index <= showReview) {
                            return <div key={index} className="px-3 py-2 divide-gray-100" style={{ borderBottom: "1px solid #dee2e6" }}>
                                <div className="pb-1 flex flex-wrap md:flex-nowrap flex-col">
                                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <div>
                                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-white bg-green-700 rounded">
                                                {item.star}
                                                <i className="fa text-white fa-star ml-2"></i>
                                            </span>
                                            <span className="font-semibold title-font text-gray-700 mx-2">{item.comment}</span>
                                        </div>
                                    </div>
                                    <div className="md:flex-grow mt-2">
                                        <p className="leading-relaxed">{item.detail}</p>
                                        <span className="text-yellow-600">{item.userName}, </span>
                                        <span className="mt-2 text-gray-500 text-sm mr-3">
                                            {moment(item.date).format('MMMM Do YYYY')}
                                        </span>
                                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-white bg-blue-700 rounded">
                                            Verified User
                                            <i className="fa fa-check-circle text-white ml-2"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                    })
                }
                <div className="text-right">
                    <a onClick={(e) => setReview(product.DealProduct && product.DealProduct.reviews.length - 1)} className="cursor-pointer text-indigo-500 mx-3 inline-flex items-center justify-items-end mt-4">More Reviews
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </div>
            <ReviewDialogue product={product && product} user={user} />
        </section>
    )
}

export default Reviews;