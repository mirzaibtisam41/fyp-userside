import React, { useState, useContext } from 'react'
import "../Login/style.css";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { MainGlobalContext } from "../MainContext/Context";
import { Helmet } from "react-helmet";

const Signup = () => {
    const { signUpUserFunc, user } = useContext(MainGlobalContext);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitData = () => {
        let obj = { name, email, password };
        signUpUserFunc(obj);
    }

    return <>
        {user !== null && <Redirect to="/" />}
        <Helmet>
            <meta charSet="utf-8" />
            <title>Flipcart | Sign Up</title>
        </Helmet>
        <div className="login-main">
            <section className="my-4 py-5 sec-login">
                <h2 className="font-family mb-3">Sign Up</h2>
                <p>Already have an account? <Link className="text-decoration-none text-danger ml-2" to="/login">Log In</Link></p>
                <Form.Group>
                    <Form.Control onChange={(e) => setName(e.target.value)} className="py-4 input-sec-login w-75 mx-auto" type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} className="py-4 input-sec-login w-75 mx-auto" type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} className="py-4 input-sec-login w-75 mx-auto" type="password" placeholder="Password" />
                </Form.Group>

                <Button onClick={submitData} className="py-2 px-5" variant="primary" type="submit">
                    Submit
                </Button>
            </section>
        </div>
    </>
}

export default Signup;
