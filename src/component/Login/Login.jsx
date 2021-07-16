import React, { useState, useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { MainGlobalContext } from "../MainContext/Context";
import "./style.css";
import { Helmet } from "react-helmet";

const Login = () => {
    const { SignInUserApiFunc, user } = useContext(MainGlobalContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitData = (e) => {
        e.preventDefault();
        let obj = { email, password };
        SignInUserApiFunc(obj);
    }


    return <>
        {user !== null && <Redirect to="/" />}
        <Helmet>
            <meta charSet="utf-8" />
            <title>Flipcart | Log In</title>
        </Helmet>
        <div className="login-main">
            <section className="my-14 py-5 sec-login">
                <h2 className="font-family mb-3">Log In</h2>
                <p>Don't have an account?<Link className="text-decoration-none text-danger ml-2" to="/signup">Sign Up</Link></p>
                <Form>
                    <Form.Group>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} className="py-4 w-75 mx-auto" type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} className="py-4 w-75 mx-auto" type="password" placeholder="Password" />
                    </Form.Group>

                    <Button onClick={submitData} className="py-2 px-5" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </section>
        </div>
    </>
}

export default Login;