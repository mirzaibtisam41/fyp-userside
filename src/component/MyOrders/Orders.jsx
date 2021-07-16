import React, { useContext, useState } from 'react';
import { MainGlobalContext } from "../MainContext/Context";
import Avatar from 'react-avatar';
import { ServerPort } from "../../Api/apiActions";
import { Table, Button, Modal, Form } from "react-bootstrap";
import moment from 'moment';
import "./style.css";
import { Helmet } from "react-helmet";

export default function CollapsibleTable() {
    let filters;
    const { orders, cancelOrderFunc, setFilterOrder, filterOrder, chageOrderStatus, user } = useContext(MainGlobalContext);
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (filterOrder === 'All') filters = orders;
    if (filterOrder !== 'All') filters = orders && orders.filter(item => item.status === filterOrder);

    const seeDetail = (item) => {
        setDetail(item);
        return handleShow();
    }

    const cancelOrder = (id) => {
        let answer = window.confirm("Are you sure you want to cancel this order");
        if (answer) return cancelOrderFunc(id);
    }

    return <React.Fragment>
        <div className={(filters?.length > 0) ? "py-2 cart-padding" : "py-2 px-5 m-2 cart-padding"} style={{ minHeight: "75vh" }}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Flipcart | My-Orders</title>
            </Helmet>
            {
                (!user) ?
                    <div className="d-flex justify-content-center mt-24">
                        <img style={{ width: "35%" }} src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png" alt="" />
                    </div>
                    :
                    <>
                        <section className="d-flex bg-white flex-column justify-content-center">
                            <h4 className="text-center py-3">My Orders ({filters?.length})</h4>
                            <Form.Group className="w-50 mx-auto" controlId="exampleForm.ControlSelect1">
                                <Form.Control defaultValue="Filter Orders" as="select" onChange={(e) => setFilterOrder(e.target.value)}>
                                    <option disabled>Filter Orders</option>
                                    <option value="All">All</option>
                                    <option value="Send">Send</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Complete">Complete</option>
                                    <option value="Deliverd">Deliverd</option>
                                    <option value="Received">Received</option>
                                </Form.Control>
                            </Form.Group>
                        </section>
                        <section className="flex flex-column justify-between mt-3">
                            <div className="flex-1 bg-white px-4 py-3" style={{ height: "fit-content", overflowX: "auto" }}>
                                <Table bordered hover className="text-center table-order">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Status</th>
                                            <th>Time</th>
                                            <th>Price (Rs)</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filters?.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item._id}</td>
                                                    <td className="text-success">{item.status}</td>
                                                    <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm a')}</td>
                                                    <td>{item.total}</td>
                                                    <td className="text-center">
                                                        <i onClick={() => seeDetail(item)} className="fa mx-2 fa-eye text-primary " aria-hidden="true"></i>
                                                        {item.status === 'Send' && <i onClick={() => cancelOrder(item._id)} className="fa mx-2 fa-times text-danger" aria-hidden="true"></i>}
                                                        {item.status === "Complete" && <i onClick={() => chageOrderStatus(item._id, "Received")} className="fa fa-check text-success" aria-hidden="true"></i>}
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </div>

                            {/* modal */}
                            <Modal show={show} onHide={handleClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Order's Detail</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {
                                        detail?.products.map((item, index) => {
                                            return <div key={index} className="d-flex align-items-center justify-content-around mb-3">
                                                <Avatar src={`${ServerPort}${item?.img[0].img}`} />
                                                <p className="text-muted">Qty : {item.quantity}</p>
                                                <p className="text-yellow-600">Price: ({item.quantity} x {item.price - item.offer}) = Rs {item.quantity * (item.price - item.offer)}</p>
                                            </div>
                                        })
                                    }
                                    <hr />
                                    <h5 className="text-success text-center">Shipping Detail: </h5>
                                    <section className="d-flex flex-column" style={{ fontSize: "smaller" }}>
                                        <span>Receipt Name: <span className="text-danger">{detail?.charge?.source?.name}</span> </span>
                                        <span>Receipt Email: <span className="text-danger">{detail?.charge?.receipt_email}</span> </span>
                                        <span>City: <span className="text-danger">{detail?.charge?.source?.address_city}</span> </span>
                                        <span>Country: <span className="text-danger">{detail?.charge?.source?.address_country}</span> </span>
                                        <span>Address: <span className="text-danger">{detail?.charge?.source?.address_line1}</span> </span>
                                        <span>Postal Code: <span className="text-danger">{detail?.charge?.source?.address_zip}</span> </span>
                                        <a href={detail?.charge?.receipt_url} target="_blank" >Click Here To See Reciept</a>
                                    </section>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </section>
                    </>
            }
        </div>
    </React.Fragment>
}