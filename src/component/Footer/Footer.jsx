import React from "react";
import "./Footer.css";

const Footer = () => {

    return <>
        <footer className="body-font footer mt-5" style={{ backgroundColor: "#172337" }} >
            <div className="container px-5 py-14 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="flex-grow flex flex-wrap footer-container-flex">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4 footer-container">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 heading-links">ABOUT US</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">Our Store</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">FAQ</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">Certificate</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">Scientific Research</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4 footer-container">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 heading-links">HELP</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">My Account</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">Returns and Refunds</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">Privacy Policy</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">Terms and Conditions</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">Data Protection and<br /> Data Security Policy</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4 footer-container">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 heading-links">CONTACT US</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">EMAIL</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link light">mirzaibtisam41@gmail.com</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link">PHONE NUMBER</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link light">PH +63 956 003 5650</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link light">USA +1 323 312 5169</a>
                            </li>
                            <li>
                                <a className="text-gray-600 hover:text-gray-800 about-link light">CA +1 647 424 2289</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4 footer-container">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 heading-links">SUBSCRIBE</h2>
                        <div style={{ textAlign: "justify" }}>
                            <input className="input-email" placeholder="Enter Email" />
                            <p className="mt-2 text-sm text-black-800 light p-color text-white">By subscribing, you agree with the privacy policy</p>
                        </div>
                        <div>
                            <h6 className="heading-links">FOLLOW US</h6>
                            <div className="container follow-div">
                                <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                                    <a className="text-gray-500 social">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-3 text-gray-500 social">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-3 text-gray-500 social">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                        </svg>
                                    </a>
                                    <a className="ml-3 text-gray-500 social">
                                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                            <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ borderTop: "1px solid white" }}>
                <div className="container footer-end mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 font-light footer-text text-white text-sm text-center sm:text-left">All rights reserved ©GCUF-FYP-BSCS-BATCH 2017-21</p>
                </div>
            </div>
        </footer>
    </>
}

export default Footer;