import React, { useState, useContext } from 'react';
import { Modal, Container, Row, Col, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { MainGlobalContext } from "../MainContext/Context";

function MydModalWithGrid(props) {
    const { giveRatingToProduct, alertMessage } = useContext(MainGlobalContext);
    const [comment, setComment] = useState(null);
    const [detail, setDetail] = useState(null);
    const [star, setStar] = useState(null);

    const changeRating = (newRating) => {
        setStar(newRating);
    }

    const submitReview = () => {
        if (comment === null || detail === null || star === null) return alertMessage("error", "Fields must not be empty!");
        else {
            let obj = {
                comment, detail, star, id: props.product._id,
                token: JSON.parse(localStorage.getItem("token"))
            }
            giveRatingToProduct(obj);
        }
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Rating For {props.product && props.product.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Comment</label>
                                <input onChange={(e) => setComment(e.target.value)} type="text" className="form-control" placeholder="Enter comment" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Detail</label>
                                <textarea onChange={(e) => setDetail(e.target.value)} className="form-control" rows="3" placeholder="Detail About Your Comment" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <label htmlFor="exampleInputEmail1">Give Rating</label><br />
                            <ReactStars
                                count={5}
                                onChange={changeRating}
                                size={30}
                                activeColor="#ffd700"
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-success"
                    onClick={submitReview}
                >Submit Review</button>
            </Modal.Footer>
        </Modal >
    );
}

const ReviewModal = ({ product, user }) => {
    const { modalShow, setModalShowFunc } = useContext(MainGlobalContext);

    return (
        <MydModalWithGrid product={product} show={modalShow} user={user} onHide={() => setModalShowFunc(false)} />
    );
}

export default ReviewModal;