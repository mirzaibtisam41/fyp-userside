import React, { useContext, useState } from 'react';
import { MainGlobalContext } from "../MainContext/Context";
import "./Navbar.css";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import TippyComp from "./Tippy";
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Badge from "./Badge";
import { Link } from "react-router-dom";

const NavbarComp = () => {
    const history = useHistory();
    const { user, cartItems, allProducts, setProductDetailFunc, alertMessage } = useContext(MainGlobalContext);
    const [search, setSearch] = useState('');

    let filter = allProducts && allProducts.filter(item => item?.name.toLowerCase().includes(search?.toLowerCase()));

    const seeProducts = (e) => {
        if (e.keyCode === 13) {
            let item = allProducts && allProducts.find(item => item.name === search);
            if (item) {
                // set detail
                localStorage.setItem('productDetail', JSON.stringify(item));
                setProductDetailFunc(item);
                // set recent viewed
                let recentArray = JSON.parse(localStorage.getItem('recent'));
                if (recentArray === null) {
                    let array = [];
                    array.push(item);
                    localStorage.setItem("recent", JSON.stringify(array));
                }
                if (recentArray !== null) {
                    let find = recentArray.find(value => value._id === item._id);
                    if (!find) {
                        recentArray.push(item);
                        localStorage.setItem("recent", JSON.stringify(recentArray));
                    }
                }
                history.push(`/productDetail?Deal=Search by products&Product=${item.name}`);
            }
            else {
                alertMessage("error", "Sorry, no item found with this name");
            }
        }
    }

    return <React.Fragment>
        <div className="bg-primary w-100 fixed top-0 z-50" style={{ zIndex: "2" }}>
            <Container>
                <Row className="py-1">
                    <Col lg={7} md={6} sm={12} className="d-flex align-items-center">
                        <Link to="/">
                            <img style={{ width: "50px" }} src="https://www.searchpng.com/wp-content/uploads/2019/01/Flipart-Logo-Icon-PNG-Image.png" alt="" />
                        </Link>
                        <input onKeyDown={(e) => seeProducts(e)} onChange={(e) => setSearch(e.target.value)} list="browsers" name="browser" id="browser" type="text" className="ml-3 w-100 py-1 px-2 search" placeholder="Search for product" />
                        {
                            search !== '' &&
                            <datalist id="browsers">
                                {filter && filter.map((item, index) => {
                                    if (search !== null && index < 10) return <option key={index} value={item.name} />
                                })
                                }
                            </datalist>
                        }
                    </Col>
                    <Col className="d-flex align-items-center">
                        <div className="d-flex navbar-2nd-div align-items-center">
                            <div>
                                {
                                    user === null && <button onClick={() => {
                                        localStorage.setItem("URL", JSON.stringify(window.location.href));
                                        history.push("/login");
                                    }} className="login-btn bg-white">Login</button>
                                }
                                {
                                    user !== null && <button onClick={() => {
                                        localStorage.removeItem("token");
                                        window.location.reload();
                                    }} className="login-btn bg-white">Log out</button>
                                }
                            </div>
                            <Tippy theme="light" interactive={true} content={<TippyComp />}>
                                <div className="d-flex nav-divs">
                                    <h6 className="text-white mt-1">More</h6>
                                    <i className="fa fa-caret-down ml-2 text-white more"></i>
                                </div>
                            </Tippy>
                            <div className="d-flex nav-divs mt-1">
                                <Badge cartItems={cartItems} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </React.Fragment>
}

export default NavbarComp;