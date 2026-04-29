import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Navigationbar } from "./Navbar";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("info");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const res = await fetch(`${backendURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Clear any old data
        localStorage.clear();

        // Save JWT token & role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        setVariant("success");
        setMessage("Login successful!");

        // Redirect to home page after successful login
        setTimeout(() => {
          navigate("/home");
        }, 1200);
      } else {
        setVariant("danger");
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setVariant("danger");
      setMessage("Something went wrong. Please try again.");
    }
  };


  return (
    <>
      <Navigationbar />
      <div className="login-page">
        <Container className="login-container">
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={6} lg={5}>
              <Card className="login-card">
                <h3 className="login-title">Login</h3>
                <Form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="nope"
                      autoFocus={false}
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

                  <Button type="submit" className="login-btn w-100">
                    Login
                  </Button>
                </Form>

                {message && (
                  <Alert variant={variant} className={`login-alert alert-${variant}`}>
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

export default Login;