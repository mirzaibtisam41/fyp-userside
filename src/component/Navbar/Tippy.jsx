import React from 'react';
import "./Navbar.css";
import { Link } from "react-router-dom";

const tippy = () => {
    return (
        <div className="tippy-div cursor-pointer" style={{zIndex:"10"}}>
            <div>
                <i className="fa fa-user-circle-o"></i>
                <Link style={{ textDecoration: "none" }} to="/cart"><span className="text-black">Cart</span></Link>
            </div>
            <div>
                <i className="fa fa-first-order"></i>
                <Link style={{ textDecoration: "none" }} to="/myorders"><span className="text-decoration-none text-black">My Orders</span></Link>
            </div>
            <div>
                <i className="fa fa-heart"></i>
                <Link style={{ textDecoration: "none" }} to="/wishlist"><span className="text-decoration-none text-black">Wish List</span></Link>
            </div>
            {/* <div>
                <i className="fa fa-shopping-basket"></i>
                <span>Sell on Store</span>
            </div> */}
        </div>
    )
}

export default tippy;
