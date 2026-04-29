import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { Navigationbar } from "./Navbar";
import "./Signup.css"
import { useNavigate } from "react-router-dom";



const Signup = () => {
    const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("info");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
        const nameRegex = /^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/;

        if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
            setVariant("danger");
            return setMessage("Please fill in all fields.");
        }

        if (!nameRegex.test(form.fullName)) {
            setVariant("danger");
            return setMessage("Full Name should only contain letters and spaces.");
        }

        if (!emailRegex.test(form.email)) {
            setVariant("danger");
            return setMessage("Invalid email format.");
        }

        if (!passwordRegex.test(form.password)) {
            setVariant("danger");
            return setMessage("Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.");
        }

        if (form.password !== form.confirmPassword) {
            setVariant("danger");
            return setMessage("Passwords do not match");
        }


        try {
            const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
            const response = await fetch(`${backendURL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            setVariant(data.success ? "success" : "danger");
            setMessage(data.message);

            if (data.success) {
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            setVariant("danger");
            setMessage("Network error. Please try again.");
        }
    };

    return (
        <>
            <Navigationbar />

            <div className='signup-page'>
                <Container className='signup-container'>
                    <Row className='justify-content-center'>
                        <Col xs={12} sm={10} md={6} lg={5}>
                            <Card className="signup-card">
                                <h3 className="signup-title">
                                    Sign Up
                                </h3>
                                <Form className="signup-form" onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            value={form.fullName}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email address"
                                            value={form.email}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={form.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Re-enter your password"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                        />
                                    </Form.Group>

                                    <Button type="submit" className="signup-btn w-100">
                                        Signup
                                    </Button>

                                    <p className="login-link">
                                        Already a user?{" "}
                                        <Button variant="link" className="btn-link" onClick={() => navigate("/login")}>
                                            Login here
                                        </Button>
                                    </p>


                                </Form>
                                {message && (
                                    <Alert variant={variant} className={`signup-alert alert-${variant}`}>
                                        {message}
                                    </Alert>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Signup;