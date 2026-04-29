import React, { useState } from "react";
import { Navigationbar } from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-wrapper">
      <Navigationbar />

      {/* Netflix Background */}
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-description">
          Have questions or feedback? We’d love to hear from you!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              name="message"
              className="form-control"
              placeholder="Write your message..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ height: "auto", paddingTop: "15px" }}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>

      <footer className="footer-section text-center">
        <p className="footer-text mb-0">
          © {new Date().getFullYear()} Movie Streaming Platform. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
};

export default ContactUs;
